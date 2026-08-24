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
  const [expanded, setExpanded] = useState(false);
  const description = industry.description.replace(/\n/g, " ");

  return (
    <div
      className={`${overlay ? "absolute inset-0" : "relative"} flex flex-col justify-start ${className}`}
      style={style}
    >
      <div className="industry-title">
        <span className="industry-index">{industry.index}</span>
        <h3 className="industry-name">{industry.name}</h3>
      </div>
      <div className="industry-lede-wrap">
        <p className={`industry-lede${expanded ? " is-expanded" : ""}`}>
          {description}
        </p>
        <button
          type="button"
          tabIndex={interactive ? 0 : -1}
          className="industry-read-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>

      <ul
        className="industry-solutions"
        onMouseLeave={() => interactive && onActive(null)}
      >
        {industry.solutions.map((solution) => {
          const isActive = activeId === solution.id;
          return (
            <li key={solution.id} className="industry-solution">
              <button
                type="button"
                tabIndex={interactive ? 0 : -1}
                className={`industry-solution-btn group ${isActive ? "is-active" : ""}`}
                onClick={() => onActive(solution.id)}
                onMouseEnter={() => interactive && onActive(solution.id)}
                onFocus={() => interactive && onActive(solution.id)}
                onBlur={() => interactive && onActive(null)}
                aria-pressed={isActive}
              >
                <span className="industry-solution-label">{solution.label}</span>
                <span aria-hidden className="industry-solution-mark">
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
      </ul>

      <a
        href={industry.href}
        tabIndex={interactive ? 0 : -1}
        className="industry-cta"
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
  const solution = industry.solutions.find((item) => item.id === activeId);
  const points = solution?.hotspots ?? industry.hotspots;
  const src = solution?.image ?? industry.model.poster;
  const alt = solution
    ? (solution.imageAlt ?? solution.label)
    : inspect
      ? industry.model.alt
      : "";
  const squareSolution = Boolean(solution?.image.includes("/funnel/"));

  return (
    <div
      className={`${overlay ? "absolute inset-0" : "relative h-full"} flex items-center justify-center ${className}`}
      style={style}
    >
      <div
        className="industry-mill-frame relative w-full max-h-full"
        style={{
          width: squareSolution ? 420 : (industry.model.still?.width ?? 640),
          height: squareSolution ? 420 : (industry.model.still?.height ?? 360),
          aspectRatio: squareSolution ? "1 / 1" : industry.model.ratio,
          maxWidth: "min(100%, 520px)",
          maxHeight: "min(100%, 340px)",
        }}
      >
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={95}
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-contain object-center industry-mill-image"
        />
        {inspect ? (
          <div key={`${industry.id}-${solution?.id ?? "plate"}`} className="mill-inspect absolute inset-0">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden
            >
              {points.map((point, i) => {
                const { lx, ly } = labelPoint(point);
                const active = !solution && activeId === point.id;
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
            {points.map((point, i) => {
              const active = !solution && activeId === point.id;
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
                    onMouseEnter={() => {
                      if (!solution) onActive?.(point.id);
                    }}
                    onFocus={() => {
                      if (!solution) onActive?.(point.id);
                    }}
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
  const [active, setActive] = useState<string | null>(null);

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
