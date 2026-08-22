"use client";

import { useState } from "react";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { assets } from "@/data/assets";
import { media } from "@/data/media";

const films = [
  {
    id: "lining",
    title: "Ball Mill Lining Solutions",
    caption: "Safety | Wear Life | Operations",
    poster: "/images/mill-poster.png",
    src: media.gallery.lining,
    branded: false,
  },
  {
    id: "corporate",
    title: "AIA Engineering Corporate Film",
    caption: undefined,
    poster: "/images/gallery-center.jpg",
    src: media.gallery.corporate,
    branded: false,
  },
  {
    id: "components",
    title: "Wear Component Systems",
    caption: "Precision | Reliability | Life",
    poster: "/images/gallery-3.png",
    src: media.gallery.components,
    branded: true,
  },
] as const;

function BrandMarks() {
  return (
    <div className="absolute left-3 top-3 z-10 flex items-center gap-2 sm:left-4 sm:top-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-aia.png" alt="" className="h-5 w-auto brightness-0 invert" />
      <span className="h-4 w-px bg-white/40" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-vega.png" alt="" className="h-4 w-auto brightness-0 invert" />
    </div>
  );
}

export function Gallery() {
  const [offset, setOffset] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const count = films.length;
  const ordered = [...films.slice(offset), ...films.slice(0, offset)];

  const rotate = (dir: number) => {
    setPlayingId(null);
    setOffset((v) => (v + dir + count) % count);
  };

  return (
    <section
      className="overflow-x-hidden bg-[#f7f7f7] py-[var(--section-y)]"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <Reveal from="right" className="page-pad mb-12 text-center sm:mb-16">
        <SectionLabel className="mb-6">Gallery</SectionLabel>
        <h2
          id="gallery-heading"
          className="display mx-auto mb-5 max-w-[18ch] text-[clamp(1.9rem,5vw,3.875rem)] font-semibold leading-[1] text-aia-navy lg:text-[3.875rem] lg:leading-[3.875rem]"
        >
          See what better performance looks like.
        </h2>
        <p className="mx-auto max-w-[40rem] text-[1.125rem] font-light leading-[1.7] text-[#090909]/70 sm:text-[1.5rem] sm:leading-[2.125rem]">
          Explore AIA solutions, applications and engineering through videos that
          show how our products are designed to perform in demanding operating
          conditions.
        </p>
      </Reveal>

      <div className="relative overflow-hidden">
      <div className="flex items-end justify-center gap-4 md:gap-5 lg:gap-6">
        {ordered.map((card, position) => {
          const featured = position === 1;
          const playing = playingId === card.id;
          return (
            <figure
              key={card.id}
              className={`relative shrink-0 transition-transform duration-500 ${
                featured
                  ? "z-[1] w-[min(52rem,56vw)]"
                  : "hidden w-[min(26rem,30vw)] md:block"
              }`}
            >
              <div
                role={!featured ? "button" : undefined}
                tabIndex={!featured ? 0 : undefined}
                onClick={() => {
                  if (!featured) {
                    setPlayingId(null);
                    setOffset((v) => (v + position - 1 + count) % count);
                  }
                }}
                onKeyDown={(event) => {
                  if (featured) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setPlayingId(null);
                    setOffset((v) => (v + position - 1 + count) % count);
                  }
                }}
                className={!featured ? "cursor-pointer" : undefined}
                aria-label={!featured ? `Show ${card.title}` : undefined}
              >
                <MediaSlot
                  poster={card.poster}
                  posterAlt={card.title}
                  src={featured ? card.src : undefined}
                  playback={featured ? "click" : "ambient"}
                  film={featured}
                  active={playing}
                  onActiveChange={(next) =>
                    setPlayingId(next ? card.id : null)
                  }
                  className={`bg-[#1a1f24] ${
                    featured ? "aspect-[16/10]" : "aspect-[16/10]"
                  }`}
                  sizes={featured ? "56vw" : "24vw"}
                >
                  {card.branded && !playing ? <BrandMarks /> : null}
                  {"ribbon" in card && card.ribbon && !playing ? (
                    <span className="gallery-ribbon pointer-events-none absolute left-0 top-8 z-10 bg-aia-navy px-8 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:top-10">
                      {card.ribbon}
                    </span>
                  ) : null}
                  {!playing ? (
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  ) : null}
                  {!playing && "overlay" in card && card.overlay ? (
                    <p className="pointer-events-none absolute bottom-5 left-5 z-10 display max-w-[11ch] text-[clamp(1.15rem,2.1vw,1.9rem)] uppercase leading-[0.94] text-white">
                      {card.overlay}
                    </p>
                  ) : null}
                  {!featured && !playing ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 text-left sm:p-5">
                      <p className="display text-[clamp(0.95rem,1.5vw,1.3rem)] uppercase leading-[0.95] text-white">
                        {card.title}
                      </p>
                      {card.caption ? (
                        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/70">
                          {card.caption}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </MediaSlot>
              </div>
              {featured ? (
                <p className="mt-4 flex items-center justify-center gap-2.5 text-[0.95rem] text-aia-navy/70">
                  <YouTubeMark />
                  {card.title}
                </p>
              ) : null}
            </figure>
          );
        })}
      </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous film"
          onClick={() => rotate(-1)}
          className="size-10 overflow-hidden transition hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/next.svg" alt="" className="size-10 rotate-180" />
        </button>
        <div className="flex items-center gap-1.5">
          {films.map((film, i) => (
            <button
              key={film.id}
              type="button"
              aria-label={`Show ${film.title}`}
              aria-current={offset === i}
              onClick={() => {
                setPlayingId(null);
                setOffset(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                offset === i ? "w-6 bg-aia-orange" : "w-1.5 bg-aia-navy/20"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next film"
          onClick={() => rotate(1)}
          className="size-10 overflow-hidden transition hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/next.svg" alt="" className="size-10" />
        </button>
      </div>
    </section>
  );
}

function YouTubeMark() {
  return (
    <span
      aria-hidden
      className="inline-flex size-5 items-center justify-center rounded-[3px] bg-[#ff0000]"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
        <path d="M1.2 0.8v6.4L7 4z" />
      </svg>
    </span>
  );
}
