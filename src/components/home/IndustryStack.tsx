"use client";

import { useEffect, useRef, useState } from "react";
import { industries } from "@/data/industries";
import { IndustryCopy, IndustryMill } from "@/components/home/ModelShowcase";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/motion";

const COUNT = industries.length;
const SEGMENTS = Math.max(1, COUNT - 1);

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Card 0 stays. Card i slides up from 100% → 0% over its scroll segment. */
function cardOffsetY(index: number, progress: number) {
  if (index === 0) return 0;
  const start = (index - 1) / SEGMENTS;
  const end = index / SEGMENTS;
  if (progress <= start) return 100;
  if (progress >= end) return 0;
  return 100 * (1 - (progress - start) / (end - start));
}

function activeFromProgress(progress: number) {
  return Math.min(COUNT - 1, Math.max(0, Math.round(progress * SEGMENTS)));
}

type PinMode = "before" | "fixed" | "after";

function IndustryHead() {
  return (
    <div className="industry-head">
      <SectionLabel className="industry-kicker">Solutions by industry</SectionLabel>
      <h2 id="industries-heading" className="industry-intro">
        <span>Explore solutions for Mining, Cement,</span>
        <span>Quarry and Thermal Power applications.</span>
      </h2>
    </div>
  );
}

/**
 * Tall scroll track + fixed viewport stage.
 * Shared header stays put; only industry cards slide and cover each other.
 */
export function IndustryStack() {
  const trackRef = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pinMode, setPinMode] = useState<PinMode>("before");
  const [focusById, setFocusById] = useState<Record<string, string | null>>(
    () => Object.fromEntries(industries.map((industry) => [industry.id, null])),
  );

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced) return;

    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = track.offsetHeight - vh;

      if (rect.top > 0) {
        setPinMode("before");
        setProgress(0);
        return;
      }
      if (rect.bottom <= vh) {
        setPinMode("after");
        setProgress(1);
        return;
      }

      setPinMode("fixed");
      setProgress(range <= 0 ? 0 : clamp01(-rect.top / range));
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

  const activeIndex = reduced ? 0 : activeFromProgress(progress);

  if (reduced) {
    return (
      <section className="industry-stack" aria-labelledby="industries-heading">
        <IndustryHead />
        {industries.map((industry, i) => (
          <div
            key={industry.id}
            id={industry.id}
            className="industry-card-static border-b border-aia-line/60"
          >
            <IndustryCard
              industry={industry}
              focus={focusById[industry.id] ?? null}
              setFocus={(id) =>
                setFocusById((prev) => ({ ...prev, [industry.id]: id }))
              }
              priority={i === 0}
            />
          </div>
        ))}
      </section>
    );
  }

  const stageClass =
    pinMode === "fixed"
      ? "industry-stage is-fixed"
      : pinMode === "after"
        ? "industry-stage is-after"
        : "industry-stage is-before";

  return (
    <section
      ref={trackRef}
      className="industry-stack relative"
      aria-labelledby="industries-heading"
      style={{ height: `${COUNT * 100}vh` }}
    >
      {industries.map((industry, i) => (
        <span
          key={`anchor-${industry.id}`}
          id={industry.id}
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `${(i / COUNT) * 100}%` }}
        />
      ))}

      <div className={stageClass}>
        <IndustryHead />
        <div className="industry-cards">
          {industries.map((industry, i) => {
            const y = cardOffsetY(i, progress);
            const on = i === activeIndex;
            const overlapping = y > 0.5 && y < 99.5;
            return (
              <article
                key={industry.id}
                className={`industry-overlap-card${overlapping ? " is-overlapping" : ""}`}
                aria-hidden={!on}
                style={{
                  zIndex: i + 1,
                  transform: `translate3d(0, ${y}%, 0)`,
                }}
              >
                <IndustryCard
                  industry={industry}
                  focus={focusById[industry.id] ?? null}
                  setFocus={(id) =>
                    setFocusById((prev) => ({ ...prev, [industry.id]: id }))
                  }
                  priority={i === 0}
                  interactive={on}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  focus,
  setFocus,
  priority,
  interactive = true,
}: {
  industry: (typeof industries)[number];
  focus: string | null;
  setFocus: (id: string | null) => void;
  priority?: boolean;
  interactive?: boolean;
}) {
  return (
    <div className="industry-plate">
      <div className="industry-copy relative min-h-0">
        <IndustryCopy
          industry={industry}
          activeId={focus}
          onActive={setFocus}
          interactive={interactive}
          overlay={false}
        />
      </div>

      <div className="industry-mill relative min-h-0">
        <div className="mill-well relative flex h-full min-h-[36svh] w-full items-center justify-center overflow-visible lg:min-h-0 lg:items-start lg:justify-end">
          <IndustryMill
            industry={industry}
            activeId={interactive ? focus : null}
            onActive={setFocus}
            priority={priority}
            inspect={interactive}
            overlay={false}
          />
        </div>
      </div>
    </div>
  );
}
