// Render a transparent WebP still of every catalog model (shown instantly while the 3D loads, and
// instead of 3D on devices without a GPU). Needs: python -m http.server 8765 from the repo root.
// Usage: node scripts/cad/posters.mjs
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";


const ids = fs.readdirSync("public/models/catalog").filter((f) => f.endsWith(".glb")).map((f) => f.slice(0, -4));
const b = await chromium.launch({ args: ["--enable-gpu", "--use-angle=d3d11", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
for (const id of ids) {
  await p.goto(`http://127.0.0.1:8765/scripts/cad/poster.html?m=${id}`);
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
