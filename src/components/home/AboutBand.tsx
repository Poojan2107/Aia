import Image from "next/image";
import Link from "next/link";
import { footprint } from "@/data/site";

/**
 * Locked to public/screenshots/Screenshot 2026-08-21 171236.png
 * Soft plate · centered aerial · "About" | "AIA Engineering" flanking · outline CTA
 */
export function AboutBand() {
  return (
    <section aria-labelledby="about-heading">
      <div className="bg-[#bfcad0] py-16 sm:py-20 lg:py-24">
        <div className="page-pad relative mx-auto max-w-[1100px]">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-[820px] overflow-hidden">
            <Image
              src="/images/plant-aerial.png"
              alt="AIA Engineering industrial facility"
              fill
              sizes="(max-width: 1024px) 100vw, 820px"
              className="object-cover object-center"
              quality={92}
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-between gap-4 lg:flex xl:-mx-8">
            <p
              className="display text-[clamp(2.5rem,6vw,4.75rem)] leading-none text-white drop-shadow-[0_2px_16px_rgba(4,29,44,0.35)]"
              aria-hidden
            >
              About
            </p>
            <p
              className="display text-right text-[clamp(2.5rem,6vw,4.75rem)] leading-none text-white drop-shadow-[0_2px_16px_rgba(4,29,44,0.35)]"
              aria-hidden
            >
              AIA Engineering
            </p>
          </div>

          <h2
            id="about-heading"
            className="display mt-8 text-center text-[clamp(2rem,8vw,3rem)] text-white lg:sr-only"
          >
            About AIA Engineering
          </h2>

          <div className="relative z-10 mx-auto mt-10 max-w-[46rem] text-center sm:mt-12">
            <p className="mb-8 text-base leading-relaxed text-white sm:text-lg md:text-[1.15rem] md:leading-[1.65]">
              Across mining, cement, quarry and thermal power, we design and
              manufacture wear solutions for grinding and other demanding
              applications. Our expertise in metallurgy, engineering and
              manufacturing helps extend component life, improve equipment
              reliability and support better operating performance.
            </p>
            <Link
              href="/company/about"
              className="ui-caps inline-flex h-[50px] items-center gap-2.5 rounded-full border border-white/85 bg-transparent px-5 text-white transition hover:bg-white hover:text-aia-navy"
            >
              <span className="size-2 rounded-full bg-white" aria-hidden />
              Discover AIA
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-aia-surface-soft">
        <div className="page-pad grid grid-cols-2 gap-y-8 border-y border-aia-line py-10 sm:py-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-0 lg:divide-x lg:divide-aia-line">
          {footprint.map((item) => (
            <div key={item.label} className="px-3 text-center sm:px-4 md:px-6">
              <p className="display text-[clamp(1.75rem,6vw,3.5rem)] text-aia-orange">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-snug whitespace-pre-line text-aia-navy/60 sm:text-base md:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
