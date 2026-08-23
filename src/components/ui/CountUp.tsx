"use client";

import { useEffect, useRef, useState } from "react";

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
  const [shown, setShown] = useState(() => format(value, 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      return;
    }
    if (play === false) {
      setStarted(false);
      setShown(format(value, 0));
      return;
    }
    if (play === true) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, play]);

  useEffect(() => {
    if (!started) return;
    const parts = split(value);
    if (!parts || !Number.isFinite(parts.target)) {
      setShown(value);
      return;
    }
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
  }, [started, value, duration, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </span>
  );
}
