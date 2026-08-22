"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { caseStudies } from "@/data/content";

export function CaseStudies() {
  const [offset, setOffset] = useState(0);
  const ordered = [
    ...caseStudies.slice(offset),
    ...caseStudies.slice(0, offset),
  ];

  return (
    <section
      className="page-pad bg-aia-surface-soft py-14 sm:py-20 lg:py-28"
      aria-labelledby="cases-heading"
    >
      <div className="mx-auto mb-8 flex max-w-[1440px] flex-col gap-6 sm:mb-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <h2
          id="cases-heading"
          className="display max-w-[16ch] text-[clamp(1.85rem,4.8vw,3.875rem)] text-aia-navy"
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
              onClick={() =>
                setOffset((v) => (v - 1 + caseStudies.length) % caseStudies.length)
              }
              className="flex size-11 items-center justify-center rounded-full bg-aia-orange text-white transition hover:bg-aia-orange-deep"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next case studies"
              onClick={() => setOffset((v) => (v + 1) % caseStudies.length)}
              className="flex size-11 items-center justify-center rounded-full border border-aia-orange text-aia-orange transition hover:bg-aia-orange hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ordered.map((item) => (
          <a key={item.href} href={item.href} className="group block">
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl bg-[#e8eaec] sm:mb-5">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 flex items-center justify-center gap-3 bg-black/35 text-sm uppercase tracking-[0.12em] text-white opacity-100 transition duration-300 md:bg-black/0 md:opacity-0 md:group-hover:bg-black/40 md:group-hover:opacity-100">
                Know more
                <span className="flex size-8 items-center justify-center rounded-full bg-aia-orange text-white">
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
