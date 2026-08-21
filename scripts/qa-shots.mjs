import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "qa");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(outDir, "hero-desktop.png") });

await page.locator("#solutions").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(outDir, "industries-desktop.png") });

const footer = page.locator("footer");
await footer.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await footer.screenshot({ path: path.join(outDir, "footer-desktop.png") });

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.click('button[aria-controls="mega-menu"]');
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(outDir, "menu-desktop.png") });
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(outDir, "hero-mobile.png") });

await page.click('button[aria-controls="mega-menu"]');
await page.waitForTimeout(700);
await page.screenshot({ path: path.join(outDir, "menu-mobile.png") });
await page.keyboard.press("Escape");
await page.waitForTimeout(300);

await page.locator("footer").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.locator("footer").screenshot({ path: path.join(outDir, "footer-mobile.png") });

await browser.close();
console.log("ok", outDir);
