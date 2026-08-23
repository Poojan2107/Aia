"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { assets } from "@/data/assets";
import { media } from "@/data/media";

/** Full-viewport film + Figma Present lockup (90/95 type, 134px inset). */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.muted = true;
      void video.play().then(() => setReady(true)).catch(() => undefined);
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <section
      className="hero-viewport relative isolate w-full bg-black"
      aria-label="Hero"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.hero.plate}
          alt=""
          className={`hero-film object-cover object-[center_42%] brightness-[0.84] contrast-[1.04] transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          className="hero-film film-drift object-cover object-[center_42%] brightness-[0.84] contrast-[1.04]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={assets.hero.plate}
          src={media.hero}
          onPlaying={() => setReady(true)}
          disablePictureInPicture
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.12)_30%,rgba(0,0,0,0.22)_60%,rgba(0,0,0,0.72)_100%)]" />
      </div>

      <div className="hero-copy z-10" data-hero-lock="figma-1920">
        <div className="hero-lockup">
          <h1 className="hero-enter hero-headline">
            <span>We engineer for</span>
            <span>the hours you</span>
            <span>can&apos;t afford to lose.</span>
          </h1>

          <div className="hero-enter-late hero-rail">
            <p className="hero-lede mb-[1.25vw]">
              Advanced wear solutions engineered to extend component life,
              improve equipment availability and keep critical operations
              performing.
            </p>
            <CtaButton href="#solutions" variant="solid">
              Explore wear solutions
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
