
"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { playableVideo } from "@/lib/video";
import { CtaButton } from "@/components/ui/CtaButton";
import { href } from "@/lib/routes";

/** Dun & Bradstreet ESG Registered seal (Figma 02Homepage, bottom-right of the hero). */
const ESG_BADGE = "/images/design/esg-dnb-badge.png";

export interface HeroBanner {
  id: string;
  /** Optional oversized lead (e.g. "450,000 MT"); the tagline then sets smaller beneath it. */
  lead?: string;
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
    tagline: ["ENGINEERED TO", "THINK AHEAD."],
    lede: [
      "Combining advanced metallurgy, simulation and precision engineering to develop wear-resistant solutions, mill liners and grinding media for demanding industrial applications.",
    ],
    ctaText: "Explore our technology",
    ctaHref: "#tech-heading",
    video: "/videos/banners/hero-engineering-excellence-v2.mp4",
    poster: "/images/design/hero-banner-engineering.jpg",
  },
  {
    id: "manufacturing-capacity",
    lead: "450,000 MT",
    tagline: ["OF MANUFACTURING THAT", "KEEPS INDUSTRIES MOVING."],
    lede: [
      "Across six manufacturing clusters, AIA Engineering combines advanced metallurgy, state-of-the-art manufacturing and large-scale production to deliver wear-resistant castings and engineered grinding solutions for critical industrial applications.",
    ],
    ctaText: "Explore our infrastructure",
    ctaHref: href("technology-infrastructure"),
    video: "/videos/banners/hero-manufacturing.mp4",
    poster: "/images/design/hero-banner-manufacturing.jpg",
  },
  {
    id: "services-support",
    tagline: ["PERFORMANCE", "DOESN’T END AT", "DELIVERY."],
    lede: [
      "From grinding circuit optimisation and mill reline supervision to wear monitoring and technical support, AIA helps customers improve grinding efficiency, equipment reliability and operational performance.",
    ],
    ctaText: "Explore services & support",
    ctaHref: "#services-heading",
    video: "/videos/banners/hero-services-v2.mp4",
    poster: "/images/design/hero-banner-services.jpg",
  },
  {
    id: "ngds",
    lead: "NGDS.",
    tagline: ["THE NEXT EVOLUTION IN", "DISCHARGE ASSEMBLY."],
    lede: [
      "AIA’s Next Generation Discharge System (NGDS) brings advanced discharge engineering to SAG and ball mills, designed to improve slurry evacuation, support higher mill throughput, reduce energy consumption and enhance grinding efficiency.",
    ],
    ctaText: "Explore NGDS technology",
    ctaHref: href("mining-ngds"),
    video: "/videos/banners/hero-ngds.mp4",
    poster: "/images/design/hero-banner-ngds.jpg",
  },
  {
    id: "global-logistics",
    tagline: ["ENGINEERED IN INDIA.", "CONNECTED TO", "THE WORLD."],
    lede: [
      "Through VEGA Industries, AIA Engineering connects its manufacturing expertise and engineered grinding solutions with customers across 120+ countries, supported by an international distribution network and regional technical services.",
    ],
    ctaText: "Explore global presence",
    ctaHref: href("global-presence"),
    video: "/videos/banners/hero-logistics.mp4",
    poster: "/images/design/hero-banner-logistics.jpg",
  },
];

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // `banner` is the one asked for (pager / timer); `shown` is the one on screen. A banner's film
  // loads hidden in its own layer and only crossfades in once it is actually playing, so the
  // previous banner never flashes through and no still image is ever shown.
  const [banner, setBanner] = useState(0);
  const [shown, setShown] = useState(0);
  // The banner that was on screen before: it stays fully visible underneath while the new one
  // fades in over it (no dip to black mid-crossfade).
  const [prev, setPrev] = useState(-1);
  // MP4 everywhere; browsers without H.264 get the WebM twin (decided in the browser, after mount).
  const [webm, setWebm] = useState(false);
  useEffect(() => {
    setWebm(playableVideo("/x.mp4") !== "/x.mp4");
  }, []);
  const [loaded, setLoaded] = useState<boolean[]>(() => BANNERS.map((_, i) => i === 0));
  const [firstReady, setFirstReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const current = BANNERS[shown] ?? BANNERS[0];

  // Auto-advance 8 seconds after a banner is on screen, when not paused.
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => setBanner((shown + 1) % BANNERS.length), 8000);
    return () => window.clearTimeout(timer);
  }, [isPaused, shown]);

  // Bring the asked-for banner in: give its layer a source, start it from the top, and show it
  // once it plays. The next banner's film is warmed up in the background so the switch is instant.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = (banner + 1) % BANNERS.length;
    setLoaded((l) => (l[banner] && l[next] ? l : l.map((v, i) => v || i === banner || i === next)));
    const video = videoRefs.current[banner];
    if (!video) return;
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown((s) => {
        if (s !== banner) setPrev(s);
        return banner;
      });
      setFirstReady(true);
    };
    if (banner !== shown) video.currentTime = 0;
    video.muted = true;
    if (reduced) {
      // Reduced motion: the film's first frame, still.
      if (video.readyState >= 2) show();
      else video.addEventListener("loadeddata", show, { once: true });
      return;
    }
    const play = () => void video.play().then(show).catch(() => undefined);
    if (video.readyState >= 3) play();
    else video.addEventListener("canplay", play, { once: true });
    video.addEventListener("playing", show, { once: true });
    return () => {
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", show);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `shown` is read, not tracked
  }, [banner, loaded[banner]]);

  // Once a crossfade has finished, pause the films that are no longer on screen.
  useEffect(() => {
    const t = window.setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== shown && !v.paused) v.pause();
      });
    }, 1300);
    return () => window.clearTimeout(t);
  }, [shown]);

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
    // Cached track geometry (refreshed on resize) keeps layout reads out of the scroll loop.
    const geo = { top: 0, height: 1 };
    const remeasure = () => {
      const r = track.getBoundingClientRect();
      geo.top = r.top + window.scrollY;
      geo.height = r.height;
    };
    remeasure();
    const ro = new ResizeObserver(() => {
      remeasure();
      onScroll();
    });
    ro.observe(track);
    const update = () => {
      raf = 0;
      const range = Math.max(1, geo.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, (window.scrollY - geo.top) / range));
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
      ro.disconnect();
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
        <div className={`absolute inset-0 overflow-hidden hero-films${firstReady ? " is-ready" : ""}`} aria-hidden>
          {BANNERS.map((b, i) => (
            <video
              key={b.id}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className={`hero-film hero-layer film-drift object-cover object-[center_45%] brightness-[0.84] contrast-[1.04]${
                i === shown ? " is-on" : i === prev ? " is-prev" : ""
              }`}
              muted
              loop
              playsInline
              preload={loaded[i] ? "auto" : "none"}
              src={loaded[i] ? (webm ? b.video.replace(/\.mp4$/, ".webm") : b.video) : undefined}
              disablePictureInPicture
            />
          ))}
          <div className="hero-scrim" aria-hidden />
        </div>

        <div className="hero-copy z-10" data-hero-lock="figma-1920">
          <div key={current.id} className="hero-lockup animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className={`hero-enter hero-headline ft ft-hero${current.lead ? " has-lead" : ""}`}>
              {current.lead && <span className="hero-lead">{current.lead}</span>}
              {current.tagline.map((line, idx) => (
                <Fragment key={idx}>
                  {/* Word break for search engines and screen readers; lines are visual blocks. */}
                  {(idx > 0 || current.lead) && <span className="sr-only"> </span>}
                  <span className={current.lead ? "hero-sub" : undefined}>{line}</span>
                </Fragment>
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
              aria-label={`Show banner ${i + 1} of ${BANNERS.length}: ${[item.lead, ...item.tagline].filter(Boolean).join(" ")}`}
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
