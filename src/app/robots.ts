import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: sitemapUrl,
    };
  }

  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
    ],
    sitemap: sitemapUrl,
  };
}
