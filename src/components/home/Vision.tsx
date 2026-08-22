import Image from "next/image";
import { assets } from "@/data/assets";

/** Figma vision — portrait already includes orange wedges + smoke */
export function Vision() {
  return (
    <section
      className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-28"
      aria-labelledby="vision-heading"
    >
      <div className="page-pad grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-20">
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative z-10 aspect-[5/4] overflow-hidden">
            <Image
              src={assets.vision}
              alt="Mr. Bhadresh Kantilal Shah, Managing Director"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-contain object-center"
              quality={92}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/70 to-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-1 -top-8 select-none font-[family-name:var(--font-serif)] text-[5.5rem] leading-none text-aia-orange/80 sm:-top-12 sm:text-[8rem]"
          >
            ”
          </span>
          <h2
            id="vision-heading"
            className="display relative mb-8 max-w-[14ch] text-[clamp(1.85rem,4.8vw,3.875rem)] text-aia-navy"
          >
            A vision that continues to guide us.
          </h2>
          <p className="mb-8 max-w-xl text-base italic leading-relaxed text-aia-navy/60 sm:text-lg md:text-[1.2rem] md:leading-[1.7]">
            Customer Excellence is our philosophy. Our focus remains on
            improving productivity while reducing environmental impact. We promise
            to deliver value through ethical, sustainable, and profitable means.
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-aia-orange sm:text-base">
            · Mr. Bhadresh Kantilal Shah
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-aia-muted sm:text-sm">
            (Managing Director – AIA Engineering)
          </p>
        </div>
      </div>
    </section>
  );
}
