import { CtaButton } from "@/components/ui/CtaButton";
import { WorldMap } from "@/components/ui/WorldMap";

export function GlobalMap() {
  return (
    <section
      className="page-pad grid gap-8 bg-white py-14 sm:gap-12 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28"
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
          variant="outline"
          className="w-full justify-center sm:w-auto"
        >
          Find AIA near you
        </CtaButton>
      </div>

      <div className="space-y-4">
        <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="relative mx-auto aspect-[16/10] w-[min(140%,520px)] min-w-[340px] sm:w-full sm:min-w-0">
            <WorldMap className="absolute inset-0" activeRegion="UAE" />
            <aside className="absolute bottom-[18%] left-1/2 hidden max-w-[15rem] -translate-x-1/2 rounded-md bg-aia-orange p-4 text-white shadow-[0_12px_30px_rgba(var(--aia-accent-rgb),0.35)] sm:block md:left-[58%]">
              <p className="mb-1 text-sm font-semibold">UAE</p>
              <p className="text-sm text-white/90">Tel. +253 998 6542 336</p>
              <p className="break-all text-sm text-white/90">
                Inquiry. global@aiaengineering.com
              </p>
            </aside>
          </div>
        </div>

        <aside className="rounded-md bg-aia-orange p-4 text-white sm:hidden">
          <p className="mb-1 text-sm font-semibold">UAE</p>
          <p className="text-sm text-white/90">Tel. +253 998 6542 336</p>
          <p className="break-all text-sm text-white/90">
            Inquiry. global@aiaengineering.com
          </p>
        </aside>

        <ul className="space-y-1.5 text-[10px] uppercase tracking-[0.08em] text-aia-navy/70 sm:text-[11px]">
          <li className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/map-indicator.svg"
              alt=""
              width={12}
              height={12}
              className="size-3 shrink-0"
              aria-hidden
            />
            Logistic Wearhouses
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-aia-orange" />
            Subsidiary and Representative Offices
          </li>
        </ul>
      </div>
    </section>
  );
}
