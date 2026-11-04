import type { Article } from "@/content/types";

/** News posts from the live site. Insights are added as the content team publishes them. */
export const articles: Article[] = [
  {
    slug: "annual-report-2025-2026",
    kind: "news",
    title: "Annual Report 2025-26",
    summary: "AIA Engineering Limited has published its Annual Report for the financial year 2025-26.",
    body: [
      "The Annual Report for the financial year 2025-26 is available in the Investors section, together with the reports of earlier years.",
    ],
    image: { src: "/images/insight-1.jpg", alt: "" },
    publishedAt: "2026-09-09",
    status: "draft",
  },
  {
    slug: "annual-report-2024",
    kind: "news",
    title: "Annual Report 2024",
    summary: "AIA Engineering Limited has published its Annual Report for 2024.",
    body: ["The Annual Report is available in the Investors section under Reports & Presentations."],
    image: { src: "/images/insight-2.jpg", alt: "" },
    publishedAt: "2026-03-02",
    status: "draft",
  },
];
