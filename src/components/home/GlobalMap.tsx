import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";

export function GlobalMap() {
  return (
    <section
      className="page-pad grid gap-12 bg-white py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28"
      aria-labelledby="map-heading"
    >
      <div>
        <h2 id="map-heading" className="sr-only">
          Global presence
        </h2>
        <p className="mb-4 max-w-md text-xl leading-relaxed text-aia-navy/80 md:text-[1.5rem]">
          Our offices, production facilities, and warehouses are strategically
          positioned across the globe to maximize efficiency and client reach.
        </p>
        <p className="mb-10 max-w-md text-xl leading-relaxed text-aia-navy/80 md:text-[1.5rem]">
          Explore our office locations, production facilities, and warehouses on
          our interactive map.
        </p>
        <CtaButton href="/company/global-presence" variant="outline">
          Find AIA near you
        </CtaButton>
      </div>

      <div className="relative min-h-[380px]">
        <WorldMap className="absolute inset-0" activeRegion="UAE" />
        <aside className="absolute bottom-[22%] left-[58%] max-w-[15rem] -translate-x-1/2 rounded-md bg-aia-orange p-4 text-white shadow-[0_12px_30px_rgba(218,112,46,0.35)]">
          <p className="mb-1 text-sm font-semibold">UAE</p>
          <p className="text-sm text-white/90">Tel. +253 998 6542 336</p>
          <p className="text-sm text-white/90">
            Inquiry. global@aiaengineering.com
          </p>
        </aside>
        <ul className="absolute bottom-4 right-4 space-y-1.5 text-[11px] uppercase tracking-[0.08em] text-aia-navy/70">
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#2f6fed]" />
            Logistic Wearhouses
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-aia-orange" />
            Subsidiary and Representative Offices
          </li>
        </ul>
      </div>
    </section>
  );
}
