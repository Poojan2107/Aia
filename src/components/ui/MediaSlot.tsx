"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Playback = "ambient" | "click";

type Props = {
  poster: string;
  posterAlt: string;
  src?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
  /** Full-bleed cinematic treatment */
  overlay?: boolean | "soft" | "heavy";
  /** Show a refined play affordance when this surface represents film */
  film?: boolean;
  playback?: Playback;
  loop?: boolean;
  /** Parent-controlled play state (gallery: only one film at a time) */
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  children?: React.ReactNode;
};

/**
 * Video-ready media surface.
 * Ambient slots hydrate in view and loop muted.
 * Click slots wait for a user gesture, then play with sound + controls.
 */
export function MediaSlot({
  poster,
  posterAlt,
  src,
  className = "",
  priority = false,
  sizes = "100vw",
  fit = "cover",
  overlay = false,
  film = false,
  playback = "ambient",
  loop,
  active,
  onActiveChange,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clickMode = playback === "click";
  const shouldLoop = loop ?? !clickMode;
  const [inView, setInView] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [internalActive, setInternalActive] = useState(false);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const isActive = active ?? internalActive;
  const allowAmbient = Boolean(src) && !clickMode && !reducedMotion;
  const shouldLoad = clickMode ? Boolean(src) && started : allowAmbient && inView;

  useEffect(() => {
    if (!src || !ref.current || clickMode) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [src, clickMode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (clickMode && !isActive) {
      video.pause();
      return;
    }

    const play = async () => {
      try {
        video.muted = !clickMode;
        await video.play();
      } catch {
        /* poster remains */
      }
    };
    void play();
  }, [shouldLoad, videoReady, clickMode, isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || clickMode) return;
    if (!inView) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [clickMode, inView, shouldLoad]);

  const setPlaying = (next: boolean) => {
    if (next) setStarted(true);
    if (active === undefined) setInternalActive(next);
    onActiveChange?.(next);
  };

  const overlayClass =
    overlay === true || overlay === "soft"
      ? "bg-gradient-to-b from-black/55 via-black/20 to-black/50"
      : overlay === "heavy"
        ? "bg-gradient-to-b from-black/70 via-black/35 to-black/65"
        : "";

  const showFilmAffordance = (film || clickMode) && !isActive;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={`${fit === "cover" ? "object-cover" : "object-contain"} ${
          videoReady && (!clickMode || isActive) ? "opacity-0" : "opacity-100"
        } transition-opacity duration-700`}
      />
      {src && shouldLoad ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full ${
            fit === "cover" ? "object-cover" : "object-contain"
          } ${videoReady ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
          muted={!clickMode}
          playsInline
          loop={shouldLoop}
          controls={clickMode && isActive}
          preload={clickMode ? "none" : "metadata"}
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => {
            if (clickMode && active !== false) setPlaying(false);
          }}
          onEnded={() => {
            setPlaying(false);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {overlay ? (
        <div aria-hidden className={`pointer-events-none absolute inset-0 ${overlayClass}`} />
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.18)]"
      />

      {showFilmAffordance ? (
        <button
          type="button"
          className="absolute inset-0 z-10 flex items-center justify-center"
          aria-label={`Play ${posterAlt}`}
          onClick={() => setPlaying(true)}
        >
          <span className="flex size-16 items-center justify-center rounded-full border border-white/50 bg-black/35 text-white backdrop-blur-sm transition hover:scale-[1.04] md:size-[72px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          </span>
        </button>
      ) : null}

      {children}
    </div>
  );
}
