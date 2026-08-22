import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";
import { Reveal } from "@/components/ui/Reveal";

export function GlobalMap() {
  return (
    <section
      className="page-pad mx-auto grid max-w-[1440px] gap-10 bg-white py-14 sm:gap-12 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:py-28"
      aria-labelledby="map-heading"
    >
      <Reveal>
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
      </Reveal>

      <Reveal delay={80} className="space-y-5">
        <div className="relative w-full">
          <WorldMap className="w-full" activeRegion="UAE" />
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
      </Reveal>
    </section>
  );
}
