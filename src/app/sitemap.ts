import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = [
    "",
    "/solutions/mining",
    "/solutions/cement",
    "/solutions/quarry",
    "/solutions/thermal",
    "/services",
    "/company/about",
    "/company/contact",
    "/resources",
    "/resources/case-studies",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
