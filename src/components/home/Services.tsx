"use client";

import { useMemo, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/content";

const tabs = [
  { id: "mining", label: "For Mining" },
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
      className="bg-white py-[var(--section-y)]"
      aria-labelledby="services-heading"
    >
      <Reveal className="page-pad mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-20">
        <div>
          <SectionLabel className="mb-7">Services & support</SectionLabel>
          <h2
            id="services-heading"
            className="display mb-10 max-w-[11ch] text-[clamp(1.85rem,4.6vw,3.75rem)] text-aia-navy"
          >
            We don&apos;t just supply. We help you perform.
          </h2>
          <CtaButton
            href="/company/contact"
            variant="solid"
            className="w-full justify-center sm:w-auto"
          >
            Talk to an expert
          </CtaButton>
        </div>

        <div>
          <div className="mb-1 flex gap-10 border-b border-aia-line">
            {tabs.map((item) => {
              const active = item.id === tab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`relative pb-3 text-[1.05rem] font-medium transition-colors ${
                    active ? "text-aia-orange" : "text-aia-navy hover:text-aia-navy/70"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-0 -bottom-px h-[2px] bg-aia-orange" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <ul>
            {filtered.map((service) => (
              <li
                key={`${tab}-${service.title}`}
                className="grid gap-2 border-t border-aia-line py-5 md:grid-cols-[0.42fr_0.58fr] md:gap-10 md:py-6"
              >
                <h3 className="text-[1.05rem] font-semibold text-aia-navy md:text-[1.2rem]">
                  {service.title}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-aia-navy/50 md:text-[1.05rem]">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
