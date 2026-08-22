"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  poster: string;
  className?: string;
  /** object-position, e.g. "center 40%" */
  position?: string;
};

/**
 * Muted looping cover film. Poster holds the frame until playback starts.
 * Pauses off-screen so three plant loops don't decode at once.
 */
export function AmbientFilm({
  src,
  poster,
  className = "",
  position = "center center",
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
      void video.play().then(() => setReady(true)).catch(() => undefined);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.12, rootMargin: "120px" },
    );
    io.observe(wrap);
    video.addEventListener("canplay", tryPlay);
    return () => {
      io.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-black ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={`film-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        style={{ objectPosition: position }}
      />
      {src ? (
        <video
          ref={videoRef}
          className={`film-cover film-drift transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
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
