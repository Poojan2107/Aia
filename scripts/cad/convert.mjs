// Local, offline STEP → GLB for the homepage MOC showcase.
// Reads AIA's STEP files (OpenCascade via WASM), assigns each part a material role,
// merges parts per role, centres the model (mm → m), simplifies heavy files, quantizes,
// and writes public/models/catalog/<id>.glb plus a size/stats report.
// Usage: node scripts/cad/convert.mjs [id ...]
import fs from "node:fs";
import path from "node:path";
import occtimportjs from "occt-import-js";
import { Document, NodeIO, PropertyType } from "@gltf-transform/core";
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
  // STEP is tessellated here; a .json source is AIA geometry already decoded from a 3D PDF
  // (see prcMeshes below), with positions in mm and triangle indices per part.
  const res = prod.sources
    ? { success: true, meshes: prod.sources.flatMap((src) => stlParts(src.file, src)) }
    : /\.stl$/i.test(prod.source)
    ? { success: true, meshes: stlParts(prod.source) }
    : prod.source.endsWith(".json")
    ? { success: true, meshes: prcMeshes(JSON.parse(fs.readFileSync(prod.source, "utf8")).parts.filter((p) => p.visible !== false)) }
    : occt.ReadStepFile(new Uint8Array(fs.readFileSync(prod.source)), {
        linearUnit: "millimeter",
        // Large assemblies can set an absolute tolerance (mm): the ratio is per part, so a mill of
        // ~1000 parts would otherwise be tessellated finely part by part.
        linearDeflectionType: prod.deflectionMm ? "absolute_value" : "bounding_box_ratio",
        linearDeflection: prod.deflectionMm ?? prod.deflection ?? 0.0003,
        angularDeflection: prod.angular ?? 0.12,
      });
  if (!res.success) throw new Error(`STEP read failed: ${prod.id}`);
  // A STEP product may take extra parts from an STL export of the same assembly (placed by
  // dx/dy/dz, filtered by `keep`), e.g. fasteners the STEP leaves out.
  for (const extra of prod.extraStl ?? []) {
    const add = stlParts(extra.file, extra).filter((m) => {
      const p = m.attributes.position.array;
      const b = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
      for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { b[k] = Math.min(b[k], p[i + k]); b[k + 3] = Math.max(b[k + 3], p[i + k]); }
      const maxDim = Math.max(b[3] - b[0], b[4] - b[1], b[5] - b[2]);
      return extra.keep({ maxDim, centre: [0, 1, 2].map((k) => (b[k] + b[k + 3]) / 2) });
    });
    res.meshes.push(...add);
  }

  // Optional: flatten raised CAD markings (e.g. a part code) back into the surface they sit on.
  if (prod.flattenFaces) for (const m of res.meshes) flattenFaces(m, prod.flattenFaces);

  // Bounds of the whole product (to centre it) and per-part sizes (to assign roles).
  const box = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  const parts = res.meshes.map((m) => {
    const p = m.attributes.position.array;
    const b = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
    for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { b[k] = Math.min(b[k], p[i + k]); b[k + 3] = Math.max(b[k + 3], p[i + k]); }
    for (let k = 0; k < 3; k++) { box[k] = Math.min(box[k], b[k]); box[k + 3] = Math.max(box[k + 3], b[k + 3]); }
    const maxDim = Math.max(b[3] - b[0], b[4] - b[1], b[5] - b[2]);
    const minDim = Math.min(b[3] - b[0], b[4] - b[1], b[5] - b[2]);
    // centre (mm, CAD axes) lets a product group parts by where they sit in an assembly.
    return { mesh: m, name: m.name || "", maxDim, minDim, box: b, centre: [0, 1, 2].map((k) => (b[k] + b[k + 3]) / 2) };
  });
  const centre = [0, 1, 2].map((k) => (box[k] + box[k + 3]) / 2);
  // CAD_FILTER="<js expr over q>": list matching parts (name, size, box) and stop.
  if (process.env.CAD_FILTER) {
    const test = new Function("q", `return (${process.env.CAD_FILTER});`);
    const hits = parts.filter((q) => test(q));
    for (const q of hits.slice(0, 80)) console.log((q.name || "-").slice(-50).padEnd(50), Math.round(q.maxDim), q.box.map(Math.round).join(" "), q.mesh.index.array.length / 3);
    console.log("matches", hits.length);
    process.exit(0);
  }
  // CAD_NAMES=1: part-name stems with count, size range and position range (x along the axis).
  if (process.env.CAD_NAMES) {
    const m = new Map();
    for (const q of parts) {
      const stem = (q.name || "-").replace(/[-_ ]?\d+$/, "").slice(0, 46);
      const e = m.get(stem) ?? { n: 0, tris: 0, dMin: Infinity, dMax: 0, xMin: Infinity, xMax: -Infinity, rMin: Infinity, rMax: 0 };
      const r = Math.hypot(q.centre[1] - centre[1], q.centre[2] - centre[2]);
      e.n++; e.tris += q.mesh.index.array.length / 3; e.dMin = Math.min(e.dMin, q.maxDim); e.dMax = Math.max(e.dMax, q.maxDim);
      e.xMin = Math.min(e.xMin, q.centre[0]); e.xMax = Math.max(e.xMax, q.centre[0]); e.rMin = Math.min(e.rMin, r); e.rMax = Math.max(e.rMax, r);
      m.set(stem, e);
    }
    for (const [k, e] of [...m].sort((a, b) => b[1].tris - a[1].tris)) console.log(k.padEnd(46), "n", e.n, "tris", e.tris, "size", Math.round(e.dMin), "-", Math.round(e.dMax), "x", Math.round(e.xMin), "..", Math.round(e.xMax), "r", Math.round(e.rMin), "..", Math.round(e.rMax));
    process.exit(0);
  }
  // CAD_SUMMARY=1: parts bucketed by source tag and size (to plan groups for a whole assembly).
  if (process.env.CAD_SUMMARY) {
    const buckets = new Map();
    for (const q of parts) {
      const tag = q.name.includes("/") ? q.name.split("/")[0] : "-";
      const size = q.maxDim < 150 ? "<150" : q.maxDim < 400 ? "150-400" : q.maxDim < 1000 ? "400-1000" : q.maxDim < 2900 ? "1000-2900" : ">2900";
      const k = `${tag} ${size}`;
      const e = buckets.get(k) ?? { n: 0, tris: 0, rMin: Infinity, rMax: 0, xMin: Infinity, xMax: -Infinity };
      const r = Math.hypot(q.centre[1] - centre[1], q.centre[2] - centre[2]);
      e.n++; e.tris += q.mesh.index.array.length / 3; e.rMin = Math.min(e.rMin, r); e.rMax = Math.max(e.rMax, r); e.xMin = Math.min(e.xMin, q.centre[0]); e.xMax = Math.max(e.xMax, q.centre[0]);
      buckets.set(k, e);
    }
    for (const [k, e] of [...buckets].sort()) console.log(k.padEnd(18), "n", e.n, "tris", e.tris, "r", Math.round(e.rMin), "-", Math.round(e.rMax), "x", Math.round(e.xMin), "-", Math.round(e.xMax));
    console.log("centre", centre.map(Math.round).join(" "), "box", box.map(Math.round).join(" "));
    process.exit(0);
  }
  // CAD_PARTS=1: list the parts (largest first) to write a product's roles.
  if (process.env.CAD_PARTS) for (const q of [...parts].sort((a, b) => b.mesh.index.array.length - a.mesh.index.array.length).slice(0, Number(process.env.CAD_PARTS) || 60)) console.log(q.name.slice(-40).padEnd(40), Math.round(q.maxDim), q.box.map(Math.round).join(" "), q.mesh.index.array.length / 3);
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
  // Take-apart models: each part records the direction it travels when the assembly opens
  // (unit vector, model axes), stored per vertex as _EXPLODE. "radial" = straight out from the mill
  // axis (X) through the part's centre; a vector = that direction.
  const partIndex = new Map(parts.map((q, i) => [q, i]));
  const explodeDir = (part, role) => {
    if (!prod.explode) return null;
    const e = prod.explode(part, role, centre);
    if (!e) return [0, 0, 0];
    const raw = e === "radial" ? [0, part.centre[1] - centre[1], part.centre[2] - centre[2]] : e;
    const r = rot(raw);
    const l = Math.hypot(r[0], r[1], r[2]) || 1;
    return [r[0] / l, r[1] / l, r[2] / l];
  };
  for (const part of parts) {
    const role = prod.roles(part);
    if (!role) continue; // a product may leave parts out (e.g. hidden fasteners in a full mill)
    if (prod.triRole) {
      // One-piece meshes (an STL shell) can be coloured per surface: each triangle picks its role
      // from its centre and face normal (source mm). Vertices are re-welded by preSimplify.
      const p = part.mesh.attributes.position.array, ia = part.mesh.index.array;
      for (let t = 0; t < ia.length; t += 3) {
        const v = [ia[t], ia[t + 1], ia[t + 2]].map((i) => [p[i * 3], p[i * 3 + 1], p[i * 3 + 2]]);
        const e1 = [0, 1, 2].map((k) => v[1][k] - v[0][k]), e2 = [0, 1, 2].map((k) => v[2][k] - v[0][k]);
        const nn = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
        const l = Math.hypot(...nn) || 1;
        const c = [0, 1, 2].map((k) => (v[0][k] + v[1][k] + v[2][k]) / 3);
        const r = prod.triRole(c, nn.map((x) => x / l), centre, part, role) ?? role;
        const g = byRole.get(r) ?? { pos: [], nrm: [], idx: [], base: 0, dir: [], piece: [] };
        const d = explodeDir(part, r);
        for (const w of v) {
          const q = rot([0, 1, 2].map((k) => (w[k] - centre[k]) / 1000));
          g.idx.push(g.pos.length / 3); g.pos.push(q[0], q[1], q[2]);
          if (d) { g.dir.push(d[0], d[1], d[2]); g.piece.push(partIndex.get(part)); }
        }
        byRole.set(r, g);
      }
      continue;
    }
    const g = byRole.get(role) ?? { pos: [], nrm: [], idx: [], base: 0, dir: [], piece: [] };
    const p = part.mesh.attributes.position.array;
    const n = part.mesh.attributes.normal?.array;
    const d = explodeDir(part, role);
    // Decoded 3D PDFs lose sub-assembly placement; a product can move a part back into place (mm).
    const off = prod.offset?.(part) ?? [0, 0, 0];
    for (let i = 0; i < p.length; i += 3) {
      // Centre, mm -> m, then the product's "front" orientation (working face up, see manifest).
      const v = rot([0, 1, 2].map((k) => (p[i + k] + off[k] - centre[k]) / 1000));
      g.pos.push(v[0], v[1], v[2]);
      if (n) { const m = rot([n[i], n[i + 1], n[i + 2]]); g.nrm.push(m[0], m[1], m[2]); }
      if (d) { g.dir.push(d[0], d[1], d[2]); g.piece.push(partIndex.get(part)); }
    }
    // Cut-away: a product may drop triangles (by centroid, source mm) to open a closed body.
    const ia = part.mesh.index.array, cut = prod.cutAway?.(part);
    for (let t = 0; t < ia.length; t += 3) {
      if (cut) {
        const c = [0, 1, 2].map((k) => (p[ia[t] * 3 + k] + p[ia[t + 1] * 3 + k] + p[ia[t + 2] * 3 + k]) / 3 + off[k]);
        if (cut(c)) continue;
      }
      g.idx.push(ia[t] + g.base, ia[t + 1] + g.base, ia[t + 2] + g.base);
    }
    g.base += p.length / 3;
    byRole.set(role, g);
  }

  // Whole assemblies (a full mill) arrive with ~1M triangles. Reduce each role's geometry on
  // positions alone first (texture seams and AO colours would otherwise pin every vertex), then
  // shade flat: liner faces are planar, so flat normals read correctly.
  if (prod.preSimplify) {
    for (const [role, g] of byRole) {
      // Take-apart models weld within each piece only (on a 0.5 mm grid), so neighbouring liners
      // never fuse and each keeps its own travel direction.
      const pieces = g.piece?.length ? g.piece : null;
      const grid = pieces ? 2000 : 20;
      const key = new Map(), P = [], D = [], remap = new Uint32Array(g.pos.length / 3);
      for (let v = 0; v < remap.length; v++) {
        const k = `${pieces ? pieces[v] + "|" : ""}${Math.round(g.pos[v * 3] * grid)},${Math.round(g.pos[v * 3 + 1] * grid)},${Math.round(g.pos[v * 3 + 2] * grid)}`;
        let n = key.get(k);
        if (n === undefined) {
          n = P.length / 3; key.set(k, n); P.push(g.pos[v * 3], g.pos[v * 3 + 1], g.pos[v * 3 + 2]);
          if (pieces) D.push(g.dir[v * 3], g.dir[v * 3 + 1], g.dir[v * 3 + 2]);
        }
        remap[v] = n;
      }
      const idx = new Uint32Array(g.idx.length);
      for (let i = 0; i < idx.length; i++) idx[i] = remap[g.idx[i]];
      const pos = new Float32Array(P);
      const ratio = typeof prod.preSimplify === "object" ? (prod.preSimplify[role] ?? prod.preSimplify.default) : prod.preSimplify;
      const target = Math.max(300, Math.floor((idx.length * ratio) / 3) * 3);
      const err = typeof prod.preSimplifyError === "object" ? (prod.preSimplifyError[role] ?? prod.preSimplifyError.default) : (prod.preSimplifyError ?? 0.01);
      let [out] = MeshoptSimplifier.simplify(idx, pos, 3, target, err, []);
      if (out.length > target * 1.5) [out] = [MeshoptSimplifier.simplifySloppy(idx, pos, 3, null, target, err)[0]];
      // Crease-aware normals on the reduced mesh: corners average the faces around their vertex
      // that lie within 35 degrees of their own face, so the shell and curved liners shade smoothly
      // while liner edges and lifter bars stay crisp (flat shading looked faceted).
      const nTri = out.length / 3, fnrm = new Float32Array(out.length);
      const around = new Map();
      for (let t = 0; t < nTri; t++) {
        const [a, b, c] = [out[t * 3], out[t * 3 + 1], out[t * 3 + 2]];
        const e1 = [0, 1, 2].map((k) => pos[b * 3 + k] - pos[a * 3 + k]), e2 = [0, 1, 2].map((k) => pos[c * 3 + k] - pos[a * 3 + k]);
        fnrm[t * 3] = e1[1] * e2[2] - e1[2] * e2[1]; fnrm[t * 3 + 1] = e1[2] * e2[0] - e1[0] * e2[2]; fnrm[t * 3 + 2] = e1[0] * e2[1] - e1[1] * e2[0];
        for (const v of [a, b, c]) (around.get(v) ?? around.set(v, []).get(v)).push(t);
      }
      const unit = (x, y, z) => { const l = Math.hypot(x, y, z) || 1; return [x / l, y / l, z / l]; };
      const crease = Math.cos((35 * Math.PI) / 180);
      const fp = [], fn = [], fi = [], fd = [];
      for (let t = 0; t < nTri; t++) {
        const own = unit(fnrm[t * 3], fnrm[t * 3 + 1], fnrm[t * 3 + 2]);
        for (let k = 0; k < 3; k++) {
          const v = out[t * 3 + k];
          let sx = 0, sy = 0, sz = 0;
          for (const u of around.get(v)) {
            const o = unit(fnrm[u * 3], fnrm[u * 3 + 1], fnrm[u * 3 + 2]);
            if (o[0] * own[0] + o[1] * own[1] + o[2] * own[2] >= crease) { sx += fnrm[u * 3]; sy += fnrm[u * 3 + 1]; sz += fnrm[u * 3 + 2]; }
          }
          let nv = unit(sx, sy, sz);
          // Revolved bodies (a mill shell around X): faces running along the axis take the true
          // radial normal, so a coarsely triangulated cylinder still shades perfectly round.
          if (prod.radialX && Math.abs(own[0]) < 0.3) {
            const r = unit(0, pos[v * 3 + 1], pos[v * 3 + 2]);
            const sgn = Math.sign(r[1] * own[1] + r[2] * own[2]) || 1;
            if (Math.abs(r[1] * own[1] + r[2] * own[2]) > 0.75) nv = [0, r[1] * sgn, r[2] * sgn];
          }
          fi.push(fp.length / 3); fp.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]); fn.push(...nv);
          if (pieces) fd.push(D[v * 3], D[v * 3 + 1], D[v * 3 + 2]);
        }
      }
      g.pos = fp; g.nrm = fn; g.idx = fi; g.dir = fd;
    }
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
    // A role may name a highlightable group: "finish:group" (the material/node is named after the full role).
    const base = finishes[role.split(":")[0]];
    if (!base) throw new Error(`No finish for role ${role}`);
    // Tiny repeated parts (e.g. Sintercast inserts) are too small for surface grain: plain finish.
    const f = prod.plainRoles?.includes(role) ? { color: base.color, metallic: base.metallic, roughness: prod.plainRoughness ?? (base.roughness === 1 ? 0.6 : base.roughness) } : base;
    const mat = doc.createMaterial(role).setBaseColorFactor([...f.color, 1]).setMetallicFactor(f.metallic).setRoughnessFactor(f.roughness).setDoubleSided(Boolean(prod.cutAway));
    if (f.normalMap) mat.setNormalTexture(texture(f.normalMap)).setNormalScale(f.normalScale ?? 1);
    if (f.mrMap) mat.setMetallicRoughnessTexture(texture(f.mrMap));
    if (f.colorMap) mat.setBaseColorTexture(texture(f.colorMap));
    // Baked AO as vertex colour (how dark a fully enclosed corner gets: the finish's aoFloor, or
    // the product's own where tiny repeated parts would otherwise shimmer).
    const ao = aoByRole.get(role);
    const floor = prod.aoFloor?.[role] ?? base.aoFloor ?? 0.28;
    let pos = g.pos, nrm = g.nrm, idx = g.idx;
    let dir = g.dir?.length ? g.dir : null;
    let col = new Float32Array(ao.length * 3);
    for (let v = 0; v < ao.length; v++) col.fill(floor + (1 - floor) * Math.pow(ao[v], 1.4), v * 3, v * 3 + 3);
    let uv = null;
    if (f.normalMap || f.mrMap || f.colorMap) {
      // Box-projected UVs (CAD meshes have none). Each triangle is projected on the one plane facing
      // it (by its face normal); a vertex shared by triangles facing different ways is split, so the
      // grain is never smeared between two projections inside a triangle (that showed as streaks).
      const tile = f.tile ?? 0.12; // metres per texture repeat
      const P = [], N = [], C = [], U = [], I = [], Dn = [];
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
            if (dir) Dn.push(dir[v * 3], dir[v * 3 + 1], dir[v * 3 + 2]);
            N.push(nrm[v * 3] ?? 0, nrm[v * 3 + 1] ?? 0, nrm[v * 3 + 2] ?? 1);
            C.push(col[v * 3], col[v * 3 + 1], col[v * 3 + 2]);
            const [u0, u1] = axis === 0 ? [pos[v * 3 + 1], pos[v * 3 + 2]] : axis === 1 ? [pos[v * 3], pos[v * 3 + 2]] : [pos[v * 3], pos[v * 3 + 1]];
            U.push(u0 / tile, u1 / tile);
          }
          I.push(n);
        }
      }
      pos = P; nrm = N; idx = I; col = new Float32Array(C); uv = new Float32Array(U);
      if (dir) dir = Dn;
    }
    const prim = doc.createPrimitive()
      .setAttribute("POSITION", doc.createAccessor().setType("VEC3").setArray(new Float32Array(pos)).setBuffer(buf))
      .setAttribute("COLOR_0", doc.createAccessor().setType("VEC3").setArray(col).setBuffer(buf))
      .setAttribute("_EXPLODE", dir ? doc.createAccessor().setType("VEC3").setArray(new Float32Array(dir)).setBuffer(buf) : null)
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
    // Take-apart models are reduced per piece above; a second pass here would merge pieces.
    ...(prod.explode ? [] : [simplify({ simplifier: MeshoptSimplifier, ratio: prod.simplify ?? 0.2, error: prod.simplifyError ?? 0.00035 })]),
    // Keep materials apart: identical finishes on different groups ("metal:shell-liners",
    // "metal:discharge") must stay separate so the site can highlight one group.
    dedup({ propertyTypes: [PropertyType.ACCESSOR, PropertyType.MESH, PropertyType.TEXTURE] }),
    prune(),
    reorder({ encoder: MeshoptEncoder }),
    meshopt({ encoder: MeshoptEncoder, level: prod.meshoptLevel ?? "medium" }),
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

