"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster?: string; label?: string; className?: string };

/**
 * Muted loop that only downloads when it comes near the viewport and pauses off-screen,
 * so below-the-fold films never compete with the hero for bandwidth.
 */
export function LazyVideo({ src, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          if (!reduced) void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
