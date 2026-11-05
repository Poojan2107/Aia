"use client";

import React from "react";
import Image from "next/image";
import MeridianGlobe from "@/components/ui/AtomicGlobe";

/**
 * Exact operating locations of AIA Engineering Limited & Vega Industries
 * sourced directly from https://aiaengineering.com/contact-us/ and
 * the official AIA Engineering Limited Annual Report / Global Network.
 */
const AIA_VEGA_LOCATIONS = [
  // 0: AIA Engineering Global Headquarters & Primary Manufacturing Hub
  {
    id: "loc-ahmedabad",
    label: "AHMEDABAD (GLOBAL HQ)",
    subtitle: "AIA Engineering Ltd. • Corporate & Registered HQ",
    lat: 23.0225,
    lng: 72.5714,
    accent: "#006eff",
  },
  // 1: Vega Industries Ltd. USA
  {
    id: "loc-brentwood",
    label: "BRENTWOOD / NASHVILLE",
    subtitle: "Vega Industries Ltd. • Americas Hub",
    lat: 36.0331,
    lng: -86.7828,
    accent: "#006eff",
  },
  // 2: Vega USA Office in Canada
  {
    id: "loc-brampton",
    label: "TORONTO / BRAMPTON",
    subtitle: "Vega Industries Ltd. • Canada Office",
    lat: 43.7315,
    lng: -79.7624,
    accent: "#006eff",
  },
  // 3: Vega Industries Ltd. UK
  {
    id: "loc-london",
    label: "LONDON / HARROW",
    subtitle: "Vega Industries Ltd. • European HQ",
    lat: 51.5806,
    lng: -0.334,
    accent: "#006eff",
  },
  // 4: Vega Industries (Middle East) F.Z.C. UAE
  {
    id: "loc-dubai",
    label: "DUBAI / AJMAN",
    subtitle: "Vega Industries (Middle East) F.Z.C. • Global Distribution Hub",
    lat: 25.4052,
    lng: 55.5136,
    accent: "#006eff",
  },
  // 5: Vega Steel Industries (RSA) Pty. Ltd. South Africa
  {
    id: "loc-johannesburg",
    label: "JOHANNESBURG",
    subtitle: "Vega Steel Industries (RSA) Pty. Ltd. • Africa Hub",
    lat: -26.0936,
    lng: 28.0064,
    accent: "#006eff",
  },
  // 6: AIA Ghana Limited
  {
    id: "loc-accra",
    label: "ACCRA",
    subtitle: "AIA Ghana Ltd. • West Africa Hub",
    lat: 5.6037,
    lng: -0.187,
    accent: "#006eff",
  },
  // 7: Vega Industries / AIA Industries Chile SpA
  {
    id: "loc-santiago",
    label: "SANTIAGO",
    subtitle: "Vega Industries SpA • South America Mining Hub",
    lat: -33.4489,
    lng: -70.6693,
    accent: "#006eff",
  },
  // 8: Vega Industries Peru Ltd. SAC
  {
    id: "loc-lima",
    label: "LIMA",
    subtitle: "Vega Industries Peru Ltd. • Andean Operations",
    lat: -12.0464,
    lng: -77.0428,
    accent: "#006eff",
  },
  // 9: Vega Industries Australia Pty Ltd / Vega MPS
  {
    id: "loc-perth",
    label: "PERTH",
    subtitle: "Vega Industries Australia Pty Ltd • Mining Hub",
    lat: -31.9505,
    lng: 115.8605,
    accent: "#006eff",
  },
  // 10: Wuxi Vega Trade Co., Limited China
  {
    id: "loc-wuxi",
    label: "WUXI / SHANGHAI",
    subtitle: "Wuxi Vega Trade Co. Ltd. • East Asia Hub",
    lat: 31.4912,
    lng: 120.3119,
    accent: "#006eff",
  },
  // 11: PT. Vega Industries Indonesia
  {
    id: "loc-jakarta",
    label: "JAKARTA",
    subtitle: "PT. Vega Industries Indonesia • Southeast Asia Hub",
    lat: -6.2088,
    lng: 106.8456,
    accent: "#006eff",
  },
  // 12: Welcast Steels Limited (AIA Subsidiary) Bengaluru
  {
    id: "loc-bengaluru",
    label: "BENGALURU",
    subtitle: "Welcast Steels Ltd. • Foundry Operations",
    lat: 12.9716,
    lng: 77.5946,
    accent: "#006eff",
  },
];

/**
 * Great-Circle supply chain and logistics exchange lines:
 * Originating from AIA Ahmedabad HQ to each Vega subsidiary worldwide,
 * complemented by primary intercontinental logistics corridors.
 */
