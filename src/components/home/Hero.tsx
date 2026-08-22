"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { assets } from "@/data/assets";

const SLIDES = [
  {
    src: assets.hero.plate,
    alt: "Industrial grinding operations at an AIA customer site",
  },
  {
    src: assets.hero.dusk,
    alt: "AIA mining plant at dusk",
  },
] as const;

/** Locked to Figma Present hero + exported plates from AIA Assests */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [showPager, setShowPager] = useState(false);
  const total = SLIDES.length;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => go(index + 1), 10000);
    return () => window.clearInterval(id);
  }, [go, index]);

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0a1218]"
      aria-label="Hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setShowPager(true)}
      onMouseLeave={() => setShowPager(false)}
      onFocusCapture={() => setShowPager(true)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-[var(--ease-out)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            quality={98}
            sizes="100vw"
            className="object-cover object-[center_42%] brightness-[1.06] contrast-[1.02]"
          />
        </div>
      ))}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.28)_0%,rgba(4,29,44,0)_32%,rgba(4,29,44,0.18)_62%,rgba(4,29,44,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(42%,520px)] bg-gradient-to-r from-black/28 via-black/8 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/58 via-black/18 to-transparent"
      />

      <div className="page-pad relative z-10 flex h-full flex-col justify-end pb-[5.25rem] pt-28 md:pb-[5.75rem] lg:pb-[6.25rem]">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.58fr)_minmax(17.5rem,0.62fr)] lg:gap-12 xl:gap-16">
          <h1 className="display text-[clamp(2.85rem,7.05vw,5.5rem)] uppercase leading-[0.915] tracking-[-0.034em] text-white [text-wrap:unset]">
            We engineer for
            <br />
            the hours you
            <br />
            can&apos;t afford to lose.
          </h1>

          <div className="w-full max-w-[22rem] lg:mb-1.5 lg:justify-self-end">
            <p className="mb-7 text-[1.0625rem] leading-[1.55] text-white md:mb-8 md:text-[1.125rem] md:leading-[1.58]">
              Advanced wear solutions engineered to extend component life,
              improve equipment availability and keep critical operations
              performing.
            </p>
            <CtaButton href="#solutions" variant="solid">
              Explore wear solutions
            </CtaButton>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-7 z-20 flex justify-center transition-opacity duration-300 md:bottom-8 ${
          showPager ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="pointer-events-auto inline-flex h-8 items-center gap-2.5 text-white/90"
          role="group"
          aria-label="Hero slides"
        >
          <button
            type="button"
            className="flex size-7 items-center justify-center opacity-80 transition hover:opacity-100"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          <span className="min-w-[3rem] text-center font-[family-name:var(--font-ui)] text-[0.75rem] font-semibold tracking-[0.16em] tabular-nums">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            className="flex size-7 items-center justify-center opacity-80 transition hover:opacity-100"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
