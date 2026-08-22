"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { CountUp } from "@/components/ui/CountUp";
import { media } from "@/data/media";
import { stats } from "@/data/site";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";

const PLATE = "/images/what-we-solve.png";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function span(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

/**
 * Sticky scene: tag + title stay. Copy, then film, then the KPI plate
 * slides over — Figma 2×2 with sequenced motion.
 */
export function WhatWeSolve() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(track);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const copyIn = reduced ? 1 : span(progress, 0.08, 0.24);
  const filmIn = reduced ? 1 : span(progress, 0.28, 0.46);
  const kpiIn = reduced ? 0 : span(progress, 0.64, 0.80);

  const copyEase = copyIn * copyIn * (3 - 2 * copyIn);
  const filmEase = filmIn * filmIn * (3 - 2 * filmIn);
  const kpiEase = kpiIn * kpiIn * (3 - 2 * kpiIn);

  return (
    <section
      className="relative bg-[#f7f7f7]"
      aria-labelledby="what-we-solve-heading"
      id="what-we-solve"
    >
      <div ref={track} className="relative h-[420vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#f7f7f7]">
          <div className="page-pad mx-auto grid h-full max-w-[1440px] grid-rows-[auto_minmax(0,1fr)] gap-x-10 gap-y-5 pt-[clamp(2.5rem,5.5vh,4.25rem)] pb-[clamp(1.25rem,3.2vh,2rem)] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-x-16 lg:gap-y-5 xl:gap-x-20">
            <SectionLabel className="self-start lg:pt-2">What we solve</SectionLabel>

            <div className="self-start">
              <h2
                id="what-we-solve-heading"
                className="heading-onest mb-5 max-w-[18ch] text-[clamp(1.9rem,4vw,3.5rem)] leading-[60px] tracking-normal text-aia-navy lg:text-[3.5rem]"
              >
                For over four decades, AIA been engineering longer life into the
                parts that keep industry moving.
              </h2>
              <CtaButton href="/solutions/mining" variant="solid">
                See how we solve wear
              </CtaButton>
            </div>

            <p
              className="max-w-[530px] self-start text-[1.25rem] leading-[1.36] text-[#090909] sm:text-[1.5rem] sm:leading-[1.45] md:text-[1.75rem] md:leading-[38px]"
              style={{
                opacity: copyEase,
                transform: `translate3d(0, ${(1 - copyEase) * 28}px, 0)`,
              }}
            >
              Across mining, cement, quarry and thermal power, we design and
              manufacture wear solutions for grinding and other demanding
              applications. Our expertise in metallurgy, engineering and
              manufacturing helps extend component life, improve equipment
              reliability and support better operating performance.
            </p>

            <div
              className="relative min-h-0 w-full overflow-hidden bg-[#c8ced0]"
              style={{
                opacity: filmEase,
                transform: `translate3d(0, ${(1 - filmEase) * 40}px, 0)`,
              }}
            >
              <AmbientFilm
                src={media.whatWeSolve}
                poster={PLATE}
                className="absolute inset-0"
                position="center 42%"
                coverBleed
                sizes="(max-width: 1024px) 100vw, 62vw"
              />
            </div>
          </div>

          <div
            className="absolute inset-0 z-10 overflow-hidden bg-[#2a3238] will-change-transform"
            style={{ transform: `translate3d(0, ${(1 - kpiEase) * 100}%, 0)` }}
          >
            <AmbientFilm
              src={media.whatWeSolveBand}
              poster={PLATE}
              className="absolute inset-0"
              position="center 40%"
              coverBleed
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[rgba(20,24,28,0.42)]"
            />
            <div className="page-pad relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pb-12 pt-24 sm:pb-16 lg:pb-20">
              <p className="mb-4 text-[1.05rem] font-medium text-white sm:text-[1.15rem]">
                AIA Engineering
              </p>
              <div className="grid items-start gap-8 border-t border-white pt-8 text-white sm:gap-10 lg:grid-cols-[minmax(0,0.32fr)_repeat(3,minmax(0,1fr))] lg:pt-10">
                <div className="hidden lg:block" />
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="display text-[clamp(2.25rem,4.6vw,3.5rem)] font-bold leading-none tracking-tight">
                      <CountUp value={stat.value} duration={1600} />
                    </p>
                    <p className="mt-3 text-[0.98rem] font-medium text-white/92 sm:text-[1.05rem]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
