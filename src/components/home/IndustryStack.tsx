"use client";

import { useEffect, useRef, useState } from "react";
import { industries } from "@/data/industries";
import { ModelShowcase } from "@/components/home/ModelShowcase";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Pinned industry plates: each mill card sticks to the viewport while the
 * next one slides over it. The outgoing plate eases back (scale + dim) so
 * the handoff reads like a deck of cards, not a hard cut.
 */
export function IndustryStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const plateRefs = useRef<Array<HTMLElement | null>>([]);
  const dimRefs = useRef<Array<HTMLElement | null>>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const paint = () => {
      const vh = window.innerHeight || 1;
      const plates = plateRefs.current;
      let nextActive = 0;

      plates.forEach((plate, i) => {
        if (!plate) return;
        const incoming = plates[i + 1];
        let cover = 0;
        if (incoming && !reduced) {
          const top = incoming.getBoundingClientRect().top;
          cover = 1 - Math.min(1, Math.max(0, top / vh));
        }
        const scale = 1 - cover * 0.075;
        const radius = cover * 28;
        plate.style.transform = reduced ? "none" : `scale(${scale})`;
        plate.style.borderRadius = reduced ? "0px" : `${radius}px`;
        const dim = dimRefs.current[i];
        if (dim) dim.style.opacity = reduced ? "0" : String(cover * 0.32);

        const rect = plate.getBoundingClientRect();
        if (rect.top < vh * 0.45) nextActive = i;
      });

      setActive((current) => (current === nextActive ? current : nextActive));

      const range = track.offsetHeight - vh;
      const progress =
        range <= 0
          ? 0
          : Math.min(1, Math.max(0, -track.getBoundingClientRect().top / range));
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <div ref={trackRef} className="industry-stack relative">
      <div
        aria-hidden
        className="pointer-events-none sticky top-0 z-30 h-[2px] w-full overflow-hidden bg-aia-navy/10"
      >
        <span
          ref={fillRef}
          className="block h-full origin-left bg-aia-orange"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div
        className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-0 z-20 hidden h-full lg:block"
        aria-hidden
      >
        <div className="sticky top-1/2 flex -translate-y-1/2 flex-col gap-3">
          {industries.map((industry, i) => (
            <span
              key={industry.id}
              className={`font-[family-name:var(--font-ui)] text-[0.7rem] tracking-[0.14em] transition-colors duration-500 ${
                i === active ? "text-aia-orange" : "text-aia-navy/25"
              }`}
            >
              {industry.index}
            </span>
          ))}
        </div>
      </div>

      {industries.map((industry, i) => (
        <article
          key={industry.id}
          id={industry.id}
          className="industry-card sticky top-0 h-[100svh] min-h-[640px] bg-aia-surface-soft"
          style={{ zIndex: i + 1 }}
          aria-current={active === i ? "true" : undefined}
        >
          <div
            ref={(node) => {
              plateRefs.current[i] = node;
            }}
            className="industry-plate relative flex h-full origin-top overflow-hidden bg-white shadow-[0_-28px_80px_rgba(4,29,44,0.08)]"
          >
            <div className="page-pad mx-auto flex h-full w-full max-w-[1440px] items-center py-10 sm:py-12">
              <ModelShowcase industry={industry} priority={i === 0} compact />
            </div>
            <div
              ref={(node) => {
                dimRefs.current[i] = node;
              }}
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#041d2c] opacity-0"
            />
          </div>
        </article>
      ))}
    </div>
  );
}
