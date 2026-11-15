// Local, offline: read an AIA STEP file with OpenCascade (WASM) and print its structure.
// Usage: node scripts/cad/inspect-step.mjs "<path to .STEP>"
import fs from "node:fs";
import occtimportjs from "occt-import-js";

const file = process.argv[2];
const occt = await occtimportjs();
const t0 = Date.now();
const res = occt.ReadStepFile(new Uint8Array(fs.readFileSync(file)), {
  linearUnit: "millimeter",
  linearDeflectionType: "bounding_box_ratio",
  linearDeflection: 0.001,
  angularDeflection: 0.5,
});
if (!res.success) throw new Error("STEP read failed");
let tris = 0;
const box = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
for (const m of res.meshes) {
  const p = m.attributes.position.array;
  tris += m.index.array.length / 3;
  for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { box[k] = Math.min(box[k], p[i + k]); box[k + 3] = Math.max(box[k + 3], p[i + k]); }
}
const walk = (n, d = 0) => { console.log("  ".repeat(d) + "- " + (n.name || "(node)") + (n.meshes?.length ? ` [meshes ${n.meshes.join(",")}]` : "")); (n.children || []).forEach((c) => walk(c, d + 1)); };
console.log(`read in ${Date.now() - t0} ms · meshes ${res.meshes.length} · triangles ${tris}`);
console.log(`size mm: ${(box[3] - box[0]).toFixed(0)} x ${(box[4] - box[1]).toFixed(0)} x ${(box[5] - box[2]).toFixed(0)}`);
res.meshes.slice(0, 12).forEach((m, i) => console.log(`  mesh ${i}: "${m.name}" color=${JSON.stringify(m.color ?? null)} tris=${m.index.array.length / 3}`));
walk(res.root);
