import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { media } from "@/data/media";
import { stats } from "@/data/site";

export function WhatWeSolve() {
  return (
    <section className="bg-aia-surface-soft" aria-labelledby="what-we-solve-heading">
      <div className="page-pad grid gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 lg:py-24">
        <SectionLabel className="lg:pt-2">What we solve</SectionLabel>
        <div>
          <h2
            id="what-we-solve-heading"
            className="display mb-8 max-w-[22ch] text-[clamp(1.85rem,4.5vw,3.5rem)] leading-[1.05] text-aia-navy"
          >
            For over four decades, AIA been engineering longer life into the
            parts that keep industry moving.
          </h2>
          <CtaButton
            href="/solutions/mining"
            variant="solid"
            className="w-full justify-center sm:w-auto"
          >
            See how we solve wear
          </CtaButton>
        </div>
      </div>

      <div className="page-pad grid gap-10 pb-14 sm:pb-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
        <p className="max-w-xl text-base leading-relaxed text-aia-navy/70 sm:text-lg md:text-[1.35rem] md:leading-relaxed">
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

      <div className="relative min-h-[56vh] sm:min-h-[72vh]">
        <MediaSlot
          poster="/images/plant-aerial.jpg"
          posterAlt="AIA Engineering plant operations"
          src={media.whatWeSolveBand}
          overlay="soft"
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="page-pad relative z-10 flex min-h-[56vh] items-end pb-10 pt-20 sm:min-h-[72vh] sm:pb-14 sm:pt-24">
          <div className="grid w-full gap-6 border-t border-white/35 pt-6 text-white sm:gap-8 sm:pt-8 lg:grid-cols-[1fr_repeat(3,minmax(0,1fr))]">
            <p className="display text-[1.5rem] sm:text-[2rem] md:text-[2.5rem]">
              AIA Engineering
            </p>
            {stats.map((stat) => (
              <div key={stat.label} className="pt-1">
                <p className="display text-[clamp(2.5rem,9vw,6.5rem)] leading-none tracking-tight">
                  {stat.value}
                </p>
                <div className="mt-3 border-t border-white/35 pt-3 text-base sm:text-lg">
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
