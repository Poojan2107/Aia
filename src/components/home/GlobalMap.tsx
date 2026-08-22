import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";
import { Reveal } from "@/components/ui/Reveal";

export function GlobalMap() {
  return (
    <section
      className="bg-aia-surface-soft py-[var(--section-y)]"
      aria-labelledby="map-heading"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:items-center lg:gap-16">
        <Reveal>
          <h2 id="map-heading" className="sr-only">
            Global presence
          </h2>
          <p className="mb-5 max-w-md text-[1.15rem] leading-relaxed text-aia-navy/70 sm:text-[1.35rem] md:text-[1.5rem] md:leading-[1.45]">
            Our offices, production facilities, and warehouses are strategically
            positioned across the globe to maximize efficiency and client reach.
          </p>
          <p className="mb-8 max-w-md text-[1.15rem] leading-relaxed text-aia-navy/70 sm:mb-10 sm:text-[1.35rem] md:text-[1.5rem] md:leading-[1.45]">
            Explore our office locations, production facilities, and warehouses on
            our interactive map.
          </p>
          <CtaButton
            href="/company/global-presence"
            variant="outline"
            className="w-full justify-center sm:w-auto"
          >
            Find AIA near you
          </CtaButton>
        </Reveal>

        <Reveal delay={80} className="space-y-5">
          <div className="relative w-full">
            <WorldMap className="w-full" />
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.08em] text-aia-navy/55">
            <li className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full bg-aia-navy"
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
      </div>
    </section>
  );
}
