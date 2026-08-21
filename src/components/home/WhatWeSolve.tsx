import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { media } from "@/data/media";
import { stats } from "@/data/site";

export function WhatWeSolve() {
  return (
    <section className="bg-aia-surface-soft" aria-labelledby="what-we-solve-heading">
      <div className="page-pad grid gap-10 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-24">
        <SectionLabel>What we solve</SectionLabel>
        <div>
          <h2
            id="what-we-solve-heading"
            className="display mb-8 max-w-[20ch] text-[clamp(2rem,4vw,3.5rem)] text-aia-navy"
          >
            For over four decades, AIA been engineering longer life into the
            parts that keep industry moving.
          </h2>
          <CtaButton href="/solutions/mining" variant="solid">
            See how we solve wear
          </CtaButton>
        </div>
      </div>

      <div className="page-pad grid gap-10 pb-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <p className="max-w-xl text-lg leading-relaxed text-aia-navy/75 md:text-[1.35rem]">
          Across mining, cement, quarry and thermal power, we design and
          manufacture wear solutions for grinding and other demanding
          applications. Our expertise in metallurgy, engineering and
          manufacturing helps extend component life, improve equipment
          reliability and support better operating performance.
        </p>
        <MediaSlot
          poster="/images/what-we-solve.jpg"
          posterAlt="Aerial view of an industrial processing facility"
          src={media.whatWeSolve}
          className="aspect-[16/10] w-full bg-[#e8eaec]"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>

      <div className="relative min-h-[72vh]">
        <MediaSlot
          poster="/images/plant-aerial.jpg"
          posterAlt="AIA Engineering plant operations"
          src={media.whatWeSolveBand}
          overlay="soft"
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="page-pad relative z-10 flex min-h-[72vh] items-end pb-14 pt-24">
          <div className="grid w-full gap-8 border-t border-white/35 pt-8 text-white lg:grid-cols-[1fr_repeat(3,minmax(0,1fr))]">
            <p className="display text-[2rem] md:text-[2.5rem]">AIA Engineering</p>
            {stats.map((stat) => (
              <div key={stat.label} className="pt-1">
                <p className="display text-[clamp(3rem,5.5vw,6.5rem)] leading-none tracking-tight">
                  {stat.value}
                </p>
                <div className="mt-3 border-t border-white/35 pt-3 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
