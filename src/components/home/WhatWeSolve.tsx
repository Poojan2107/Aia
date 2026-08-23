"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { CountUp } from "@/components/ui/CountUp";
import { media } from "@/data/media";
import { assets } from "@/data/assets";
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
 * Figma 2×2 plate first (label / heading / body / film).
 * KPI film stays as a sticky scene after that.
 */
export function WhatWeSolve() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(track);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const kpiIn = span(progress, 0.08, 0.72);
  const kpiEase = kpiIn * kpiIn * (3 - 2 * kpiIn);
  const kpiLocked = reduced || kpiEase > 0.9;

  return (
    <section
      className="relative bg-[#f7f7f7]"
      aria-labelledby="what-we-solve-heading"
      id="what-we-solve"
    >
      <div className="solve-plate">
        <SectionLabel className="solve-label">What we solve</SectionLabel>

        <div className="solve-main">
          <h2 id="what-we-solve-heading" className="solve-heading">
            For over four decades, AIA been engineering longer life into the
            parts that keep industry moving.
          </h2>
          <CtaButton href="/solutions/mining" variant="solid" className="h-[50px]">
            See how we solve wear
          </CtaButton>
        </div>

        <p className="solve-body">
          Across mining, cement, quarry and thermal power, we design and
          manufacture wear solutions for grinding and other demanding
          applications. Our expertise in metallurgy, engineering and
          manufacturing helps extend component life, improve equipment
          reliability and support better operating performance.
        </p>

        <div className="solve-film">
          <AmbientFilm
            src={media.whatWeSolve}
            poster={PLATE}
            className="absolute inset-0"
            position="center 42%"
            coverBleed
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>

      <div ref={track} className="relative h-[180vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#1a2228]">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translate3d(0, ${(1 - kpiEase) * 100}%, 0)` }}
          >
            <Image
              src={assets.plantAerial}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[50%_42%]"
              quality={90}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,20,0.38)_0%,rgba(6,14,20,0.32)_42%,rgba(6,14,20,0.58)_100%)]"
            />
            <div className="page-pad page-max relative z-10 flex h-full flex-col justify-end pb-[clamp(2.75rem,7.5vh,5.25rem)] pt-24">
              <div className="kpi-lockup">
                <div className="kpi-rule" />
                <div className="kpi-row">
                  <p className="kpi-brand">AIA Engineering</p>
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="kpi-stat">
                      <p className="kpi-value">
                        <CountUp
                          value={stat.value}
                          duration={1600}
                          delay={i * 90}
                          play={kpiLocked}
                        />
                      </p>
                      <p className="kpi-caption">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
