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
      className="bg-white py-[var(--section-y)]"
      aria-labelledby="cases-heading"
    >
      <div className="page-pad page-max mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
        <Reveal>
          <h2
            id="cases-heading"
            className="display max-w-[828px] text-[clamp(1.55rem,2.6vw,2.75rem)] !font-bold leading-[1.05] text-aia-navy lg:text-[2.75rem] lg:leading-[2.9rem]"
          >
            <span className="block">When the challenge is real,</span>
            <span className="block">performance has to be proven.</span>
          </h2>
        </Reveal>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <CtaButton
            href="/resources/case-studies"
            variant="solid"
            className="!h-9 !gap-2 !px-5 !text-[11px] !leading-none [&>span:first-child]:!size-1.5"
          >
            View case study
          </CtaButton>
          <div className="flex gap-2.5">
            <NavArrow
              label="Previous case studies"
              reverse
              onClick={() =>
                setOffset(
                  (v) => (v - 1 + caseStudies.length) % caseStudies.length,
                )
              }
            />
            <NavArrow
              label="Next case studies"
              onClick={() => setOffset((v) => (v + 1) % caseStudies.length)}
            />
          </div>
        </div>
      </div>

      <div
        key={offset}
        className="stagger-in page-pad page-max grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
      >
        {ordered.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="group block min-w-0"
            style={{ ["--i" as string]: i }}
          >
            <div className="relative mb-5 aspect-[532/395] w-full overflow-hidden rounded-[1.25rem] bg-[#e8eaec]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 532px"
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
            <p className="text-sm text-aia-muted sm:text-[0.98rem]">
              {item.meta}
            </p>
          </a>
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
      className="size-8 text-[#c5c8cc] transition-colors duration-200 hover:text-[var(--aia-orange)]"
    >
      <svg
        className={`size-8 ${reverse ? "rotate-180" : ""}`}
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="20"
          cy="20"
          r="19.4"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M17.5459 15.5459C17.5999 15.4919 17.7034 15.4764 17.7881 15.5518L22.4473 20.2109C22.5236 20.2958 22.5083 20.3999 22.4541 20.4541V20.4551L17.793 25.1318C17.7076 25.2121 17.601 25.1974 17.5459 25.1426C17.5189 25.1156 17.5001 25.0741 17.5 25.0244C17.5 24.9745 17.5189 24.9323 17.5459 24.9053L22.1074 20.3438L17.5518 15.7881C17.4764 15.7034 17.4919 15.5999 17.5459 15.5459Z"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="translate(20 20) scale(1.45) translate(-20 -20)"
        />
      </svg>
    </button>
  );
}
