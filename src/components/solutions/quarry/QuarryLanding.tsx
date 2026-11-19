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
 * Local quarry products page, per the Figma: video hero, the scroll-driven product showcase (six
 * crusher wear parts with AIA's 3D models), case studies, FAQ, then the site footer.
 */
export function QuarryLanding({ content }: Props) {
  // Figma "Quarry - Product Page" (1233:50) copy over our own quarry film (no still image).
  const tagline = ["Advanced wear", "components for", "reliable crushing."];
  const lede =
    "We engineer crusher wear parts, including blow bars, crusher hammers, impellers, anvils, feed disks and frame liners, for extended wear life and efficient aggregate crushing.";

  return (
    <>
      <QuarryHero tagline={tagline} lede={lede} ctaHref="#crusher-wear" ctaText="Explore quarry products" />
      <QuarryShowcase content={content} />
      <QuarryClosing />
    </>
  );
}
