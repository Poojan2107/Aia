"use client";

import Image from "next/image";
import { sites, type Site } from "@/data/locations";

type Props = {
  className?: string;
};

const OFFICE = "#f36500";
const WAREHOUSE = "#006fff";

function siteColor(site: Site) {
  return site.kind === "warehouse" ? WAREHOUSE : OFFICE;
}

export function WorldMap({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-visible bg-white">
        <Image
          src="/images/world-map-v2.jpg"
          alt="AIA global presence map"
          width={1800}
          height={880}
          className="h-auto w-full select-none"
          quality={90}
          priority
        />

        {sites.map((site) => (
          <MarkerButton key={site.id} site={site} />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-20 z-[3] sm:bottom-0 sm:left-86">
        <ul className="flex flex-col gap-1.5 text-[0.6875rem] font-light tracking-[0.02em] text-black">
          <li className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: WAREHOUSE }}
            />
            Logistic Warehouses
          </li>
          <li className="flex items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: OFFICE }}
            />
            Subsidiary and Representative Offices
          </li>
        </ul>
      </div>
    </div>
  );
}

function MarkerButton({ site }: { site: Site }) {
  const color = siteColor(site);
  const flipDown = site.y < 28;
  const gap = 12;

  return (
    <button
      type="button"
      className="map-pin group absolute z-[2] -translate-x-1/2 -translate-y-1/2 p-1.5"
      style={{ left: `${site.x}%`, top: `${site.y}%` }}
      aria-label={`${site.city}, ${site.country}`}
    >
      <span
        className="block size-[7px] rounded-full transition-transform duration-300 group-hover:scale-[1.15] group-focus-visible:scale-[1.15]"
        style={{ background: color }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0 transition-opacity duration-200 group-hover:opacity-[0.55] group-focus-visible:opacity-[0.55]"
        style={{ borderColor: color }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0 transition-opacity duration-200 group-hover:opacity-[0.28] group-focus-visible:opacity-[0.28]"
        style={{ borderColor: color }}
      />

      <aside
        className="map-tooltip pointer-events-none absolute z-[5] hidden group-hover:block group-focus-visible:block"
        style={{
          left: "50%",
          top: flipDown ? `calc(100% + ${gap - 6}px)` : "auto",
          bottom: flipDown ? "auto" : `calc(100% + ${gap - 6}px)`,
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="relative whitespace-nowrap px-5 py-3.5 text-white"
          style={{
            background: color,
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.14)",
          }}
        >
          <p className="text-[1rem] font-medium leading-tight">
            {site.short ?? site.country}
          </p>
          <p className="mt-1.5 text-[0.8125rem] font-normal leading-snug text-white/92">
            Tel. {site.phone}
          </p>
          <p className="mt-0.5 text-[0.8125rem] font-normal leading-snug text-white/92">
            Inquiry. {site.email}
          </p>

          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2"
            style={
              flipDown
                ? {
                    bottom: "100%",
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderBottom: `9px solid ${color}`,
                  }
                : {
                    top: "100%",
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: `9px solid ${color}`,
                  }
            }
          />
        </div>
      </aside>
    </button>
  );
}