const AIA_VEGA_ROUTES: [number, number][] = [
  // Primary Radial Exchange: AIA Ahmedabad HQ (0) -> Vega Global Hubs
  [0, 1], // Ahmedabad -> USA (Brentwood)
  [0, 2], // Ahmedabad -> Canada (Toronto/Brampton)
  [0, 3], // Ahmedabad -> UK (London)
  [0, 4], // Ahmedabad -> UAE (Dubai/Ajman)
  [0, 5], // Ahmedabad -> South Africa (Johannesburg)
  [0, 6], // Ahmedabad -> Ghana (Accra)
  [0, 7], // Ahmedabad -> Chile (Santiago)
  [0, 8], // Ahmedabad -> Peru (Lima)
  [0, 9], // Ahmedabad -> Australia (Perth)
  [0, 10], // Ahmedabad -> China (Wuxi)
  [0, 11], // Ahmedabad -> Indonesia (Jakarta)
  [0, 12], // Ahmedabad -> Bengaluru

  // Global Cross-Continental Corridors
  [3, 1], // UK <-> USA (Transatlantic)
  [3, 4], // UK <-> UAE (Europe - Middle East)
  [4, 5], // UAE <-> South Africa (Middle East - Africa)
  [4, 9], // UAE <-> Australia (Indian Ocean Corridor)
  [1, 7], // USA <-> Chile (Pan-American corridor)
  [7, 8], // Chile <-> Peru (Andean mining corridor)
  [9, 11], // Australia <-> Indonesia (Asia-Pacific route)
];

/* ------------------------------------------------------------------ *
 * Story: three scroll chapters drive what the globe shows.
 * ------------------------------------------------------------------ */

const AIA_BLUE = "#006eff";
const VEGA_CYAN = "#16a5ee";
const AIA_IDS = new Set(["loc-ahmedabad", "loc-bengaluru"]);

type Owner = "aia" | "vega";
const owner = (id: string): Owner => (AIA_IDS.has(id) ? "aia" : "vega");

/** Locations tinted by company. */
const TINTED = AIA_VEGA_LOCATIONS.map((loc) => ({
  ...loc,
  accent: owner(loc.id) === "aia" ? AIA_BLUE : VEGA_CYAN,
}));

type Filter = "both" | "aia" | "vega";

const CHAPTERS = [
  {
    id: "engineered",
    kicker: "01 / AIA Engineering",
    title: "Engineered in India.",
    body: "Four decades of metallurgy, design and manufacturing in Ahmedabad and Bengaluru turn wear science into high-chrome castings, liners and grinding media.",
    stat: { value: "45+", label: "Years of wear engineering" },
  },
  {
    id: "delivered",
    kicker: "02 / Vega Industries",
    title: "Delivered by Vega.",
    body: "Vega Industries, AIA's wholly owned subsidiary, takes that engineering to mine sites worldwide through service centres and offices on every mining continent.",
    stat: { value: "10+", label: "Global service centres" },
  },
  {
    id: "network",
    kicker: "03 / One network",
    title: "One partner, 120+ countries.",
    body: "Manufacturing depth from AIA and field support from Vega work as one team, from first design to the last reline.",
    stat: { value: "120+", label: "Countries served" },
  },
] as const;

/** Rebuilds places and route pairs for a chapter / filter, re-indexing pairs. */
function sceneFor(chapter: number, filter: Filter) {
  const keep = (id: string) =>
    chapter === 0 ? owner(id) === "aia" : filter === "both" || owner(id) === filter;
  const places = TINTED.filter((p) => keep(p.id));
  const index = new Map(places.map((p, i) => [p.id, i]));
  const pairs: [number, number][] = [];
  if (chapter > 0) {
    for (const [a, b] of AIA_VEGA_ROUTES) {
      if (chapter === 1 && a !== 0) continue; // chapter 2: radial routes from HQ only
      const ia = index.get(AIA_VEGA_LOCATIONS[a].id);
      const ib = index.get(AIA_VEGA_LOCATIONS[b].id);
      if (ia !== undefined && ib !== undefined) pairs.push([ia, ib]);
    }
  }
  return { places, pairs, focus: chapter === 0 ? (index.get("loc-ahmedabad") ?? -1) : -1 };
}

/** Which chapter the pinned stage is on, from scroll position through the track. */
function useChapter(trackRef: React.RefObject<HTMLDivElement | null>) {
  const [chapter, setChapter] = React.useState(0);
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / range));
      el.style.setProperty("--story", p.toFixed(3));
      setChapter(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackRef]);
  return chapter;
}

const FILTERS: ReadonlyArray<readonly [Filter, string]> = [
  ["both", "Both"],
  ["aia", "AIA"],
  ["vega", "Vega"],
];

