"use client";

import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/content";

const tabs = ["For mining", "For Cement"] as const;

export function Services() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("For mining");

  return (
    <section className="page-pad bg-aia-surface-soft py-14 sm:py-20 lg:py-28" aria-labelledby="services-heading">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionLabel className="mb-6">Services & support</SectionLabel>
          <h2
            id="services-heading"
            className="display mb-8 max-w-[12ch] text-[clamp(1.75rem,5vw,3.875rem)] text-aia-navy"
          >
            We don&apos;t just supply. We help you perform.
          </h2>
          <CtaButton href="/company/contact" variant="solid">
            Talk to an expert
          </CtaButton>
        </div>

        <div>
          <div className="mb-2 flex flex-wrap gap-x-8 gap-y-2 border-b border-aia-line">
            {tabs.map((item) => {
              const active = item === tab;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`pb-3 text-sm uppercase tracking-[0.08em] transition-colors ${
                    active
                      ? "border-b-2 border-aia-orange text-aia-orange"
                      : "text-aia-muted"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <ul>
            {services.map((service) => (
              <li
                key={service.title}
                className="grid gap-3 border-t border-aia-line py-5 md:grid-cols-[0.7fr_1.1fr] md:gap-8"
              >
                <h3 className="text-lg font-semibold text-aia-navy md:text-xl">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-aia-navy/65 md:text-lg">
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
