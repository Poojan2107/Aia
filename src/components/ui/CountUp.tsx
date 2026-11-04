"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

type Props = {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** When set, count starts only when this becomes true (e.g. KPI plate locked). */
  play?: boolean;
};

function split(value: string) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    digits,
    suffix,
    target: Number(digits.replace(/,/g, "")),
    indian: digits.includes(","),
  };
}

function format(value: string, amount: number) {
  const parts = split(value);
  if (!parts || !Number.isFinite(parts.target)) return value;
  const current = Math.round(parts.target * amount);
  const number = parts.indian ? current.toLocaleString("en-IN") : String(current);
  return `${parts.prefix}${number}${parts.suffix}`;
}

/** Counts the numeric part of "120+", "+32 %", "1,00,000+" once in view. */
export function CountUp({
  value,
  className = "",
  duration = 1400,
  delay = 0,
  play,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [shown, setShown] = useState(() => (reduced ? value : format(value, 0)));

  // Intersection observer when play is not controlled by parent
  useEffect(() => {
    if (reduced || play !== undefined) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, play]);

  const active = play ?? inView;

  useEffect(() => {
    if (!active || reduced) return;
    const parts = split(value);
    if (!parts || !Number.isFinite(parts.target)) return;

    let frame = 0;
    let start = 0;
    const wait = window.setTimeout(() => {
      start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        setShown(format(value, eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(wait);
      cancelAnimationFrame(frame);
    };
  }, [active, reduced, value, duration, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {reduced ? value : shown}
    </span>
  );
}
