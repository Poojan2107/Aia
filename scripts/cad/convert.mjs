// Local, offline STEP → GLB for the homepage MOC showcase.
// Reads AIA's STEP files (OpenCascade via WASM), assigns each part a material role,
// merges parts per role, centres the model (mm → m), simplifies heavy files, quantizes,
// and writes public/models/catalog/<id>.glb plus a size/stats report.
// Usage: node scripts/cad/convert.mjs [id ...]
import fs from "node:fs";
import path from "node:path";
import occtimportjs from "occt-import-js";
import { Document, NodeIO } from "@gltf-transform/core";
import { KHRMeshQuantization, EXTMeshoptCompression } from "@gltf-transform/extensions";
import { weld, simplify, dedup, prune, reorder, meshopt } from "@gltf-transform/functions";
import { MeshoptSimplifier, MeshoptEncoder } from "meshoptimizer";
import { products } from "./manifest.mjs";
import { finishes } from "./materials.mjs";
import { bakeAO } from "./ao.mjs";

const OUT = "public/models/catalog";
fs.mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
const occt = await occtimportjs();
await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions([KHRMeshQuantization, EXTMeshoptCompression]).registerDependencies({ "meshopt.encoder": MeshoptEncoder });
const report = {};

for (const prod of products.filter((p) => !only.length || only.includes(p.id))) {
  const t0 = Date.now();
  const res = occt.ReadStepFile(new Uint8Array(fs.readFileSync(prod.source)), {
    linearUnit: "millimeter",
    linearDeflectionType: "bounding_box_ratio",
    linearDeflection: prod.deflection ?? 0.0003,
    angularDeflection: prod.angular ?? 0.12,
  });
  if (!res.success) throw new Error(`STEP read failed: ${prod.id}`);

  // Bounds of the whole product (to centre it) and per-part sizes (to assign roles).
  const box = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  const parts = res.meshes.map((m) => {
    const p = m.attributes.position.array;
    const b = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
    for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { b[k] = Math.min(b[k], p[i + k]); b[k + 3] = Math.max(b[k + 3], p[i + k]); }
    for (let k = 0; k < 3; k++) { box[k] = Math.min(box[k], b[k]); box[k + 3] = Math.max(box[k + 3], b[k + 3]); }
    const maxDim = Math.max(b[3] - b[0], b[4] - b[1], b[5] - b[2]);
    const minDim = Math.min(b[3] - b[0], b[4] - b[1], b[5] - b[2]);
    return { mesh: m, name: m.name || "", maxDim, minDim };
  });
  const centre = [0, 1, 2].map((k) => (box[k] + box[k + 3]) / 2);
  // Rotation (degrees about X, then Y, then Z) baked into the model so its front view is the default.
  const [rx, ry, rz] = (prod.orient ?? [0, 0, 0]).map((d) => (d * Math.PI) / 180);
  const rot = ([x, y, z]) => {
    let t;
    t = y * Math.cos(rx) - z * Math.sin(rx); z = y * Math.sin(rx) + z * Math.cos(rx); y = t;
    t = x * Math.cos(ry) + z * Math.sin(ry); z = -x * Math.sin(ry) + z * Math.cos(ry); x = t;
    t = x * Math.cos(rz) - y * Math.sin(rz); y = x * Math.sin(rz) + y * Math.cos(rz); x = t;
    return [x, y, z];
  };

  // Merge parts per role into one primitive each (few draw calls, one material per role).
  const byRole = new Map();
  for (const part of parts) {
    const role = prod.roles(part);
    const g = byRole.get(role) ?? { pos: [], nrm: [], idx: [], base: 0 };
    const p = part.mesh.attributes.position.array;
    const n = part.mesh.attributes.normal?.array;
    for (let i = 0; i < p.length; i += 3) {
      // Centre, mm -> m, then the product's "front" orientation (working face up, see manifest).
      const v = rot([0, 1, 2].map((k) => (p[i + k] - centre[k]) / 1000));
      g.pos.push(v[0], v[1], v[2]);
      if (n) { const m = rot([n[i], n[i + 1], n[i + 2]]); g.nrm.push(m[0], m[1], m[2]); }
    }
    for (const ix of part.mesh.index.array) g.idx.push(ix + g.base);
    g.base += p.length / 3;
    byRole.set(role, g);
  }

  // Baked ambient occlusion (scripts/cad/ao.mjs), stored as vertex colour: recesses darken.
  const aoStart = Date.now();
  const aoValues = bakeAO([...byRole.values()]);
  const aoByRole = new Map([...byRole.keys()].map((r, i) => [r, aoValues[i]]));
  const aoSeconds = ((Date.now() - aoStart) / 1000).toFixed(1);

  const doc = new Document();
  const buf = doc.createBuffer();
  const scene = doc.createScene(prod.id);
  const root = doc.createNode(prod.id);
  scene.addChild(root);
  const roles = {};
  // Surface textures (scripts/cad/textures.py), shared per model.
  const tex = {};
  const texture = (file) => (tex[file] ??= doc.createTexture(file).setImage(fs.readFileSync(`scripts/cad/tex/${file}`)).setMimeType("image/jpeg"));
  for (const [role, g] of byRole) {
    const base = finishes[role];
    if (!base) throw new Error(`No finish for role ${role}`);
    // Tiny repeated parts (e.g. Sintercast inserts) are too small for surface grain: plain finish.
    const f = prod.plainRoles?.includes(role) ? { color: base.color, metallic: base.metallic, roughness: prod.plainRoughness ?? (base.roughness === 1 ? 0.6 : base.roughness) } : base;
    const mat = doc.createMaterial(role).setBaseColorFactor([...f.color, 1]).setMetallicFactor(f.metallic).setRoughnessFactor(f.roughness);
    if (f.normalMap) mat.setNormalTexture(texture(f.normalMap)).setNormalScale(f.normalScale ?? 1);
    if (f.mrMap) mat.setMetallicRoughnessTexture(texture(f.mrMap));
    if (f.colorMap) mat.setBaseColorTexture(texture(f.colorMap));
    // Baked AO as vertex colour (how dark a fully enclosed corner gets: the finish's aoFloor, or
    // the product's own where tiny repeated parts would otherwise shimmer).
    const ao = aoByRole.get(role);
    const floor = prod.aoFloor?.[role] ?? base.aoFloor ?? 0.28;
    let pos = g.pos, nrm = g.nrm, idx = g.idx;
    let col = new Float32Array(ao.length * 3);
    for (let v = 0; v < ao.length; v++) col.fill(floor + (1 - floor) * Math.pow(ao[v], 1.4), v * 3, v * 3 + 3);
    let uv = null;
    if (f.normalMap || f.mrMap || f.colorMap) {
      // Box-projected UVs (CAD meshes have none). Each triangle is projected on the one plane facing
      // it (by its face normal); a vertex shared by triangles facing different ways is split, so the
      // grain is never smeared between two projections inside a triangle (that showed as streaks).
      const tile = f.tile ?? 0.12; // metres per texture repeat
      const P = [], N = [], C = [], U = [], I = [];
      const seen = new Map();
      for (let t = 0; t < idx.length; t += 3) {
        const [a, b, c] = [idx[t], idx[t + 1], idx[t + 2]];
        const e1 = [0, 1, 2].map((k) => pos[b * 3 + k] - pos[a * 3 + k]);
        const e2 = [0, 1, 2].map((k) => pos[c * 3 + k] - pos[a * 3 + k]);
        const fn = [Math.abs(e1[1] * e2[2] - e1[2] * e2[1]), Math.abs(e1[2] * e2[0] - e1[0] * e2[2]), Math.abs(e1[0] * e2[1] - e1[1] * e2[0])];
        const axis = fn[0] >= fn[1] && fn[0] >= fn[2] ? 0 : fn[1] >= fn[2] ? 1 : 2;
        for (const v of [a, b, c]) {
          const key = v * 3 + axis;
          let n = seen.get(key);
          if (n === undefined) {
            n = P.length / 3;
            seen.set(key, n);
            P.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]);
            N.push(nrm[v * 3] ?? 0, nrm[v * 3 + 1] ?? 0, nrm[v * 3 + 2] ?? 1);
            C.push(col[v * 3], col[v * 3 + 1], col[v * 3 + 2]);
            const [u0, u1] = axis === 0 ? [pos[v * 3 + 1], pos[v * 3 + 2]] : axis === 1 ? [pos[v * 3], pos[v * 3 + 2]] : [pos[v * 3], pos[v * 3 + 1]];
            U.push(u0 / tile, u1 / tile);
          }
          I.push(n);
        }
      }
      pos = P; nrm = N; idx = I; col = new Float32Array(C); uv = new Float32Array(U);
    }
    const prim = doc.createPrimitive()
      .setAttribute("POSITION", doc.createAccessor().setType("VEC3").setArray(new Float32Array(pos)).setBuffer(buf))
      .setAttribute("COLOR_0", doc.createAccessor().setType("VEC3").setArray(col).setBuffer(buf))
      .setIndices(doc.createAccessor().setType("SCALAR").setArray(new Uint32Array(idx)).setBuffer(buf))
      .setMaterial(mat);
    if (nrm.length === pos.length) prim.setAttribute("NORMAL", doc.createAccessor().setType("VEC3").setArray(new Float32Array(nrm)).setBuffer(buf));
    if (uv) prim.setAttribute("TEXCOORD_0", doc.createAccessor().setType("VEC2").setArray(uv).setBuffer(buf));
    root.addChild(doc.createNode(role).setMesh(doc.createMesh(role).addPrimitive(prim)));
    roles[role] = g.idx.length / 3;
  }

  await doc.transform(
    weld(),
    // Fine tessellation keeps curved wear faces smooth; simplify then removes triangles only where the
    // surface stays within the error (flat areas), so files stay small.
    simplify({ simplifier: MeshoptSimplifier, ratio: prod.simplify ?? 0.2, error: prod.simplifyError ?? 0.00035 }),
    dedup(),
    prune(),
    reorder({ encoder: MeshoptEncoder }),
    meshopt({ encoder: MeshoptEncoder, level: "medium" }),
  );
  doc.getRoot().getAsset().generator = "AIA local CAD pipeline (OpenCascade + glTF-Transform)";

  const file = path.join(OUT, `${prod.id}.glb`);
  await io.write(file, doc);
  let tris = 0;
  for (const mesh of doc.getRoot().listMeshes()) for (const p of mesh.listPrimitives()) tris += (p.getIndices()?.getCount() ?? 0) / 3;
  report[prod.id] = {
    aiaRef: prod.aiaRef,
    sizeMm: [box[3] - box[0], box[4] - box[1], box[5] - box[2]].map((v) => Math.round(v)),
    triangles: tris,
    rolesBeforeSimplify: roles,
    kb: Math.round(fs.statSync(file).size / 1024),
    seconds: +((Date.now() - t0) / 1000).toFixed(1),
    aoSeconds: +aoSeconds,
  };
  console.log(prod.id, JSON.stringify(report[prod.id]));
}
const reportFile = path.join("scripts/cad", "report.json");
const prev = fs.existsSync(reportFile) ? JSON.parse(fs.readFileSync(reportFile, "utf8")) : {};
fs.writeFileSync(reportFile, JSON.stringify({ ...prev, ...report }, null, 2));
