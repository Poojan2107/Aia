"use client";

import Image from "next/image";
import { useState } from "react";

type Marker = {
  id: string;
  x: number;
  y: number;
  kind: "office" | "warehouse";
  label: string;
  detail?: string;
};

const MARKERS: Marker[] = [
  { id: "usa", x: 22, y: 42, kind: "office", label: "Americas" },
  { id: "br", x: 32, y: 68, kind: "warehouse", label: "South America" },
  { id: "uk", x: 47, y: 32, kind: "office", label: "Europe" },
  { id: "eu", x: 51, y: 36, kind: "warehouse", label: "Europe" },
  { id: "za", x: 54, y: 72, kind: "warehouse", label: "Africa" },
  {
    id: "uae",
    x: 61.5,
    y: 46,
    kind: "office",
    label: "UAE",
    detail: "Tel. +253 998 6542 336",
  },
  { id: "in", x: 68, y: 48, kind: "office", label: "India" },
  { id: "inw", x: 70, y: 52, kind: "warehouse", label: "India" },
  { id: "sg", x: 78, y: 56, kind: "office", label: "APAC" },
  { id: "au", x: 86, y: 72, kind: "warehouse", label: "APAC" },
];

type Props = {
  className?: string;
  activeRegion?: string;
};

export function WorldMap({ className = "", activeRegion = "UAE" }: Props) {
  const [active, setActive] = useState(activeRegion);
  const current =
    MARKERS.find((m) => m.label === active) ??
    MARKERS.find((m) => m.id === "uae");

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/world-map.jpg"
        alt={`AIA global presence map, focused on ${activeRegion}`}
        width={1800}
        height={880}
        className="h-auto w-full"
        quality={90}
        priority={false}
      />

      {MARKERS.map((m) => {
        const isOn = m.label === active || (active === "UAE" && m.id === "uae");
        return (
          <button
            key={m.id}
            type="button"
            className="absolute z-[1] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            onMouseEnter={() => setActive(m.label)}
            onFocus={() => setActive(m.label)}
            aria-label={m.label}
          >
            <span
              className={`block rounded-full ring-2 ring-white transition-transform duration-300 ${
                m.kind === "office" ? "bg-aia-orange" : "bg-aia-marker"
              } ${isOn ? "size-3.5 scale-110" : "size-2.5"}`}
            />
            {isOn ? (
              <span
                aria-hidden
                className="hotspot-pulse absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aia-orange/50"
              />
            ) : null}
          </button>
        );
      })}

      {current ? (
        <aside className="absolute left-[58%] top-[16%] z-[2] max-w-[15.5rem] -translate-x-1/2 rounded-md bg-aia-orange p-4 text-white shadow-[0_12px_30px_rgba(var(--aia-accent-rgb),0.35)] sm:left-[61%]">
          <p className="mb-1 text-sm font-semibold">{current.label}</p>
          <p className="text-sm text-white/90">
            {current.detail ?? "AIA location"}
          </p>
          {current.id === "uae" ? (
            <p className="mt-1 break-all text-sm text-white/90">
              Inquiry. global@aiaengineering.com
            </p>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
