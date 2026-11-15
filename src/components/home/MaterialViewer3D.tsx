"use client";

import { useEffect, useRef, useState } from "react";
import { webglTier } from "@/lib/webgl";

/**
 * 3D viewer for AIA's products (models converted locally from AIA's own CAD; see scripts/cad).
 * - model-viewer is self-hosted (public/vendor), with the meshopt decoder served locally too:
 *   nothing loads from a third-party CDN.
 * - Finishes are baked into each model per material (matte cast metal, rubber, ceramic), so the
 *   viewer applies no shading overrides — this is what keeps cast liners dull, like the real parts.
 */
export type ModelInfo = { material: string; featuredApp: string; specs?: string[] };

type Props = {
  src?: string;
  /** AIA's own product image (aiaengineering.com), shown when the part has no converted model. */
  image?: string;
  alt: string;
  info?: ModelInfo;
  orbit?: string;
};

const MODEL_VIEWER_SRC = "/vendor/model-viewer-4.0.0.min.js";
const MESHOPT_DECODER_SRC = "/vendor/meshopt_decoder.js";
const DEFAULT_ORBIT = "35deg 65deg 105%";
/** Where each model starts before it turns into its front view (theta offset, a little higher). */
const introOrbit = (front: string) => {
  const [t, p, r] = front.split(/\s+/);
  return `${parseFloat(t) - 60}deg ${Math.min(80, parseFloat(p) + 8)}deg ${parseFloat(r) + 12}%`;
};

type ModelViewerCtor = CustomElementConstructor & { meshoptDecoderLocation?: string };


function loadModelViewer(): Promise<void> {
  const ready = () => {
    const ctor = customElements.get("model-viewer") as ModelViewerCtor | undefined;
    if (ctor) ctor.meshoptDecoderLocation = MESHOPT_DECODER_SRC;
  };
  if (customElements.get("model-viewer")) {
    ready();
    return Promise.resolve();
  }
  const existing = document.querySelector<HTMLScriptElement>('script[data-model-viewer="aia"]');
  const script = existing ?? document.createElement("script");
  if (!existing) {
    script.type = "module";
    script.src = MODEL_VIEWER_SRC;
    script.dataset.modelViewer = "aia";
    document.head.appendChild(script);
  }
  return customElements.whenDefined("model-viewer").then(ready);
}

