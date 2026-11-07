"use client";

import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";
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

const COPIES = 5;

function BrandMarks() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-3 opacity-90 sm:right-6 sm:top-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-vega.png" alt="" className="h-4 w-auto brightness-0 invert" />
    </div>
  );
}

export function Gallery() {
  const count = films.length;
  const strip = Array.from({ length: COPIES }, () => [...films]).flat();
  const [index, setIndex] = useState(count * 2);
  const [x, setX] = useState(0);
  const [motion, setMotion] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const rowRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const isDraggingRef = useRef(false);

  const place = (value: number) => {
    const row = rowRef.current;
    const card = row?.querySelector<HTMLElement>(".gallery-card");
    const stage = row?.parentElement;
    if (!row || !card || !stage) return 0;
    const gap = Number.parseFloat(getComputedStyle(row).gap) || 32;
    const cardWidth = card.offsetWidth;
    const centerOffset = (stage.clientWidth - cardWidth) / 2;
    return centerOffset - value * (cardWidth + gap);
  };

  useLayoutEffect(() => {
    setX(place(index));
  }, [index]);

  useEffect(() => {
    if (motion) return;
    const id = requestAnimationFrame(() => setMotion(true));
    return () => cancelAnimationFrame(id);
  }, [motion, index]);

  useEffect(() => {
    const onResize = () => setX(place(indexRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const shift = (dir: number) => {
    setPlayingId(null);
    setMotion(true);
    setIndex((value) => value + dir);
  };

  const goTo = (targetFilmIndex: number) => {
    setPlayingId(null);
    const currentFilmIndex = ((index % count) + count) % count;
    let diff = targetFilmIndex - currentFilmIndex;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    setMotion(true);
    setIndex((value) => value + diff);
  };

  const settle = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    const value = indexRef.current;
    if (value >= count * 3 || value < count) {
      setMotion(false);
      setIndex(value >= count * 3 ? value - count : value + count);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    isDraggingRef.current = false;
    setDragDelta(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = dragStartY.current !== null ? e.clientY - dragStartY.current : 0;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      isDraggingRef.current = true;
      setDragDelta(dx * 0.7);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      const dx = e.clientX - dragStartX.current;
      dragStartX.current = null;
      dragStartY.current = null;
      setDragDelta(0);
      if (Math.abs(dx) > 40) {
        shift(dx > 0 ? -1 : 1);
      }
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const onPointerCancel = () => {
    dragStartX.current = null;
    dragStartY.current = null;
    setDragDelta(0);
    isDraggingRef.current = false;
  };

  const activeIndex = ((index % count) + count) % count;
  const activeFilm = films[activeIndex];

  return (
    <section
      className="overflow-x-hidden bg-[#f7f7f7] pb-[var(--section-y)] pt-[clamp(2.5rem,5vw,4.5rem)]"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <Reveal from="right" className="page-pad mb-12 text-center sm:mb-16">
        <SectionLabel className="gallery-label mb-6">Gallery</SectionLabel>
        <h2 id="gallery-heading" className="gallery-heading ft ft-h72">
          <span>See what better</span>
          <span>performance looks like.</span>
        </h2>
        <p className="gallery-support ft ft-copy18">
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

      <div
        className="gallery-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          ref={rowRef}
          className={`gallery-row${motion && dragDelta === 0 ? "" : " is-instant"}`}
          style={{ transform: `translate3d(${x + dragDelta}px, 0, 0)` }}
          onTransitionEnd={settle}
        >
          {strip.map((card, position) => {
            const isCenter = position === index;
            const playing = isCenter && playingId === card.id;

            return (
              <figure
                key={`${card.id}-${position}`}
                className={`gallery-card ${isCenter ? "is-center" : "is-side"}`}
              >
                <div
                  role={!isCenter ? "button" : undefined}
                  tabIndex={!isCenter ? 0 : undefined}
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    if (!isCenter) {
                      setPlayingId(null);
                      setMotion(true);
                      setIndex(position);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (isCenter) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setPlayingId(null);
                      setMotion(true);
                      setIndex(position);
                    }
                  }}
                  className={`rounded-[1.25rem] overflow-hidden${!isCenter ? " cursor-pointer" : ""}`}
                  aria-label={!isCenter ? `Show ${card.title}` : undefined}
                >
                  <MediaSlot
                    poster={card.poster}
                    posterAlt={card.title}
                    src={isCenter ? card.src : undefined}
                    playback={isCenter ? "click" : "ambient"}
                    film={isCenter}
                    active={playing}
                    onActiveChange={(next) =>
                      setPlayingId(next ? card.id : null)
                    }
                    className="aspect-[16/10] bg-[#1a1f24] rounded-[1.25rem] overflow-hidden shadow-sm"
                    sizes={
                      isCenter ? "(max-width: 768px) 85vw, 48vw" : "37vw"
                    }
                  >
                    {card.branded && !playing ? <BrandMarks /> : null}
                    {!playing ? (
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    ) : null}
                  </MediaSlot>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2.5 text-aia-navy/70">
        <YouTubeMark />
        <span className="ft ft-film24">{activeFilm.title}</span>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous film"
          onClick={() => shift(-1)}
          className="gallery-nav-btn group size-10 text-[#c5c8cc] transition-all duration-300 hover:scale-105 active:scale-95 hover:text-[var(--aia-accent)]"
        >
          <GalleryNavArrow className="size-10 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>
        <div className="flex items-center gap-2">
          {films.map((film, i) => {
            const active = activeIndex === i;
            return (
              <button
                key={film.id}
                type="button"
                aria-label={`Show ${film.title}`}
                aria-current={active}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${active
                    ? "w-6 bg-[var(--aia-accent)] shadow-sm"
                    : "w-1.5 bg-[#c5c8cc] hover:bg-[#8e959d]"
                  }`}
              />
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Next film"
          onClick={() => shift(1)}
          className="gallery-nav-btn group size-10 text-[#c5c8cc] transition-all duration-300 hover:scale-105 active:scale-95 hover:text-[var(--aia-accent)]"
        >
          <GalleryNavArrow className="size-10 transition-transform duration-300 group-hover:translate-x-0.5" />
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
