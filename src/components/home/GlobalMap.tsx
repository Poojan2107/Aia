import Link from "next/link";
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#006eff]/10 px-3 py-1 text-xs font-semibold text-[#006eff]">
            <span className="h-2 w-2 rounded-full bg-[#006eff] animate-pulse" />
            AIA Engineering × Vega Industries
          </div>
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
          <div className="flex flex-wrap items-center gap-3">
            <CtaButton
              href="/company/global-presence"
              variant="outline"
              className="global-map-cta justify-center sm:w-auto"
            >
              Find AIA near you
            </CtaButton>
            <Link
              href="/dev/global-presence"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#006eff] bg-[#006eff] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0056d6] transition-all"
            >
              <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              Launch Atomic Globe →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          <WorldMap className="global-map-plate w-full" />
        </Reveal>
      </div>
    </section>
  );
}
