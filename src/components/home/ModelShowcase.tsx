"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { Industry } from "@/data/industries";

type CopyProps = {
  industry: Industry;
  activeId: string | null;
  onActive: (id: string | null) => void;
  interactive?: boolean;
  overlay?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function IndustryCopy({
  industry,
  activeId,
  onActive,
  interactive = true,
  overlay = true,
  className = "",
  style,
}: CopyProps) {
  return (
    <div
      className={`${overlay ? "absolute inset-0" : "relative"} flex flex-col justify-start ${className}`}
      style={style}
    >
      <div className="industry-title mb-5 flex items-baseline gap-5 sm:mb-6 sm:gap-6">
        <span className="industry-index">{industry.index}</span>
        <h3 className="industry-name">{industry.name}</h3>
      </div>
      <p className="industry-lede mb-8 whitespace-pre-line sm:mb-10">
        {industry.description}
      </p>

      <ul className="mb-8 max-w-md sm:mb-10">
        {industry.solutions.map((solution) => {
          const isActive = activeId === solution.hotspotId;
          return (
            <li key={solution.id} className="border-t border-aia-line">
              <button
                type="button"
                tabIndex={interactive ? 0 : -1}
                className="group flex min-h-[3.25rem] w-full items-center justify-between gap-4 py-3.5 text-left sm:min-h-[3.75rem] sm:py-3.5"
                onClick={() => onActive(solution.hotspotId)}
                onMouseEnter={() => interactive && onActive(solution.hotspotId)}
                onFocus={() => interactive && onActive(solution.hotspotId)}
                aria-pressed={isActive}
              >
                <span
                  className={`text-[1.125rem] leading-[1.875rem] transition-colors duration-300 ${
                    isActive ? "font-medium text-aia-navy" : "font-normal text-[#090909]"
                  }`}
                  style={{ fontFamily: "var(--font-sinteca)" }}
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
        tabIndex={interactive ? 0 : -1}
        className="ui-caps inline-flex min-h-8 items-center gap-2 font-medium tracking-[0.08em] text-aia-orange transition-opacity hover:opacity-80"
      >
        Explore {industry.name}
        <span aria-hidden>›</span>
      </a>
    </div>
  );
}

type MillProps = {
  industry: Industry;
  activeId: string | null;
  onActive?: (id: string | null) => void;
  priority?: boolean;
  inspect?: boolean;
  overlay?: boolean;
  className?: string;
  style?: CSSProperties;
};

const LABEL_SHIFT: Record<string, string> = {
  left: "translate(-100%, -50%)",
  right: "translate(0, -50%)",
  top: "translate(-50%, -100%)",
  bottom: "translate(-50%, 0)",
};

function labelPoint(point: Industry["hotspots"][number]) {
  if (point.lx != null && point.ly != null) {
    return { lx: point.lx, ly: point.ly };
  }
  const pad = 11;
  const align = point.align ?? "right";
  return {
    lx: point.x + (align === "left" ? -pad : align === "right" ? pad : 0),
    ly: point.y + (align === "top" ? -pad : align === "bottom" ? pad : 0),
  };
}

export function IndustryMill({
  industry,
  activeId,
  onActive,
  priority = false,
  inspect = false,
  overlay = true,
  className = "",
  style,
}: MillProps) {
  return (
    <div
      className={`${overlay ? "absolute inset-0" : "relative h-full"} flex items-center justify-center ${className}`}
      style={style}
    >
      <div
        className="relative w-full max-h-full"
        style={{
          width: industry.model.still?.width ?? 778,
          height: industry.model.still?.height ?? 438,
          aspectRatio: industry.model.ratio,
          maxWidth: "min(100%, 778px)",
          maxHeight: "min(100%, 438px)",
        }}
      >
        <Image
          src={industry.model.poster}
          alt={inspect ? industry.model.alt : ""}
          fill
          priority={priority}
          quality={95}
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-contain object-center"
        />
        {inspect ? (
          <div key={industry.id} className="mill-inspect absolute inset-0">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              {industry.hotspots.map((point, i) => {
                const { lx, ly } = labelPoint(point);
                const active = activeId === point.id;
                return (
                  <line
                    key={point.id}
                    className="mill-leader"
                    x1={`${point.x}%`}
                    y1={`${point.y}%`}
                    x2={`${lx}%`}
                    y2={`${ly}%`}
                    stroke={
                      active
                        ? "var(--aia-orange)"
                        : point.tone === "slate"
                          ? "#2a3238"
                          : "#f0c424"
                    }
                    strokeWidth="1.15"
                    style={{ ["--i" as string]: i }}
                  />
                );
              })}
            </svg>
            {industry.hotspots.map((point, i) => {
              const active = activeId === point.id;
              const { lx, ly } = labelPoint(point);
              return (
                <span key={`${point.id}-pin`} style={{ ["--i" as string]: i }}>
                  <span
                    aria-hidden
                    className={`mill-pin ${active ? "is-active" : ""} ${point.tone === "accent" ? "is-accent" : ""}`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  />
                  <button
                    type="button"
                    className={`mill-callout ${active ? "is-active" : ""} ${point.tone === "slate" ? "is-slate" : ""} ${point.tone === "accent" ? "is-accent" : ""}`}
                    style={{
                      left: `${lx}%`,
                      top: `${ly}%`,
                      transform: LABEL_SHIFT[point.align ?? "right"],
                    }}
                    onMouseEnter={() => onActive?.(point.id)}
                    onFocus={() => onActive?.(point.id)}
                  >
                    {point.label}
                  </button>
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

type Props = {
  industry: Industry;
  priority?: boolean;
  compact?: boolean;
};

/** Static layout used when motion is reduced. */
export function ModelShowcase({
  industry,
  priority = false,
  compact = false,
}: Props) {
  const [active, setActive] = useState<string | null>(
    industry.solutions[0]?.hotspotId ?? industry.hotspots[0]?.id ?? null,
  );

  return (
    <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16 xl:gap-20">
      <div className="relative order-2 min-h-[28rem] lg:order-1">
        <IndustryCopy
          industry={industry}
          activeId={active}
          onActive={setActive}
          overlay={false}
        />
      </div>
      <div className="order-1 lg:order-2">
        <div
          className={`mill-well relative w-full overflow-visible ${
            compact ? "h-[min(58vh,34rem)]" : "aspect-[16/10]"
          }`}
          onMouseLeave={() =>
            setActive(
              industry.solutions[0]?.hotspotId ??
                industry.hotspots[0]?.id ??
                null,
            )
          }
        >
          <IndustryMill
            industry={industry}
            activeId={active}
            onActive={setActive}
            priority={priority}
            inspect
          />
        </div>
      </div>
    </div>
  );
}
