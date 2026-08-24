"use client";

import { useMemo, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
      className="services-section w-full"
      style={{ backgroundColor: "#F7F7F7" }}
      aria-labelledby="services-heading"
    >
      <div className="page-pad page-max grid lg:grid-cols-[var(--col-services)_minmax(0,1fr)] lg:gap-x-[var(--gap-services)]">
        <div className="services-intro lg:sticky lg:top-10 lg:self-start lg:py-[var(--section-y)]">
          <SectionLabel className="services-label mb-7">
            Services & support
          </SectionLabel>
          <h2 id="services-heading" className="services-heading">
            <span>We don&apos;t just supply.</span>
            <span>We help you perform.</span>
          </h2>
          <CtaButton
            href="/company/contact"
            variant="solid"
            className="services-cta"
          >
            Talk to an expert
          </CtaButton>
        </div>

        <div className="services-panel mt-12 min-w-0 lg:mt-0 lg:py-[var(--section-y)]">
          <div
            className="services-tabs"
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
                  className={`services-tab${active ? " is-active" : ""}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <ul key={tab} className="services-list stagger-in">
            {filtered.map((service, i) => (
              <li
                key={`${tab}-${service.title}`}
                className="services-row"
                style={{ ["--i" as string]: i }}
              >
                <h3 className="services-row-title">{service.title}</h3>
                <p className="services-row-body">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
