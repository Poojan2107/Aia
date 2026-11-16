// Render a transparent WebP still of every catalog model (shown instantly while the 3D loads, and
// instead of 3D on devices without a GPU). Needs: python -m http.server 8765 from the repo root.
// Usage: node scripts/cad/posters.mjs
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";


// Usage: node scripts/cad/posters.mjs [id ...]  (no ids: every model)
// Products with their own camera framing; keep in sync with orbit/target in src/data/moc-catalog.ts.
const views = {
  "mining-sintercast-verti-mill-liners": { orbit: "-20deg 76deg 70%", target: "0m -1.7m 0m" },
  "quarry-sintercast-hammer": { orbit: "35deg 68deg 128%" },
  "grinding-media-hicr": { orbit: "0deg 86deg 76%", shadow: "0.35", fov: "10deg" },
};
const only = process.argv.slice(2);
const ids = fs.readdirSync("public/models/catalog").filter((f) => f.endsWith(".glb")).map((f) => f.slice(0, -4)).filter((id) => !only.length || only.includes(id));
const b = await chromium.launch({ args: ["--enable-gpu", "--use-angle=d3d11", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
for (const id of ids) {
  // Same framing as the site for products with their own view (src/data/moc-catalog.ts).
  const view = new URLSearchParams({ m: id, ...(views[id] ?? {}) });
  await p.goto(`http://127.0.0.1:8765/scripts/cad/poster.html?${view}`);
  await p.waitForFunction(() => window.__done, null, { timeout: 60000 });
  await p.waitForTimeout(200);
  const png = `public/models/catalog/${id}.poster.png`;
  await (await p.$("model-viewer")).screenshot({ path: png, omitBackground: true });
  const webp = png.replace(".png", ".webp");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", png, "-c:v", "libwebp", "-quality", "86", "-lossless", "0", webp]);
  fs.unlinkSync(png);
  console.log(id, (await p.title()) || "ok", Math.round(fs.statSync(webp).size / 1024) + " KB");
}
await b.close();