const desktopQuery = "(min-width: 1024px)";
const subscribeDesktop = (cb: () => void) => {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function AiaVegaGlobeSection() {
  const desktop = React.useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => true);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const scrolled = useChapter(trackRef);
  // Phones get the stacked story with the full network on the globe.
  const chapter = desktop ? scrolled : 2;
  const [filter, setFilter] = React.useState<Filter>("both");
  const scene = React.useMemo(() => sceneFor(chapter, filter), [chapter, filter]);
  const counts: Record<Filter, number> = {
    both: TINTED.length,
    aia: TINTED.filter((p) => owner(p.id) === "aia").length,
    vega: TINTED.filter((p) => owner(p.id) === "vega").length,
  };

  return (
    <section id="collaboration" className="globe-story" aria-labelledby="globe-story-heading">
      <div ref={trackRef} className="globe-track">
        <div className="globe-stage">
          <div className="globe-canvas">
            <MeridianGlobe
              style={{ width: "100%", height: "100%" }}
              width="100%"
              height="100%"
              theme="custom"
              palette={{
                accent: "rgb(0, 110, 255)",
                accentInk: "rgb(255, 255, 255)",
                backdrop: "rgb(255, 255, 255)",
                backFade: 0.1,
                ink: "rgb(100, 116, 139)",
                labelFill: "rgb(4, 29, 44)",
                labelInk: "rgb(255, 255, 255)",
                tint: "rgb(0, 110, 255)",
              }}
              places={scene.places}
              customPairs={scene.pairs}
              focusIndex={scene.focus}
              placeStyle={{ cardWidth: 240, pinShape: "needle", placeLift: 0.18, placeMarker: "pin" }}
              routes={{
                dashCount: 18,
                routeAltitude: 0.32,
                routeDots: 80,
                routeMode: "hub",
                routeRest: 0.22,
                routeSize: 5.5,
                routesOn: chapter > 0,
                routeSpeed: 0.28,
                routeStyle: "comet",
                routeTrail: 0.4,
                routeWidth: 2,
              }}
              sphere={{ coastLift: 0.4, density: "dense", dotSize: 5.1, exactDots: 130000, sizeJitter: 0.35 }}
              motion={{ allowTiltDrag: true, offsetX: desktop ? 0.5 : 0, offsetY: desktop ? -0.04 : 0, spin: 0.055, startLng: 55, tilt: 16, tiltRange: 60, zoom: (desktop ? 0.74 : 0.9) * (chapter === 0 ? 0.62 : 1) }}
              entrance={{ entranceSeconds: 3.2, formation: "bloom", replayOnScroll: false }}
              cursor={{ crest: 0.035, cursorDelay: 0, cursorMode: "halo", glow: 1, reach: 0.32, swell: 1.2, waveLength: 0.22, waveSpeed: 0.55 }}
              advanced={{ calmMotion: true, editorPlayback: true, quality: "auto" }}
            />
          </div>

          <div className="globe-copy">
            <div className="globe-brands">
              <Image src="/images/logo-aia-dark.png" alt="AIA Engineering Limited" width={820} height={272} className="globe-brand-aia" />
              <span aria-hidden className="globe-brand-x">×</span>
              <Image src="/images/logo-vega-dark.png" alt="Vega Industries" width={376} height={272} className="globe-brand-vega" />
            </div>
            <h2 id="globe-story-heading" className="sr-only">
              AIA Engineering and Vega Industries: one global network
            </h2>
            <div className="globe-chapters">
              {CHAPTERS.map((c, i) => (
                <article key={c.id} className={`globe-chapter ${i === chapter ? "is-active" : ""}`} aria-hidden={desktop && i !== chapter}>
                  <p className="globe-kicker">{c.kicker}</p>
                  <h3 className="globe-title">{c.title}</h3>
                  <p className="globe-body">{c.body}</p>
                  <p className="globe-stat">
                    <span className="globe-stat-value">{c.stat.value}</span>
                    <span className="globe-stat-label">{c.stat.label}</span>
                  </p>
                </article>
              ))}
            </div>

            <div className="globe-progress" aria-hidden>
              {CHAPTERS.map((c, i) => (
                <span key={c.id} className={i <= chapter ? "is-on" : ""} />
              ))}
            </div>

            <div className={`globe-filter ${chapter === 2 ? "is-live" : ""}`} role="group" aria-label="Show locations for">
              {FILTERS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  className={`globe-chip is-${id}`}
                  onClick={() => setFilter(id)}
                  tabIndex={chapter === 2 ? 0 : -1}
                >
                  <span aria-hidden className="globe-chip-dot" />
                  {label}
                  <span className="globe-chip-n">{counts[id]}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="globe-legend" aria-hidden>
            <span>
              <i style={{ background: AIA_BLUE }} /> AIA Engineering
            </span>
            <span>
              <i style={{ background: VEGA_CYAN }} /> Vega Industries
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
