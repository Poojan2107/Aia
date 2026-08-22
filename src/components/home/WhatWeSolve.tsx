import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/site";

/** Locked to screenshots 171058 + 171108 */
export function WhatWeSolve() {
  return (
    <section
      className="bg-white"
      aria-labelledby="what-we-solve-heading"
      id="what-we-solve"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] gap-x-12 gap-y-12 py-[4.5rem] sm:py-20 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-x-[4.5rem] lg:gap-y-16 lg:py-24 xl:gap-x-24">
        <SectionLabel className="lg:pt-1">What we solve</SectionLabel>

        <div>
          <h2
            id="what-we-solve-heading"
            className="display mb-8 max-w-[22ch] text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.08] tracking-[-0.03em] text-aia-navy"
          >
            For over four decades, AIA has been engineering longer life into the
            parts that keep industry moving.
          </h2>
          <CtaButton href="/solutions/mining" variant="solid">
            See how we solve wear
          </CtaButton>
        </div>

        <p className="max-w-[32rem] self-center text-[1.05rem] leading-[1.7] text-aia-navy/65 sm:text-[1.125rem] md:text-[1.2rem] md:leading-[1.7]">
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

      <div className="relative min-h-[62vh] sm:min-h-[72vh] lg:min-h-[80vh]">
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
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.12)_0%,rgba(4,29,44,0.28)_50%,rgba(4,29,44,0.68)_100%)]"
        />

        <div className="page-pad pointer-events-none absolute inset-x-0 top-[16%] z-10 hidden lg:block">
          <div className="grid max-w-xl grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={`overlay-${stat.label}`}
                className="border border-white/35 bg-black/25 px-4 py-3 backdrop-blur-sm"
              >
                <p className="display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.06em] text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="page-pad mx-auto relative z-10 flex min-h-[60vh] max-w-[1440px] items-end pb-10 pt-20 sm:min-h-[68vh] sm:pb-12 lg:min-h-[76vh] lg:pb-14">
          <div className="grid w-full items-end gap-6 border-t border-white/35 pt-6 text-white sm:gap-8 sm:pt-8 lg:grid-cols-[minmax(11rem,0.85fr)_repeat(3,minmax(0,1fr))]">
            <p className="display text-[clamp(1.35rem,2.4vw,2.15rem)] font-bold leading-tight">
              AIA Engineering
            </p>
            {stats.map((stat, idx) => (
              <div key={stat.label} className="flex flex-col items-start">
                <div
                  className={`inline-flex items-center justify-center rounded-[3px] px-5 py-2.5 shadow-md ${
                    idx === 1 ? "bg-[#041d2c] border border-white/20" : "bg-[#006fff]"
                  }`}
                >
                  <p className="display text-[clamp(2.2rem,5vw,3.85rem)] font-bold leading-none tracking-tight text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="mt-3 w-full border-t border-white/35 pt-2.5 text-[0.95rem] font-medium text-white/95 sm:text-[1.05rem]">
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
