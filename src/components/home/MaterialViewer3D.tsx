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
  material: string;
  featuredApp: string;
  position?: string;
  normal?: string;
};

type Props = {
  src?: string;
  poster?: string;
  alt: string;
  mocType?: MocShadingType;
  hotspot?: HotspotData;
  orientation?: string;
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
  orientation,
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
  const [autoRotateActive, setAutoRotateActive] = useState(false);
  const viewerRef = useRef<HTMLElement | null>(null);

  const defaultOrbit = cameraOrbit || "0deg 85deg 115%";

  const handleToggle360 = () => {
    const el = viewerRef.current as unknown as { cameraOrbit?: string; autoRotate?: boolean };
    if (!el) return;
    if (!autoRotateActive) {
      setAutoRotateActive(true);
    } else {
      setAutoRotateActive(false);
      // Reset back to front-facing view
      if (typeof el.cameraOrbit !== "undefined") {
        el.cameraOrbit = defaultOrbit;
      }
    }
  };

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
      console.warn("Could not load model-viewer CDN, falling back to static image.");
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

  // Apply authentic physical metallurgical PBR shading matching AIA website palette & materials
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
            // Deep vulcanized matte industrial elastomer: soft non-metallic scattering
            pbr.setBaseColorFactor([0.11, 0.12, 0.14, 1.0]);
            pbr.setMetallicFactor(0.02);
            pbr.setRoughnessFactor(0.86);
            break;

          case "integrated":
            // Integrated composite: high-chrome wave lifter wear face on dampening elastomer bedding
            // Material 1 ("FFEFD2CB"): High-Chrome Alloy Wear Face
            // Material 0 ("FFB2B2B2"): Mounting elastomer base
            if (idx === 1 || matName.includes("efd2cb") || matName.includes("lifter") || matName.includes("face")) {
              pbr.setBaseColorFactor([0.86, 0.89, 0.94, 1.0]);
              pbr.setMetallicFactor(0.96);
              pbr.setRoughnessFactor(0.15);
            } else {
              pbr.setBaseColorFactor([0.12, 0.13, 0.15, 1.0]);
              pbr.setMetallicFactor(0.02);
              pbr.setRoughnessFactor(0.88);
            }
            break;

          case "composite":
            // Dual-matrix composite: high-chrome wear inserts in resilient vulcanized rubber matrix
            // Material 1 ("FF7FFFFB"): Vulcanized Rubber Sector Body & Backing (Yellow in CAD)
            // Materials 0 & 2 ("FFFFCDF6", "FFE3E3E3"): High-Chrome Alloy Wear Inserts (Pink in CAD)
            if (
              matName.includes("rubber") ||
              matName.includes("back") ||
              matName.includes("cushion") ||
              matName.includes("7ffffb") ||
              idx === 1
            ) {
              // Vulcanized rubber cushion matrix
              pbr.setBaseColorFactor([0.10, 0.11, 0.13, 1.0]);
              pbr.setMetallicFactor(0.01);
              pbr.setRoughnessFactor(0.88);
            } else {
              // High-chrome wear inserts: brilliant cast alloy
              pbr.setBaseColorFactor([0.86, 0.89, 0.94, 1.0]);
              pbr.setMetallicFactor(0.96);
              pbr.setRoughnessFactor(0.14);
            }
            break;

          case "sintercast":
            // High-chrome cast alloy matrix with embedded dark refractory ceramic SinterCast inserts
            // Material 1 ("FFE3E3E3"): Heavy cast high-chrome alloy shell body
            // Materials 0, 2, 3 ("FF83BCFC", "FFFF00FF", "FF8080FF"): Refractory ceramic inserts (Magenta in CAD)
            if (
              matName.includes("8080ff") ||
              matName.includes("83bcfc") ||
              matName.includes("ff00ff") ||
              matName.includes("ceramic") ||
              matName.includes("insert") ||
              matName.includes("tile") ||
              idx !== 1
            ) {
              // Ultra-hard refractory ceramic composite armor tiles
              pbr.setBaseColorFactor([0.10, 0.11, 0.13, 1.0]);
              pbr.setMetallicFactor(0.04);
              pbr.setRoughnessFactor(0.72);
            } else {
              // High-chrome alloy shell matrix
              pbr.setBaseColorFactor([0.78, 0.82, 0.88, 1.0]);
              pbr.setMetallicFactor(0.95);
              pbr.setRoughnessFactor(0.18);
            }
            break;

          case "steel":
            // Tough martensitic Cr-Mo alloy steel: dense industrial gunmetal alloy sheen
            pbr.setBaseColorFactor([0.36, 0.40, 0.46, 1.0]);
            pbr.setMetallicFactor(0.88);
            pbr.setRoughnessFactor(0.30);
            break;

          case "vcast":
            // V-Cast: tough tempered alloy steel with gunmetal sheen
            pbr.setBaseColorFactor([0.30, 0.35, 0.44, 1.0]);
            pbr.setMetallicFactor(0.92);
            pbr.setRoughnessFactor(0.24);
            break;

          case "media":
            // Spherical high-chrome grinding ball: specular mirror chrome reflection
            pbr.setBaseColorFactor([0.94, 0.96, 0.99, 1.0]);
            pbr.setMetallicFactor(0.98);
            pbr.setRoughnessFactor(0.06);
            break;

          case "metal":
          default:
            // High-Chrome / Cr-Mo White Cast Iron: authentic crystalline specular metallic sheen
            pbr.setBaseColorFactor([0.80, 0.84, 0.90, 1.0]);
            pbr.setMetallicFactor(0.95);
            pbr.setRoughnessFactor(0.18);
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
    el.addEventListener("scene-graph-ready", handleLoad);
    el.addEventListener("error", handleError);

    // Apply immediately and follow up once scene graph populates
    applyMaterialShading(el);
    const timer = setTimeout(() => applyMaterialShading(el), 80);

    return () => {
      clearTimeout(timer);
      el.removeEventListener("load", handleLoad);
      el.removeEventListener("scene-graph-ready", handleLoad);
      el.removeEventListener("error", handleError);
    };
  }, [src, scriptReady, mocType, applyMaterialShading, isLoading]);

  // If no 3D GLB is provided or error, render verified authentic photograph (e.g. Grinding Media)
  if (!src || hasError) {
    const fallbackImage = poster || "/images/products/grinding-1.webp";
    return (
      <div className="mats-render mats-render-image-mode">
        <div className="mats-image-wrapper">
          <Image
            src={fallbackImage}
            alt={alt}
            width={720}
            height={540}
            className="mats-authentic-photo"
            priority
          />
          {hotspot && (
            <div className="mats-hotspot-container mats-hotspot-container--media">
              <button
                type="button"
                className="mats-hotspot-pin"
                onClick={() => setHotspotOpen(!hotspotOpen)}
                aria-label="Toggle material information"
              >
                <span className="mats-pin-pulse" />
                <span className="mats-pin-dot">+</span>
              </button>
              {hotspotOpen && (
                <div className="mats-ref-card">
                  <div className="mats-ref-row">
                    <span className="mats-ref-label">Material</span>
                    <span className="mats-ref-sep">:</span>
                    <span className="mats-ref-val">{hotspot.material}</span>
                  </div>
                  <div className="mats-ref-row">
                    <span className="mats-ref-label">Featured Application</span>
                    <span className="mats-ref-sep">:</span>
                    <span className="mats-ref-val">{hotspot.featuredApp}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mats-3d-container">
      {isLoading && (
        <div className="mats-3d-loading">
          <span className="mats-3d-spinner" aria-hidden="true" />
          <span className="mats-3d-loading-text">Loading AIA CAD Model…</span>
        </div>
      )}

      {scriptReady ? (
        <model-viewer
          ref={viewerRef}
          key={src}
          src={src}
          alt={alt}
          bounds="tight"
          environment-image="neutral"
          orientation={orientation || "0deg 0deg 0deg"}
          camera-target={cameraTarget || "auto auto auto"}
          camera-orbit={defaultOrbit}
          field-of-view={fieldOfView || "32deg"}
          camera-controls
          auto-rotate={autoRotateActive ? "" : undefined}
          auto-rotate-delay={500}
          rotation-per-second="18deg"
          touch-action="pan-y"
          shadow-intensity="1.8"
          shadow-softness="0.4"
          exposure="1.20"
          tone-mapping="aces"
          interaction-prompt="none"
          loading="eager"
          className="mats-model-viewer"
        >
          {hotspot && (
            <div
              slot="hotspot-main"
              data-position={hotspot.position || "0m 0.04m 0.06m"}
              data-normal={hotspot.normal || "0m 1m 0m"}
              className="mats-3d-hotspot-wrapper"
            >
              <button
                type="button"
                className="mats-hotspot-pin"
                onClick={() => setHotspotOpen(!hotspotOpen)}
                aria-label="Toggle material information"
              >
                <span className="mats-pin-pulse" />
                <span className="mats-pin-dot">+</span>
              </button>
              {hotspotOpen && (
                <div className="mats-ref-card">
                  <div className="mats-ref-row">
                    <span className="mats-ref-label">Material</span>
                    <span className="mats-ref-sep">:</span>
                    <span className="mats-ref-val">{hotspot.material}</span>
                  </div>
                  <div className="mats-ref-row">
                    <span className="mats-ref-label">Featured Application</span>
                    <span className="mats-ref-sep">:</span>
                    <span className="mats-ref-val">{hotspot.featuredApp}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </model-viewer>
      ) : (
        <div className="mats-render">
          <Image
            src={poster || "/images/design/material-liner.webp"}
            alt={alt}
            width={720}
            height={540}
            priority
          />
        </div>
      )}

      {src && (
        <button
          type="button"
          onClick={handleToggle360}
          className={`mats-360-pill ${autoRotateActive ? "mats-360-pill--active" : ""}`}
          aria-label={autoRotateActive ? "Reset front view" : "Start 360 rotation"}
          title={autoRotateActive ? "Click to reset to front view" : "Click to rotate 360°"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <ellipse cx="12" cy="12" rx="10" ry="5" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
          <span>{autoRotateActive ? "Reset front view" : "360 view"}</span>
        </button>
      )}
    </div>
  );
}
