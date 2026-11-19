"use client";

import { QuarryHero } from "@/components/solutions/quarry/QuarryHero";
import { QuarryShowcase } from "@/components/solutions/quarry/QuarryShowcase";
import { QuarryClosing } from "@/components/solutions/quarry/QuarryClosing";
import type { IndustryProductsContent } from "@/content/types";

type Props = {
  content: IndustryProductsContent;
  label: string;
  contactHref: string;
  back?: { href: string; label: string };
};

/**
 * Local quarry products page: the video hero, then the six crusher wear parts with AIA's 3D models
 * (pinned 3D stage on desktop, stacked on phones). Nothing else, by design.
 */
export function QuarryLanding({ content }: Props) {
  const hero = content.hero;
  const tagline = [hero.line1, hero.line2].filter(Boolean) as string[];
  const lede =
    hero.lead ??
    "Impact-resistant crusher wear parts engineered for aggregate and quarry operations.";

  return (
    <>
      <QuarryHero tagline={tagline} lede={lede} ctaHref="#crusher-wear" ctaText="Explore quarry products" />
      <QuarryShowcase content={content} />
      <QuarryClosing />
    </>
  );
}
