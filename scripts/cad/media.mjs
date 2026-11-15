// Hi-Cr grinding media as real 3D: a settled heap of balls at the sizes AIA publishes
// (aiaengineering.com: Mining/Cement "Size: 12.5mm – 100mm", Thermal "Size: 20 mm – 80 mm").
// AIA's STEP matrix lists grinding media as "NA" (no CAD) — balls are plain spheres, so this is exact.
import fs from "node:fs";
import { Document, NodeIO } from "@gltf-transform/core";
import { KHRMeshQuantization, EXTMeshoptCompression } from "@gltf-transform/extensions";
import { reorder, meshopt, dedup, prune } from "@gltf-transform/functions";
import { MeshoptEncoder } from "meshoptimizer";
import { finishes } from "./materials.mjs";

await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions([KHRMeshQuantization, EXTMeshoptCompression]).registerDependencies({ "meshopt.encoder": MeshoptEncoder });

function sphere(seg = 40, rings = 28) {
  const pos = [], nrm = [], idx = [];
  for (let y = 0; y <= rings; y++) {
    const v = y / rings, th = v * Math.PI;
    for (let x = 0; x <= seg; x++) {
      const u = x / seg, ph = u * Math.PI * 2;
      const nx = Math.sin(th) * Math.cos(ph), ny = Math.cos(th), nz = Math.sin(th) * Math.sin(ph);
      pos.push(nx, ny, nz); nrm.push(nx, ny, nz);
    }
  }
  for (let y = 0; y < rings; y++) for (let x = 0; x < seg; x++) {
    const a = y * (seg + 1) + x, b = a + seg + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  return { pos, nrm, idx };
}

// Deterministic heap: balls dropped on a disc, each resting on the floor or on earlier balls.
function heap(sizesMm, count, seed) {
  let s = seed; const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const balls = [];
  for (let i = 0; i < count; i++) {
    const r = sizesMm[Math.floor(rand() * sizesMm.length)] / 2000; // mm diameter → m radius
    const ang = rand() * Math.PI * 2, rad = Math.sqrt(rand()) * 0.3;
    const x = Math.cos(ang) * rad, z = Math.sin(ang) * rad;
    let y = r;
    for (const b of balls) {
      const d2 = (x - b.x) ** 2 + (z - b.z) ** 2, rr = r + b.r;
      if (d2 < rr * rr) y = Math.max(y, b.y + Math.sqrt(rr * rr - d2));
    }
    balls.push({ x, y, z, r });
  }
  return balls;
}

for (const [id, sizes, seed] of [
  ["media-hi-cr-up-to-30cr", [100, 80, 60, 40, 25, 12.5], 7],
  ["media-hi-cr-up-to-18cr", [80, 60, 40, 25, 20], 11],
]) {
  const unit = sphere();
  const balls = heap(sizes, 38, seed);
  const pos = [], nrm = [], idx = [];
  for (const b of balls) {
    const base = pos.length / 3;
    for (let i = 0; i < unit.pos.length; i += 3) {
      pos.push(b.x + unit.pos[i] * b.r, b.y + unit.pos[i + 1] * b.r, b.z + unit.pos[i + 2] * b.r);
      nrm.push(unit.nrm[i], unit.nrm[i + 1], unit.nrm[i + 2]);
    }
    for (const k of unit.idx) idx.push(k + base);
  }
  const doc = new Document(); const buf = doc.createBuffer(); const f = finishes.hicr;
  const mat = doc.createMaterial("hicr").setBaseColorFactor([...f.color, 1]).setMetallicFactor(f.metallic).setRoughnessFactor(f.roughness);
  const prim = doc.createPrimitive()
    .setAttribute("POSITION", doc.createAccessor().setType("VEC3").setArray(new Float32Array(pos)).setBuffer(buf))
    .setAttribute("NORMAL", doc.createAccessor().setType("VEC3").setArray(new Float32Array(nrm)).setBuffer(buf))
    .setIndices(doc.createAccessor().setType("SCALAR").setArray(new Uint32Array(idx)).setBuffer(buf))
    .setMaterial(mat);
  doc.createScene(id).addChild(doc.createNode(id).setMesh(doc.createMesh("media").addPrimitive(prim)));
  doc.getRoot().getAsset().generator = "AIA local CAD pipeline (procedural grinding media)";
  await doc.transform(dedup(), prune(), reorder({ encoder: MeshoptEncoder }), meshopt({ encoder: MeshoptEncoder, level: "medium" }));
  const file = `public/models/catalog/${id}.glb`;
  await io.write(file, doc);
  console.log(id, Math.round(fs.statSync(file).size / 1024) + " KB", balls.length + " balls");
}
