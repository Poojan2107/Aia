import Image from "next/image";

export function Vision() {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 lg:py-28"
      aria-labelledby="vision-heading"
    >
      <div className="page-pad grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-lg overflow-visible px-2 sm:px-0">
          {/* Orange geometric accents — scaled down on small screens */}
          <span
            aria-hidden
            className="absolute -left-2 top-10 size-0 scale-75 border-y-[28px] border-r-[48px] border-y-transparent border-r-aia-orange/90 sm:-left-6 sm:scale-100"
          />
          <span
            aria-hidden
            className="absolute -right-1 top-24 size-0 scale-75 border-y-[18px] border-l-[32px] border-y-transparent border-l-aia-orange sm:-right-4 sm:scale-100"
          />
          <span
            aria-hidden
            className="absolute bottom-24 left-0 size-0 scale-75 border-y-[14px] border-r-[24px] border-y-transparent border-r-aia-orange/70 sm:-left-2 sm:scale-100"
          />

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/vision-portrait.jpg"
              alt="Mr. Bhadresh Kantilal Shah, Managing Director"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-6 font-[family-name:var(--font-display)] text-[5rem] leading-none text-aia-orange/25 sm:-top-10 sm:text-[8rem] md:text-[10rem]"
          >
            ”
          </span>
          <h2
            id="vision-heading"
            className="display relative mb-8 max-w-[14ch] text-[clamp(2rem,4vw,3.875rem)] text-aia-navy"
          >
            A vision that continues to guide us.
          </h2>
          <p className="relative mb-10 max-w-xl text-lg leading-relaxed text-aia-navy/70 italic md:text-[1.5rem]">
            Customer Excellence is our philosophy. Our focus remains on improving
            productivity while reducing environmental impact. We promise to
            deliver value through ethical, sustainable, and profitable means.
          </p>
          <div>
            <p className="ui-caps text-aia-orange">
              · Mr. Bhadresh Kantilal Shah
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.06em] text-aia-muted">
              (Managing Director — AIA Engineering)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
