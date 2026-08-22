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
        className="relative overflow-hidden bg-white shadow-[0_18px_60px_rgba(4,29,44,0.08)]"
        onMouseLeave={() => setActiveId(defaultId)}
      >
        <Image
          src="/images/world-map.jpg"
          alt="AIA global presence map"
          width={1800}
          height={880}
          className="h-auto w-full"
          quality={90}
        />

        <p
          aria-live="polite"
          className="pointer-events-none absolute left-4 top-4 z-[3] max-w-[18rem] sm:left-6 sm:top-5"
        >
          <span className="display block text-[clamp(1.6rem,3.6vw,2.75rem)] leading-none tracking-[-0.04em] text-aia-navy/16">
            {active.continent}
          </span>
          <span className="mt-2 block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-aia-navy/50">
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
      <p className="mt-3 text-sm text-aia-navy/55">
        <span className="font-semibold text-aia-navy">{active.continent}</span>
        {" — "}
        {active.city}, {active.country}
      </p>
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
  return (
    <button
      type="button"
      className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${site.x}%`, top: `${site.y}%` }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      aria-pressed={active}
      aria-label={`${site.city}, ${site.country}, ${site.continent}`}
    >
      <span
        className={`block rounded-full ring-2 ring-white transition-transform duration-300 ${
          site.kind === "office" ? "bg-aia-orange" : "bg-aia-navy"
        } ${active ? "size-3.5 scale-110" : "size-2.5"}`}
      />
      {active ? (
        <span
          aria-hidden
          className="hotspot-pulse absolute left-1/2 top-1/2 size-9 rounded-full border border-aia-orange/50"
        />
      ) : null}
    </button>
  );
}

function Tooltip({ site }: { site: Site }) {
  const flipDown = site.y < 28;
  const shift = site.x > 82 ? "-80%" : site.x < 18 ? "-20%" : "-50%";

  return (
    <aside
      className="pointer-events-none absolute z-[5] w-[min(17rem,72vw)] transition-[left,top] duration-300"
      style={{
        left: `${site.x}%`,
        top: `${site.y}%`,
        transform: flipDown
          ? `translate(${shift}, 22px)`
          : `translate(${shift}, calc(-100% - 22px))`,
      }}
    >
      <div className="relative">
        <span
          aria-hidden
          className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-[#f15a24]"
        />
        <span
          aria-hidden
          className="map-glow absolute -inset-6 -z-10 rounded-full"
        />
        <div className="relative bg-aia-orange px-4 py-3.5 text-white">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/75">
            {site.continent}
          </p>
          <p className="mt-1 text-[1.08rem] font-semibold leading-tight">
            {site.country}
          </p>
          <p className="mt-2 text-sm text-white/92">Tel. {site.phone}</p>
          <p className="mt-0.5 break-all text-sm text-white/92">
            Inquiry. {site.email}
          </p>
        </div>
        <span
          aria-hidden
          className="absolute left-1/2 top-full -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-aia-orange"
        />
      </div>
    </aside>
  );
}
