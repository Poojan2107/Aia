"use client";

import React from "react";
import Image from "next/image";
import MeridianGlobe from "@/components/ui/AtomicGlobe";

/**
 * Original Framer Globe on White Background with AIA & Vega Logos on both sides.
 * Exact original physics: Bloom entrance (6s), beads chain routes, needle pins,
 * 1051px frame height, and offsetY: -0.25 settle.
 */
export function AiaVegaGlobeSection() {
  return (
    <section
      id="collaboration"
      className="relative w-full overflow-hidden bg-white select-none"
      aria-label="AIA Engineering & Vega Industries"
    >
      <div className="relative w-full h-[1051px]">
        {/* The Original Framer Globe */}
        <MeridianGlobe
          style={{ width: "100%", height: "100%" }}
          width="100%"
          height="100%"
          theme="custom"
          palette={{
            accent: "rgb(0, 110, 255)",
            accentInk: "rgb(255, 255, 255)",
            backdrop: "rgb(255, 255, 255)",
            backFade: 0.14,
            ink: "rgb(15, 23, 42)",
            labelFill: "rgb(4, 29, 44)",
            labelInk: "rgb(255, 255, 255)",
            tint: "rgb(0, 110, 255)",
          }}
          places={[
            {
              body: "North American operations and the start of the loop.",
              ctaLabel: "Learn more",
              id: "default-item-0",
              label: "TORONTO",
              lat: 43.6532,
              lng: -79.3832,
            },
            {
              body: "Latin America coverage, spanning four time zones.",
              ctaLabel: "",
              id: "default-item-1",
              label: "BOGOTÁ",
              lat: 4.711,
              lng: -74.0721,
            },
            {
              body: "European hub handling EMEA hours.",
              ctaLabel: "Learn more",
              id: "default-item-2",
              label: "BERLIN",
              lat: 52.52,
              lng: 13.405,
            },
            {
              body: "",
              ctaLabel: "",
              id: "default-item-3",
              label: "NAIROBI",
              lat: -1.2864,
              lng: 36.8172,
            },
            {
              body: "",
              ctaLabel: "",
              id: "default-item-4",
              label: "DUBAI",
              lat: 25.2048,
              lng: 55.2708,
            },
            {
              body: "",
              ctaLabel: "",
              id: "default-item-5",
              label: "SEOUL",
              lat: 37.5665,
              lng: 126.978,
            },
            {
              body: "",
              ctaLabel: "",
              id: "default-item-6",
              label: "AUCKLAND",
              lat: -36.8485,
              lng: 174.7633,
            },
          ]}
          placeStyle={{
            cardWidth: 232,
            labelFont: {
              fontFamily: '"Inter", "Inter Placeholder", sans-serif',
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              letterSpacing: "0em",
              lineHeight: "1em",
            },
            pinShape: "needle",
            placeLift: 0.19,
            placeMarker: "pin",
          }}
          routes={{
            dashCount: 18,
            routeAltitude: 0.25,
            routeDots: 76,
            routeMode: "chain",
            routeRest: 0.45,
            routeSize: 6,
            routesOn: true,
            routeSpeed: 0.22,
            routeStyle: "beads",
            routeTrail: 0.3,
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
            spin: 0.06,
            startLng: 21,
            tilt: 18,
            tiltRange: 59,
            zoom: 1,
          }}
          entrance={{
            entranceSeconds: 6,
            formation: "bloom",
            replayOnScroll: true,
          }}
          cursor={{
            crest: 0.035,
            cursorDelay: 0,
            cursorMode: "halo",
            glow: 1,
            reach: 0.3,
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

        {/* Logos on Both Sides */}
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