/**
 * Meshes from AIA geometry decoded out of a 3D PDF (compressed PRC carries no normals; a part may
 * bring its own exact normals, e.g. the generated grinding media): each
 * part becomes an indexed mesh with crease-aware normals, so curved faces shade smoothly while
 * edges sharper than 40 degrees stay crisp. Same shape as occt-import-js output.
 */
/**
 * A binary STL (one soup of triangles, e.g. AIA's FULL MILL_ASSLY export) split back into parts:
 * vertices are welded (0.05 mm) and every connected piece becomes its own part, so the manifest
 * can drop fasteners by size as it does for STEP assemblies. Normals are left to the pipeline.
 */
function stlParts(file, place = {}) {
  // place: a sub-assembly exported in its own frame is moved into the mill's (mm): `mirrorX`
  // reflects x about that value (winding flipped so faces stay outward), `dx` shifts along x.
  const tag = place.tag ? `${place.tag}/` : "";
  const buf = fs.readFileSync(file);
  const n = buf.readUInt32LE(80);
  const key = new Map(), P = [], tri = new Uint32Array(n * 3);
  for (let t = 0; t < n; t++) for (let v = 0; v < 3; v++) {
    const o = 84 + t * 50 + 12 + v * 12;
    let x = buf.readFloatLE(o);
    const y = buf.readFloatLE(o + 4), z = buf.readFloatLE(o + 8);
    if (place.mirrorX !== undefined) x = place.mirrorX - x;
    x += place.dx ?? 0;
    const yy = y + (place.dy ?? 0), zz = z + (place.dz ?? 0);
    const k = `${Math.round(x * 20)},${Math.round(yy * 20)},${Math.round(zz * 20)}`;
    let i = key.get(k);
    if (i === undefined) { i = P.length / 3; key.set(k, i); P.push(x, yy, zz); }
    tri[t * 3 + v] = i;
  }
  if (place.mirrorX !== undefined) for (let t = 0; t < n; t++) { const a = tri[t * 3 + 1]; tri[t * 3 + 1] = tri[t * 3 + 2]; tri[t * 3 + 2] = a; }
  key.clear();
  // Union-find over shared vertices.
  const parent = new Uint32Array(P.length / 3).map((_, i) => i);
  const find = (a) => { while (parent[a] !== a) a = parent[a] = parent[parent[a]]; return a; };
  for (let t = 0; t < n; t++) {
    const a = find(tri[t * 3]);
    for (const v of [tri[t * 3 + 1], tri[t * 3 + 2]]) { const b = find(v); if (a !== b) parent[b] = a; }
  }
  const groups = new Map();
  for (let t = 0; t < n; t++) {
    const r = find(tri[t * 3]);
    (groups.get(r) ?? groups.set(r, []).get(r)).push(t);
  }
  return [...groups.values()].map((ts, gi) => {
    const local = new Map(), pos = [], idx = new Uint32Array(ts.length * 3);
    ts.forEach((t, j) => {
      for (let v = 0; v < 3; v++) {
        const g = tri[t * 3 + v];
        let l = local.get(g);
        if (l === undefined) { l = pos.length / 3; local.set(g, l); pos.push(P[g * 3], P[g * 3 + 1], P[g * 3 + 2]); }
        idx[j * 3 + v] = l;
      }
    });
    return { name: `${tag}stl-${gi}`, attributes: { position: { array: new Float32Array(pos) } }, index: { array: idx } };
  });
}

