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
        <div className="hero-scrim" aria-hidden />
      </div>

      <div className="hero-copy z-10" data-hero-lock="figma-1920">
        <div className="hero-lockup">
          <h1 className="hero-enter hero-headline">
            <span>WE ENGINEER FOR</span>
            <span>THE HOURS YOU</span>
            <span>CAN&apos;T AFFORD TO LOSE.</span>
          </h1>

          <div className="hero-enter-late hero-rail">
            <p className="hero-lede">
              <span>Advanced wear solutions engineered to extend component</span>
              <span>life, improve equipment availability and keep critical</span>
              <span>operations performing.</span>
            </p>
            <CtaButton
              href="#solutions"
              variant="solid"
              className="hero-cta !h-[40px] !px-[1.4rem] !text-[11px] !gap-2"
            >
              Explore wear solutions
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
