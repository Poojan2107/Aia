import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { CountUp } from "@/components/ui/CountUp";
import { assets } from "@/data/assets";
import { media } from "@/data/media";
import { stats } from "@/data/site";

/** Figma Present: intro grid + full-viewport plant film with counting KPIs. */
export function WhatWeSolve() {
  return (
    <section
      className="bg-white"
      aria-labelledby="what-we-solve-heading"
      id="what-we-solve"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] items-start gap-x-12 gap-y-10 py-[var(--section-y)] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-x-16 lg:gap-y-14 xl:gap-x-24">
        <SectionLabel className="lg:pt-2">What we solve</SectionLabel>

        <Reveal>
          <h2
            id="what-we-solve-heading"
            className="display mb-8 max-w-[18ch] text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.03em] text-aia-navy sm:mb-10"
          >
            For over four decades, AIA has been engineering longer life into the
            parts that keep industry moving.
          </h2>
          <CtaButton href="/solutions/mining" variant="solid">
            See how we solve wear
          </CtaButton>
        </Reveal>

        <Reveal delay={80} className="self-end">
          <p className="max-w-[28rem] text-[1.05rem] leading-[1.7] text-aia-navy/55 sm:text-[1.125rem] md:text-[1.2rem] md:leading-[1.72]">
            Across mining, cement, quarry and thermal power, we design and
            manufacture wear solutions for grinding and other demanding
            applications. Our expertise in metallurgy, engineering and
            manufacturing helps extend component life, improve equipment
            reliability and support better operating performance.
          </p>
        </Reveal>

        <Reveal delay={140} className="relative aspect-[16/10] w-full overflow-hidden bg-[#d8dee2]">
          <AmbientFilm
            src={media.whatWeSolve}
            poster={assets.whatWeSolve}
            className="absolute inset-0"
            position="center 40%"
          />
        </Reveal>
      </div>

      <div className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#041d2c]">
        <AmbientFilm
          src={media.whatWeSolveBand}
          poster={assets.plantAerial}
          className="absolute inset-0"
          position="center 35%"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.08)_0%,rgba(4,29,44,0.18)_42%,rgba(4,29,44,0.78)_100%)]"
        />

        <div className="page-pad relative z-10 mx-auto flex h-full max-w-[1440px] items-end pb-10 pt-24 sm:pb-14 lg:pb-16">
          <div className="grid w-full items-end gap-8 border-t border-white/35 pt-7 text-white sm:gap-10 sm:pt-8 lg:grid-cols-[minmax(13rem,1fr)_repeat(3,minmax(0,1fr))]">
            <p className="display text-[clamp(1.5rem,2.8vw,2.35rem)] font-bold leading-[0.92] tracking-[-0.04em]">
              AIA
              <span className="mt-1 block font-semibold">Engineering</span>
            </p>
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start">
                <p className="display text-[clamp(2.5rem,5.4vw,4rem)] font-bold leading-none tracking-tight">
                  <CountUp value={stat.value} duration={1600} />
                </p>
                <p className="mt-3 w-full text-[0.95rem] font-medium text-white/92 sm:text-[1.05rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
