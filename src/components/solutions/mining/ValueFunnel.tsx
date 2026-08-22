"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { miningPage } from "@/data/mining";

const { funnel } = miningPage;

type Focus = "production" | "cost" | "core" | null;
type Offering =
  | (typeof funnel.products)[number]
  | (typeof funnel.services)[number];

const allOfferings: Offering[] = [...funnel.products, ...funnel.services];

const PROD_ARC = "M 42 200 A 158 158 0 0 1 358 200";
const COST_ARC = "M 358 200 A 158 158 0 0 1 42 200";

function svgNum(n: number) {
  return n.toFixed(2);
}

const RING_TICKS = Array.from({ length: 72 }, (_, i) => {
  const angle = (i * 5 * Math.PI) / 180 - Math.PI / 2;
  const major = i % 6 === 0;
  const inner = 158 - (major ? 11 : 5);
  const outer = 158 + (major ? 1 : 0);
  return {
    x1: svgNum(200 + inner * Math.cos(angle)),
    y1: svgNum(200 + inner * Math.sin(angle)),
    x2: svgNum(200 + outer * Math.cos(angle)),
    y2: svgNum(200 + outer * Math.sin(angle)),
    major,
  };
});

function splitOffering(item: string) {
  const [lead, ...rest] = item.split(" : ");
  return { lead: lead.trim(), detail: rest.join(" : ").trim() };
}

function splitDriver(item: string) {
  const [main, ...rest] = item.split(/\s+[—–-]\s+/);
  return { main: main.trim(), note: rest.join(" · ").trim() };
}

function HoverInfographic({ item }: { item: Offering }) {
  const metric =
    "metric" in item && item.metric && "percent" in item && typeof item.percent === "number"
      ? { label: item.metric, percent: item.percent }
      : null;
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    setDrawn(false);
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [item.label]);

  const r = 38;
  const length = Math.PI * r;
  const filled = metric ? (metric.percent / 100) * length : 0;
  const gauge = `M 10 48 A ${r} ${r} 0 0 1 86 48`;

  return (
    <div className="absolute inset-0 text-white">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <line x1="100" y1="100" x2="100" y2="34" stroke="white" strokeOpacity="0.28" />
        <line x1="100" y1="100" x2="36" y2="112" stroke="white" strokeOpacity="0.28" />
        <line x1="100" y1="100" x2="164" y2="112" stroke="white" strokeOpacity="0.28" />
        <circle cx="100" cy="100" r="11" fill="none" stroke="var(--aia-orange)" strokeOpacity="0.45" />
        <circle cx="100" cy="100" r="4" fill="var(--aia-orange)" />
        <path d="M18 28 H32 M18 28 V42" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1.2" />
        <path d="M182 28 H168 M182 28 V42" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1.2" />
        <path d="M18 172 H32 M18 172 V158" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1.2" />
        <path d="M182 172 H168 M182 172 V158" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1.2" />
      </svg>
      <div className="funnel-scan pointer-events-none absolute inset-x-[12%] h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--aia-orange)_80%,white),transparent)]" />

      <div className="absolute left-1/2 top-[9%] w-[9.5rem] -translate-x-1/2 animate-fade-up text-center">
        <p className="font-[family-name:var(--font-ui)] text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
          Improve the mill
        </p>
        <p className="mt-0.5 text-[0.8rem] font-semibold leading-tight">{item.machine}</p>
      </div>

      <div className="absolute left-[7%] top-[44%] w-[5.6rem] animate-fade-up text-left [animation-delay:80ms]">
        <p className="font-[family-name:var(--font-ui)] text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
          Apply
        </p>
        <p className="mt-0.5 text-[0.78rem] font-semibold leading-tight">{item.apply}</p>
      </div>

      <div className="absolute right-[7%] top-[44%] w-[5.6rem] animate-fade-up text-right [animation-delay:80ms]">
        <p className="font-[family-name:var(--font-ui)] text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
          Client value
        </p>
        <p className="mt-0.5 text-[0.78rem] font-semibold leading-tight">{item.value}</p>
      </div>

      <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 flex-col items-center animate-fade-up [animation-delay:140ms]">
        {metric ? (
          <>
            <svg viewBox="0 0 96 56" className="w-[5.75rem]" aria-hidden>
              <path
                d={gauge}
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d={gauge}
                fill="none"
                stroke="var(--aia-orange)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={length.toFixed(2)}
                strokeDashoffset={(drawn ? length - filled : length).toFixed(2)}
                style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </svg>
            <p className="-mt-2 text-[0.78rem] font-bold tracking-wide">{metric.label}</p>
          </>
        ) : (
          <p className="rounded-full border border-white/20 bg-black/25 px-2.5 py-1 font-[family-name:var(--font-ui)] text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/80">
            {funnel.value}
          </p>
        )}
      </div>
    </div>
  );
}

