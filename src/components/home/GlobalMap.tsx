import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";
import { Reveal } from "@/components/ui/Reveal";

export function GlobalMap() {
  return (
    <section
      className="global-map bg-white pb-[var(--section-y)] pt-[clamp(2.5rem,4.5vw,3.75rem)]"
      aria-labelledby="global-map-heading"
    >
      <h2 id="global-map-heading" className="sr-only">
        Global presence
      </h2>
      <div className="page-pad page-max grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-center lg:gap-14">
        <Reveal>
          <p className="global-map-lead">
            Our offices, production facilities,
            <br className="hidden lg:inline" />
            and warehouses are strategically
            <br className="hidden lg:inline" />
            positioned across the globe to maximize
            <br className="hidden lg:inline" />
            efficiency and client reach.
          </p>
          <p className="global-map-support">
            Explore our office locations,
            <br className="hidden lg:inline" />
            production facilities, and warehouses
            <br className="hidden lg:inline" />
            on our interactive map.
          </p>
          <CtaButton
            href="/company/global-presence"
            variant="outline"
            className="global-map-cta justify-center sm:w-auto"
          >
            Find AIA near you
          </CtaButton>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          <WorldMap className="global-map-plate w-full" />
        </Reveal>
      </div>
    </section>
  );
}