function prcMeshes(parts) {
  const crease = Math.cos((40 * Math.PI) / 180);
  return parts.map((part) => {
    const P = part.positions, T = orientTriangles(part.positions, part.tris);
    const nTri = T.length / 3;
    const fn = new Float32Array(T.length); // face normal (area-weighted) per triangle
    for (let t = 0; t < nTri; t++) {
      const [a, b, c] = [T[t * 3] * 3, T[t * 3 + 1] * 3, T[t * 3 + 2] * 3];
      const u = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]];
      const v = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]];
      fn[t * 3] = u[1] * v[2] - u[2] * v[1]; fn[t * 3 + 1] = u[2] * v[0] - u[0] * v[2]; fn[t * 3 + 2] = u[0] * v[1] - u[1] * v[0];
    }
    const around = new Map(); // vertex -> triangles using it
    for (let t = 0; t < nTri; t++) for (let k = 0; k < 3; k++) {
      const v = T[t * 3 + k];
      (around.get(v) ?? around.set(v, []).get(v)).push(t);
    }
    const unit = (x, y, z) => { const l = Math.hypot(x, y, z) || 1; return [x / l, y / l, z / l]; };
    const pos = new Float32Array(T.length * 3), nrm = new Float32Array(T.length * 3), idx = new Uint32Array(T.length);
    for (let t = 0; t < nTri; t++) {
      const own = unit(fn[t * 3], fn[t * 3 + 1], fn[t * 3 + 2]);
      for (let k = 0; k < 3; k++) {
        const v = T[t * 3 + k], o = (t * 3 + k) * 3;
        let x = 0, y = 0, z = 0;
        for (const s of around.get(v)) {
          const f = unit(fn[s * 3], fn[s * 3 + 1], fn[s * 3 + 2]);
          if (f[0] * own[0] + f[1] * own[1] + f[2] * own[2] >= crease) { x += fn[s * 3]; y += fn[s * 3 + 1]; z += fn[s * 3 + 2]; }
        }
        const n = part.normals ? [part.normals[v * 3], part.normals[v * 3 + 1], part.normals[v * 3 + 2]] : unit(x, y, z);
        pos[o] = P[v * 3]; pos[o + 1] = P[v * 3 + 1]; pos[o + 2] = P[v * 3 + 2];
        nrm[o] = n[0]; nrm[o + 1] = n[1]; nrm[o + 2] = n[2];
        idx[t * 3 + k] = t * 3 + k;
      }
    }
    return { name: part.name, attributes: { position: { array: pos }, normal: { array: nrm } }, index: { array: idx } };
  });
}

