"use client";

import React, { useMemo, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import MeridianGlobe from "@/components/ui/AtomicGlobe";

/**
 * Curated strategic global network of AIA Engineering Limited & Vega Industries:
 * Ahmedabad Global HQ & primary manufacturing foundry in India, connected radially
 * across the globe to Vega's primary continental headquarters and mining hubs.
 */
const AIA_BLUE = "#006eff";
const VEGA_CYAN = "#16a5ee";

const STRATEGIC_LOCATIONS = [
  // 0: AIA Global Headquarters & Manufacturing Mother Hub (Ahmedabad, India)
  {
    id: "loc-ahmedabad",
    label: "AHMEDABAD (AIA HQ)",
    subtitle: "AIA Engineering Ltd. • Global Headquarters & Foundries",
    lat: 23.0225,
    lng: 72.5714,
    accent: AIA_BLUE,
  },
  // 1: Vega Europe Headquarters (London, United Kingdom)
  {
    id: "loc-london",
    label: "LONDON (VEGA EUROPE)",
    subtitle: "Vega Industries Ltd. • European Headquarters",
    lat: 51.5074,
    lng: -0.1278,
    accent: VEGA_CYAN,
  },
  // 2: Vega Middle East Distribution Hub (Dubai, UAE)
  {
    id: "loc-dubai",
    label: "DUBAI (VEGA ME)",
    subtitle: "Vega Industries (Middle East) F.Z.C. • Global Distribution Hub",
    lat: 25.2048,
    lng: 55.2708,
    accent: VEGA_CYAN,
  },
  // 3: Vega Africa Headquarters & Plant (Johannesburg, South Africa)
  {
    id: "loc-johannesburg",
    label: "JOHANNESBURG (VEGA AFRICA)",
    subtitle: "Vega Steel Industries (RSA) Pty. Ltd. • Africa Hub",
    lat: -26.2041,
    lng: 28.0473,
    accent: VEGA_CYAN,
  },
  // 4: Vega Australia & Asia-Pacific Mining Hub (Perth, Australia)
  {
    id: "loc-perth",
    label: "PERTH (VEGA AUSTRALIA)",
    subtitle: "Vega Industries Australia Pty Ltd • Mining Hub",
    lat: -31.9505,
    lng: 115.8605,
    accent: VEGA_CYAN,
  },
  // 5: Vega South America Mining Hub (Santiago, Chile)
  {
    id: "loc-santiago",
    label: "SANTIAGO (VEGA LATAM)",
    subtitle: "Vega Industries SpA • South America Mining Hub",
    lat: -33.4489,
    lng: -70.6693,
    accent: VEGA_CYAN,
  },
  // 6: Vega Americas Hub (Nashville / Brentwood, USA)
  {
    id: "loc-nashville",
    label: "USA (VEGA AMERICAS)",
    subtitle: "Vega Industries Ltd. • Americas Hub",
    lat: 36.1627,
    lng: -86.7816,
    accent: VEGA_CYAN,
  },
  // 7: Vega East Asia Hub (Wuxi / Shanghai, China)
  {
    id: "loc-wuxi",
    label: "WUXI (VEGA EAST ASIA)",
    subtitle: "Wuxi Vega Trade Co. Ltd. • East Asia Hub",
    lat: 31.4912,
    lng: 120.3119,
    accent: VEGA_CYAN,
  },
];

/**
 * Purposeful Great-Circle transit routes:
 * 1. Primary radial lines originating from Ahmedabad (AIA HQ, 0) to each continental hub.
 * 2. Key intercontinental logistics and shipping corridors linking the hubs worldwide.
 */
const NETWORK_ROUTES: [number, number][] = [
  // Radial Distribution from Ahmedabad (AIA Global HQ) to every continental hub
  [0, 1], // Ahmedabad -> London (Europe)
  [0, 2], // Ahmedabad -> Dubai (Middle East)
  [0, 3], // Ahmedabad -> Johannesburg (Africa)
  [0, 4], // Ahmedabad -> Perth (Australia / Asia-Pac)
  [0, 5], // Ahmedabad -> Santiago (South America)
  [0, 6], // Ahmedabad -> USA (Americas)
  [0, 7], // Ahmedabad -> Wuxi (East Asia)

  // Strategic Intercontinental Supply Corridors
  [1, 6], // Europe <-> Americas (Transatlantic corridor)
  [1, 2], // Europe <-> Middle East corridor
  [2, 3], // Middle East <-> Africa corridor
  [2, 4], // Middle East <-> Australia (Indian Ocean corridor)
  [6, 5], // North America <-> South America (Pan-American corridor)
  [4, 7], // Australia <-> East Asia corridor
];

const desktopQuery = "(min-width: 1024px)";
const subscribeDesktop = (cb: () => void) => {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Smooth scroll-driven sequence progress hook with spring interpolation. */
function useSequenceProgress(trackRef: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let target = 0;
    let current = 0;
    let rafId = 0;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -r.top / range));
    };

    const loop = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.001) current = target;
      setProgress(current);
      rafId = requestAnimationFrame(loop);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [trackRef]);

  return progress;
}

