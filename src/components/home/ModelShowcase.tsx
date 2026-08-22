"use client";

import Image from "next/image";
import { useState } from "react";
import type { Industry } from "@/data/industries";

type Props = {
  industry: Industry;
};

/**
 * Figma mill plates already include yellow callouts + leader lines.
 * Live layer = pulsing dots tied to the solution list.
 */
export function ModelShowcase({ industry }: Props) {
  const [active, setActive] = useState<string | null>(
    industry.solutions[0]?.hotspotId ?? industry.hotspots[0]?.id ?? null,
  );

  const activeHotspot = industry.hotspots.find((h) => h.id === active);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16 xl:gap-20">
      <div className="order-2 lg:order-1">
        <div className="mb-5 flex items-baseline gap-4 sm:mb-6 sm:gap-5">
          <span className="font-[family-name:var(--font-ui)] text-[1.75rem] font-normal text-aia-navy/18 sm:text-[2.15rem] md:text-[2.5rem]">
            {industry.index}
          </span>
          <h3 className="display text-[clamp(2.25rem,5.5vw,3.5rem)] text-aia-navy">
            {industry.name}
          </h3>
        </div>
        <p className="mb-8 max-w-[18ch] whitespace-pre-line text-[clamp(1.15rem,2.1vw,1.65rem)] leading-[1.25] text-aia-navy/40 sm:mb-10">
          {industry.description}
        </p>

        <ul className="mb-8 max-w-md sm:mb-10">
          {industry.solutions.map((solution) => {
            const isActive = active === solution.hotspotId;
            return (
              <li key={solution.id} className="border-t border-aia-line">
                <button
                  type="button"
                  className="group flex min-h-[3.25rem] w-full items-center justify-between gap-4 py-3.5 text-left sm:min-h-14 sm:py-4"
                  onClick={() => setActive(solution.hotspotId)}
                  onMouseEnter={() => setActive(solution.hotspotId)}
                  onFocus={() => setActive(solution.hotspotId)}
                  aria-pressed={isActive}
                >
                  <span
                    className={`text-[1.05rem] transition-colors duration-300 sm:text-[1.15rem] ${
                      isActive ? "font-semibold text-aia-navy" : "text-aia-muted"
                    }`}
                  >
                    {solution.label}
                  </span>
                  <span
                    aria-hidden
                    className={`flex size-[26px] shrink-0 items-center justify-center rounded-full bg-aia-orange text-white transition-all duration-300 ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-0 md:group-hover:opacity-100"
                    }`}
                  >
                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 8L8 2M8 2H3.5M8 2V6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </li>
            );
          })}
          <li className="border-t border-aia-line" />
        </ul>

        <a
          href={industry.href}
          className="ui-caps inline-flex min-h-11 items-center gap-2 font-semibold tracking-[0.1em] text-aia-orange transition-opacity hover:opacity-80"
        >
          Explore {industry.name}
          <span aria-hidden>›</span>
        </a>
      </div>

      <div className="order-1 lg:order-2">
        <div
          className="relative aspect-[16/10] w-full bg-white"
          onMouseLeave={() =>
            setActive(
              industry.solutions[0]?.hotspotId ??
                industry.hotspots[0]?.id ??
                null,
            )
          }
        >
          <Image
            src={industry.model.poster}
            alt={industry.model.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain object-center transition-transform duration-700 ease-[var(--ease-out)]"
            style={{ transform: active ? "scale(1.02)" : "scale(1)" }}
          />

          {industry.hotspots.map((hotspot) => {
            const isActive = active === hotspot.id;
            return (
              <button
                key={hotspot.id}
                type="button"
                className="absolute z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                aria-label={hotspot.label}
                aria-pressed={isActive}
                onClick={() => setActive(hotspot.id)}
                onMouseEnter={() => setActive(hotspot.id)}
                onFocus={() => setActive(hotspot.id)}
              >
                <span
                  className={`relative block size-2 rounded-full bg-[#f0c84a] transition-transform duration-300 ${
                    isActive ? "scale-125 hotspot-ring is-active" : ""
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-4 md:hidden">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-aia-muted">
            Tap a part
          </p>
          <ul className="flex flex-wrap gap-2">
            {industry.hotspots.map((hotspot) => {
              const isActive = active === hotspot.id;
              return (
                <li key={hotspot.id}>
                  <button
                    type="button"
                    onClick={() => setActive(hotspot.id)}
                    className={`min-h-10 rounded-full px-3.5 py-2 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-aia-orange text-white"
                        : "bg-aia-surface-soft text-aia-navy"
                    }`}
                    aria-pressed={isActive}
                  >
                    {hotspot.label}
                  </button>
                </li>
              );
            })}
          </ul>
          {activeHotspot ? (
            <p className="mt-3 text-sm text-aia-navy/70">
              Highlighted:{" "}
              <span className="font-semibold text-aia-navy">
                {activeHotspot.label}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
