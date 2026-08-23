"use client";

import { useEffect, useRef, useState } from "react";
import { industries } from "@/data/industries";
import { IndustryCopy, IndustryMill } from "@/components/home/ModelShowcase";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";

/**
 * One white inspection stage. The mill sits on the page — not in a dark
 * well. Scroll yaws the specimen between industries; copy crossfades
 * beside it. Holds keep each plate in view before the next turn.
 */
const HOLD = 0.18;
const CROSS = 0.07;
const COUNT = industries.length;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smoother(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function sceneAt(p: number) {
  let t = 0;
  for (let i = 0; i < COUNT; i++) {
    const holdEnd = t + HOLD;
    if (i === COUNT - 1 || p <= holdEnd) {
      return {
        intro: 0,
        index: i,
        mix: 0,
        local: clamp01((p - t) / HOLD),
      };
    }
    t = holdEnd;
    const crossEnd = t + CROSS;
    if (p < crossEnd) {
      return { intro: 0, index: i, mix: (p - t) / CROSS, local: 1 };
    }
    t = crossEnd;
  }
  return { intro: 0, index: COUNT - 1, mix: 0, local: 1 };
}

function holdProgress(i: number) {
  return i * (HOLD + CROSS) + HOLD * 0.45;
}

function millLook(
  i: number,
  index: number,
  mix: number,
  intro: number,
  local: number,
) {
  const m = smoother(mix);

  if (i === index) {
    const inspect = mix === 0 ? local * 0.012 : 0;
    return {
      opacity: 1 - m,
      x: -4.5 * m,
      rot: -3.2 * m,
      scale: 1 + inspect - m * 0.02,
    };
  }
  if (i === index + 1) {
    return {
      opacity: m,
      x: 5 * (1 - m),
      rot: 3.4 * (1 - m),
      scale: 0.985 + m * 0.015,
    };
  }
  return { opacity: 0, x: 0, rot: 0, scale: 1 };
}

function copyLook(i: number, index: number, mix: number, intro: number) {
  const m = smoother(mix);
  if (i === index) {
    return { opacity: 1 - m, y: -10 * m };
  }
  if (i === index + 1) {
    return { opacity: m, y: 12 * (1 - m) };
  }
  return { opacity: 0, y: 12 };
}

function scrollToProgress(
  track: HTMLElement,
  progress: number,
  instant: boolean,
) {
  const vh = window.innerHeight;
  const range = track.offsetHeight - vh;
  const top = window.scrollY + track.getBoundingClientRect().top;
  window.scrollTo({
    top: top + range * clamp01(progress),
    behavior: instant ? "auto" : "smooth",
  });
}

export function IndustryStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(trackRef);
  const [reduced, setReduced] = useState(false);
  const [focus, setFocus] = useState<string | null>(
    industries[0]?.solutions[0]?.hotspotId ?? null,
  );

  const scene = sceneAt(progress);
  const active = industries[scene.index] ?? industries[0];
  const canInspect = scene.mix === 0;

  useEffect(() => {
    setFocus(active.solutions[0]?.hotspotId ?? active.hotspots[0]?.id ?? null);
  }, [active]);

  return (
    <div ref={trackRef} className="industry-stack relative h-[640vh] bg-white">
      {industries.map((industry, i) => (
        <span
          key={industry.id}
          id={industry.id}
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{
            top: `calc(${holdProgress(i)} * (100% - 100svh))`,
          }}
        />
      ))}

      <div className="industry-stage sticky top-0 h-[100svh] overflow-hidden bg-white">
        <div className="industry-plate">
          <SectionLabel className="industry-kicker">Solutions by industry</SectionLabel>
          <h2 id="industries-heading" className="industry-intro">
            Explore solutions for Mining, Cement, Quarry and Thermal Power.
          </h2>

          <div className="industry-copy relative min-h-0">
            {industries.map((industry, i) => {
              const look = copyLook(i, scene.index, scene.mix, scene.intro);
              const on = i === scene.index && canInspect;
              return (
                <IndustryCopy
                  key={industry.id}
                  industry={industry}
                  activeId={on ? focus : industry.solutions[0]?.hotspotId ?? null}
                  onActive={setFocus}
                  interactive={on}
                  style={{
                    opacity: look.opacity,
                    transform: `translate3d(0, ${look.y}px, 0)`,
                    pointerEvents: on ? "auto" : "none",
                    visibility: look.opacity < 0.02 ? "hidden" : "visible",
                  }}
                />
              );
            })}
          </div>

          <div className="industry-mill relative min-h-0">
            <div
              className="mill-well relative flex h-full min-h-[36svh] w-full items-center justify-center overflow-visible lg:min-h-0 lg:items-end lg:justify-end"
              onMouseLeave={() =>
                setFocus(
                  active.solutions[0]?.hotspotId ??
                    active.hotspots[0]?.id ??
                    null,
                )
              }
            >
              {industries.map((industry, i) => {
                const look = millLook(
                  i,
                  scene.index,
                  scene.mix,
                  scene.intro,
                  scene.local,
                );
                const on = i === scene.index && canInspect;
                return (
                  <IndustryMill
                    key={industry.id}
                    industry={industry}
                    activeId={on ? focus : null}
                    onActive={setFocus}
                    priority={i === 0}
                    inspect={on}
                    style={{
                      opacity: look.opacity,
                      transform: `translate3d(${look.x}%, 0, 0) rotateY(${look.rot}deg) scale(${look.scale})`,
                      transformOrigin: "50% 50%",
                      visibility: look.opacity < 0.02 ? "hidden" : "visible",
                      pointerEvents: on ? "auto" : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="industry-tabs relative z-20 flex shrink-0 items-center gap-1 sm:gap-2"
            role="tablist"
            aria-label="Industry"
          >
            {industries.map((industry, i) => {
              const current = i === scene.index;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  aria-selected={current}
                  className={`ui-caps flex min-h-10 items-center gap-2 px-1 text-left tracking-[0.12em] transition-colors duration-500 ${
                    current
                      ? "text-aia-orange"
                      : "text-aia-navy/28 hover:text-aia-navy/55"
                  }`}
                  onClick={() => {
                    const track = trackRef.current;
                    if (!track) return;
                    scrollToProgress(
                      track,
                      holdProgress(i),
                      prefersReducedMotion(),
                    );
                  }}
                >
                  <span>{industry.index}</span>
                  <span className="hidden sm:inline">{industry.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