export function AiaVegaGlobeSection() {
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => true
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const rawProgress = useSequenceProgress(trackRef);

  // Desktop scrubs through the sequence; phones present the settled, balanced view.
  const p = desktop ? rawProgress : 1.0;

  /* ---------------- Choreography calculations ---------------- */
  // 1. Logo split progress (0 = centered together, 1 = docked at sides)
  const rawSplit = Math.min(1, Math.max(0, (p - 0.12) / 0.5));
  const splitEased = desktop ? 1 - Math.pow(1 - rawSplit, 3) : 1;

  // 2. Globe emergence from center between the logos
  const rawGlobe = Math.min(1, Math.max(0, (p - 0.05) / 0.55));
  const globeScale = desktop ? 0.22 + (1 - Math.pow(1 - rawGlobe, 3)) * 0.78 : 1.0;
  const globeOpacity = desktop ? Math.min(1, Math.max(0, p < 0.03 ? p * 25 : 0.85 + p * 0.15)) : 1.0;

  return (
    <section id="collaboration" className="globe-story" aria-label="AIA Engineering and Vega Industries Global Network">
      <h2 className="sr-only">AIA Engineering &amp; Vega Industries Global Collaboration</h2>

      <div ref={trackRef} className="globe-track">
        <div className="globe-stage">
          {/* Globe in Perfect Center */}
          <div
            className="globe-center"
            style={{
              transform: desktop
                ? `translate(-50%, -50%) scale(${globeScale.toFixed(3)})`
                : "none",
              opacity: globeOpacity,
            }}
          >
            <div className="globe-halo" aria-hidden />
            <div className="globe-canvas">
              <MeridianGlobe
                style={{ width: "100%", height: "100%" }}
                width="100%"
                height="100%"
                theme="custom"
                palette={{
                  accent: AIA_BLUE, // AIA Signature Blue (#006eff)
                  accentInk: "#ffffff",
                  backdrop: "rgba(255, 255, 255, 0)", // transparent to blend with white background
                  backFade: 0.07, // crisp depth: far side dots stay very subtle
                  ink: "#041d2c", // AIA Navy (#041d2c): rich, crisp, high-contrast land dots matching website brand
                  labelFill: "#ffffff", // clean white pill badges for city labels
                  labelInk: "#041d2c", // AIA Navy text
                  tint: AIA_BLUE, // cursor glow in AIA Signature Blue
                }}
                places={STRATEGIC_LOCATIONS}
                customPairs={NETWORK_ROUTES}
                focusIndex={-1}
                placeStyle={{
                  placeMarker: "beacon", // clean, legible pill badges with pulsing radar dot
                  placeLift: 0.14,
                  cardWidth: 220,
                  labelFont: {
                    fontFamily: "var(--font-haas, sans-serif)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  },
                }}
                routes={{
                  dashCount: 16,
                  routeAltitude: 0.3,
                  routeDots: 76,
                  routeMode: "hub",
                  routeRest: 0.45,
                  routeSize: 5.5,
                  routesOn: true,
                  routeSpeed: 0.22,
                  routeStyle: "comet",
                  routeTrail: 0.45,
                  routeWidth: 2,
                }}
                sphere={{
                  coastLift: 0.45,
                  density: "dense",
                  dotSize: 4.8,
                  exactDots: 120000,
                  sizeJitter: 0.3,
                }}
                motion={{
                  allowTiltDrag: true,
                  offsetX: 0,
                  offsetY: 0,
                  spin: 0.04,
                  startLng: 72,
                  tilt: 18,
                  tiltRange: 55,
                  zoom: 0.95,
                }}
                entrance={{
                  entranceSeconds: 2.8,
                  formation: "bloom",
                  replayOnScroll: false,
                }}
                cursor={{
                  crest: 0.035,
                  cursorDelay: 0,
                  cursorMode: "halo",
                  glow: 1.2,
                  reach: 0.35,
                  swell: 1.2,
                  waveLength: 0.22,
                  waveSpeed: 0.55,
                }}
                advanced={{ calmMotion: true, editorPlayback: true, quality: "auto" }}
              />
            </div>
          </div>

          {/* Left Side Brand Logo: AIA Engineering */}
          <div
            className="globe-side-brand is-aia"
            style={{
              transform: desktop
                ? `translate3d(calc((50vw - clamp(2rem, 8vw, 140px) - 170px - 20px) * (1 - ${splitEased.toFixed(
                    3
                  )})), -50%, 0)`
                : "none",
            }}
          >
            <Image
              src="/images/logo-aia-dark.png"
              alt="AIA Engineering Limited"
              width={820}
              height={272}
              className="globe-brand-logo is-aia-logo"
              priority
            />
          </div>

          {/* Right Side Brand Logo: Vega Industries */}
          <div
            className="globe-side-brand is-vega"
            style={{
              transform: desktop
                ? `translate3d(calc(-1 * (50vw - clamp(2rem, 8vw, 140px) - 100px - 20px) * (1 - ${splitEased.toFixed(
                    3
                  )})), -50%, 0)`
                : "none",
            }}
          >
            <Image
              src="/images/logo-vega-dark.png"
              alt="Vega Industries"
              width={376}
              height={272}
              className="globe-brand-logo is-vega-logo"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
