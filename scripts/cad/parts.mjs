// Local, offline: list every part of an AIA STEP file with its size, to assign material roles.
import fs from "node:fs";
import occtimportjs from "occt-import-js";
const occt = await occtimportjs();
const res = occt.ReadStepFile(new Uint8Array(fs.readFileSync(process.argv[2])), { linearUnit: "millimeter", linearDeflectionType: "bounding_box_ratio", linearDeflection: 0.002, angularDeflection: 0.6 });
const groups = new Map();
res.meshes.forEach((m, i) => {
  const p = m.attributes.position.array; const b = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  for (let j = 0; j < p.length; j += 3) for (let k = 0; k < 3; k++) { b[k] = Math.min(b[k], p[j + k]); b[k + 3] = Math.max(b[k + 3], p[j + k]); }
  const dims = [b[3] - b[0], b[4] - b[1], b[5] - b[2]].map((v) => Math.round(v)).sort((a, b) => b - a).join("x");
  const key = `${m.name || "(unnamed)"} ${dims}mm color=${JSON.stringify(m.color?.map((c) => +c.toFixed(2)) ?? null)}`;
  const g = groups.get(key) ?? { n: 0, tris: 0, idx: [] }; g.n++; g.tris += m.index.array.length / 3; g.idx.push(i); groups.set(key, g);
});
for (const [k, g] of groups) console.log(`${String(g.n).padStart(3)} × ${k}  tris=${g.tris}  meshes=${g.idx.slice(0, 6).join(",")}${g.idx.length > 6 ? "…" : ""}`);
