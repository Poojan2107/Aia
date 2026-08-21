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
      className="page-pad bg-aia-surface-soft py-20 lg:py-28"
      aria-labelledby="cases-heading"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2
          id="cases-heading"
          className="display max-w-[16ch] text-[clamp(2rem,4vw,3.875rem)] text-aia-navy"
        >
          When the challenge is real, performance has to be proven.
        </h2>
        <div className="flex flex-col items-end gap-4">
          <CtaButton href="/resources/case-studies" variant="solid">
            View case study
          </CtaButton>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous case studies"
              className="flex size-10 items-center justify-center rounded-full border border-aia-orange text-aia-orange"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next case studies"
              className="flex size-10 items-center justify-center rounded-full border border-aia-line text-aia-muted"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cases.map((item) => (
          <a key={item.title} href="/resources/case-studies" className="group block">
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8eaec]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:blur-[1px]"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 text-sm uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                Know More
                <span className="flex size-8 items-center justify-center rounded-full bg-aia-orange">
                  →
                </span>
              </span>
            </div>
            <h3 className="mb-2 text-[1.35rem] leading-snug text-aia-navy">
              {item.title}
            </h3>
            <p className="text-aia-muted">{item.meta}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
