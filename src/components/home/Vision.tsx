"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/** Bhadresh plate locked to the Figma composite at 1920. */
export function Vision() {
  return (
    <section
      className="relative overflow-hidden bg-white py-[var(--section-y)]"
      aria-labelledby="vision-heading"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-12 xl:gap-16">
        <div className="relative mx-auto w-full max-w-[42rem]">
          <div className="relative aspect-[3624/2288]">
            <Image
              src="/images/vision-figma.png"
              alt="Mr. Bhadresh Kantilal Shah, Managing Director"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain object-center mix-blend-lighten"
              quality={90}
              priority
            />
            <SmokeVeil />
          </div>
        </div>

        <Reveal delay={120} className="relative lg:max-w-[34rem] lg:pl-1">
          <QuoteMark />
          <h2
            id="vision-heading"
            className="display relative mb-8 max-w-[12ch] text-[clamp(2.15rem,4.4vw,3.875rem)] font-semibold leading-[1.02] text-aia-navy lg:text-[3.875rem] lg:leading-[4.0625rem]"
          >
            A vision that continues to guide us.
          </h2>
          <p className="mb-8 max-w-[30rem] text-[1.05rem] italic leading-[1.7] text-aia-navy/55 sm:text-[1.15rem] md:text-[1.2rem] md:leading-[1.72]">
            Customer Excellence is our philosophy. Our focus remains on
            improving productivity while reducing environmental impact. We promise
            to deliver value through ethical, sustainable, and profitable means.
          </p>
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[0.5em] size-[7px] shrink-0 bg-aia-orange"
            />
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-aia-orange sm:text-[0.9rem]">
                Mr. Bhadresh Kantilal Shah
              </p>
              <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-aia-navy/40 sm:text-[0.75rem]">
                (Managing Director – AIA Engineering)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 72"
      className="pointer-events-none absolute right-0 -top-7 h-[3.75rem] w-[6.5rem] text-aia-orange/40 sm:-top-10 sm:h-[5rem] sm:w-[8.5rem]"
      fill="none"
    >
      <path
        d="M22 58c0-14 8-26 24-34l-4-12C22 22 4 36 4 58c0 10 6 16 16 16s16-6 16-16Zm54 0c0-14 8-26 24-34l-4-12C76 22 58 36 58 58c0 10 6 16 16 16s16-6 16-16Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmokeVeil() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-[-6%] bottom-0 z-20 h-[38%]">
      <span className="vision-smoke-cloud vision-smoke-a" />
      <span className="vision-smoke-cloud vision-smoke-b" />
      <span className="vision-smoke-cloud vision-smoke-c" />
      <div className="vision-haze absolute inset-0" />
    </div>
  );
}
