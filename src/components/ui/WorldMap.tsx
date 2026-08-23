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
        className="relative overflow-hidden rounded-[2px] bg-white ring-1 ring-aia-navy/10"
        onMouseLeave={() => setActiveId(defaultId)}
      >
        <Image
          src="/images/world-map.jpg"
          alt="AIA global presence map"
          width={1800}
          height={880}
          className="h-auto w-full select-none"
          quality={90}
          priority
        />

        <p
          key={active.id}
          aria-live="polite"
          className="caption-in pointer-events-none absolute left-5 top-4 z-[3] max-w-[20rem] sm:left-6 sm:top-5"
        >
          <span className="display block text-[clamp(1.75rem,3.8vw,2.85rem)] leading-none tracking-[-0.04em] text-aia-navy/28">
            {active.continent}
          </span>
          <span className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-aia-navy/55">
            {active.city}, {active.country}
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-[0.8rem] text-aia-navy/60">
          <span className="font-semibold text-aia-navy">{active.continent}</span>
          {" — "}
          {active.city}, {active.country}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium tracking-[0.04em] text-aia-navy/75">
          <li className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full bg-[#006fff] ring-2 ring-white" />
            Logistic Warehouses
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full bg-aia-orange ring-2 ring-white" />
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
      className="absolute z-[2] -translate-x-1/2 -translate-y-1/2 p-2"
      style={{ left: `${site.x}%`, top: `${site.y}%` }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-pressed={active}
      aria-label={`${site.city}, ${site.country}`}
    >
      <span
        className={`block size-2.5 rounded-full ring-2 ring-white shadow-[0_1px_4px_rgba(0,0,0,0.28)] transition-transform duration-300 ${
          active ? "scale-125" : "scale-100"
        }`}
        style={{ background: color }}
      />
      {active ? (
        <span
          aria-hidden
          className="hotspot-pulse absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{ borderColor: color }}
        />
      ) : null}
    </button>
  );
}

function Tooltip({ site }: { site: Site }) {
  const flipDown = site.y < 28;
  const shift = site.x > 78 ? "-86%" : site.x < 22 ? "-14%" : "-50%";

  return (
    <aside
      key={site.id}
      className="caption-in pointer-events-none absolute z-[5]"
      style={{
        left: `${site.x}%`,
        top: `${site.y}%`,
        transform: flipDown
          ? `translate(${shift}, 18px)`
          : `translate(${shift}, calc(-100% - 18px))`,
      }}
    >
      <div className="relative min-w-[18.5rem] max-w-[22rem] rounded-[2px] bg-aia-orange px-5 py-3.5 text-white shadow-[0_10px_28px_rgba(241,90,36,0.28)]">
        <p className="text-[1.05rem] font-semibold leading-tight">
          {site.short ?? site.country}
        </p>
        <p className="mt-2 text-[0.8125rem] leading-snug text-white/92">
          Tel. {site.phone}
        </p>
        <p className="mt-0.5 whitespace-nowrap text-[0.8125rem] leading-snug text-white/92">
          {site.email}
        </p>
        <span
          aria-hidden
          className={`absolute left-1/2 -translate-x-1/2 ${
            flipDown
              ? "bottom-full border-x-[7px] border-b-[8px] border-x-transparent border-b-aia-orange"
              : "top-full border-x-[7px] border-t-[8px] border-x-transparent border-t-aia-orange"
          }`}
        />
      </div>
    </aside>
  );
}
