"use client";

import Image from "next/image";

/** Leadership plate — shard silhouettes lifted from the Figma Bhadresh art. */
export function Vision() {
  return (
    <section
      className="relative overflow-hidden bg-white py-[var(--section-y)]"
      aria-labelledby="vision-heading"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-8 xl:gap-12">
        <div className="relative mx-auto w-full max-w-[52rem]">
          <div className="relative aspect-[3624/2288]">
            <div
              aria-hidden
              className="absolute inset-0 bg-aia-orange"
              style={{
                WebkitMaskImage: "url(/images/vision-shards.png)",
                maskImage: "url(/images/vision-shards.png)",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
            <div className="absolute bottom-0 right-0 z-10 h-[96%] w-[72%]">
              <Image
                src="/images/vision-portrait-cutout.png"
                alt="Mr. Bhadresh Kantilal Shah, Managing Director"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain object-bottom"
                quality={92}
              />
            </div>
            <SmokeVeil />
          </div>
        </div>

        <div className="relative lg:pl-2">
          <QuoteMark />
          <h2
            id="vision-heading"
            className="display relative mb-8 max-w-[11ch] text-[clamp(2rem,5vw,4.25rem)] leading-[0.98] text-aia-navy"
          >
            A vision that continues to guide us.
          </h2>
          <p className="mb-10 max-w-[34rem] text-[1.05rem] italic leading-[1.7] text-aia-navy/55 sm:text-[1.2rem] md:text-[1.28rem] md:leading-[1.72]">
            Customer Excellence is our philosophy. Our focus remains on
            improving productivity while reducing environmental impact. We promise
            to deliver value through ethical, sustainable, and profitable means.
          </p>
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-[0.45em] size-[7px] shrink-0 bg-aia-orange"
            />
            <div>
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-aia-orange sm:text-[0.95rem]">
                Mr. Bhadresh Kantilal Shah
              </p>
              <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-aia-navy/40 sm:text-[0.78rem]">
                (Managing Director – AIA Engineering)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 72"
      className="pointer-events-none absolute -right-1 -top-4 h-[4.5rem] w-[7.5rem] text-aia-orange/35 sm:-top-8 sm:h-[5.75rem] sm:w-[9.5rem]"
      fill="none"
    >
      <path
        d="M22 58c0-14 8-26 24-34l-4-12C22 22 4 36 4 58c0 10 6 16 16 16s16-6 16-16Zm54 0c0-14 8-26 24-34l-4-12C76 22 58 36 58 58c0 10 6 16 16 16s16-6 16-16Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmokeVeil() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-[-6%] bottom-0 z-20 h-[46%]">
      <span className="vision-smoke-cloud vision-smoke-a" />
      <span className="vision-smoke-cloud vision-smoke-b" />
      <span className="vision-smoke-cloud vision-smoke-c" />
      <div className="vision-haze absolute inset-0" />
    </div>
  );
}
