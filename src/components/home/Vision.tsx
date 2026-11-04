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
      <div className="page-pad page-max grid items-center gap-10 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-12 xl:gap-16">
        <div className="relative mx-auto w-full max-w-[42rem]">
          <div className="relative aspect-[3624/2288]">
            <Image
              src="/images/vision-figma.png"
              alt="Mr. Bhadresh Kantilal Shah, Managing Director"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-contain object-center"
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
            className="display relative mb-8 max-w-[12ch] text-[clamp(2.15rem,4.4vw,3.875rem)] font-medium leading-[1.02] text-aia-navy lg:text-[3.875rem] lg:leading-[4.0625rem]"
          >
            A vision that continues to guide us.
          </h2>
          <p className="mb-8 max-w-[32rem] text-[1.15rem] font-light italic leading-[1.55] text-[#555] sm:text-[1.35rem] md:text-[1.5rem] md:leading-[2.125rem]">
            Customer Excellence is our philosophy. Our focus remains on
            improving productivity while reducing environmental impact. We promise
            to deliver value through ethical, sustainable, and profitable means.
          </p>
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-1.5 shrink-0 bg-aia-orange"
              />
              <p className="font-[family-name:var(--font-ui)] text-[0.875rem] font-medium uppercase tracking-[0.08em] text-aia-orange">
                MR. BHADRESH KANTILAL SHAH
              </p>
            </div>
            <p className="mt-1.5 pl-4 font-[family-name:var(--font-ui)] text-[0.72rem] uppercase tracking-[0.08em] text-[#8a8a8a]">
              [MANAGING DIRECTOR - AIA ENGINEERING]
            </p>
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
      viewBox="0 0 90 58"
      className="pointer-events-none absolute right-0 -top-3 h-12 w-[3.75rem] text-aia-orange/50 sm:-top-6 sm:h-16 sm:w-[5.25rem]"
      fill="none"
    >
      <path
        d="M36 54H6V34C6 18 18 10 36 6v11c-8 3.5-14 9-14 17h14v20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M84 54H56V34C56 18 68 10 86 6v11c-8 3.5-14 9-14 17h14v20Z"
        stroke="currentColor"
        strokeWidth="2"
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
