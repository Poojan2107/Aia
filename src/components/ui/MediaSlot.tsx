"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  children?: React.ReactNode;
};

/**
 * Video-ready media surface.
 * Always renders a finished visual from the poster; optional video
 * hydrates only when a real `src` is provided and the slot is in view.
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
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!src || !ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    const play = async () => {
      try {
        await video.play();
      } catch {
        /* poster remains */
      }
    };
    void play();
  }, [shouldLoad, videoReady]);

  const overlayClass =
    overlay === true || overlay === "soft"
      ? "bg-gradient-to-b from-black/55 via-black/20 to-black/50"
      : overlay === "heavy"
        ? "bg-gradient-to-b from-black/70 via-black/35 to-black/65"
        : "";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={`${fit === "cover" ? "object-cover" : "object-contain"} ${
          videoReady ? "opacity-0" : "opacity-100"
        } transition-opacity duration-700`}
      />
      {src && shouldLoad ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full ${
            fit === "cover" ? "object-cover" : "object-contain"
          } ${videoReady ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster}
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {overlay ? (
        <div aria-hidden className={`pointer-events-none absolute inset-0 ${overlayClass}`} />
      ) : null}

      {/* Subtle vignette so stills read as finished cinematic frames */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.18)]"
      />

      {film && !videoReady ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white backdrop-blur-sm md:size-[72px]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          </span>
        </div>
      ) : null}

      {children}
    </div>
  );
}
