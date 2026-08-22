"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/data/content";

export function CaseStudies() {
  const [offset, setOffset] = useState(0);
  const ordered = [
    ...caseStudies.slice(offset),
    ...caseStudies.slice(0, offset),
  ];

  return (
    <section
      className="page-pad bg-[#f6f6f6] py-[var(--section-y)]"
      aria-labelledby="cases-heading"
    >
      <div className="mx-auto mb-10 flex max-w-[1440px] flex-col gap-6 sm:mb-14 lg:flex-row lg:items-start lg:justify-between">
        <Reveal>
        <h2
          id="cases-heading"
          className="display max-w-[828px] text-[clamp(1.9rem,5vw,3.875rem)] font-semibold leading-[1] text-aia-navy lg:text-[3.875rem] lg:leading-[3.875rem]"
        >
          When the challenge is real, performance has to be proven.
        </h2>
        </Reveal>
        <div className="flex shrink-0 flex-col gap-4 sm:items-end">
          <CtaButton href="/resources/case-studies" variant="solid">
            View case study
          </CtaButton>
          <div className="flex gap-3">
            <NavArrow
              label="Previous case studies"
              reverse
              onClick={() =>
                setOffset((v) => (v - 1 + caseStudies.length) % caseStudies.length)
              }
            />
            <NavArrow
              label="Next case studies"
              onClick={() => setOffset((v) => (v + 1) % caseStudies.length)}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {ordered.map((item, i) => (
          <Reveal key={item.href} delay={i * 100}>
          <a href={item.href} className="group block">
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[22px] bg-[#e8eaec]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:blur-[2px]"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 text-[0.78rem] uppercase tracking-[0.16em] text-white opacity-0 transition duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                Know More
                <span className="flex size-8 items-center justify-center rounded-full bg-aia-orange text-base text-white">
                  →
                </span>
              </span>
            </div>
            <h3 className="mb-2 text-[1.2rem] font-semibold leading-snug text-aia-navy sm:text-[1.35rem]">
              {item.title}
            </h3>
            <p className="text-sm text-aia-muted sm:text-[0.98rem]">{item.meta}</p>
          </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function NavArrow({
  label,
  onClick,
  reverse = false,
}: {
  label: string;
  onClick: () => void;
  reverse?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-aia-navy/20 text-lg leading-none text-aia-navy transition hover:border-aia-orange hover:text-aia-orange"
    >
      {reverse ? "‹" : "›"}
    </button>
  );
}
