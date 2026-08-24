"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs, insights } from "@/data/content";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Sustainability() {
  return (
    <section
      className="sustain-section relative overflow-hidden bg-black text-white"
      aria-labelledby="sustain-heading"
    >
      <div className="relative min-h-[100svh] w-full lg:min-h-0 lg:aspect-[16/9]">
        <Image
          src="/images/mill-cutaway.png"
          alt="Industrial gear with a plant growing at its center beside an AIA facility"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-center"
          quality={90}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.58)_34%,rgba(0,0,0,0.22)_62%,rgba(0,0,0,0.06)_100%)]"
        />

        <div className="page-pad page-max relative z-10 flex min-h-[100svh] items-center py-16 sm:py-20 lg:absolute lg:inset-0 lg:min-h-0 lg:py-0">
          <div className="w-full max-w-[36rem] xl:max-w-[38rem]">
            <h2
              id="sustain-heading"
              className="display mb-6 text-[clamp(2rem,4vw,3.5rem)] !font-semibold leading-[1.05] lg:mb-7 lg:text-[3.5rem]"
            >
              <span className="block whitespace-nowrap">Can heavy industry</span>
              <span className="block whitespace-nowrap">think lighter?</span>
            </h2>

            <div className="max-w-[36rem] text-[1.05rem] font-light leading-[1.55] text-white sm:text-[1.2rem] sm:leading-[1.5] lg:text-[1.35rem] lg:leading-[1.48]">
              <p className="mb-0">
                YES, We believe it can. By using resources more efficiently,
                <br className="hidden sm:block" />
                reducing waste and embracing reuse and recycling,
              </p>
              <p className="mt-5 mb-0 sm:mt-6">
                we&apos;re working to lower the environmental impact of our
                <br className="hidden sm:block" />
                operations while continuing to deliver the performance
                <br className="hidden sm:block" />
                industry depends on.
              </p>
            </div>

            <div className="my-8 border-y border-white/[0.08] py-7 sm:my-9 sm:py-8">
              <div className="grid max-w-[32rem] grid-cols-2 gap-6 sm:gap-10">
                <div>
                  <p className="display text-[clamp(1.85rem,3.5vw,2.6rem)] !font-bold leading-none tracking-tight">
                    <CountUp value="1,00,000+" duration={1600} delay={0} />
                  </p>
                  <p className="mt-2.5 whitespace-nowrap text-[1.05rem] leading-snug text-white/85 sm:text-[1.15rem]">
                    Tree plantation during the year
                  </p>
                </div>
                <div>
                  <p className="display text-[clamp(1.85rem,3.5vw,2.6rem)] !font-bold leading-none tracking-tight">
                    <CountUp value="30%" duration={1400} delay={90} />
                  </p>
                  <p className="mt-2.5 max-w-[16rem] text-[1.05rem] leading-snug text-white/85 sm:text-[1.15rem]">
                    Energy comes from the renewable energy resources
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <CtaButton
                href="/company/sustainability"
                variant="outline-light"
                className="!h-9 w-full justify-center !gap-2 !border-white/90 !px-4 !text-[10px] !leading-none sm:w-auto [&>span:first-child]:!size-1"
              >
                See how we think lighter
              </CtaButton>
              <CtaButton
                href="/company/csr"
                variant="outline-light"
                className="!h-9 w-full justify-center !gap-2 !border-white/90 !px-4 !text-[10px] !leading-none sm:w-auto [&>span:first-child]:!size-1"
              >
                Social responsibility
              </CtaButton>
            </div>
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
      className="bg-[#f7f7f7] py-12 sm:py-14 lg:py-16"
      aria-labelledby="faq-heading"
    >
      <div className="page-pad page-max">
        <div className="grid border-y border-r border-[#d6d6d6] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center py-10 lg:border-r lg:border-[#d6d6d6] lg:py-0 lg:pr-10 xl:pr-12">
            <SectionLabel className="mb-4 !text-[13px] !leading-5 !font-medium">
              Frequently Asked Question
            </SectionLabel>
            <h2
              id="faq-heading"
              className="display mb-6 text-[clamp(1.5rem,3.2vw,2.5rem)] !font-bold leading-[1.1] tracking-[-0.01em] text-aia-navy lg:mb-7 lg:text-[2.5rem]"
            >
              <span className="sm:block sm:whitespace-nowrap">Here are the essentials </span>
              <span className="sm:block sm:whitespace-nowrap">about AIA, what we make, </span>
              <span className="sm:block sm:whitespace-nowrap">and how our solutions </span>
              <span className="sm:block sm:whitespace-nowrap">support your operations.</span>
            </h2>
            <CtaButton
              href="/company/contact"
              variant="solid"
              className="!h-[46px] w-fit !gap-2.5 !px-7 !text-[13px] !leading-none self-start [&>span:first-child]:!size-2"
            >
              Ask an expert
            </CtaButton>
          </div>

          <div className="min-w-0 divide-y divide-[#d6d6d6] max-lg:border-t max-lg:border-[#d6d6d6]">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.question}
                  className={isOpen ? "bg-[#f0f1f6]" : undefined}
                >
                  <button
                    type="button"
                    className="flex min-h-[64px] w-full items-center justify-between gap-5 px-7 py-[18px] text-left sm:px-8"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span
                      className={`min-w-0 flex-1 text-[1.1rem] leading-[1.4] sm:text-[1.1875rem] ${
                        isOpen
                          ? "font-medium text-aia-orange"
                          : "font-normal text-[#111]"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={`flex size-4 shrink-0 items-center justify-center transition-transform duration-300 ${
                        isOpen
                          ? "rotate-90 text-aia-orange"
                          : "text-[#111]/55"
                      }`}
                    >
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 10 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="block"
                      >
                        <path
                          d="M2 1.5L8 8L2 14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-7 pb-5 text-[0.875rem] font-normal leading-[1.55] text-[#5a5d63] sm:px-8 sm:text-[0.9375rem] sm:leading-[1.6]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
      <div className="page-max">
        <h2
          id="insights-heading"
          className="display text-center text-[clamp(1.85rem,3.229vw,3.875rem)] !font-bold leading-[1] text-aia-navy lg:text-[3.875rem] lg:leading-[3.875rem]"
        >
          Ideas & Insights from AIA
        </h2>

        <div className="mt-8 sm:mt-10">
          <div className="-mx-1 overflow-x-auto overscroll-x-contain">
            <div className="flex min-w-min gap-8 border-b border-[#d6d6d6] px-1 sm:gap-10">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`-mb-px shrink-0 border-b-2 pb-3 text-base transition-colors sm:text-lg ${
                    item === tab
                      ? "border-aia-orange text-aia-orange"
                      : "border-transparent text-aia-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div
            key={tab}
            className="stagger-in border-b border-[#d6d6d6] divide-y divide-[#d6d6d6]"
          >
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-aia-muted">
                More {tab.toLowerCase()} coming soon.
              </p>
            ) : (
              filtered.map((item, i) => (
                <article
                  key={item.href}
                  className="group grid items-center gap-6 py-8 sm:gap-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:gap-10"
                  style={{ ["--i" as string]: i }}
                >
                  <div className="order-2 flex flex-col justify-center lg:order-1">
                    <time
                      dateTime={item.date}
                      className="mb-4 block font-[family-name:var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#888888]"
                    >
                      {item.date}
                    </time>
                    <h3 className="display mb-6 max-w-[22ch] text-[clamp(1.35rem,3.2vw,2.25rem)] !font-bold leading-[1.1] text-aia-navy sm:mb-8">
                      {item.title}
                    </h3>
                    <a
                      href={item.href}
                      className="ui-caps inline-flex min-h-11 items-center gap-2 text-aia-orange hover:opacity-80"
                    >
                      Read article <span aria-hidden>›</span>
                    </a>
                  </div>

                  <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-[18px] bg-aia-surface-soft lg:order-2">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-[80%_center] transition duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="hidden shrink-0 pr-2 lg:order-3 lg:flex lg:items-center">
                    <a
                      href={item.href}
                      aria-label={`Read ${item.title}`}
                      className="flex size-11 items-center justify-center rounded-full border border-aia-orange bg-white text-aia-orange transition duration-300 hover:bg-aia-orange hover:text-white"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
