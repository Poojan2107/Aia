"use client";

import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/content";
import { href } from "@/lib/routes";

const tabs = [
  { id: "mining", label: "For Mining", cta: "Explore mining services", route: "mining-services" },
  { id: "cement", label: "For Cement", cta: "Explore cement services", route: "cement-services" },
  { id: "thermal", label: "For Thermal", cta: "Explore Thermal Services", route: "thermal-power-services" },
] as const;

export function Services() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("mining");
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];
  const filtered = services.filter((s) => s.audience === tab);

  return (
    <section
      className="services-section w-full"
      style={{ backgroundColor: "#F7F7F7" }}
      aria-labelledby="services-heading"
    >
      <div className="page-pad page-max grid lg:grid-cols-[var(--col-services)_minmax(0,1fr)] lg:gap-x-[var(--gap-services)]">
        <div className="services-intro py-[var(--section-y)] lg:sticky lg:top-10 lg:self-start">
          <SectionLabel className="services-label mb-7">
            Services & support
          </SectionLabel>
          <h2 id="services-heading" className="services-heading ft ft-h62">
            <span>We don&apos;t just supply.</span>
            <span>We help you perform.</span>
          </h2>
          <p className="services-lede ft ft-body24">
            From liner design and grinding circuit surveys to on-site reline supervision, we support customers with application-focused engineering and technical services that help mills operate reliably and efficiently.
          </p>
          <CtaButton
            href={href(current.route)}
            variant="solid"
            className="services-cta"
          >
            {current.cta}
          </CtaButton>
        </div>

        <div className="services-panel min-w-0 pb-[var(--section-y)] lg:mt-0 lg:py-[var(--section-y)]">
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
                  className={`services-tab ft ft-tab${active ? " is-active" : ""}`}
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
                <h3 className="services-row-title ft ft-title24">{service.title}</h3>
                <p className="services-row-body ft ft-body24">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
