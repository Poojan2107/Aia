import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "qa");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function shot(page, name) {
  await page.waitForTimeout(350);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: false,
  });
}

async function captureTheme(theme, viewport) {
  const page = await browser.newPage({ viewport });
  const base =
    theme === "blue"
      ? "http://127.0.0.1:3000/?theme=blue"
      : "http://127.0.0.1:3000/";
  const tag = `${theme}-${viewport.width}`;

  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await shot(page, `hero-${tag}`);

  for (const sel of [
    ["#solutions", "industries"],
    ["footer", "footer"],
  ]) {
    await page.locator(sel[0]).first().scrollIntoViewIfNeeded();
    await shot(page, `${sel[1]}-${tag}`);
  }

  // Mid-page: about heading
  const about = page.getByRole("heading", { name: "About", exact: true });
  if (await about.count()) {
    await about.first().scrollIntoViewIfNeeded();
    await shot(page, `about-${tag}`);
  }

  const sustain = page.getByRole("heading", {
    name: /heavy industry think lighter/i,
  });
  if (await sustain.count()) {
    await sustain.first().scrollIntoViewIfNeeded();
    await shot(page, `sustain-${tag}`);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.click('button[aria-controls="mega-menu"]');
  await page.waitForTimeout(700);
  await shot(page, `menu-${tag}`);
  await page.keyboard.press("Escape");
  await page.close();
}

for (const theme of ["orange", "blue"]) {
  await captureTheme(theme, { width: 1440, height: 900 });
  await captureTheme(theme, { width: 390, height: 844 });
}

// Smoke: interior route
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await page.goto("http://127.0.0.1:3000/company/about", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(500);
  await shot(page, "interior-about");
  console.log("interior status", res?.status());
  await page.close();
}

await browser.close();
console.log("ok", outDir);
