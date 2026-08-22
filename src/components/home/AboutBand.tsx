"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { footprint } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { media } from "@/data/media";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Figma About: grey stage, pinned aerial plate that scales up on scroll,
 * split titles overlapping the card, copy inside, ghost CTA below.
 */
export function AboutBand() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(track);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);
  const ease = reduced ? 1 : progress * progress * (3 - 2 * progress);
  const scale = 0.68 + ease * 0.32;
  const titleOut = ease * 34;
  const copyFade = Math.max(0, 1 - ease * 1.2);

  return (
    <section aria-labelledby="about-heading" className="bg-[#b4bcc2]">
      <div ref={track} className="relative h-[185vh]">
        <div className="sticky top-0 flex h-[100svh] min-h-[640px] flex-col items-center justify-center overflow-hidden px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))] py-10 sm:py-14">
          <p className="mb-5 text-center display text-[clamp(2rem,8vw,2.75rem)] font-extrabold leading-none tracking-tight text-white lg:hidden">
            About AIA Engineering
          </p>
          <div
            className="relative mx-auto w-full max-w-[1120px] origin-center will-change-transform"
            style={{ transform: `scale(${scale})` }}
          >
            <h2 id="about-heading" className="sr-only">
              About AIA Engineering
            </h2>
            <p
              aria-hidden
              className="pointer-events-none absolute left-[-6%] top-1/2 z-20 hidden display text-[clamp(2.6rem,6.4vw,6.1rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-sm lg:block"
              style={{ transform: `translate(-${titleOut}%, -50%)` }}
            >
              About
            </p>
            <p
              aria-hidden
              className="pointer-events-none absolute right-[-5%] top-1/2 z-20 hidden text-right display text-[clamp(2.6rem,6.4vw,6.1rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-sm lg:block"
              style={{ transform: `translate(${titleOut}%, -50%)` }}
            >
              AIA
              <br />
              Engineering
            </p>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#8a949c] shadow-[0_28px_90px_rgba(4,29,44,0.32)]">
              <AmbientFilm
                src={media.about}
                poster="/images/plant-aerial-clean.jpg"
                sizes="(max-width: 1100px) 100vw, 1120px"
                position="center 40%"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.04)_0%,rgba(4,29,44,0.12)_55%,rgba(4,29,44,0.42)_100%)]"
              />
              <p
                className="absolute inset-x-[8%] bottom-[8%] z-10 text-center text-[0.8rem] leading-[1.55] text-white/95 sm:text-[0.92rem] md:text-[1.05rem] md:leading-[1.6]"
                style={{ opacity: copyFade }}
              >
                Across mining, cement, quarry and thermal power, we design and
                manufacture wear solutions for grinding and other demanding
                applications. Our expertise in metallurgy, engineering and
                manufacturing helps extend component life, improve equipment
                reliability and support better operating performance.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 sm:mt-10">
            <Link
              href="/company/about"
              className="ui-caps inline-flex h-[50px] items-center gap-2.5 rounded-full border border-white px-7 text-white transition duration-300 hover:bg-white hover:text-aia-navy"
            >
              <span className="size-2 rounded-full bg-white" aria-hidden />
              Discover AIA
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="page-pad mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-aia-line border-y border-aia-line md:grid-cols-3 lg:grid-cols-6">
          {footprint.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 70}
              className="flex flex-col items-center justify-center px-3 py-10 text-center sm:py-14 lg:py-16"
            >
              <p className="display text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold text-aia-orange">
                <CountUp value={item.value} duration={1500} />
              </p>
              <p className="mt-2 max-w-[14ch] text-[0.9rem] leading-snug text-aia-navy/55 sm:text-[1rem]">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
