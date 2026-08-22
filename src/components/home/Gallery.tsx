"use client";

import { useState } from "react";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
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
    featured: false,
  },
  {
    id: "corporate",
    title: "AIA Engineering Corporate Film",
    caption: undefined,
    poster: assets.corporatePoster,
    src: media.gallery.corporate,
    branded: false,
    featured: true,
  },
  {
    id: "components",
    title: "Wear Component Systems",
    caption: "Precision | Reliability | Life",
    poster: "/images/cement-mill.png",
    src: media.gallery.components,
    branded: true,
    featured: false,
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
  const [offset, setOffset] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const ordered = [...films.slice(offset), ...films.slice(0, offset)];
  const go = (dir: number) => {
    setPlayingId(null);
    setOffset((v) => (v + dir + films.length) % films.length);
  };

  return (
    <section
      className="bg-aia-surface-soft py-[var(--section-y)]"
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

      <div className="page-pad mx-auto grid max-w-[1440px] items-end gap-5 md:grid-cols-[0.9fr_1.35fr_0.9fr] md:gap-6">
        {ordered.map((card, position) => {
          const featured = position === 1;
          const playing = playingId === card.id;
          return (
            <figure key={card.id} className="group relative">
              <MediaSlot
                poster={card.poster}
                posterAlt={card.title}
                src={card.src}
                playback="click"
                film
                active={playing}
                onActiveChange={(next) => setPlayingId(next ? card.id : null)}
                className={`rounded-lg bg-[#1a1f24] ${
                  featured ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-[3/4]"
                }`}
                sizes={featured ? "50vw" : "30vw"}
              >
                {card.branded && !playing ? <BrandMarks /> : null}
                {!playing ? (
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                ) : null}
                {!featured && !playing ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 text-left">
                    <p className="display text-[clamp(0.95rem,1.6vw,1.35rem)] uppercase leading-tight text-white">
                      {card.title}
                    </p>
                    {card.caption ? (
                      <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-white/75">
                        {card.caption}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </MediaSlot>
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

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous film"
          onClick={() => go(-1)}
          className="flex size-9 items-center justify-center rounded-full border border-aia-navy/30 text-aia-navy transition hover:border-aia-navy hover:bg-aia-navy/5"
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
              className={`size-2 rounded-full transition ${
                offset === i ? "bg-aia-orange" : "bg-aia-navy/20 hover:bg-aia-navy/40"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next film"
          onClick={() => go(1)}
          className="flex size-9 items-center justify-center rounded-full border border-aia-navy/30 text-aia-navy transition hover:border-aia-navy hover:bg-aia-navy/5"
        >
          ›
        </button>
      </div>
    </section>
  );
}
