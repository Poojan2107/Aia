"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { footprint } from "@/data/site";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";

/**
 * Figma About plate with a pinned scroll:
 * the aerial grows to the viewport while the title gathers on the right.
 */
export function AboutBand() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(track);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const ease = reduced ? 0 : progress * progress * (3 - 2 * progress);
  const scale = 0.58 + ease * 0.42;
  const titleShift = ease * 18;
  const copyFade = Math.max(0, 1 - ease * 1.35);
  const overlay = 0.08 + ease * 0.28;

  return (
    <section aria-labelledby="about-heading">
      <div
        ref={track}
        className="relative bg-[#bfc8cf]"
        style={{ height: reduced ? "100svh" : "210vh" }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 z-[1] overflow-hidden"
            style={{
              width: `${scale * 100}vw`,
              height: `${scale * 100}svh`,
              transform: "translate(-50%, -50%)",
              maxWidth: ease > 0.02 ? "100vw" : "820px",
            }}
          >
            <Image
              src="/images/plant-aerial.png"
              alt="AIA Engineering industrial facility"
              fill
              sizes="100vw"
              className="object-cover object-center"
              quality={92}
              priority={false}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: `rgba(4,29,44,${overlay})` }}
            />
          </div>

          <div
            className="page-pad relative z-[2] flex w-full items-center justify-between gap-4"
            style={{
              transform: `translateX(${titleShift}%)`,
              mixBlendMode: "normal",
            }}
          >
            <p
              className="display whitespace-nowrap text-[clamp(2.4rem,6vw,4.75rem)] leading-none text-white drop-shadow-[0_2px_16px_rgba(4,29,44,0.35)]"
              style={{
                opacity: 1 - ease * 0.15,
                transform: `translateX(${ease * -8}%)`,
              }}
            >
              About
            </p>
            <p
              id="about-heading"
              className="display text-right text-[clamp(2.4rem,6vw,4.75rem)] leading-none text-white drop-shadow-[0_2px_16px_rgba(4,29,44,0.35)]"
              style={{
                transform: `translateX(${ease * 4}%)`,
              }}
            >
              AIA Engineering
            </p>
          </div>

          <div
            className="page-pad absolute inset-x-0 bottom-[8%] z-[3] mx-auto max-w-[46rem] text-center"
            style={{
              opacity: copyFade,
              transform: `translateY(${ease * 24}px)`,
              pointerEvents: copyFade < 0.2 ? "none" : "auto",
            }}
          >
            <p className="mb-8 text-base leading-relaxed text-white sm:text-lg md:text-[1.15rem] md:leading-[1.65]">
              Across mining, cement, quarry and thermal power, we design and
              manufacture wear solutions for grinding and other demanding
              applications. Our expertise in metallurgy, engineering and
              manufacturing helps extend component life, improve equipment
              reliability and support better operating performance.
            </p>
            <Link
              href="/company/about"
              className="ui-caps inline-flex h-[50px] items-center gap-2.5 rounded-full border border-white/85 bg-transparent px-5 text-white transition hover:bg-white hover:text-aia-navy"
            >
              <span className="size-2 rounded-full bg-white" aria-hidden />
              Discover AIA
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-aia-surface-soft">
        <div className="page-pad grid grid-cols-2 gap-3 py-10 sm:gap-4 sm:py-12 md:grid-cols-3 lg:grid-cols-6">
          {footprint.map((item) => (
            <div
              key={item.label}
              className="flex aspect-square flex-col items-center justify-center border-t-2 border-[#006fff] border-x border-b border-aia-line bg-white px-3 text-center transition-shadow hover:shadow-sm"
            >
              <p className="display text-[clamp(1.85rem,4.5vw,2.95rem)] font-bold text-[#006fff]">
                {item.value}
              </p>
              <p className="mt-2.5 max-w-[14ch] text-sm font-medium leading-snug text-aia-navy/80 sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
