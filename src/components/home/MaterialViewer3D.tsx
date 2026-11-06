"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

export type MocShadingType =
  | "metal"
  | "steel"
  | "rubber"
  | "composite"
  | "integrated"
  | "sintercast"
  | "vcast"
  | "media";

export type HotspotData = {
  title: string;
  body: string;
  position?: string;
  normal?: string;
};

type Props = {
  src?: string;
  poster?: string;
  alt: string;
  mocType?: MocShadingType;
  hotspot?: HotspotData;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
};

const MODEL_VIEWER_SRC =
  "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";

export function MaterialViewer3D({
  src,
  poster,
  alt,
  mocType = "metal",
  hotspot,
  cameraOrbit,
  cameraTarget,
  fieldOfView,
}: Props) {
  const [scriptReady, setScriptReady] = useState(() => {
    if (typeof window === "undefined" || typeof customElements === "undefined") {
      return false;
    }
    return Boolean(customElements.get("model-viewer"));
  });
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(false);
  const [hotspotOpen, setHotspotOpen] = useState(true);
  const viewerRef = useRef<HTMLElement | null>(null);

  // Load model-viewer script once
  useEffect(() => {
    if (typeof customElements !== "undefined" && customElements.get("model-viewer")) {
      setScriptReady(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-model-viewer="aia"]`
    );
    if (existing) {
      const onLoad = () => setScriptReady(true);
      existing.addEventListener("load", onLoad);
      return () => existing.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = MODEL_VIEWER_SRC;
    script.dataset.modelViewer = "aia";
    script.onload = () => setScriptReady(true);
    script.onerror = () => {
      console.warn("Could not load model-viewer CDN, falling back to static poster.");
      setHasError(true);
    };
    document.head.appendChild(script);
  }, []);

  // Reset loading state on model src change
  useEffect(() => {
    if (src) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  // Apply authentic physical metallurgical PBR shading matching AIA website palette & premium materials
  const applyMaterialShading = useCallback(
    (viewer: HTMLElement) => {
      const model = (viewer as unknown as { model?: { materials?: unknown[] } }).model;
      if (!model || !Array.isArray(model.materials) || model.materials.length === 0) {
        return;
      }

      model.materials.forEach((mat: unknown, idx: number) => {
        const material = mat as {
          name?: string;
          pbrMetallicRoughness?: {
            setBaseColorFactor: (rgba: [number, number, number, number]) => void;
            setMetallicFactor: (val: number) => void;
            setRoughnessFactor: (val: number) => void;
          };
        };

        const pbr = material.pbrMetallicRoughness;
        if (!pbr) return;

        const matName = (material.name || "").toLowerCase();

        switch (mocType) {
          case "rubber":
            // Deep vulcanized matte charcoal elastomer: soft non-metallic scattering
            pbr.setBaseColorFactor([0.12, 0.13, 0.15, 1.0]);
            pbr.setMetallicFactor(0.01);
            pbr.setRoughnessFactor(0.85);
            break;

          case "integrated":
            // Integrated composite: high-chrome wave lifter wear face on rubber mounting pad
            // In P01080_6_B: Material 0 is FFEFD2CB (wear face), Material 1 is FFB2B2B2 (base pad)
            if (idx === 1 || matName.includes("b2b2b2") || matName.includes("pad") || matName.includes("base")) {
              // Elastomer backing base: deep vulcanized charcoal
              pbr.setBaseColorFactor([0.11, 0.12, 0.14, 1.0]);
              pbr.setMetallicFactor(0.01);
              pbr.setRoughnessFactor(0.88);
            } else {
              // Integrated high-chrome wear face: high-hardness alloy profile
              pbr.setBaseColorFactor([0.72, 0.77, 0.84, 1.0]);
              pbr.setMetallicFactor(0.92);
              pbr.setRoughnessFactor(0.20);
            }
            break;

          case "composite":
            // Dual-matrix composite: high-chrome wear blocks on vulcanized elastomeric backing
            // In W9_5724_6: Material 1 (FF7FFFFB) is rubber body; Material 0 & 2 are chrome alloy inserts
            if (
              matName.includes("rubber") ||
              matName.includes("back") ||
              matName.includes("cushion") ||
              matName.includes("7ffffb") ||
              matName.includes("b2b2b2") ||
              idx === 1
            ) {
              // Elastomer backing / damping core: deep vulcanized charcoal
              pbr.setBaseColorFactor([0.11, 0.12, 0.14, 1.0]);
              pbr.setMetallicFactor(0.01);
              pbr.setRoughnessFactor(0.88);
            } else {
              // Chrome insert face: bright hardened high-chrome alloy steel
              pbr.setBaseColorFactor([0.76, 0.80, 0.86, 1.0]);
              pbr.setMetallicFactor(0.94);
              pbr.setRoughnessFactor(0.20);
            }
            break;

          case "sintercast":
            // High-chrome alloy body with embedded sintered ceramic composite tiles
            // In W9_5769_24_D: FFE3E3E3 is chrome matrix; FF8080FF, FF83BCFC, FFFF00FF are ceramic inserts
            if (
              matName.includes("8080ff") ||
              matName.includes("83bcfc") ||
              matName.includes("ff00ff") ||
              matName.includes("ceramic") ||
              matName.includes("insert") ||
              matName.includes("tile") ||
              idx === 1 ||
              idx === 6 ||
              idx === 7 ||
              idx === 9
            ) {
              // Dark sintered ceramic composite tiles
              pbr.setBaseColorFactor([0.18, 0.20, 0.22, 1.0]);
              pbr.setMetallicFactor(0.12);
              pbr.setRoughnessFactor(0.55);
            } else {
              // High-chrome alloy matrix
              pbr.setBaseColorFactor([0.70, 0.74, 0.80, 1.0]);
              pbr.setMetallicFactor(0.92);
              pbr.setRoughnessFactor(0.22);
            }
            break;

          case "steel":
            // Tough martensitic Cr-Mo alloy steel: gunmetal alloy sheen
            pbr.setBaseColorFactor([0.56, 0.60, 0.66, 1.0]);
            pbr.setMetallicFactor(0.88);
            pbr.setRoughnessFactor(0.28);
            break;

          case "vcast":
            // V-Cast: tough tempered alloy steel with gunmetal sheen
            pbr.setBaseColorFactor([0.26, 0.32, 0.40, 1.0]);
            pbr.setMetallicFactor(0.90);
            pbr.setRoughnessFactor(0.26);
            break;

          case "media":
            // Spherical high-chrome grinding ball: specular mirror chrome reflection
            pbr.setBaseColorFactor([0.94, 0.96, 0.99, 1.0]);
            pbr.setMetallicFactor(0.98);
            pbr.setRoughnessFactor(0.06);
            break;

          case "metal":
          default:
            // High-Chrome / Cr-Mo White Iron: authentic cast alloy steel with fine metallic sheen
            pbr.setBaseColorFactor([0.65, 0.69, 0.75, 1.0]);
            pbr.setMetallicFactor(0.90);
            pbr.setRoughnessFactor(0.24);
            break;
        }
      });
    },
    [mocType]
  );

  // Handle model-viewer progress/load events and apply shader
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    const handleLoad = () => {
      setIsLoading(false);
      applyMaterialShading(el);
    };
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    el.addEventListener("load", handleLoad);
    el.addEventListener("error", handleError);

    // If already loaded, re-apply shading (e.g. on mocType change)
    if (!isLoading) {
      applyMaterialShading(el);
    }

    return () => {
      el.removeEventListener("load", handleLoad);
      el.removeEventListener("error", handleError);
    };
  }, [src, scriptReady, mocType, applyMaterialShading, isLoading]);

  // If no GLB is provided or CDN errored, render high-res image
  if (!src || hasError) {
    const fallbackImage = poster || "/images/design/material-liner.webp";
    return (
      <div className="mats-render">
        <Image
          src={fallbackImage}
          alt={alt}
          width={1145}
          height={1374}
          sizes="(max-width: 1024px) 60vw, 30vw"
          priority
        />
        {hotspot && (
          <div className="mats-hotspot mats-hotspot-2d">
            <button
              type="button"
              className="mats-hotspot-dot"
              onClick={() => setHotspotOpen(!hotspotOpen)}
              aria-label="Toggle feature insight"
            >
              +
            </button>
            {hotspotOpen && (
              <div className="mats-hotspot-card">
                <p className="mats-hotspot-title">{hotspot.title}</p>
                <p className="mats-hotspot-body">{hotspot.body}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Calculate default 3D hotspot coordinates based on model bounds
  const defaultPos = hotspot?.position || "0 0 0";
  const defaultNorm = hotspot?.normal || "0 1 0";

  return (
    <div className="mats-3d-container">
      {isLoading && (
        <div className="mats-3d-loading">
          <span className="mats-3d-spinner" aria-hidden="true" />
          <span className="mats-3d-loading-text">Loading 3D CAD Assembly…</span>
        </div>
      )}

      {scriptReady ? (
        <model-viewer
          ref={viewerRef}
          key={src}
          src={src}
          alt={alt}
          poster={poster || "/images/design/material-liner.webp"}
          bounds="tight"
          environment-image="neutral"
          camera-target={cameraTarget || "auto auto auto"}
          camera-orbit={cameraOrbit || "215deg 76deg 105%"}
          field-of-view={fieldOfView || "32deg"}
          camera-controls
          auto-rotate
          auto-rotate-delay={800}
          rotation-per-second="14deg"
          touch-action="pan-y"
          shadow-intensity="1.8"
          shadow-softness="0.4"
          exposure="1.25"
          tone-mapping="aces"
          interaction-prompt="none"
          loading="eager"
          className="mats-model-viewer"
        >
          {hotspot && (
            <button
              slot="hotspot-wear-face"
              data-position={defaultPos}
              className="mats-3d-hotspot-btn"
              type="button"
              onClick={() => setHotspotOpen((prev) => !prev)}
              aria-label="View metallurgical feature details"
            >
              <span className="mats-3d-hotspot-pulse" aria-hidden="true" />
              <span className="mats-3d-hotspot-dot">+</span>
              <div
                className={`mats-3d-hotspot-card ${
                  hotspotOpen ? "is-active" : "is-collapsed"
                }`}
              >
                <p className="mats-3d-hotspot-title">{hotspot.title}</p>
                <p className="mats-3d-hotspot-body">{hotspot.body}</p>
              </div>
            </button>
          )}
        </model-viewer>
      ) : (
        <div className="mats-render">
          <Image
            src={poster || "/images/design/material-liner.webp"}
            alt={alt}
            width={1145}
            height={1374}
            sizes="(max-width: 1024px) 60vw, 30vw"
            priority
          />
        </div>
      )}
    </div>
  );
}