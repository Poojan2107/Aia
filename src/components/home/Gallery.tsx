"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    id: "lining",
    title: "Ball Mill Lining Solutions",
    caption: "Safety | Wear Life | Operations",
    image: "/images/mining-mill.png",
    branded: true,
  },
  {
    id: "corporate",
    title: "AIA Engineering Corporate Film",
    image: "/images/plant-aerial.png",
    featured: true,
  },
  {
    id: "components",
    title: "Wear Component Systems",
    caption: "Precision | Reliability | Life",
    image: "/images/cement-mill.png",
    branded: true,
  },
] as const;

function BrandMarks() {
  return (
    <div className="absolute left-3 top-3 z-10 flex items-center gap-2 sm:left-4 sm:top-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-aia.png" alt="" className="h-5 w-auto brightness-0 invert" aria-hidden />
      <span className="h-4 w-px bg-white/40" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-vega.png" alt="" className="h-4 w-auto brightness-0 invert" aria-hidden />
    </div>
  );
}

export function Gallery() {
  return (
    <section
      className="bg-aia-surface-soft py-14 sm:py-20 lg:py-28"
      aria-labelledby="gallery-heading"
    >
      <Reveal className="page-pad mb-10 text-center sm:mb-14">
        <p className="section-label mb-6">[GALLERY]</p>
        <h2
          id="gallery-heading"
          className="display mx-auto mb-5 max-w-[16ch] text-[clamp(1.85rem,4.8vw,3.5rem)] text-aia-navy"
        >
          See what better performance looks like.
        </h2>
        <p className="mx-auto max-w-2xl text-base text-aia-navy/65 sm:text-lg">
          Explore AIA solutions, applications and engineering through films that
          show how our products are designed to perform in demanding operating
          conditions.
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-[1180px] items-end gap-4 px-4 md:grid-cols-[0.9fr_1.35fr_0.9fr] md:gap-5">
        {cards.map((card) => {
          const featured = "featured" in card && card.featured;
          return (
            <figure key={card.id} className="group relative">
              <div
                className={`relative overflow-hidden bg-[#1a1f24] ${
                  featured ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-[3/4]"
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes={featured ? "50vw" : "30vw"}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
                {"branded" in card && card.branded ? <BrandMarks /> : null}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {featured ? (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex size-16 items-center justify-center rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-sm">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.5v13l11-6.5L8 5.5z" />
                      </svg>
                    </span>
                  </span>
                ) : (
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <p className="display text-[clamp(0.95rem,1.6vw,1.35rem)] uppercase leading-tight text-white">
                      {card.title}
                    </p>
                    {"caption" in card && card.caption ? (
                      <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-white/75">
                        {card.caption}
                      </p>
                    ) : null}
                  </figcaption>
                )}
              </div>
              {featured ? (
                <p className="mt-3 flex items-center justify-center gap-2 text-sm text-aia-navy/70 sm:text-base">
                  <span className="inline-block size-3 rounded-[2px] bg-[#ff0000]" aria-hidden />
                  {card.title}
                </p>
              ) : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
