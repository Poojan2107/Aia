"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  poster: string;
  className?: string;
  position?: string;
  sizes?: string;
  /** Scale past the frame so encoded letterbox never shows. */
  coverBleed?: boolean;
};

/**
 * Poster always fills the frame. Film fades in only after real playback.
 */
export function AmbientFilm({
  src,
  poster,
  className = "",
  position = "center center",
  sizes = "100vw",
  coverBleed = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!src || !wrap || !video || reduced) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.muted = true;
      void video
        .play()
        .then(() => {
          if (video.videoWidth > 0) setReady(true);
        })
        .catch(() => undefined);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.08, rootMargin: "160px" },
    );
    io.observe(wrap);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      io.disconnect();
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden bg-[#1a242c] ${className}`}>
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover ${coverBleed ? "scale-[1.12]" : ""}`}
        style={{ objectPosition: position }}
        quality={90}
      />
      {src ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full max-w-none object-cover transition-opacity duration-700 ${
            coverBleed ? "scale-[1.12]" : ""
          } ${ready ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: position }}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          src={src}
          onPlaying={() => setReady(true)}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
