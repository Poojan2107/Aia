import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";

const out = path.join(process.cwd(), "public/qa/pixel");
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1919, height: 1079 } });
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.goto("http://127.0.0.1:3000/", {
  waitUntil: "domcontentloaded",
});
await page.waitForTimeout(1500);

await page.addStyleTag({
  content:
    "[data-aia-theme-toggle],[data-aia-assist]{opacity:0!important;pointer-events:none!important}",
});

const inds = [
  { id: "mining", p: 0.05 },
  { id: "cement", p: 0.32 },
  { id: "quarry", p: 0.58 },
  { id: "thermal", p: 0.85 },
];

const track = page.locator(".industry-stack").first();
const box = await track.boundingBox();

for (const item of inds) {
  if (box) {
    const scrollY = box.y + page.viewportSize().height * 0.1 + (box.height - 1080) * item.p;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(out, `ours-ind-${item.id}.png`) });
  }
}

await browser.close();
console.log("All industries captured!");
