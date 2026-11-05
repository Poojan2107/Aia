import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";

const out = path.join(process.cwd(), "public/qa/pixel");
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true });

// 1. Laptop viewport (1440x900)
const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page1440.emulateMedia({ reducedMotion: "no-preference" });
await page1440.goto("http://localhost:3000/?theme=orange", { waitUntil: "domcontentloaded" });
await page1440.waitForTimeout(1500);
await page1440.addStyleTag({
  content: "[data-aia-theme-toggle],[data-aia-assist]{opacity:0!important;pointer-events:none!important}",
});
await page1440.screenshot({ path: path.join(out, "ours-hero-1440.png") });

// 2. Full desktop viewport (1920x1080)
const page1920 = await browser.newPage({ viewport: { width: 1919, height: 1079 } });
await page1920.emulateMedia({ reducedMotion: "no-preference" });
await page1920.goto("http://localhost:3000/?theme=orange", { waitUntil: "domcontentloaded" });
await page1920.waitForTimeout(1500);
await page1920.addStyleTag({
  content: "[data-aia-theme-toggle],[data-aia-assist]{opacity:0!important;pointer-events:none!important}",
});
await page1920.screenshot({ path: path.join(out, "ours-hero-1920.png") });

await browser.close();
console.log("Hero screenshots captured at 1440 and 1920!");
