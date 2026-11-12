"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; label?: string; className?: string };

/**
 * Muted loop that starts downloading well before it scrolls into view (so it is already
 * playing when it arrives), plays while visible and pauses off-screen. No poster image:
 * the film itself is the first thing the viewer sees.
 */
export function LazyVideo({ src, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  // Attach the source ~1.5 screens ahead of the viewport.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // Play while on screen, pause when it leaves; retry once data arrives.
  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    const tryPlay = () => {
      if (visible && !reduced) void video.play().catch(() => undefined);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) tryPlay();
      else video.pause();
    });
    io.observe(video);
    video.addEventListener("canplay", tryPlay);
    return () => {
      io.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, [near]);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload={near ? "auto" : "none"}
      className={className}
    />
  );
}
