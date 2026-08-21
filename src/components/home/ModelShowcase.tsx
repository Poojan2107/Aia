"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Industry } from "@/data/industries";

type Props = {
  industry: Industry;
};

export function ModelShowcase({ industry }: Props) {
  const [active, setActive] = useState<string | null>(
    industry.solutions[0]?.hotspotId ?? industry.hotspots[0]?.id ?? null,
  );

  const linkedIds = useMemo(
    () => new Set(industry.solutions.map((s) => s.hotspotId)),
    [industry.solutions],
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] lg:gap-14">
      <div>
        <div className="mb-5 flex items-baseline gap-5">
          <span className="font-[family-name:var(--font-ui)] text-[1.75rem] text-aia-navy/25 md:text-[2rem]">
            {industry.index}
          </span>
          <h3 className="display text-[clamp(2.5rem,4vw,3.25rem)] text-aia-navy">
            {industry.name}
          </h3>
        </div>
        <p className="mb-8 max-w-md whitespace-pre-line text-[clamp(1.35rem,2.2vw,2.5rem)] leading-[1.12] text-aia-navy/55">
          {industry.description}
        </p>

        <ul className="mb-8 max-w-md">
          {industry.solutions.map((solution) => {
            const isActive = active === solution.hotspotId;
            return (
              <li key={solution.id} className="border-t border-aia-line">
                <button
                  type="button"
                  className="group flex w-full items-center justify-between py-4 text-left"
                  onMouseEnter={() => setActive(solution.hotspotId)}
                  onFocus={() => setActive(solution.hotspotId)}
                  aria-pressed={isActive}
                >
                  <span
                    className={`text-lg transition-colors duration-300 ${
                      isActive ? "font-semibold text-aia-navy" : "text-aia-muted"
                    }`}
                  >
                    {solution.label}
                  </span>
                  <span
                    aria-hidden
                    className={`flex size-[25px] items-center justify-center rounded-full bg-aia-orange text-white transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90 group-hover:opacity-100"
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
          className="ui-caps inline-flex items-center gap-2 text-aia-orange transition-opacity hover:opacity-80"
        >
          Explore {industry.name}
          <span aria-hidden>›</span>
        </a>
      </div>

      <div
        className="relative aspect-[16/10] w-full bg-white"
        onMouseLeave={() =>
          setActive(
            industry.solutions[0]?.hotspotId ?? industry.hotspots[0]?.id ?? null,
          )
        }
      >
        <div className="absolute inset-0">
          <Image
            src={industry.model.poster}
            alt={industry.model.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain object-center transition-transform duration-700 ease-[var(--ease-out)]"
            style={{ transform: active ? "scale(1.02)" : "scale(1)" }}
          />
        </div>

        {industry.hotspots.map((hotspot) => {
          const isActive = active === hotspot.id;
          const isLinked = linkedIds.has(hotspot.id);
          const tone = hotspot.tone ?? "yellow";
          const labelClass =
            tone === "yellow"
              ? "bg-[#f5d76e] text-aia-navy"
              : "bg-[#3a4550] text-white";

          const align = hotspot.align ?? "right";
          const labelPos =
            align === "left"
              ? "right-full top-1/2 mr-3 -translate-y-1/2"
              : align === "top"
                ? "bottom-full left-1/2 mb-3 -translate-x-1/2"
                : align === "bottom"
                  ? "top-full left-1/2 mt-3 -translate-x-1/2"
                  : "left-full top-1/2 ml-3 -translate-y-1/2";

          return (
            <button
              key={hotspot.id}
              type="button"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={hotspot.label}
              onMouseEnter={() => setActive(hotspot.id)}
              onFocus={() => setActive(hotspot.id)}
            >
              <span
                className={`relative block size-2.5 rounded-full transition-transform duration-300 ${
                  isActive ? "scale-125 bg-aia-orange" : "bg-[#f5d76e]"
                } ${isActive || isLinked ? "hotspot-ring is-active" : ""}`}
              />
              <span
                className={`pointer-events-none absolute whitespace-nowrap rounded-[2px] px-2 py-1 text-[11px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-all duration-300 ${labelClass} ${labelPos} ${
                  isActive
                    ? "opacity-100"
                    : "opacity-80"
                }`}
              >
                {hotspot.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
