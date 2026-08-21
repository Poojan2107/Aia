import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "qa");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function captureTheme(theme) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const url =
    theme === "blue"
      ? "http://127.0.0.1:3000/?theme=blue"
      : "http://127.0.0.1:3000/";
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outDir, `hero-${theme}.png`) });

  await page.locator("#solutions").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, `industries-${theme}.png`) });

  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator("footer").screenshot({
    path: path.join(outDir, `footer-${theme}.png`),
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  await page.click('button[aria-controls="mega-menu"]');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, `menu-${theme}.png`) });
  await page.close();
}

await captureTheme("orange");
await captureTheme("blue");
await browser.close();
console.log("ok", outDir);
