"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs, insights } from "@/data/content";

export function Sustainability() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden text-white"
      aria-labelledby="sustain-heading"
    >
      <Image
        src="/images/sustainability-gear.jpg"
        alt="Industrial gear with a growing plant — heavy industry thinking lighter"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(4,29,44,0.82)_0%,rgba(4,29,44,0.55)_42%,rgba(4,29,44,0.25)_70%,rgba(4,29,44,0.45)_100%)]"
      />

      <div className="page-pad relative z-10 flex min-h-[100svh] flex-col justify-center py-16 sm:py-24 lg:max-w-[55%]">
        <h2
          id="sustain-heading"
          className="display mb-6 max-w-[14ch] text-[clamp(2rem,6vw,4.25rem)]"
        >
          Can heavy industry think lighter?
        </h2>
        <p className="mb-8 max-w-xl text-base leading-relaxed text-white/90 sm:mb-10 sm:text-lg md:text-[1.35rem]">
          YES, We believe it can. By using resources more efficiently, reducing
          waste and embracing reuse and recycling, we&apos;re working to lower
          the environmental impact of our operations while continuing to deliver
          the performance industry depends on.
        </p>
        <div className="mb-8 grid max-w-xl gap-6 sm:mb-10 sm:grid-cols-2 sm:gap-10">
          <div className="border-t border-white/30 pt-4">
            <p className="display text-[clamp(2.25rem,6vw,3.5rem)]">1,00,000+</p>
            <p className="mt-2 text-base text-white/85 sm:text-lg">
              Tree plantation during the year
            </p>
          </div>
          <div className="border-t border-white/30 pt-4">
            <p className="display text-[clamp(2.25rem,6vw,3.5rem)]">30%</p>
            <p className="mt-2 text-base text-white/85 sm:text-lg">
              Energy comes from the renewable energy resources
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          <CtaButton
            href="/company/sustainability"
            variant="outline-light"
            className="w-full justify-center sm:w-auto"
          >
            See how we think lighter
          </CtaButton>
          <CtaButton
            href="/company/csr"
            variant="outline-light"
            className="w-full justify-center sm:w-auto"
          >
            Social responsibility
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section
      className="page-pad grid gap-8 bg-white py-14 sm:gap-12 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div>
        <SectionLabel className="mb-6">Frequently Asked Question</SectionLabel>
        <h2
          id="faq-heading"
          className="display mb-8 max-w-[14ch] text-[clamp(1.85rem,4.8vw,3.875rem)] text-aia-navy sm:mb-10"
        >
          Here are the essentials about AIA, what we make, and how our solutions
          support your operations.
        </h2>
        <CtaButton
          href="/company/contact"
          variant="solid"
          className="w-full justify-center sm:w-auto"
        >
          Ask an expert
        </CtaButton>
      </div>

      <div>
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.question} className="border-t border-aia-line">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className="text-lg text-aia-navy sm:text-xl md:text-2xl">
                  {item.question}
                </span>
                <span aria-hidden className="mt-1 shrink-0 text-2xl text-aia-orange">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 pr-4 text-base leading-relaxed text-aia-navy/75 sm:pb-6 sm:pr-10 sm:text-lg">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t border-aia-line" />
      </div>
    </section>
  );
}

const tabs = ["Blogs", "News", "Press Release"] as const;

export function Insights() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Blogs");

  return (
    <section
      className="bg-white py-14 sm:py-20 lg:py-28"
      aria-labelledby="insights-heading"
    >
      <div className="page-pad mb-8 text-center sm:mb-10">
        <h2
          id="insights-heading"
          className="display text-[clamp(1.85rem,4.8vw,3.875rem)] text-aia-navy"
        >
          Ideas & Insights from AIA
        </h2>
        <div className="-mx-1 mt-6 overflow-x-auto overscroll-x-contain sm:mt-8">
          <div className="mx-auto flex min-w-min justify-center gap-6 border-b border-aia-line px-1 sm:gap-8">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`shrink-0 pb-3 text-base transition-colors sm:text-lg ${
                  item === tab
                    ? "border-b-2 border-aia-orange text-aia-orange"
                    : "text-aia-muted"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-pad space-y-8 sm:space-y-10">
        {insights.map((item, index) => (
          <article
            key={item.href}
            className="grid items-center gap-6 border-t border-aia-line pt-8 sm:gap-8 sm:pt-10 lg:grid-cols-[1fr_1.05fr]"
          >
            <div className="order-2 lg:order-1">
              <time
                dateTime={item.date}
                className="mb-4 block text-sm uppercase tracking-[0.06em] text-aia-muted"
              >
                {item.date}
              </time>
              <h3 className="display mb-6 max-w-[22ch] text-[clamp(1.35rem,4.2vw,2.5rem)] text-aia-navy sm:mb-8">
                {item.title}
              </h3>
              <a
                href={item.href}
                className="ui-caps inline-flex min-h-11 items-center gap-2 text-aia-orange hover:opacity-80"
              >
                Read article <span aria-hidden>›</span>
              </a>
            </div>
            <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-2xl bg-aia-surface-soft lg:order-2">
              <Image
                src={index === 0 ? "/images/insight-1.jpg" : "/images/mining-mill.png"}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              {index === 0 ? (
                <button
                  type="button"
                  aria-label="Next insight"
                  className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-aia-orange text-white shadow-lg sm:right-4"
                >
                  ›
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
