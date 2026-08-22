import type { Metadata } from "next";
import { InteriorPage } from "@/components/layout/InteriorPage";
import { pageFromSlug, type InteriorContent } from "@/data/pages";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function titleFromSlug(slug: string[]) {
  const last = slug[slug.length - 1] ?? "page";
  return last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fallbackPage(slug: string[]): InteriorContent {
  const title = titleFromSlug(slug);
  const eyebrow = slug[0]?.replace(/-/g, " ").toUpperCase() ?? "AIA";
  return {
    eyebrow,
    title,
    description: `Learn more about ${title} at AIA Engineering — wear solutions, application expertise, and global support built around the performance your operations depend on.`,
    image: "/images/plant-aerial.png",
    highlights: [
      "Wear solutions for mining, cement, quarry and thermal power",
      "Application engineering and field support",
      "Manufacturing and service presence worldwide",
    ],
    related: [
      { label: "Solutions", href: "/solutions/mining" },
      { label: "Contact", href: "/company/contact" },
      { label: "About AIA", href: "/company/about" },
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageFromSlug(slug);
  const title = page?.title ?? titleFromSlug(slug);
  return {
    title,
    description: page?.description ?? `${title} — AIA Engineering`,
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const page = pageFromSlug(slug) ?? fallbackPage(slug);
  return <InteriorPage {...page} />;
}
