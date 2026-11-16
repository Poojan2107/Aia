"use client";

import { useEffect, useRef, useState } from "react";
import { filmsPlaySmoothly, playableVideo } from "@/lib/video";

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
    // Devices that can't decode the film smoothly show its first frame instead (see filmsPlaySmoothly).
    let allowed = false;
    let alive = true;
    let visible = false;
    const tryPlay = () => {
      if (visible && allowed) void video.play().catch(() => undefined);
    };
    void filmsPlaySmoothly().then((ok) => {
      if (!alive || !ok) return;
      allowed = true;
      tryPlay();
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) tryPlay();
      else video.pause();
    });
    io.observe(video);
    video.addEventListener("canplay", tryPlay);
    return () => {
      alive = false;
      io.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, [near]);

  return (
    <video
      ref={ref}
      src={near ? playableVideo(src) : undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload={near ? "auto" : "none"}
      className={className}
    />
  );
}
