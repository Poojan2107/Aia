import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { localSource } from "@/lib/cms/local";
import { allRoutes, routeByPath } from "@/lib/routes";
import { contentPages, hubHeroes } from "@/content/pages";
import { investorPages } from "@/content/investors";
import { navTargets } from "@/data/nav";

type Found = { trail: string; value: unknown };

/** Every value in a content tree, with the key path that led to it. */
function walk(node: unknown, trail = "", out: Found[] = []): Found[] {
  out.push({ trail, value: node });
  if (Array.isArray(node)) node.forEach((child, i) => walk(child, `${trail}[${i}]`, out));
  else if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node)) walk(child, trail ? `${trail}.${key}` : key, out);
  }
  return out;
}

async function everything() {
  const s = localSource;
  return {
    contentPages,
    hubHeroes,
    investorPages,
    products: await Promise.all(["mining-products", "cement-products", "quarry-products", "thermal-power-products"].map((id) => s.industryProducts(id))),
    services: await Promise.all(["mining-services", "cement-services", "thermal-power-services"].map((id) => s.industryServices(id))),
    solutions: await Promise.all(["cement", "thermal-power"].map((id) => s.industrySolutions(id))),
    directors: await s.directors(),
    caseStudies: await s.caseStudies(),
    articles: await s.articles(),
    jobs: await s.jobs(),
    csr: await s.csrInitiatives(),
    media: await s.mediaItems(),
  };
}

const isImage = (v: unknown): v is { src: string; alt?: unknown } =>
  Boolean(v && typeof v === "object" && "src" in v && typeof (v as { src: unknown }).src === "string");

describe("content integrity", () => {
  it("every image has alt text, and product/service/solution images are described", async () => {
    const missing: string[] = [];
    for (const { trail, value } of walk(await everything())) {
      if (!isImage(value)) continue;
      if (typeof value.alt !== "string") missing.push(`${trail}: no alt`);
      else if (!value.alt.trim() && /(\.(products|services|areas)\[\d+\]|^caseStudies\[\d+\])\.image$/.test(trail)) missing.push(`${trail}: empty alt`);
    }
    expect(missing).toEqual([]);
  });

  it("every local image file exists in /public", async () => {
    const absent = walk(await everything())
      .filter(({ value }) => isImage(value) && value.src.startsWith("/"))
      .map(({ trail, value }) => ({ trail, src: (value as { src: string }).src }))
      .filter(({ src }) => !existsSync(path.join(process.cwd(), "public", src)));
    expect(absent).toEqual([]);
  });

  it("every internal link in content and navigation points to a registered page", async () => {
    const hrefs = [
      ...walk(await everything())
        .filter(({ trail, value }) => /href$/i.test(trail) && typeof value === "string")
        .map(({ trail, value }) => ({ trail, href: value as string })),
      ...navTargets().map((href) => ({ trail: "nav", href })),
    ];
    const broken = hrefs
      .filter(({ href }) => href.startsWith("/"))
      .filter(({ href }) => !routeByPath(href.split(/[?#]/)[0] ?? "/"));
    expect(broken).toEqual([]);
  });

  it("every registered page has content for its template", async () => {
    const lookups: Record<string, (id: string) => Promise<unknown>> = {
      hub: (id) => localSource.hubHero(id),
      content: (id) => localSource.contentPage(id),
      legal: (id) => localSource.contentPage(id),
      "industry-products": (id) => localSource.industryProducts(id),
      "industry-services": (id) => localSource.industryServices(id),
      "industry-solutions": (id) => localSource.industrySolutions(id),
      investor: (id) => localSource.investorPage(id),
    };
    const missing: string[] = [];
    for (const route of allRoutes()) {
      const lookup = lookups[route.template];
      if (lookup && !(await lookup(route.id))) missing.push(`${route.id} (${route.template})`);
    }
    expect(missing).toEqual([]);
  });

  it("paths are unique and lower-case", () => {
    const paths = allRoutes().map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.filter((p) => p !== p.toLowerCase())).toEqual([]);
  });
});
