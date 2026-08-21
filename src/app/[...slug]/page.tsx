import type { Metadata } from "next";
import { InteriorPage } from "@/components/layout/InteriorPage";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function titleFromSlug(slug: string[]) {
  const last = slug[slug.length - 1] ?? "page";
  return last
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
      description={`Learn more about ${title} at AIA Engineering — wear solutions, application expertise, and global support built around the performance your operations depend on.`}
    />
  );
}
