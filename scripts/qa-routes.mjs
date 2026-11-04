#!/usr/bin/env node
/**
 * Technical QA over every page in sitemap.xml against a running server:
 *  - HTTP 200, no console errors or failed requests
 *  - no horizontal overflow at 375 px and 1440 px
 *  - axe-core: zero serious or critical WCAG 2.2 A/AA violations
 *    (colour contrast and target size are reported as design warnings, not
 *    failures, because the visual design is being replaced)
 *
 * Usage: BASE_URL=http://localhost:3000 node scripts/qa-routes.mjs
 * Exit code 1 if any page fails. Report: qa/routes-report.json
 */
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const WIDTHS = [375, 1440];
const DESIGN_RULES = new Set(["color-contrast", "target-size"]);

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!paths.length) throw new Error(`No URLs found in ${BASE}/sitemap.xml`);

const browser = await chromium.launch();
const results = [];

for (const path of paths) {
  const issues = [];
  const design = [];
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    page.on("console", (msg) => msg.type() === "error" && issues.push(`[${width}] console: ${msg.text().slice(0, 160)}`));
    page.on("requestfailed", (req) => {
      // Media streams are aborted on navigation; that is not a failure.
      if (!/\.(mp4|webm)(\?|$)/.test(req.url())) issues.push(`[${width}] request failed: ${req.url()}`);
    });

    // "load", not "networkidle": ambient videos keep streaming on some pages.
    const response = await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 60000 }).catch((err) => {
      issues.push(`[${width}] navigation failed: ${err.message.split("\n")[0]}`);
      return null;
    });
    if (!response) {
      await context.close();
      continue;
    }
    if (response.status() !== 200) issues.push(`[${width}] status ${response.status()}`);
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) issues.push(`[${width}] horizontal overflow ${overflow}px`);

    if (width === 1440) {
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      for (const v of axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical")) {
        const target = DESIGN_RULES.has(v.id) ? design : issues;
        target.push(`axe ${v.impact}: ${v.id} (${v.nodes.length}) ${v.help}`);
      }
    }
    await context.close();
  }
  results.push({ path, issues, design });
  console.log(`${issues.length ? "FAIL" : "ok  "} ${path}${issues.length ? `\n      ${issues.join("\n      ")}` : ""}`);
}

await browser.close();
await mkdir("qa", { recursive: true });
await writeFile("qa/routes-report.json", JSON.stringify(results, null, 2));
const failed = results.filter((r) => r.issues.length);
console.log(`\n${paths.length - failed.length}/${paths.length} pages clean. Report: qa/routes-report.json`);
process.exit(failed.length ? 1 : 0);
