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
    <section aria-labelledby="about-heading" className="bg-white">
      <div className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden py-20 sm:min-h-[560px] sm:py-24 lg:min-h-[620px] lg:py-28">
        <Image
          src="/images/plant-aerial.png"
          alt="AIA Engineering industrial facility"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.92]"
          quality={92}
          priority={false}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.45)_0%,rgba(4,29,44,0.65)_50%,rgba(4,29,44,0.85)_100%)]"
        />

        <div className="page-pad relative z-10 mx-auto max-w-4xl text-center text-white">
          <h2
            id="about-heading"
            className="display mb-6 text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-md"
          >
            About AIA Engineering
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-[1.15rem] md:leading-[1.65]">
            Across mining, cement, quarry and thermal power, we design and
            manufacture wear solutions for grinding and other demanding
            applications. Our expertise in metallurgy, engineering and
            manufacturing helps extend component life, improve equipment
            reliability and support better operating performance.
          </p>
          <Link
            href="/company/about"
            className="ui-caps inline-flex h-[48px] items-center gap-2.5 rounded-full border border-white/85 bg-white/10 px-6 text-white backdrop-blur-sm transition hover:bg-white hover:text-aia-navy"
          >
            <span className="size-2 rounded-full bg-white" aria-hidden />
            Discover AIA
          </Link>
        </div>
      </div>

      <div className="bg-aia-surface-soft">
        <div className="page-pad mx-auto grid max-w-[1440px] grid-cols-2 gap-3 py-10 sm:gap-4 sm:py-14 md:grid-cols-3 lg:grid-cols-6">
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
