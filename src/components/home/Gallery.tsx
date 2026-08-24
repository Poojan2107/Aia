"use client";

import { useEffect, useRef, useState } from "react";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { media } from "@/data/media";

type Film = {
  id: string;
  title: string;
  caption?: string;
  poster: string;
  src?: string;
  branded?: boolean;
};

const films: readonly Film[] = [
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
];

type Slot = "prev" | "center" | "next";

function slotFor(index: number, active: number, count: number): Slot {
  const rel = (index - active + count) % count;
  if (rel === 0) return "center";
  if (rel === 1) return "next";
  return "prev";
}

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
  const [jumpId, setJumpId] = useState<string | null>(null);
  const jumpTimer = useRef<number | null>(null);
  const count = films.length;

  useEffect(() => {
    return () => {
      if (jumpTimer.current) window.clearTimeout(jumpTimer.current);
    };
  }, []);

  const goTo = (next: number, direction: 1 | -1 | 0 = 0) => {
    const target = ((next % count) + count) % count;
    if (target === offset) return;

    setPlayingId(null);

    // The slide that wraps around the far edge should teleport, not fly across.
    if (direction !== 0) {
      const wrappingIndex =
        direction > 0
          ? (offset - 1 + count) % count
          : (offset + 1) % count;
      setJumpId(films[wrappingIndex].id);
      if (jumpTimer.current) window.clearTimeout(jumpTimer.current);
      jumpTimer.current = window.setTimeout(() => {
        setJumpId(null);
        jumpTimer.current = null;
      }, 80);
    }

    setOffset(target);
  };

  const rotate = (dir: 1 | -1) => {
    goTo(offset + dir, dir);
  };

  return (
    <section
      className="overflow-x-hidden bg-[#f7f7f7] pb-[var(--section-y)] pt-[clamp(2.5rem,5vw,4.5rem)]"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <Reveal from="right" className="page-pad mb-12 text-center sm:mb-16">
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

      <div className="gallery-stage">
        {films.map((card, index) => {
          const slot = slotFor(index, offset, count);
          const featured = slot === "center";
          const playing = playingId === card.id;
          const jumping = jumpId === card.id;

          return (
            <figure
              key={card.id}
              className={`gallery-slide gallery-slide--${slot}${
                jumping ? " gallery-slide--jump" : ""
              }`}
            >
              <div
                role={!featured ? "button" : undefined}
                tabIndex={!featured ? 0 : undefined}
                onClick={() => {
                  if (!featured) {
                    const dir = slot === "next" ? 1 : -1;
                    goTo(index, dir as 1 | -1);
                  }
                }}
                onKeyDown={(event) => {
                  if (featured) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    const dir = slot === "next" ? 1 : -1;
                    goTo(index, dir as 1 | -1);
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
                  className="aspect-[16/10] bg-[#1a1f24]"
                  sizes={
                    featured ? "(max-width: 768px) 85vw, 46vw" : "37vw"
                  }
                >
                  {card.branded && !playing ? <BrandMarks /> : null}
                  {!playing ? (
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
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
                <p className="caption-in mt-4 flex items-center justify-center gap-2.5 text-[0.95rem] text-aia-navy/70">
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
          className="gallery-nav-btn size-10 text-[#c5c8cc] transition-colors duration-200 hover:text-[var(--aia-orange)]"
        >
          <GalleryNavArrow className="size-10 rotate-180" />
        </button>
        <div className="flex items-center gap-1.5">
          {films.map((film, i) => {
            const dist = Math.abs(i - offset);
            const accent =
              dist === 0 ? 100 : dist === 1 ? 45 : dist === 2 ? 22 : 10;
            return (
              <button
                key={film.id}
                type="button"
                aria-label={`Show ${film.title}`}
                aria-current={offset === i}
                onClick={() => {
                  const raw = i - offset;
                  const dir =
                    raw === 0
                      ? 0
                      : Math.abs(raw) <= count / 2
                        ? (Math.sign(raw) as 1 | -1)
                        : (Math.sign(-raw) as 1 | -1);
                  goTo(i, dir);
                }}
                className="size-1.5 rounded-full transition-[background-color] duration-300"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--aia-orange) ${accent}%, transparent)`,
                }}
              />
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next film"
          onClick={() => rotate(1)}
          className="gallery-nav-btn size-10 text-[#c5c8cc] transition-colors duration-200 hover:text-[var(--aia-orange)]"
        >
          <GalleryNavArrow className="size-10" />
        </button>
      </div>
    </section>
  );
}

function GalleryNavArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="20" cy="20" r="19.4" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M17.5459 15.5459C17.5999 15.4919 17.7034 15.4764 17.7881 15.5518L22.4473 20.2109C22.5236 20.2958 22.5083 20.3999 22.4541 20.4541V20.4551L17.793 25.1318C17.7076 25.2121 17.601 25.1974 17.5459 25.1426C17.5189 25.1156 17.5001 25.0741 17.5 25.0244C17.5 24.9745 17.5189 24.9323 17.5459 24.9053L22.1074 20.3438L17.5518 15.7881C17.4764 15.7034 17.4919 15.5999 17.5459 15.5459Z"
        stroke="currentColor"
      />
    </svg>
  );
}

function YouTubeMark() {
  return (
    <span aria-hidden className="inline-flex shrink-0 items-center">
      <svg
        width="20"
        height="14"
        viewBox="0 0 28 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.43 3.13A3.52 3.52 0 0 0 24.95.64C22.74 0 14 0 14 0S5.26 0 3.05.64A3.52 3.52 0 0 0 .57 3.13 36.9 36.9 0 0 0 0 10a36.9 36.9 0 0 0 .57 6.87 3.52 3.52 0 0 0 2.48 2.49C5.26 20 14 20 14 20s8.74 0 10.95-.64a3.52 3.52 0 0 0 2.48-2.49A36.9 36.9 0 0 0 28 10a36.9 36.9 0 0 0-.57-6.87Z"
          fill="#FF0000"
        />
        <path d="M11.2 14.29V5.71L18.4 10l-7.2 4.29Z" fill="#fff" />
      </svg>
    </span>
  );
}
