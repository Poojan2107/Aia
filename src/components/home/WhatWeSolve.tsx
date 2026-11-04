"use client";

import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { CountUp } from "@/components/ui/CountUp";
import { media } from "@/data/media";
import { assets } from "@/data/assets";
import { stats } from "@/data/site";

const PLATE = "/images/what-we-solve.png";

/**
 * Figma 2×2 plate, then the aerial KPI plate — no empty sticky gap.
 */
export function WhatWeSolve() {
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

      <div className="relative h-[100svh] min-h-[32rem] overflow-hidden">
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,20,0.28)_0%,rgba(6,14,20,0.22)_42%,rgba(6,14,20,0.58)_100%)]"
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
                    />
                  </p>
                  <p className="kpi-caption">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
