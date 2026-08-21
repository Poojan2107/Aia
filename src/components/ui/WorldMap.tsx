import Image from "next/image";

type Props = {
  className?: string;
  activeRegion?: string;
};

const markers = [
  { x: 18, y: 42, label: "Americas" },
  { x: 48, y: 32, label: "Europe" },
  { x: 62, y: 48, label: "India" },
  { x: 58, y: 42, label: "UAE" },
  { x: 78, y: 52, label: "APAC" },
  { x: 50, y: 58, label: "Africa" },
] as const;

/** Custom world map plate with official map indicators. */
export function WorldMap({ className = "", activeRegion = "UAE" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#eef2f5] ${className}`}>
      <Image
        src="/images/world-map.jpg"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-contain object-center"
        aria-hidden
      />
      <p className="sr-only">
        AIA global presence map, focused on {activeRegion}
      </p>

      {markers.map((m) => {
        const active = m.label === activeRegion;
        return (
          <span
            key={m.label}
            className="absolute z-[1] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            title={m.label}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/map-indicator.svg"
              alt=""
              width={active ? 22 : 14}
              height={active ? 22 : 14}
              className={
                active
                  ? "drop-shadow-[0_0_8px_rgba(var(--aia-accent-rgb),0.55)]"
                  : "opacity-85"
              }
              aria-hidden
            />
            {active ? (
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aia-orange/50"
                style={{
                  animation: "hotspot-pulse 2.4s var(--ease-out) infinite",
                }}
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