function Ring({
  focus,
  uid,
  hasImage,
}: {
  focus: Focus;
  uid: string;
  hasImage: boolean;
}) {
  const prodOn = focus === "production" || focus === "core" || focus === null;
  const costOn = focus === "cost" || focus === "core" || focus === null;
  const prodHot = focus === "production" || focus === "core";
  const costHot = focus === "cost" || focus === "core";
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible text-aia-navy" aria-hidden>
      <defs>
        <filter id={`${uid}-prod`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-cost`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="200" cy="200" r="172" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
      <circle cx="200" cy="200" r="158" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" />

      <g
        className={focus === "core" ? "motion-safe:animate-[spin_28s_linear_infinite]" : ""}
        style={{ transformOrigin: "200px 200px" }}
      >
        {RING_TICKS.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="currentColor"
            strokeWidth={tick.major ? "1.25" : "0.6"}
            opacity={tick.major ? "0.28" : "0.1"}
          />
        ))}
      </g>

      <path
        className="text-aia-orange transition-[stroke-width,opacity] duration-500 ease-[var(--ease-out)]"
        d={PROD_ARC}
        fill="none"
        stroke="currentColor"
        strokeWidth={prodHot ? "7" : "3.5"}
        strokeLinecap="round"
        strokeOpacity={prodOn ? "1" : "0.18"}
        filter={prodHot ? `url(#${uid}-prod)` : undefined}
      />
      <path
        className="text-aia-orange transition-[stroke-width,opacity] duration-500 ease-[var(--ease-out)]"
        d={COST_ARC}
        fill="none"
        stroke="currentColor"
        strokeWidth={costHot ? "7" : "3.5"}
        strokeLinecap="round"
        strokeOpacity={costOn ? "1" : "0.18"}
        filter={costHot ? `url(#${uid}-cost)` : undefined}
      />

      {prodHot ? (
        <circle r="4.5" className="text-aia-orange" fill="currentColor">
          <animateMotion path={PROD_ARC} dur="2.1s" repeatCount="indefinite" />
        </circle>
      ) : null}
      {costHot ? (
        <circle r="4.5" className="text-aia-orange" fill="currentColor">
          <animateMotion path={COST_ARC} dur="2.1s" repeatCount="indefinite" />
        </circle>
      ) : null}

      <circle cx="200" cy="200" r="118" fill={hasImage ? "transparent" : "white"} />
      <circle cx="200" cy="200" r="118" fill="none" stroke="currentColor" strokeOpacity="0.1" />
    </svg>
  );
}

function OfferList({
  id,
  label,
  items,
  dimmed,
  activeLabel,
  onEnter,
  onItemEnter,
}: {
  id?: string;
  label: string;
  items: readonly Offering[];
  dimmed: boolean;
  activeLabel: string | null;
  onEnter: () => void;
  onItemEnter: (item: Offering) => void;
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-24 transition-opacity duration-500 ease-[var(--ease-out)] ${
        dimmed ? "opacity-30" : "opacity-100"
      }`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
    >
      <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-aia-orange">
        {label}
      </p>
      <ul className="mt-3">
        {items.map((item) => {
          const { lead, detail } = splitOffering(item.label);
          const active = activeLabel === item.label;
          return (
            <li key={item.label} className="border-b border-aia-line last:border-b-0">
              <button
                type="button"
                className={`group/row relative -mx-2 flex w-full cursor-pointer items-baseline gap-3 rounded-md px-2 py-2.5 text-left hover:bg-[color-mix(in_srgb,var(--aia-orange)_8%,transparent)] ${
                  active
                    ? "bg-[color-mix(in_srgb,var(--aia-orange)_10%,transparent)]"
                    : ""
                }`}
                onMouseEnter={() => onItemEnter(item)}
                onFocus={() => onItemEnter(item)}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-md after:absolute after:inset-0 after:translate-x-[-120%] after:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--aia-orange)_22%,transparent),transparent)] after:opacity-0 after:transition after:duration-700 after:ease-[var(--ease-out)] group-hover/row:after:translate-x-[120%] group-hover/row:after:opacity-100"
                />
                <span
                  aria-hidden
                  className={`size-1.5 shrink-0 translate-y-[-1px] rounded-full bg-aia-orange transition duration-300 ease-[var(--ease-out)] group-hover/row:scale-[1.85] group-hover/row:shadow-[0_0_14px_color-mix(in_srgb,var(--aia-orange)_75%,transparent)] ${
                    active ? "scale-[1.85]" : ""
                  }`}
                />
                <span className="relative z-[1] flex min-w-0 flex-1 items-baseline justify-between gap-3">
                  <span
                    className={`text-[0.92rem] leading-snug text-aia-navy transition-colors duration-300 group-hover/row:font-semibold ${
                      active ? "font-semibold" : ""
                    }`}
                  >
                    {lead}
                  </span>
                  {detail ? (
                    <span className="text-right text-[0.76rem] leading-snug text-aia-navy/40 transition-colors duration-300 group-hover/row:text-aia-navy/70">
                      {detail}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DriverRow({
  items,
  accentClass,
}: {
  items: readonly string[];
  accentClass: string;
}) {
  return (
    <ul className="flex flex-wrap items-baseline justify-center gap-x-1 gap-y-1 text-center">
      {items.map((item, i) => {
        const { main, note } = splitDriver(item);
        return (
          <li key={item} className="inline-flex items-baseline text-[0.78rem] leading-snug text-aia-navy/70">
            {i > 0 ? (
              <span aria-hidden className={`mr-1 ${accentClass}`}>
                ·
              </span>
            ) : null}
            <span>
              {main}
              {note ? <span className="ml-1 text-aia-navy/40">{note}</span> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function ValueFunnel() {
  const uid = useId().replace(/:/g, "");
  const [focus, setFocus] = useState<Focus>(null);
  const [active, setActive] = useState<Offering | null>(null);

  const dimProd = focus === "cost";
  const dimCost = focus === "production";
  const hasImage = Boolean(active);

  return (
    <div
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)_minmax(0,1fr)] lg:gap-8 xl:gap-12"
      aria-label="AIA products plus services give clients value enhancement through increased production and reduced operating cost"
      onMouseLeave={() => {
        setFocus(null);
        setActive(null);
      }}
    >
      <OfferList
        id="products"
        label="Products"
        items={funnel.products}
        dimmed={dimProd}
        activeLabel={active?.label ?? null}
        onEnter={() => {
          setFocus("production");
          setActive((current) =>
            current && funnel.products.some((item) => item.label === current.label)
              ? current
              : null,
          );
        }}
        onItemEnter={(item) => {
          setFocus("production");
          setActive(item);
        }}
      />

      <div className="order-first mx-auto w-full max-w-[30rem] lg:order-none">
        <div
          className={`transition-opacity duration-500 ease-[var(--ease-out)] ${
            dimProd ? "opacity-30" : "opacity-100"
          }`}
          onMouseEnter={() => {
            setFocus("production");
          }}
        >
          <p className="text-center font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-aia-orange">
            {funnel.production.title}
          </p>
          <div className="mt-2.5">
            <DriverRow items={funnel.production.items} accentClass="text-aia-orange/55" />
          </div>
        </div>

        <div
          className="group/core relative mx-auto mt-4 aspect-square w-full cursor-default"
          onMouseEnter={() => {
            setFocus("core");
          }}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-[16%] rounded-full transition-shadow duration-500 ease-[var(--ease-out)] ${
              focus === "production"
                ? "shadow-[inset_0_48px_70px_-28px_color-mix(in_srgb,var(--aia-orange)_35%,transparent)]"
                  : focus === "cost"
                    ? "shadow-[inset_0_-48px_70px_-28px_color-mix(in_srgb,var(--aia-orange)_35%,transparent)]"
                    : focus === "core"
                      ? "shadow-[inset_0_0_80px_color-mix(in_srgb,var(--aia-orange)_22%,transparent)]"
                    : ""
            }`}
          />
          <Ring focus={focus} uid={uid} hasImage={hasImage} />

          <div className="absolute inset-[20.5%] overflow-hidden rounded-full bg-white">
            {allOfferings.map((item) => (
              <Image
                key={item.image}
                src={item.image}
                alt={item.alt}
                fill
                sizes="30rem"
                className={`object-cover object-center transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${
                  active?.label === item.label
                    ? "scale-100 opacity-100"
                    : "scale-110 opacity-0"
                }`}
              />
            ))}
            <div
              aria-hidden
              className={`absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.72)_100%)] transition-opacity duration-500 ${
                hasImage ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="pointer-events-none absolute inset-[22%] flex items-center justify-center">
            <div
              className={`px-5 text-center transition-all duration-500 ${
                hasImage ? "translate-y-2 opacity-0" : "opacity-100"
              }`}
            >
              <p className="font-[family-name:var(--font-ui)] text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                <span className="text-aia-orange">Products</span>
                <span className="mx-1.5 text-aia-navy/30">+</span>
                <span className="text-aia-orange">Services</span>
              </p>
              <span
                aria-hidden
                className="mx-auto mt-3 mb-3 block h-px w-10 bg-aia-navy/15"
              />
              <p
                className={`display text-[clamp(1.7rem,3.6vw,2.25rem)] leading-[0.92] ${
                  focus === "production"
                    ? "text-aia-orange"
                    : focus === "cost"
                      ? "text-aia-orange"
                      : "text-aia-navy"
                }`}
              >
                {funnel.value.split(" ").map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </p>
              <p className="mt-3 font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-navy/40">
                For clients
              </p>
            </div>
            {active ? <HoverInfographic item={active} /> : null}
          </div>
        </div>

        <div
          className={`transition-opacity duration-500 ease-[var(--ease-out)] ${
            dimCost ? "opacity-30" : "opacity-100"
          }`}
          onMouseEnter={() => {
            setFocus("cost");
          }}
        >
          <div className="mt-4">
            <DriverRow items={funnel.cost.items} accentClass="text-aia-orange/55" />
          </div>
          <p className="mt-2.5 text-center font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-aia-orange">
            {funnel.cost.title}
          </p>
        </div>
      </div>

      <OfferList
        label="Services"
        items={funnel.services}
        dimmed={dimCost}
        activeLabel={active?.label ?? null}
        onEnter={() => {
          setFocus("cost");
          setActive((current) =>
            current && funnel.services.some((item) => item.label === current.label)
              ? current
              : null,
          );
        }}
        onItemEnter={(item) => {
          setFocus("cost");
          setActive(item);
        }}
      />
    </div>
  );
}
