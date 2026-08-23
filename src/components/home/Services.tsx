"use client";

import { useMemo, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/content";

const tabs = [
  { id: "mining", label: "For mining" },
  { id: "cement", label: "For Cement" },
] as const;

export function Services() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("mining");
  const filtered = useMemo(
    () => services.filter((s) => s.audience === tab),
    [tab],
  );

  return (
    <section
      className="bg-white"
      aria-labelledby="services-heading"
    >
      <div className="page-pad page-max grid lg:grid-cols-[var(--col-services)_minmax(0,1fr)] lg:gap-x-[var(--gap-services)]">
        <div className="lg:sticky lg:top-10 lg:self-start lg:py-[var(--section-y)]">
          <SectionLabel className="section-label-alt mb-7">
            Services & support
          </SectionLabel>
          <h2
            id="services-heading"
            className="display mb-10 max-w-[10ch] text-[clamp(1.9rem,3.23vw,3.875rem)] font-medium leading-[1.048] tracking-normal text-aia-navy lg:text-[3.875rem] lg:leading-[4.0625rem]"
          >
            We don&apos;t just supply.
            <br />
            We help you perform.
          </h2>
          <CtaButton href="/company/contact" variant="solid">
            Talk to an expert
          </CtaButton>
        </div>

        <div className="mt-12 min-h-0 lg:mt-0 lg:py-[var(--section-y)]">
          <div
            className="mb-1 flex gap-10 border-b border-aia-line"
            role="tablist"
            aria-label="Service audience"
          >
            {tabs.map((item) => {
              const active = item.id === tab;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(item.id)}
                  className={`relative pb-3 font-[family-name:var(--font-sinteca)] text-[1.25rem] font-medium leading-[1.875rem] tracking-tight transition-colors duration-300 ${
                    active
                      ? "text-aia-orange"
                      : "text-aia-navy/40 hover:text-aia-navy/70"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-px h-[1.5px] bg-aia-orange" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <ul key={tab} className="stagger-in">
            {filtered.map((service, i) => (
              <li
                key={`${tab}-${service.title}`}
                className="grid max-w-[1077px] items-start gap-2 border-t border-aia-line py-[1.15rem] transition-colors duration-300 hover:bg-[#fafafa] md:grid-cols-[minmax(11.2rem,316px)_1fr] md:gap-[8.8125rem] md:py-6"
                style={{ ["--i" as string]: i }}
              >
                <h3 className="text-[1.25rem] font-medium leading-[1.625rem] tracking-[0.35px] text-[#090909] md:text-[1.5rem] md:leading-[1.625rem]">
                  {service.title}
                </h3>
                <p className="text-[1.125rem] font-light leading-[1.5] text-[#090909] md:text-[1.5rem] md:leading-[2.125rem] md:tracking-[0.35px]">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
