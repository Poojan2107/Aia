import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
