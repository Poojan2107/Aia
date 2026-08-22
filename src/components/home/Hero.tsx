"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { assets } from "@/data/assets";
import { media } from "@/data/media";

/** Full-viewport mill-floor film, locked to Figma Present at 100% zoom. */
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
    <section className="hero-viewport relative isolate w-full overflow-hidden bg-black" aria-label="Hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assets.hero.videoPoster}
        alt=""
        className={`hero-film transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        className="hero-film"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={assets.hero.videoPoster}
        src={media.hero}
        onPlaying={() => setReady(true)}
        disablePictureInPicture
        aria-hidden
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.28)_0%,rgba(4,29,44,0.08)_26%,rgba(4,29,44,0.16)_58%,rgba(4,29,44,0.52)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(34%,400px)] bg-gradient-to-r from-black/28 via-black/8 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 via-black/16 to-transparent"
      />

      <div className="page-pad relative z-10 flex h-full flex-col justify-end pb-[clamp(3.5rem,7.6vh,5rem)] pt-28">
        <div className="mx-auto grid w-full max-w-[1440px] items-end gap-8 lg:grid-cols-[minmax(0,1.42fr)_minmax(20rem,0.58fr)] lg:gap-10 xl:gap-14">
          <h1 className="hero-enter display text-[clamp(2.4rem,5.2vw,5.625rem)] font-bold uppercase leading-[0.95] tracking-normal text-white lg:text-[5.625rem] lg:leading-[5.9375rem]">
            We engineer for
            <br />
            the hours you can&apos;t
            <br />
            afford to lose.
          </h1>

          <div className="hero-enter-late w-full max-w-[32.75rem] pb-1 lg:justify-self-end">
            <p className="mb-6 max-w-[524px] font-[family-name:var(--font-ui)] text-[1.125rem] leading-7 text-white/92">
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
