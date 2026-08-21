"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs, insights } from "@/data/content";
import { media } from "@/data/media";

export function Sustainability() {
  return (
    <section
      className="relative min-h-[100svh] text-aia-cream"
      aria-labelledby="sustain-heading"
    >
      <MediaSlot
        poster="/images/plant-aerial.jpg"
        posterAlt="Industrial landscape suggesting lighter, more efficient operations"
        src={media.sustainability}
        overlay="heavy"
        className="absolute inset-0"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(15,80,55,0.35),rgba(4,29,44,0.45)_55%,rgba(4,29,44,0.65))]"
      />
      <div className="page-pad relative z-10 flex min-h-[100svh] flex-col justify-center py-24">
        <h2
          id="sustain-heading"
          className="display mb-8 max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)]"
        >
          Can heavy industry think lighter?
        </h2>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-aia-cream/90 md:text-[1.75rem]">
          YES, We believe it can. By using resources more efficiently, reducing
          waste and embracing reuse and recycling, we&apos;re working to lower
          the environmental impact of our operations while continuing to deliver
          the performance industry depends on.
        </p>
        <div className="mb-12 grid max-w-3xl gap-10 sm:grid-cols-2">
          <div className="border-t border-white/25 pt-4">
            <p className="display text-[clamp(2.5rem,4vw,4rem)]">1,00,000+</p>
            <p className="mt-2 text-lg text-aia-cream/85">
              Tree plantation during the year
            </p>
          </div>
          <div className="border-t border-white/25 pt-4">
            <p className="display text-[clamp(2.5rem,4vw,4rem)]">30%</p>
            <p className="mt-2 text-lg text-aia-cream/85">
              Energy comes from the renewable energy resources
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <CtaButton href="/company/sustainability" variant="solid">
            See how we think lighter
          </CtaButton>
          <CtaButton
            href="/company/csr"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-aia-navy"
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
      className="page-pad grid gap-12 bg-white py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div>
        <SectionLabel className="mb-6">Frequently Asked Question</SectionLabel>
        <h2
          id="faq-heading"
          className="display mb-10 max-w-[14ch] text-[clamp(2rem,4vw,3.875rem)] text-aia-navy"
        >
          Here are the essentials about AIA, what we make, and how our solutions
          support your operations.
        </h2>
        <CtaButton href="/company/contact" variant="solid">
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
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className="text-xl text-aia-navy md:text-2xl">
                  {item.question}
                </span>
                <span aria-hidden className="mt-1 text-2xl text-aia-orange">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 pr-10 text-lg leading-relaxed text-aia-navy/75">
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
      className="bg-white py-20 lg:py-28"
      aria-labelledby="insights-heading"
    >
      <div className="page-pad mb-10 text-center">
        <h2
          id="insights-heading"
          className="display text-[clamp(2rem,4vw,3.875rem)] text-aia-navy"
        >
          Ideas & Insights from AIA
        </h2>
        <div className="mt-8 flex justify-center gap-8 border-b border-aia-line">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`pb-3 text-lg transition-colors ${
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

      <div className="page-pad space-y-10">
        {insights.map((item, index) => (
          <article
            key={item.href}
            className="grid items-center gap-8 border-t border-aia-line pt-10 lg:grid-cols-[1fr_1.05fr]"
          >
            <div>
              <time
                dateTime={item.date}
                className="mb-4 block text-sm uppercase tracking-[0.06em] text-aia-muted"
              >
                {item.date}
              </time>
              <h3 className="display mb-8 max-w-[22ch] text-[clamp(1.5rem,3vw,2.5rem)] text-aia-navy">
                {item.title}
              </h3>
              <a
                href={item.href}
                className="ui-caps inline-flex items-center gap-2 text-aia-orange hover:opacity-80"
              >
                Read article <span aria-hidden>›</span>
              </a>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-aia-surface-soft">
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
                  className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#2f6fed] text-white shadow-lg"
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
