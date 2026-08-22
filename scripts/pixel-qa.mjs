import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "public", "qa", "pixel");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1919, height: 1079 } });
await page.goto("http://127.0.0.1:3000/?theme=orange", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(900);
await page.addStyleTag({
  content:
    "[data-aia-theme-toggle],[data-aia-assist]{opacity:0!important;pointer-events:none!important}",
});

await page.screenshot({ path: path.join(out, "ours-00-hero.png") });

const shots = [
  ["#what-we-solve", "01-wws"],
  ["#solutions", "02-industries"],
  ['[aria-labelledby="services-heading"]', "03-services"],
  ['[aria-labelledby="tech-heading"]', "04-tech"],
  ['[aria-labelledby="about-heading"]', "05-about"],
  ['[aria-labelledby="map-heading"]', "06-map"],
  ['[aria-labelledby="vision-heading"]', "07-vision"],
  ['[aria-labelledby="gallery-heading"]', "08-gallery"],
  ['[aria-labelledby="cases-heading"]', "09-cases"],
  ['[aria-labelledby="sustain-heading"]', "10-sustain"],
  ['[aria-labelledby="faq-heading"]', "11-faq"],
  ['[aria-labelledby="insights-heading"]', "12-insights"],
  ["footer", "13-footer"],
];

for (const [sel, name] of shots) {
  const loc = page.locator(sel).first();
  if ((await loc.count()) === 0) continue;
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(out, `ours-${name}.png`) });
}

await browser.close();
console.log("ok", out);
