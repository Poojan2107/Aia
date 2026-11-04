#!/usr/bin/env node
/**
 * Shrinks oversized source images in public/images so the container, the
 * image optimiser and the first visitor don't pay for print-resolution files.
 *
 * - Caps width at 2560 px (largest next/image deviceSize is 1920; 2560 covers 1.33x).
 * - Re-encodes in the same format and filename, so no reference changes:
 *   JPEG (mozjpeg q82), PNG (lossless, max compression), WebP (q82).
 * - Only rewrites a file when the result is at least 10% smaller.
 *
 * Usage: node scripts/optimize-images.mjs          (dry run, prints savings)
 *        node scripts/optimize-images.mjs --write  (rewrites files in place)
 *
 * Final production media belongs on S3 + CloudFront (NEXT_PUBLIC_MEDIA_URL);
 * this keeps the interim in-repo assets reasonable.
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..", "public", "images");
const MAX_WIDTH = 2560;
const MIN_BYTES = 400 * 1024;
const write = process.argv.includes("--write");

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

function encoder(pipeline, ext) {
  if (ext === ".png") return pipeline.png({ compressionLevel: 9, effort: 10 });
  if (ext === ".webp") return pipeline.webp({ quality: 82, effort: 6 });
  return pipeline.jpeg({ quality: 82, mozjpeg: true });
}

let before = 0;
let after = 0;
for await (const file of files(ROOT)) {
  const { size } = await stat(file);
  if (size < MIN_BYTES) continue;
  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  const pipeline = sharp(input).rotate().resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true });
  const output = await encoder(pipeline, path.extname(file).toLowerCase()).toBuffer();
  if (output.length > size * 0.9) continue;

  before += size;
  after += output.length;
  const rel = path.relative(ROOT, file);
  console.log(`${rel.padEnd(42)} ${(size / 1e6).toFixed(1).padStart(6)} MB -> ${(output.length / 1e6).toFixed(1).padStart(5)} MB  (${meta.width}px)`);
  if (write) await writeFile(file, output);
}

console.log(`\n${write ? "Saved" : "Would save"} ${((before - after) / 1e6).toFixed(1)} MB (${(before / 1e6).toFixed(1)} -> ${(after / 1e6).toFixed(1)} MB)`);