/**
 * Compressed PRC does not keep a consistent triangle winding, so the viewer culls part of every
 * surface (plates showed as thin fins with gaps). Make neighbours agree (an edge shared by two
 * triangles must run in opposite directions), then turn each connected piece outward (positive
 * signed volume). Returns a new index array.
 */
function orientTriangles(P, tris) {
  // Work on welded vertices (same point within 0.01 mm = same vertex) so edges match even when
  // the decoder repeats points; the original indices are restored at the end.
  const canon = new Map(), id = new Uint32Array(P.length / 3);
  for (let v = 0; v < id.length; v++) {
    const k = Math.round(P[v * 3] * 100) + "," + Math.round(P[v * 3 + 1] * 100) + "," + Math.round(P[v * 3 + 2] * 100);
    id[v] = canon.get(k) ?? canon.set(k, v).get(k);
  }
  const orig = Uint32Array.from(tris);
  const T = orig.map((v) => id[v]);
  const n = T.length / 3;
  const edges = new Map(); // "a,b" (a<b) -> [triangle, ...]
  const key = (a, b) => (a < b ? a + "," + b : b + "," + a);
  for (let t = 0; t < n; t++) for (let k = 0; k < 3; k++) {
    const kk = key(T[t * 3 + k], T[t * 3 + ((k + 1) % 3)]);
    (edges.get(kk) ?? edges.set(kk, []).get(kk)).push(t);
  }
  const dir = (t, a, b) => { // true if triangle t walks a -> b
    for (let k = 0; k < 3; k++) if (T[t * 3 + k] === a && T[t * 3 + ((k + 1) % 3)] === b) return true;
    return false;
  };
  const flip = (t) => { const x = T[t * 3 + 1]; T[t * 3 + 1] = T[t * 3 + 2]; T[t * 3 + 2] = x; };
  const seen = new Uint8Array(n);
  for (let s0 = 0; s0 < n; s0++) {
    if (seen[s0]) continue;
    const comp = [s0]; seen[s0] = 1;
    for (let q = 0; q < comp.length; q++) {
      const t = comp[q];
      for (let k = 0; k < 3; k++) {
        const a = T[t * 3 + k], b = T[t * 3 + ((k + 1) % 3)];
        for (const u of edges.get(key(a, b))) {
          if (u === t || seen[u]) continue;
          if (dir(u, a, b)) flip(u); // neighbour walks the same way: flip it to agree
          seen[u] = 1; comp.push(u);
        }
      }
    }
    let vol = 0; // signed volume of this piece; negative = inside-out
    for (const t of comp) {
      const [a, b, c] = [T[t * 3] * 3, T[t * 3 + 1] * 3, T[t * 3 + 2] * 3];
      vol += P[a] * (P[b + 1] * P[c + 2] - P[b + 2] * P[c + 1]) - P[a + 1] * (P[b] * P[c + 2] - P[b + 2] * P[c]) + P[a + 2] * (P[b] * P[c + 1] - P[b + 1] * P[c]);
    }
    if (vol < 0) for (const t of comp) flip(t);
  }
  // Same triangles as the input, now in the agreed winding, on the original vertex indices.
  const out = new Uint32Array(T.length);
  for (let t = 0; t < n; t++) {
    const a = orig[t * 3], b = orig[t * 3 + 1], c = orig[t * 3 + 2];
    const flipped = id[b] === T[t * 3 + 2] && id[c] === T[t * 3 + 1] && id[b] !== id[c];
    out[t * 3] = a; out[t * 3 + 1] = flipped ? c : b; out[t * 3 + 2] = flipped ? b : c;
  }
  return out;
}

