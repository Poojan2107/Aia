import type { Metadata } from "next";
import { InteriorPage } from "@/components/layout/InteriorPage";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function titleFromSlug(slug: string[]) {
  return slug
    .join(" / ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  return {
    title,
    description: `${title} — AIA Engineering`,
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  const eyebrow = slug[0]?.replace(/-/g, " ").toUpperCase() ?? "AIA";

  return (
    <InteriorPage
      title={title}
      eyebrow={eyebrow}
      description={`${title} is part of the AIA site map from the Figma system. The homepage experience is complete; this destination is ready for final copy and media.`}
    />
  );
}
