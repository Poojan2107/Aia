"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs, insights } from "@/data/content";
import { CountUp } from "@/components/ui/CountUp";

export function Sustainability() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden text-white"
      aria-labelledby="sustain-heading"
    >
      <Image
        src="/images/sustainability-gear.jpg"
        alt="Industrial gear framing a growing plant"
        fill
        sizes="100vw"
        className="object-cover object-[62%_center]"
        quality={92}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,16,0.88)_0%,rgba(8,12,16,0.42)_42%,rgba(8,12,16,0.08)_68%,rgba(8,12,16,0.2)_100%)]"
      />
      <div
        aria-hidden
        className="sustain-haze pointer-events-none absolute inset-y-[18%] right-[8%] w-[46%]"
      />

      <div className="page-pad relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] items-center py-20 sm:py-24 lg:py-28">
        <div className="max-w-[36rem]">
          <h2
            id="sustain-heading"
            className="display mb-6 text-[clamp(2.1rem,5.6vw,4.35rem)] leading-[0.98]"
          >
            Can heavy industry think lighter?
          </h2>
          <p className="mb-10 text-base leading-relaxed text-white/90 sm:text-lg md:text-[1.22rem] md:leading-[1.65]">
            YES. We believe it can. By using resources more efficiently, reducing
            waste and embracing reuse and recycling, we&apos;re working to lower
            the environmental impact of our operations while continuing to deliver
            the performance industry depends on.
          </p>
          <div className="mb-10 grid gap-8 sm:mb-12 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="display text-[clamp(2.4rem,5.2vw,3.5rem)] font-bold leading-none">
                <CountUp value="1,00,000+" duration={1600} />
              </p>
              <p className="mt-3 text-base text-white/85 sm:text-lg">
                Tree plantation during the year
              </p>
            </div>
            <div>
              <p className="display text-[clamp(2.4rem,5.2vw,3.5rem)] font-bold leading-none">
                <CountUp value="30%" duration={1400} />
              </p>
              <p className="mt-3 text-base text-white/85 sm:text-lg">
                Energy comes from the renewable energy resources
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section
      className="bg-[#f4f4f4] py-[var(--section-y)]"
      aria-labelledby="faq-heading"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-16 xl:gap-24">
        <div>
          <SectionLabel className="mb-6">Frequently Asked Question</SectionLabel>
          <h2
            id="faq-heading"
            className="display mb-8 max-w-[13ch] text-[clamp(1.9rem,4.8vw,3.75rem)] leading-[1.02] text-aia-navy sm:mb-10"
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
              <div key={item.question} className="border-t border-aia-navy/15">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left sm:py-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span
                    className={`pr-4 text-[1.05rem] leading-snug sm:text-[1.25rem] md:text-[1.4rem] ${
                      isOpen ? "text-aia-orange" : "text-aia-navy"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 shrink-0 text-lg leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-90 text-aia-orange" : "text-aia-navy/70"
                    }`}
                  >
                    ›
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[42rem] pb-6 pr-8 text-[0.98rem] leading-relaxed text-aia-navy/70 sm:text-[1.05rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-aia-navy/15" />
        </div>
      </div>
    </section>
  );
}

const tabs = ["Blogs", "News", "Press Release"] as const;

export function Insights() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Blogs");
  const filtered = useMemo(
    () => insights.filter((item) => item.type === tab),
    [tab],
  );

  return (
    <section
      className="page-pad bg-white py-[var(--section-y)]"
      aria-labelledby="insights-heading"
    >
      <div className="mx-auto mb-8 max-w-[1440px] sm:mb-10">
        <h2
          id="insights-heading"
          className="display text-center text-[clamp(1.85rem,4.8vw,3.875rem)] text-aia-navy"
        >
          Ideas & Insights from AIA
        </h2>
        <div className="-mx-1 mt-8 overflow-x-auto overscroll-x-contain">
          <div className="flex min-w-min gap-8 border-b border-aia-line px-1 sm:gap-10">
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

      <div className="mx-auto max-w-[1440px] space-y-8 sm:space-y-10">
        {filtered.length === 0 ? (
          <p className="border-t border-aia-line py-10 text-center text-aia-muted">
            More {tab.toLowerCase()} coming soon.
          </p>
        ) : (
          filtered.map((item) => (
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
              <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-[22px] bg-aia-surface-soft lg:order-2">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