export function MaterialViewer3D({ src, image, alt, info, orbit }: Props) {
  const [scriptReady, setScriptReady] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(false);
  // Info card: closed by default (it sat over the model); the + button opens it.
  const [infoToggled, setInfoToggled] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [noWebGL, setNoWebGL] = useState(false);
  const viewerRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cameraOrbit = orbit || DEFAULT_ORBIT;
  // Intro turn: the model loads angled away and glides into its front view once it is on screen.
  const [introDone, setIntroDone] = useState(false);
  // Still render of the same AIA model (scripts/cad/posters.mjs): shown instantly while the 3D
  // loads, and instead of 3D on devices without a GPU.
  const poster = src ? src.replace(/\.glb$/, ".poster.webp") : undefined;

  // Load the 3D viewer in idle time shortly after the page has loaded (after the globe's own
  // start-up), or as soon as the section comes near if that happens first. Loading it only on
  // approach put its script compile in the middle of the visitor's scroll. Only on machines with
  // a GPU; without one the still render is shown instead.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let alive = true;
    let started = false;
    let timer = 0;
    const start = () => {
      if (started || !alive) return;
      started = true;
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      if (webglTier() !== "hardware") {
        setNoWebGL(true);
        return;
      }
      loadModelViewer()
        .then(() => alive && setScriptReady(true))
        .catch(() => alive && setHasError(true));
    };
    type IdleWin = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const onLoad = () => {
      timer = window.setTimeout(() => {
        const w = window as IdleWin;
        if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 3000 });
        else start();
      }, 2500);
    };
    const io = new IntersectionObserver(([entry]) => entry?.isIntersecting && start(), { rootMargin: "100% 0px" });
    io.observe(el);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => {
      alive = false;
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const onLoad = () => {
      setIsLoading(false);
      // Turn into the front view when the stage is on screen (now, or when it scrolls in).
      const container = containerRef.current;
      if (!container) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          window.setTimeout(() => {
            const mv = viewerRef.current as unknown as { cameraOrbit?: string } | null;
            if (mv) mv.cameraOrbit = cameraOrbit;
            setIntroDone(true);
          }, 120);
        },
        { threshold: 0.35 },
      );
      io.observe(container);
    };
    const onError = () => {
      setIsLoading(false);
      setHasError(true);
    };
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [scriptReady, src, cameraOrbit]);

  const resetView = () => {
    const el = viewerRef.current as unknown as { cameraOrbit?: string } | null;
    if (el) el.cameraOrbit = cameraOrbit;
    setAutoRotate(false);
    setIsInteractive(false);
  };

  return (
    <div
      ref={containerRef}
      className={`mats-3d-container ${isInteractive ? "is-interactive" : "is-locked"}`}
      onClick={() => !isInteractive && setIsInteractive(true)}
    >
      {src && scriptReady && !hasError && !noWebGL ? (
        <model-viewer
          ref={viewerRef}
          key={src}
          src={src}
          alt={alt}
          bounds="tight"
          environment-image="/models/env/studio.hdr"
          camera-orbit={introDone ? cameraOrbit : introOrbit(cameraOrbit)}
          field-of-view="30deg"
          min-camera-orbit="auto 20deg 85%"
          max-camera-orbit="auto 86deg 150%"
          interpolation-decay="110"
          disable-pan
          camera-controls={isInteractive ? true : undefined}
          auto-rotate={autoRotate ? "" : undefined}
          auto-rotate-delay={300}
          rotation-per-second="18deg"
          touch-action="pan-y"
          shadow-intensity="1.25"
          shadow-softness="0.65"
          exposure="0.9"
          tone-mapping="neutral"
          interaction-prompt="none"
          loading="eager"
          className="mats-model-viewer"
        />
      ) : null}

      {src && (isLoading || !scriptReady) && !hasError && !noWebGL && (
        <div className="mats-3d-loading">
          <span className="mats-3d-spinner" aria-hidden="true" />
          <span className="mats-3d-loading-text">Loading AIA CAD model…</span>
        </div>
      )}

      {!src && image && (
        <div className="mats-product-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} loading="lazy" decoding="async" />
        </div>
      )}

      {!src && !image && (
        <div className="mats-3d-pending">
          <span className="mats-3d-pending-kicker">AIA CAD model</span>
          <span className="mats-3d-pending-text">3D model being prepared from AIA&rsquo;s engineering files.</span>
        </div>
      )}

      {poster && (
        <div
          className={`mats-product-image mats-model-poster${hasError || noWebGL || isLoading || !scriptReady ? "" : " is-hidden"}`}
          aria-hidden={!(hasError || noWebGL || isLoading || !scriptReady)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt={alt} decoding="async" />
        </div>
      )}

      {info && (
        <div className="mats-hotspot-container mats-hotspot-container--media" data-toggled={infoToggled ? "true" : "false"}>
          <button
            type="button"
            className="mats-hotspot-pin"
            onClick={(e) => {
              e.stopPropagation();
              setInfoToggled((v) => !v);
            }}
            aria-label="Toggle material information"
            aria-expanded={infoToggled}
          >
            <span className="mats-pin-pulse" />
            <span className="mats-pin-dot">{infoToggled ? "−" : "+"}</span>
            <span className="mats-pin-label">Material details</span>
          </button>
          {(
            <div className="mats-ref-card">
              <div className="mats-ref-row">
                <span className="mats-ref-label">Material</span>
                <span className="mats-ref-sep">:</span>
                <span className="mats-ref-val">{info.material}</span>
              </div>
              <div className="mats-ref-row">
                <span className="mats-ref-label">Featured Application</span>
                <span className="mats-ref-sep">:</span>
                <span className="mats-ref-val">{info.featuredApp}</span>
              </div>
              {info.specs?.length ? (
                <div className="mats-ref-row">
                  <span className="mats-ref-label">Specification</span>
                  <span className="mats-ref-sep">:</span>
                  <span className="mats-ref-val">{info.specs.join(" · ")}</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {src && !isInteractive && !isLoading && !hasError && !noWebGL && (
        <div className="mats-click-hint" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span>Click to interact</span>
        </div>
      )}

      {src && !hasError && !noWebGL && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (autoRotate || isInteractive) resetView();
            else {
              setIsInteractive(true);
              setAutoRotate(true);
            }
          }}
          className={`mats-360-pill ${autoRotate ? "mats-360-pill--active" : ""}`}
          aria-label={autoRotate || isInteractive ? "Reset front view" : "Start 360 rotation"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <ellipse cx="12" cy="12" rx="10" ry="5" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
          <span>{autoRotate || isInteractive ? "Reset front view" : "360 view"}</span>
        </button>
      )}
    </div>
  );
}
