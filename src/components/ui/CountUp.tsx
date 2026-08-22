"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  className?: string;
  duration?: number;
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
export function CountUp({ value, className = "", duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(() => format(value, 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(value);
      return;
    }
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
  }, [value]);

  useEffect(() => {
    if (!started) return;
    const parts = split(value);
    if (!parts || !Number.isFinite(parts.target)) {
      setShown(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(format(value, eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </span>
  );
}
