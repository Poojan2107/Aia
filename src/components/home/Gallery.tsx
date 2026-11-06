"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  FocusCarousel,
  type FocusCarouselSlide,
} from "@/components/ui/FocusCarousel";

const gallerySlides: readonly FocusCarouselSlide[] = [
  {
    id: "lining",
    kind: "video",
    title: "Ball Mill Lining Solutions",
    caption: "Safety | Wear Life | Operations",
    image: "/images/mill-poster.png",
    src: "/videos/mill.mp4",
    badge: "Featured Film",
  },
  {
    id: "corporate",
    kind: "video",
    title: "AIA Engineering Corporate Film",
    caption: "Global Footprint | Metallurgy",
    image: "/images/gallery-center.jpg",
    src: "/videos/corporate.mp4",
    badge: "Company Overview",
  },
  {
    id: "components",
    kind: "video",
    title: "Wear Component Systems",
    caption: "Precision | Reliability | Life",
    image: "/images/gallery-3.png",
    src: "/videos/hero.mp4",
    badge: "Technical Fieldwork",
  },
  {
    id: "mining",
    kind: "image",
    title: "Primary Mining Grinding Systems",
    caption: "SAG & Ball Mill Optimization",
    image: "/images/design/industry-mining.jpg",
    badge: "Mining Application",
  },
  {
    id: "cement",
    kind: "image",
    title: "Vertical Roller Mills & Ball Mills",
    caption: "High-Chrome Rollers & Table Segments",
    image: "/images/design/industry-cement.jpg",
    badge: "Cement Metallurgy",
  },
  {
    id: "quarry",
    kind: "image",
    title: "Quarry & Aggregates Crushing",
    caption: "Impact Blow Bars & Primary Jaws",
    image: "/images/design/industry-quarry.jpg",
    badge: "Crushing Solutions",
  },
];

export function Gallery() {
  return (
    <section
      className="overflow-x-hidden bg-[#f7f7f7] pb-[var(--section-y)] pt-[clamp(2.5rem,5vw,4.5rem)]"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <Reveal from="right" className="page-pad mb-8 text-center sm:mb-12">
        <SectionLabel className="gallery-label mb-6">Gallery</SectionLabel>
        <h2 id="gallery-heading" className="gallery-heading">
          <span>See what better</span>
          <span>performance looks like.</span>
        </h2>
        <p className="gallery-support">
          <span>
            Explore AIA solutions, applications and engineering through videos that
            show
          </span>
          <span>
            how our products are designed to perform in demanding operating
            conditions.
          </span>
        </p>
      </Reveal>

      <div className="relative mx-auto w-full max-w-[1920px]">
        <FocusCarousel
          slides={gallerySlides}
          cardWidth={620}
          cardRatio={16 / 10}
          sideSize={0.62}
          sideTaper={0.92}
          slotGap={28}
          sideSlots={4}
          cornerRadius={16}
          cueStyle="caret"
          cueTint="#006eff"
          cueSize={10}
          cueOffset={18}
          snapRate={6}
          showControls={true}
        />
      </div>
    </section>
  );
}
