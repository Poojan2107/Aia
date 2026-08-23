import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";
import { Reveal } from "@/components/ui/Reveal";

export function GlobalMap() {
  return (
    <section
      className="bg-white py-[var(--section-y)]"
      aria-labelledby="map-heading"
    >
      <div className="page-pad page-max grid gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:items-center lg:gap-16">
        <Reveal>
          <h2 id="map-heading" className="sr-only">
            Global presence
          </h2>
          <p className="mb-5 max-w-md text-[1.15rem] font-light leading-relaxed text-[#090909] sm:text-[1.5rem] md:text-[1.75rem] md:leading-[2.375rem]">
            Our offices, production facilities, and warehouses are strategically
            positioned across the globe to maximize efficiency and client reach.
          </p>
          <p className="mb-8 max-w-md text-[1.15rem] font-light leading-relaxed text-[#090909] sm:mb-10 sm:text-[1.5rem] md:text-[1.75rem] md:leading-[2.375rem]">
            Explore our office locations, production facilities, and warehouses on
            our interactive map.
          </p>
          <CtaButton
            href="/company/global-presence"
            variant="outline"
            className="w-full justify-center border-[#c4a06a] text-aia-navy hover:border-aia-navy hover:bg-aia-navy hover:text-white sm:w-auto"
          >
            Find AIA near you
          </CtaButton>
        </Reveal>

        <Reveal delay={80}>
          <WorldMap className="w-full" />
        </Reveal>
      </div>
    </section>
  );
}
