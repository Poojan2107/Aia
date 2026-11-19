"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { playableVideo } from "@/lib/video";
import { CtaButton } from "@/components/ui/CtaButton";

const VIDEO = "/videos/quarry-hero.mp4";
const POSTER = "/images/industry/quarry-hero-poster.jpg";

type Props = {
  tagline: string[];
  lede: string;
  ctaHref: string;
  ctaText?: string;
};

/**
 * Full-bleed video hero matching the homepage Hero pattern — single lockup,
 * scrim, and CTA rail. Used on the local-only quarry products page.
 */
export function QuarryHero({ tagline, lede, ctaHref, ctaText = "View quarry products" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Scroll-out: progress through the hero drives --atmos (0 -> 1), which lifts, blurs and dims the
  // hero copy and film in CSS while the page scrolls normally.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const geo = { top: 0, height: 1 };
    const measure = () => {
      const r = track.getBoundingClientRect();
      geo.top = r.top + window.scrollY;
      geo.height = r.height;
    };
    const update = () => {
      raf = 0;
      // Normal scroll (no curtain): the copy eases up and out over the hero's own height, so the
      // handover to the products is gradual instead of the text vanishing at the first pixel.
      const range = Math.max(1, geo.height * 1.15);
      const p = Math.min(1, Math.max(0, (window.scrollY - geo.top) / range));
      track.style.setProperty("--atmos", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(track);
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setReady(false);
    video.src = playableVideo(VIDEO);
    video.poster = POSTER;
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
    };
  }, []);

  return (
    <div ref={trackRef} className="hero-track hero-track--single">
      <section className="hero-viewport relative isolate w-full bg-black" aria-label="Quarry">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POSTER}
            alt=""
            fetchPriority="high"
            className={`hero-film object-cover object-[center_45%] brightness-[0.84] contrast-[1.04] transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            className={`hero-film film-drift object-cover object-[center_45%] brightness-[0.84] contrast-[1.04] transition-opacity duration-700 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
            src={VIDEO}
            onPlaying={() => setReady(true)}
            disablePictureInPicture
          />
          <div className="hero-scrim" aria-hidden />
        </div>

        <div className="hero-copy z-10" data-hero-lock="figma-1920">
          <div className="hero-lockup animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="hero-enter hero-headline ft ft-hero">
              {tagline.map((line, idx) => (
                <Fragment key={idx}>
                  {idx > 0 && <span className="sr-only"> </span>}
                  <span>{line}</span>
                </Fragment>
              ))}
            </h1>

            <div className="hero-enter-late hero-rail">
              <p className="hero-lede ft ft-lede">
                <span>{lede}</span>
              </p>
              <CtaButton href={ctaHref} variant="solid" className="hero-cta !h-[40px] !px-[1.4rem] !text-[11px] !gap-2">
                {ctaText}
              </CtaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
