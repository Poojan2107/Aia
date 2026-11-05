import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const browser = await chromium.launch();
const page = await browser.newPage();

async function cleanLogo(inputPath, outputPath) {
  const fileBuffer = await fs.readFile(inputPath);
  const base64 = fileBuffer.toString("base64");
  const dataUrl = `data:image/png;base64,${base64}`;

  const cleanDataUrl = await page.evaluate(async (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;

          // If it's dark background, make it transparent
          if (brightness < 35) {
            data[i + 3] = 0;
          } else {
            // Smooth edge anti-aliasing
            if (brightness < 80) {
              data[i + 3] = Math.round(((brightness - 35) / 45) * 255);
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = url;
    });
  }, dataUrl);

  const buffer = Buffer.from(cleanDataUrl.split(",")[1], "base64");
  await fs.writeFile(outputPath, buffer);
  console.log(`Created clean transparent logo: ${outputPath}`);
}

await cleanLogo(
  path.join(process.cwd(), "public/images/logo-aia.png"),
  path.join(process.cwd(), "public/images/logo-aia-clean.png")
);

await cleanLogo(
  path.join(process.cwd(), "public/images/logo-vega.png"),
  path.join(process.cwd(), "public/images/logo-vega-clean.png")
);

await browser.close();
