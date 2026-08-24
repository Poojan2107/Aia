"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { CountUp } from "@/components/ui/CountUp";
import { media } from "@/data/media";
import { stats } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

const PLATE = "/images/what-we-solve.jpg";

const SOLVE_BODY_LINES = [
  "Across mining, cement, quarry and thermal",
  "power, we design and manufacture wear",
  "solutions for grinding and other demanding",
  "applications. Our expertise in metallurgy,",
  "engineering and manufacturing helps extend",
  "component life, improve equipment reliability",
  "and support better operating performance.",
] as const;

function SolveBody() {
  return (
    <p className="solve-body">
      {SOLVE_BODY_LINES.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </p>
  );
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function span(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function trackProgress(el: HTMLElement) {
  const range = el.offsetHeight - window.innerHeight;
  if (range <= 0) return el.getBoundingClientRect().top < 0 ? 1 : 0;
  return clamp01(-el.getBoundingClientRect().top / range);
}

/**
 * Film sits in the 864×486 slot showing the full frame, then grows
 * to fill the viewport on scroll (same video, no crop in the window).
 */
export function WhatWeSolve() {
  const slotRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [kpiLocked, setKpiLocked] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced) return;

    const slot = slotRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const fly = flyRef.current;
    const plate = plateRef.current;
    const kpi = kpiRef.current;
    if (!slot || !track || !sticky || !fly || !plate || !kpi) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const progress = trackProgress(track);
      const t = easeOutCubic(span(progress, 0.04, 0.62));
      const stickyBox = sticky.getBoundingClientRect();
      const slotBox = slot.getBoundingClientRect();

      const top = lerp(slotBox.top - stickyBox.top, 0, t);
      const left = lerp(slotBox.left - stickyBox.left, 0, t);
      const width = lerp(slotBox.width, stickyBox.width, t);
      const height = lerp(slotBox.height, stickyBox.height, t);

      fly.style.top = `${top}px`;
      fly.style.left = `${left}px`;
      fly.style.width = `${width}px`;
      fly.style.height = `${height}px`;
      fly.style.opacity = "1";
      fly.style.clipPath = "none";

      const plateOut = span(progress, 0.12, 0.48);
      plate.style.opacity = String(1 - plateOut);
      plate.style.pointerEvents = plateOut > 0.6 ? "none" : "auto";

      const kpiIn = span(progress, 0.48, 0.78);
      kpi.style.opacity = String(kpiIn);

      const locked = progress > 0.72;
      if (locked !== lockedRef.current) {
        lockedRef.current = locked;
        setKpiLocked(locked);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section
        className="relative bg-[#f7f7f7]"
        aria-labelledby="what-we-solve-heading"
        id="what-we-solve"
      >
        <div className="solve-plate">
          <SectionLabel className="solve-label">What we solve</SectionLabel>
          <div className="solve-main">
            <h2 id="what-we-solve-heading" className="solve-heading">
              <span>For over four decades,</span>
              <span>AIA been engineering longer life into</span>
              <span>the parts that keep industry moving.</span>
            </h2>
            <CtaButton href="/solutions/mining" variant="solid" className="solve-cta">
              See how we solve wear
            </CtaButton>
          </div>
          <SolveBody />
          <div className="solve-film">
            <AmbientFilm
              src={media.whatWeSolve}
              poster={PLATE}
              className="absolute inset-0"
              position="center center"
              coverBleed
              sizes="(max-width: 1024px) 100vw, 864px"
            />
          </div>
        </div>
        <div className="relative h-[100svh] overflow-hidden bg-[#1a2228]">
          <AmbientFilm
            src={media.whatWeSolve}
            poster={PLATE}
            className="absolute inset-0"
            position="center center"
            coverBleed
            sizes="100vw"
          />
          <KpiOverlay play />
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative bg-[#f7f7f7]"
      aria-labelledby="what-we-solve-heading"
      id="what-we-solve"
    >
      <div ref={trackRef} className="relative h-[260vh]">
        <div
          ref={stickyRef}
          className="sticky top-0 h-[100svh] overflow-hidden bg-[#f7f7f7]"
        >
          <div ref={plateRef} className="solve-plate solve-pin relative z-[2]">
            <SectionLabel className="solve-label">What we solve</SectionLabel>
            <div className="solve-main">
              <h2 id="what-we-solve-heading" className="solve-heading">
                <span>For over four decades,</span>
                <span>AIA been engineering longer life into</span>
                <span>the parts that keep industry moving.</span>
              </h2>
              <CtaButton href="/solutions/mining" variant="solid" className="solve-cta">
                See how we solve wear
              </CtaButton>
            </div>
            <SolveBody />
            {/* Slot sizes the film; poster shows until the fly layer covers it */}
            <div ref={slotRef} className="solve-film solve-film-slot" aria-hidden>
              <Image
                src={PLATE}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 864px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div
            ref={flyRef}
            id="solve-film-fly"
            className="solve-film-fly absolute z-[3] overflow-hidden bg-[#1a242c] opacity-0 will-change-[top,left,width,height]"
            aria-hidden
          >
            <AmbientFilm
              src={media.whatWeSolve}
              poster={PLATE}
              className="absolute inset-0"
              position="center center"
              coverBleed
              sizes="100vw"
            />
          </div>

          <div
            ref={kpiRef}
            className="pointer-events-none absolute inset-0 z-[4] opacity-0"
          >
            <KpiOverlay play={kpiLocked} />
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiOverlay({ play }: { play: boolean }) {
  return (
    <div className="relative flex h-full flex-col justify-end pb-[clamp(2.75rem,8vh,5.5rem)] pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(180deg,rgba(6,14,20,0)_0%,rgba(6,14,20,0.5)_40%,rgba(6,14,20,0.9)_100%)]"
      />
      <div className="page-pad page-max relative z-10">
        <div className={`kpi-lockup ${play ? "is-in" : ""}`}>
          <div className="kpi-rule" />
          <div className="kpi-row">
            <p className="kpi-brand">AIA Engineering</p>
            <div className="kpi-metrics">
              {stats.map((stat, i) => (
                <div key={stat.label} className="kpi-stat">
                  <div className="kpi-value-block">
                    <p className="kpi-value">
                      <CountUp
                        value={stat.value}
                        duration={1600}
                        delay={i * 110}
                        play={play}
                      />
                    </p>
                    <span className="kpi-stat-rule" aria-hidden />
                  </div>
                  <p className="kpi-caption">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
