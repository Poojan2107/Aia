"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Closure: the mirror of the hero → globe atmosphere.
 * The last section is pinned (its bottom held at the bottom of the screen) while the
 * footer slides up over it. The footer's top is a reversed curved sky (white → AIA blue
 * arc → navy core) that rises as the footer arrives, so the footer content lands on the
 * dark core with no empty screen. Drives two values from scroll:
 *   --pin-top on the pinned wrapper (so a section taller than the screen pins at its end)
 *   --close   on the footer (0 when its top meets the bottom of the screen, 1 at the top)
 */
export function ClosureScene({ children }: { children: ReactNode }) {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const foot = document.querySelector<HTMLElement>(".foot");
    if (!pin || !foot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setPinTop = () => {
      pin.style.setProperty("--pin-top", `${Math.min(0, window.innerHeight - pin.offsetHeight)}px`);
    };
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const top = foot.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (window.innerHeight - top) / window.innerHeight));
      const rounded = Math.round(p * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      foot.style.setProperty("--close", String(rounded));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      setPinTop();
      onScroll();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(pin);
    setPinTop();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="closure-scene">
      <div ref={pinRef} className="closure-pin">
        {children}
      </div>
    </div>
  );
}
