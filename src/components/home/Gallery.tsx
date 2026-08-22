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
    poster: assets.millPoster,
    src: media.gallery.lining,
    branded: true,
  },
  {
    id: "corporate",
    title: "AIA Engineering Corporate Film",
    caption: undefined,
    poster: assets.corporatePoster,
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
      className="overflow-hidden bg-[#f6f6f6] py-[var(--section-y)]"
      aria-labelledby="gallery-heading"
    >
      <Reveal className="page-pad mb-12 text-center sm:mb-16">
        <SectionLabel className="mb-6">Gallery</SectionLabel>
        <h2
          id="gallery-heading"
          className="display mx-auto mb-5 max-w-[18ch] text-[clamp(1.9rem,5vw,3.75rem)] text-aia-navy"
        >
          See what better performance looks like.
        </h2>
        <p className="mx-auto max-w-[40rem] text-[1.02rem] leading-relaxed text-aia-navy/55 sm:text-[1.125rem]">
          Explore AIA solutions, applications and engineering through videos that
          show how our products are designed to perform in demanding operating
          conditions.
        </p>
      </Reveal>

      <div className="page-pad mx-auto grid max-w-[1440px] items-center gap-4 md:grid-cols-[0.78fr_1.44fr_0.78fr] md:gap-5 lg:gap-7">
        {ordered.map((card, position) => {
          const featured = position === 1;
          const playing = playingId === card.id;
          return (
            <figure key={card.id} className="relative">
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
                    featured
                      ? "aspect-[16/10]"
                      : "aspect-[4/5] md:aspect-[4/5]"
                  }`}
                  sizes={featured ? "50vw" : "28vw"}
                >
                  {card.branded && !playing ? <BrandMarks /> : null}
                  {!playing ? (
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  ) : null}
                  {!featured && !playing ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 text-left sm:p-5">
                      <p className="display text-[clamp(1rem,1.7vw,1.45rem)] uppercase leading-[0.95] text-white">
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

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous film"
          onClick={() => rotate(-1)}
          className="flex size-10 items-center justify-center rounded-full border border-aia-navy/25 text-aia-navy transition hover:border-aia-orange hover:text-aia-orange"
        >
          ‹
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
          className="flex size-10 items-center justify-center rounded-full border border-aia-navy/25 text-aia-navy transition hover:border-aia-orange hover:text-aia-orange"
        >
          ›
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
