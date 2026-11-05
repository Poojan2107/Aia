import React from "react";

export type GlobePlace = {
  label: string;
  lat: number;
  lng: number;
  id?: string;
  accent?: string;
  image?: string;
  body?: string;
  ctaLabel?: string;
  ctaLink?: string;
  [key: string]: any;
};

export type GlobeProps = {
  style?: React.CSSProperties;
  className?: string;
  theme?: "midnight" | "aurora" | "ember" | "paper" | "custom";
  places?: GlobePlace[];
  palette?: {
    backdrop?: string;
    ink?: string;
    backFade?: number;
    tint?: string;
    accent?: string;
    labelFill?: string;
    labelInk?: string;
    accentInk?: string;
    [key: string]: any;
  };
  placeStyle?: {
    placeMarker?: "beacon" | "pin";
    pinShape?: "needle" | "teardrop" | "ring" | "diamond" | "flag";
    placeLift?: number;
    cardWidth?: number;
    labelFont?: any;
    [key: string]: any;
  };
  sphere?: {
    density?: "sparse" | "balanced" | "dense" | "ultra" | "exact";
    exactDots?: number;
    dotSize?: number;
    sizeJitter?: number;
    coastLift?: number;
  };
  cursor?: {
    cursorMode?: "sonar" | "halo" | "wake" | "off";
    reach?: number;
    glow?: number;
    swell?: number;
    crest?: number;
    waveLength?: number;
    waveSpeed?: number;
    cursorDelay?: number;
  };
  motion?: {
    spin?: number;
    tilt?: number;
    startLng?: number;
    zoom?: number;
    offsetX?: number;
    offsetY?: number;
    allowTiltDrag?: boolean;
    tiltRange?: number;
  };
  entrance?: {
    formation?: "sweep" | "bloom" | "fall" | "drift" | "instant";
    entranceSeconds?: number;
    replayOnScroll?: boolean;
  };
  routes?: {
    routesOn?: boolean;
    routeMode?: "hub" | "chain" | "mesh";
    routeStyle?: "comet" | "beads" | "solid" | "dashed" | "pulse";
    routeWidth?: number;
    dashCount?: number;
    routeAltitude?: number;
    routeSpeed?: number;
    routeTrail?: number;
    routeDots?: number;
    routeSize?: number;
    routeRest?: number;
  };
  advanced?: {
    quality?: "auto" | "high" | "low";
    editorPlayback?: boolean;
    calmMotion?: boolean;
  };
  [key: string]: any;
};

declare const MeridianGlobe: React.ComponentType<GlobeProps>;
export default MeridianGlobe;

