import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/data/site";

/** Locked to screenshots 171058 + 171108 */
export function WhatWeSolve() {
  return (
    <section
      className="bg-white"
      aria-labelledby="what-we-solve-heading"
      id="what-we-solve"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] items-start gap-x-12 gap-y-10 py-[var(--section-y)] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-x-16 xl:gap-x-24">
        <SectionLabel className="lg:pt-2">What we solve</SectionLabel>

        <Reveal>
          <h2
            id="what-we-solve-heading"
            className="display mb-10 max-w-[20ch] text-[clamp(1.85rem,3.8vw,3.15rem)] leading-[1.08] tracking-[-0.03em] text-aia-navy"
          >
            For over four decades, AIA has been engineering longer life into the
            parts that keep industry moving.
          </h2>
          <CtaButton href="/solutions/mining" variant="solid">
            See how we solve wear
          </CtaButton>
        </Reveal>

        <p className="max-w-[28rem] text-[1.05rem] leading-[1.7] text-aia-navy/55 sm:text-[1.125rem] md:text-[1.2rem] md:leading-[1.72] lg:mt-2">
          Across mining, cement, quarry and thermal power, we design and
          manufacture wear solutions for grinding and other demanding
          applications. Our expertise in metallurgy, engineering and
          manufacturing helps extend component life, improve equipment
          reliability and support better operating performance.
        </p>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8eaec]">
          <Image
            src="/images/what-we-solve.png"
            alt="Aerial view of an industrial processing facility"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
            quality={92}
          />
        </div>
      </div>

      <div className="relative min-h-[62vh] sm:min-h-[72vh] lg:min-h-[82vh]">
        <Image
          src="/images/plant-aerial.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
          quality={92}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.1)_0%,rgba(4,29,44,0.28)_48%,rgba(4,29,44,0.7)_100%)]"
        />

        <div className="page-pad mx-auto relative z-10 flex min-h-[62vh] max-w-[1440px] items-end pb-10 pt-20 sm:min-h-[72vh] sm:pb-14 lg:min-h-[82vh] lg:pb-16">
          <div className="grid w-full items-end gap-8 border-t border-white/40 pt-7 text-white sm:gap-10 sm:pt-8 lg:grid-cols-[minmax(12rem,0.9fr)_repeat(3,minmax(0,1fr))]">
            <p className="display text-[clamp(1.45rem,2.6vw,2.25rem)] font-bold leading-tight">
              AIA Engineering
            </p>
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start">
                <p className="display text-[clamp(2.4rem,5.2vw,3.85rem)] font-bold leading-none tracking-tight text-white">
                  <CountUp value={stat.value} />
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
