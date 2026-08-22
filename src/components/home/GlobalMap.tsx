import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";

/**
 * Figma World-Map-custom already includes the UAE contact callout.
 * Live HTML callout removed to avoid double-labeling.
 */
export function GlobalMap() {
  return (
    <section
      className="page-pad grid gap-8 bg-white py-14 sm:gap-12 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-28"
      aria-labelledby="map-heading"
    >
      <div>
        <h2 id="map-heading" className="sr-only">
          Global presence
        </h2>
        <p className="mb-4 max-w-md text-base leading-relaxed text-aia-navy/80 sm:text-xl md:text-[1.5rem]">
          Our offices, production facilities, and warehouses are strategically
          positioned across the globe to maximize efficiency and client reach.
        </p>
        <p className="mb-6 max-w-md text-base leading-relaxed text-aia-navy/80 sm:mb-10 sm:text-xl md:text-[1.5rem]">
          Explore our office locations, production facilities, and warehouses on
          our interactive map.
        </p>
        <CtaButton
          href="/company/global-presence"
          variant="solid"
          className="w-full justify-center sm:w-auto"
        >
          Find AIA near you
        </CtaButton>
      </div>

      <div className="space-y-4">
        <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="relative mx-auto aspect-[16/10] w-[min(140%,520px)] min-w-[340px] sm:w-full sm:min-w-0">
            <WorldMap className="absolute inset-0" activeRegion="UAE" />
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.08em] text-aia-navy/70 sm:text-[11px]">
          <li className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-full bg-aia-marker"
              aria-hidden
            />
            Logistic Warehouses
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full bg-aia-orange" />
            Subsidiary and Representative Offices
          </li>
        </ul>
      </div>
    </section>
  );
}