/**
 * Flatten raised markings modelled on a surface extruded along Z (its height Y depends on X only):
 * every vertex of brep faces [from..to] is moved onto that surface's profile, so the letters collapse
 * into it and the surface reads clean. `onto` is the brep face index of the surface.
 */
function flattenFaces(mesh, opts) {
  if (opts.axis !== undefined) return flattenOnPlane(mesh, opts);
  const { from, to, onto } = opts;
  const P = mesh.attributes.position.array, I = mesh.index.array, F = mesh.brep_faces;
  const prof = [];
  for (let t = F[onto].first; t <= F[onto].last; t++) for (let c = 0; c < 3; c++) {
    const v = I[t * 3 + c];
    prof.push([P[v * 3], P[v * 3 + 1]]);
  }
  prof.sort((a, b) => a[0] - b[0]);
  const heightAt = (x) => {
    let lo = prof[0], hi = prof[prof.length - 1];
    for (const p of prof) { if (p[0] <= x) lo = p; else { hi = p; break; } }
    return hi[0] === lo[0] ? lo[1] : lo[1] + ((x - lo[0]) / (hi[0] - lo[0])) * (hi[1] - lo[1]);
  };
  const N = mesh.attributes.normal?.array;
  // Surface normal near the markings (the face is near-flat across the narrow marking area).
  let n0 = null;
  if (N) {
    const cx = (() => { let a = 0, c = 0; for (let k = from; k <= to; k++) for (let t = F[k].first; t <= F[k].last; t++) { a += P[I[t * 3] * 3]; c++; } return a / c; })();
    let best = Infinity;
    for (let t = F[onto].first; t <= F[onto].last; t++) for (let c = 0; c < 3; c++) {
      const v = I[t * 3 + c], d = Math.abs(P[v * 3] - cx);
      if (d < best) { best = d; n0 = [N[v * 3], N[v * 3 + 1], N[v * 3 + 2]]; }
    }
  }
  const moved = new Set();
  for (let k = from; k <= to; k++) for (let t = F[k].first; t <= F[k].last; t++) for (let c = 0; c < 3; c++) {
    const v = I[t * 3 + c];
    if (moved.has(v)) continue;
    moved.add(v);
    P[v * 3 + 1] = heightAt(P[v * 3]);
    // Take the surface's normal too, so no shading ghost of the letters remains.
    if (N && n0) { N[v * 3] = n0[0]; N[v * 3 + 1] = n0[1]; N[v * 3 + 2] = n0[2]; }
  }
}

/**
 * Flatten raised markings standing on a flat face perpendicular to an axis: every vertex of brep
 * faces [from..to] gets that axis coordinate set to the markings' base (their lowest point along
 * the axis, the face they stand on), and the face's normal, so they vanish into it.
 */
function flattenOnPlane(mesh, { from, to, axis }) {
  const P = mesh.attributes.position.array, I = mesh.index.array, F = mesh.brep_faces;
  const N = mesh.attributes.normal?.array;
  const verts = new Set();
  for (let k = from; k <= to; k++) for (let t = F[k].first; t <= F[k].last; t++) for (let c = 0; c < 3; c++) verts.add(I[t * 3 + c]);
  let lo = Infinity, hi = -Infinity;
  for (const v of verts) { lo = Math.min(lo, P[v * 3 + axis]); hi = Math.max(hi, P[v * 3 + axis]); }
  const n = [0, 0, 0]; n[axis] = 1; // raised towards +axis: the base face faces +axis
  for (const v of verts) {
    P[v * 3 + axis] = lo;
    if (N) { N[v * 3] = n[0]; N[v * 3 + 1] = n[1]; N[v * 3 + 2] = n[2]; }
  }
  void hi;
}
