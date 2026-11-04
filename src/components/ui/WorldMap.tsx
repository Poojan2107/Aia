"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { sites, type Site } from "@/data/locations";

type Props = {
  className?: string;
  defaultId?: string;
};

export function WorldMap({ className = "", defaultId = "uae" }: Props) {
  const [activeId, setActiveId] = useState(defaultId);
  const active = useMemo(
    () => sites.find((site) => site.id === activeId) ?? sites[5],
    [activeId],
  );

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden bg-white"
        onMouseLeave={() => setActiveId(defaultId)}
      >
        <Image
          src="/images/world-map.jpg"
          alt="AIA global presence map"
          width={1800}
          height={880}
          className="block h-auto w-full scale-[1.06] select-none"
          quality={90}
          priority
        />

        <p
          key={active.id}
          aria-live="polite"
          className="caption-in pointer-events-none absolute left-4 top-3 z-[1] sm:left-5 sm:top-4"
        >
          <span className="display block text-[clamp(1.35rem,2.8vw,2.15rem)] leading-none tracking-[-0.04em] text-aia-navy/18">
            {active.continent}
          </span>
        </p>

        {sites.map((site) => (
          <MarkerButton
            key={site.id}
            site={site}
            active={site.id === active.id}
            onSelect={() => setActiveId(site.id)}
          />
        ))}

        <Tooltip site={active} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-[0.78rem] text-aia-navy/60">
          <span className="font-semibold text-aia-navy">{active.continent}</span>
          {" — "}
          {active.city}, {active.country}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tracking-[0.04em] text-aia-navy/70">
          <li className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-[#006fff] ring-2 ring-white" />
            Logistic Warehouses
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-aia-orange ring-2 ring-white" />
            Subsidiary and Representative Offices
          </li>
        </ul>
      </div>
    </div>
  );
}

function MarkerButton({
  site,
  active,
  onSelect,
}: {
  site: Site;
  active: boolean;
  onSelect: () => void;
}) {
  const color = site.kind === "warehouse" ? "#006fff" : "#f15a24";

  return (
    <button
      type="button"
      className="absolute z-[2] -translate-x-1/2 -translate-y-1/2 p-1.5"
      style={{ left: `${site.x}%`, top: `${site.y}%` }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-pressed={active}
      aria-label={`${site.city}, ${site.country}`}
    >
      <span
        className={`block size-2 rounded-full ring-2 ring-white shadow-[0_1px_3px_rgba(0,0,0,0.28)] transition-transform duration-300 ${
          active ? "scale-125" : "scale-100"
        }`}
        style={{ background: color }}
      />
      {active ? (
        <span
          aria-hidden
          className="hotspot-pulse absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: color }}
        />
      ) : null}
    </button>
  );
}

function Tooltip({ site }: { site: Site }) {
  const toLeft = site.x > 52;
  const nudge = site.y < 30 ? 10 : site.y > 70 ? -10 : 0;

  return (
    <aside
      key={site.id}
      className="caption-in pointer-events-none absolute z-[5]"
      style={{
        left: `${site.x}%`,
        top: `${site.y}%`,
        transform: toLeft
          ? `translate(calc(-100% - 12px), calc(-50% + ${nudge}px))`
          : `translate(12px, calc(-50% + ${nudge}px))`,
      }}
    >
      <div className="relative w-max max-w-[15.5rem] rounded-[3px] bg-aia-orange px-3 py-2 text-white shadow-[0_8px_20px_rgba(241,90,36,0.24)]">
        <p className="text-[0.9rem] font-semibold leading-none">
          {site.short ?? site.country}
        </p>
        <p className="mt-1.5 text-[0.7rem] leading-snug text-white/92">
          Tel. {site.phone}
        </p>
        <p className="mt-0.5 text-[0.7rem] leading-snug text-white/92">
          {site.email}
        </p>
        <span
          aria-hidden
          className={`absolute top-1/2 -translate-y-1/2 ${
            toLeft
              ? "left-full border-y-[6px] border-l-[7px] border-y-transparent border-l-aia-orange"
              : "right-full border-y-[6px] border-r-[7px] border-y-transparent border-r-aia-orange"
          }`}
        />
      </div>
    </aside>
  );
}
