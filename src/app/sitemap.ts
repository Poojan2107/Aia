import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absolute } from "@/lib/seo";
import { caseStudies } from "@/content/knowledge/case-studies";
import { articles } from "@/content/knowledge/articles";
import { jobs } from "@/content/careers/jobs";

const caseStudyDates = new Map(caseStudies.map((c) => [c.slug, c.publishedAt]));
const articleDates = new Map(articles.map((a) => [a.slug, a.publishedAt]));
const jobDates = new Map(jobs.map((j) => [j.slug, j.postedAt]));

function getModifiedDate(routeId: string): Date {
  if (routeId.startsWith("case:")) {
    const slug = routeId.split(":")[1];
    const date = caseStudyDates.get(slug);
    if (date) return new Date(`${date}T00:00:00Z`);
  }
  if (routeId.startsWith("article:")) {
    const slug = routeId.split(":")[1];
    const date = articleDates.get(slug);
    if (date) return new Date(`${date}T00:00:00Z`);
  }
  if (routeId.startsWith("job:")) {
    const slug = routeId.split(":")[1];
    const date = jobDates.get(slug);
    if (date) return new Date(`${date}T00:00:00Z`);
  }
  return new Date("2026-11-04T00:00:00Z");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = allRoutes().filter((entry) => entry.indexable !== false);

  return routes.map((route) => {
    const isHome = route.path === "/";
    const isPrimary = route.pillar === "solutions" || route.pillar === "company";

    return {
      url: absolute(route.path),
      lastModified: getModifiedDate(route.id),
      changeFrequency: isHome ? "daily" : isPrimary ? "weekly" : "monthly",
      priority: isHome ? 1.0 : isPrimary ? 0.8 : 0.6,
    };
  });
}
