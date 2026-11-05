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

export function AiaVegaGlobeSection() {
  return (
    <section
      id="collaboration"
      className="relative w-full overflow-hidden bg-white select-none"
      aria-label="AIA Engineering & Vega Industries Global Presence"
    >
      <div className="relative w-full h-[1051px]">
        {/* Globe Component */}
        <MeridianGlobe
          style={{ width: "100%", height: "100%" }}
          width="100%"
          height="100%"
          theme="custom"
          palette={{
            accent: "rgb(0, 110, 255)", // Brand Blue (#006eff)
            accentInk: "rgb(255, 255, 255)",
            backdrop: "rgb(255, 255, 255)", // Pure white background
            backFade: 0.1, // Clean subtle back-hemisphere fade
            ink: "rgb(100, 116, 139)", // Refined slate grey (#64748b) - lighter & greyer to match website
            labelFill: "rgb(4, 29, 44)", // AIA Deep Navy (#041d2c)
            labelInk: "rgb(255, 255, 255)",
            tint: "rgb(0, 110, 255)", // Brand Blue cursor interaction
          }}
          places={AIA_VEGA_LOCATIONS}
          customPairs={AIA_VEGA_ROUTES}
          placeStyle={{
            cardWidth: 240,
            pinShape: "needle",
            placeLift: 0.18,
            placeMarker: "pin",
          }}
          routes={{
            dashCount: 18,
            routeAltitude: 0.32,
            routeDots: 80,
            routeMode: "hub",
            routeRest: 0.22, // Translucent resting arc in brand blue
            routeSize: 5.5,
            routesOn: true,
            routeSpeed: 0.28, // Moving, dynamic, attractive flow
            routeStyle: "comet", // Luminous comet packets moving across great circles
            routeTrail: 0.4, // Graceful glowing comet tail
            routeWidth: 2,
          }}
          sphere={{
            coastLift: 0.4,
            density: "dense",
            dotSize: 5.1,
            exactDots: 130000,
            sizeJitter: 0.35,
          }}
          motion={{
            allowTiltDrag: true,
            offsetX: 0,
            offsetY: -0.25,
            spin: 0.055,
            startLng: 55, // Faces India, Middle East, Europe & Africa on initial entrance
            tilt: 16,
            tiltRange: 60,
            zoom: 1,
          }}
          entrance={{
            entranceSeconds: 5.5,
            formation: "bloom",
            replayOnScroll: true,
          }}
          cursor={{
            crest: 0.035,
            cursorDelay: 0,
            cursorMode: "halo",
            glow: 1,
            reach: 0.32,
            swell: 1.2,
            waveLength: 0.22,
            waveSpeed: 0.55,
          }}
          advanced={{
            calmMotion: true,
            editorPlayback: true,
            quality: "auto",
          }}
        />

        {/* Brand Logos on Both Sides */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Left Side: AIA Engineering Dark Logo */}
          <div className="pointer-events-auto flex items-center">
            <div className="relative h-14 w-48 sm:h-16 sm:w-56 lg:h-20 lg:w-64 transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/logo-aia-dark.png"
                alt="AIA Engineering Limited"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Right Side: Vega Industries Dark Logo */}
          <div className="pointer-events-auto flex items-center">
            <div className="relative h-14 w-32 sm:h-16 sm:w-40 lg:h-20 lg:w-48 transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/logo-vega-dark.png"
                alt="Vega Industries"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
