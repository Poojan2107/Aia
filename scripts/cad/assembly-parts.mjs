// Local, offline: open a large AIA STEP assembly and summarise its named parts (first instance each).
// Usage: node --max-old-space-size=8192 scripts/cad/assembly-parts.mjs "<assembly.STEP>"
import fs from "node:fs";
import occtimportjs from "occt-import-js";
const occt = await occtimportjs();
const t0 = Date.now();
const res = occt.ReadStepFile(new Uint8Array(fs.readFileSync(process.argv[2])), {
  linearUnit: "millimeter", linearDeflectionType: "bounding_box_ratio", linearDeflection: 0.01, angularDeflection: 1.0,
});
console.log("read", res.success, "in", Date.now() - t0, "ms; meshes", res.meshes.length);
const seen = new Map();
const walk = (n, path) => {
  const name = n.name || "";
  for (const mi of n.meshes || []) {
    const m = res.meshes[mi]; const p = m.attributes.position.array;
    const b = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
    for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { b[k] = Math.min(b[k], p[i + k]); b[k + 3] = Math.max(b[k + 3], p[i + k]); }
    const dims = [b[3] - b[0], b[4] - b[1], b[5] - b[2]].map(Math.round).sort((a, c) => c - a).join("x");
    const key = name || path;
    const s = seen.get(key) ?? { count: 0, dims, tris: m.index.array.length / 3, path: path + "/" + name };
    s.count++; seen.set(key, s);
  }
  (n.children || []).forEach((c) => walk(c, path + "/" + name));
};
walk(res.root, "");
for (const [k, s] of [...seen].sort((a, b) => a[0].localeCompare(b[0]))) console.log(`${String(s.count).padStart(4)} × ${k.padEnd(28)} ${s.dims.padEnd(18)} tris=${s.tris}`);
