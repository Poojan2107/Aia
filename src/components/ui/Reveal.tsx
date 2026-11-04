"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "p" | "section" | "aside" | "figure";
  /** Enter from the right, matching Present motion. */
  from?: "up" | "right";
};

/** Quiet fade/rise used once a block enters view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  from = "up",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  // Start visible so server-rendered HTML is readable (LCP, crawlers, no-JS);
  // the observer below only ever confirms visibility.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "120px 0px 120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const Comp = Tag as ElementType;
  const isVisible = reduced || inView;

  return (
    <Comp
      ref={ref}
      className={`reveal ${from === "right" ? "from-right" : ""} ${isVisible ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
