"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";

/** Dun & Bradstreet ESG Registered seal (Figma 02Homepage, bottom-right of the hero). */
const ESG_BADGE = "/images/design/esg-dnb-badge.png";

export interface HeroBanner {
  id: string;
  tagline: string[];
  lede: string[];
  ctaText: string;
  ctaHref: string;
  video: string;
  poster: string;
}

/**
 * Exact 5-Banner sequence matching 13Utopia client data order:
 * 1: Banner 1 - Engineering Excellence
 * 2: Banner 2 - Manufacturing
 * 3: Banner 3 - Services
 * 4: Banner 4 - NGDS
 * 5: Banner 5 - Logistics
 */
const BANNERS: HeroBanner[] = [
  {
    id: "engineering-excellence",
    tagline: ["ENGINEERING", "EXCELLENCE IN", "EVERY SOLUTION."],
    lede: [
      "Combining proprietary metallurgy, advanced design modeling and deep",
      "application insights to optimize grinding circuits worldwide.",
    ],
    ctaText: "Explore solutions by industry",
    ctaHref: "#solutions",
    video: "/videos/banners/hero-engineering-excellence.mp4",
    poster: "/images/design/hero-banner-engineering.jpg",
  },
  {
    id: "manufacturing-capacity",
    tagline: ["450,000 MT CAPACITY.", "6 MANUFACTURING CLUSTERS."],
    lede: [
      "World-scale state-of-the-art foundries, ISO-certified manufacturing,",
      "and automated heat treatment serving 4,000+ operations globally.",
    ],
    ctaText: "Explore our technology",
    ctaHref: "/technology-infrastructure",
    video: "/videos/banners/hero-manufacturing.mp4",
    poster: "/images/design/hero-banner-manufacturing.jpg",
  },
  {
    id: "services-support",
    tagline: ["OPTIMIZE. MAINTAIN.", "EXCEL."],
    lede: [
      "End-to-end technical support, mill relining, wear monitoring,",
      "and continuous diagnostics for your grinding operations worldwide.",
    ],
    ctaText: "Explore services & support",
    ctaHref: "#services",
    video: "/videos/banners/hero-services.mp4",
    poster: "/images/design/hero-banner-services.jpg",
  },
  {
    id: "ngds",
    tagline: ["NEXT GENERATION", "DISCHARGE SYSTEM (NGDS)."],
    lede: [
      "Proprietary mill discharge design eliminating slurry pooling,",
      "maximizing grinding throughput, and dramatically extending liner life.",
    ],
    ctaText: "Explore wear solutions",
    ctaHref: "#materials",
    video: "/videos/banners/hero-ngds.mp4",
    poster: "/images/design/hero-banner-ngds.jpg",
  },
  {
    id: "global-logistics",
    tagline: ["A GLOBAL NETWORK", "DELIVERING TO", "120+ COUNTRIES."],
    lede: [
      "Integrated supply chain, strategically positioned regional warehouses,",
      "and 10+ international service centers ensuring zero downtime.",
    ],
    ctaText: "Explore global presence",
    ctaHref: "/global-presence",
    video: "/videos/banners/hero-logistics.mp4",
    poster: "/images/design/hero-banner-logistics.jpg",
  },
];

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [banner, setBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = BANNERS[banner] ?? BANNERS[0];

  // Auto-advance every 8 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setBanner((prev) => (prev + 1) % BANNERS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // When banner switches, reload and play video with smooth fade-in
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setReady(false);
    video.src = current.video;
    video.poster = current.poster;
    video.load();

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video
        .play()
        .then(() => setReady(true))
        .catch(() => undefined);
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("playing", () => setReady(true));
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", () => setReady(true));
    };
  }, [banner, current.video, current.poster]);

  const selectBanner = useCallback((idx: number) => {
    setBanner(idx);
  }, []);

  // Atmosphere exit: the hero holds while a navy → AIA blue → sky → #f5f5f5 gradient rises
  // over it. Scroll progress through the track drives one CSS variable (--atmos, 0 → 1).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / range));
      const rounded = Math.round(p * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      track.style.setProperty("--atmos", String(rounded));
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
  }, []);

  return (
    <div ref={trackRef} className="hero-track">
    <section
      className="hero-viewport relative isolate w-full bg-black"
      aria-label="Hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.poster}
          alt=""
          fetchPriority="high"
          className={`hero-film object-cover object-[center_45%] brightness-[0.84] contrast-[1.04] transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          key={current.video}
          className={`hero-film film-drift object-cover object-[center_45%] brightness-[0.84] contrast-[1.04] transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={current.poster}
          src={current.video}
          onPlaying={() => setReady(true)}
          disablePictureInPicture
        />
        <div className="hero-scrim" aria-hidden />
      </div>

      <div className="hero-copy z-10" data-hero-lock="figma-1920">
        <div key={current.id} className="hero-lockup animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="hero-enter hero-headline ft ft-hero">
            {current.tagline.map((line, idx) => (
              <span key={idx}>{line}</span>
            ))}
          </h1>

          <div className="hero-enter-late hero-rail">
            <p className="hero-lede ft ft-lede">
              {current.lede.map((line, idx) => (
                <span key={idx}>{line}</span>
              ))}
            </p>
            <CtaButton
              href={current.ctaHref}
              variant="solid"
              className="hero-cta !h-[40px] !px-[1.4rem] !text-[11px] !gap-2"
            >
              {current.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>

      {/* 5 Banners vertical pager: each dot selects the matching banner */}
      <div className="hero-pager z-10" role="group" aria-label="Hero banners">
        {BANNERS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`hero-pager-dot${i === banner ? " is-active" : ""}`}
            aria-label={`Show banner ${i + 1} of ${BANNERS.length}: ${item.tagline.join(" ")}`}
            aria-current={i === banner ? "true" : undefined}
            onClick={() => selectBanner(i)}
          >
            <span aria-hidden />
          </button>
        ))}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ESG_BADGE}
        alt="Dun & Bradstreet ESG Registered"
        width={375}
        height={322}
        className="hero-esg"
      />

    </section>
    </div>
  );
}
