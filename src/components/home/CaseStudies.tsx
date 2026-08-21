import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";

const cases = [
  {
    title: "40ft SAG mill in latin america",
    meta: "Life improvement - Throughput Increase - Power Reduction",
    image: "/images/case-1.jpg",
  },
  {
    title: "15ft Ball mill in India",
    meta: "Throughput Increase - Power Consumption",
    image: "/images/case-2.jpg",
  },
  {
    title: "34ft SAG mill in West Africa",
    meta: "Life improvement - Throughput Increase",
    image: "/images/case-3.jpg",
  },
] as const;

export function CaseStudies() {
  return (
    <section
      className="page-pad bg-aia-surface-soft py-14 sm:py-20 lg:py-28"
      aria-labelledby="cases-heading"
    >
      <div className="mb-8 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <h2
          id="cases-heading"
          className="display max-w-[16ch] text-[clamp(1.75rem,5vw,3.875rem)] text-aia-navy"
        >
          When the challenge is real, performance has to be proven.
        </h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:items-end">
          <CtaButton
            href="/resources/case-studies"
            variant="solid"
            className="w-full justify-center sm:w-auto"
          >
            View case study
          </CtaButton>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous case studies"
              className="flex size-11 items-center justify-center rounded-full border border-aia-orange text-aia-orange"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next case studies"
              className="flex size-11 items-center justify-center rounded-full border border-aia-line text-aia-muted"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <a key={item.title} href="/resources/case-studies" className="group block">
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8eaec] sm:mb-5">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03] md:group-hover:blur-[1px]"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-3 bg-black/20 text-sm uppercase tracking-[0.12em] text-white opacity-100 transition duration-300 md:bg-black/0 md:opacity-0 md:group-hover:bg-black/25 md:group-hover:opacity-100">
                Know More
                <span className="flex size-8 items-center justify-center rounded-full bg-aia-orange">
                  →
                </span>
              </span>
            </div>
            <h3 className="mb-2 text-[1.2rem] leading-snug text-aia-navy sm:text-[1.35rem]">
              {item.title}
            </h3>
            <p className="text-sm text-aia-muted sm:text-base">{item.meta}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
