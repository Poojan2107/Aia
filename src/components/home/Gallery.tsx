"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { media } from "@/data/media";

const slides = [
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
    video: media.galleryCorporate,
    branded: false,
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
    <div className="absolute left-3 top-3 z-10 flex items-center gap-2 sm:left-4 sm:top-4 sm:gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-aia.png"
        alt=""
        className="h-5 w-auto brightness-0 invert sm:h-6"
        aria-hidden
      />
      <span className="h-4 w-px bg-white/40" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-vega.png"
        alt=""
        className="h-5 w-auto brightness-0 invert sm:h-6"
        aria-hidden
      />
    </div>
  );
}

export function Gallery() {
  const [index, setIndex] = useState(1);
  const active = slides[index] ?? slides[1];

  return (
    <section
      className="bg-aia-surface-soft py-14 sm:py-20 lg:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="page-pad mb-10 text-center sm:mb-12">
        <SectionLabel className="mb-6">Gallery</SectionLabel>
        <h2
          id="gallery-heading"
          className="display mx-auto mb-6 max-w-[18ch] text-[clamp(1.85rem,4.8vw,4.5rem)] text-aia-navy"
        >
          See what better performance looks like.
        </h2>
        <p className="mx-auto max-w-2xl text-base text-aia-navy/65 sm:text-lg">
          Explore AIA solutions, applications and engineering through videos that
          show how our products are designed to perform in demanding operating
          conditions.
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="relative aspect-video overflow-hidden bg-[#e4e7ea] md:hidden">
          <Image
            src={active.image}
            alt={active.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {active.branded ? <BrandMarks /> : null}
          <span className="pointer-events-none absolute inset-0 bg-black/20" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-16">
            <span className="display block text-left text-[clamp(1rem,4vw,1.35rem)] uppercase leading-tight text-white">
              {active.title}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex size-14 items-center justify-center rounded-full border border-white/45 bg-black/30 text-white backdrop-blur-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5L8 5.5z" />
              </svg>
            </span>
          </span>
        </div>

        <div className="hidden items-stretch justify-center gap-5 overflow-hidden md:flex lg:gap-6">
          {slides.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative aspect-video shrink-0 overflow-hidden bg-[#1a1f24] shadow-[0_16px_40px_rgba(4,29,44,0.12)] transition-all duration-500 ease-[var(--ease-out)] ${
                  isActive
                    ? "w-[min(100%,640px)] opacity-100"
                    : "w-[min(30%,260px)] opacity-90 hover:opacity-100"
                }`}
                aria-current={isActive}
                aria-label={slide.title}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes={isActive ? "640px" : "260px"}
                  className="object-cover"
                />
                {slide.branded ? <BrandMarks /> : null}
                {slide.branded ? (
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-16 text-left">
                    <span className="display block text-[clamp(0.85rem,1.5vw,1.35rem)] uppercase leading-tight text-white">
                      {slide.title}
                    </span>
                    {"caption" in slide && slide.caption ? (
                      <span className="mt-1.5 block text-[10px] uppercase tracking-[0.12em] text-white/75">
                        {slide.caption}
                      </span>
                    ) : null}
                  </span>
                ) : null}
                {isActive ? (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-black/15"
                    />
                    <span className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
                      <span className="flex size-16 items-center justify-center rounded-full border border-white/45 bg-black/30 text-white backdrop-blur-sm">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5.5v13l11-6.5L8 5.5z" />
                        </svg>
                      </span>
                    </span>
                  </>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5 px-2 text-center text-aia-navy/75">
          <span
            className="inline-block size-3 shrink-0 rounded-[2px] bg-[#ff0000]"
            aria-hidden
          />
          <p className="text-base font-medium sm:text-lg">{active.title}</p>
        </div>

        <div className="mt-6 flex justify-center gap-3 md:hidden">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show ${slide.title}`}
              onClick={() => setIndex(i)}
              className={`size-2.5 rounded-full transition-colors ${
                i === index ? "bg-aia-orange" : "bg-aia-navy/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
