"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Site-wide motion layer.
 * - Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * - Section headings (main h2) rise in line by line, then revert to plain DOM.
 * - [data-magnetic] elements lean towards the cursor (fine pointers only).
 * - [data-parallax] media drift against the scroll.
 * Everything is skipped when the visitor prefers reduced motion, and content
 * is never hidden for no-JS readers or for anything already on screen.
 */

let lenis: Lenis | null = null;

/** Smooth-scroll to a target if Lenis is running, otherwise native. */
export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) lenis.scrollTo(target, { offset: -80 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView({ behavior: "smooth" });
}

/** Glide to an exact scroll position (no header offset), as one locked move; resolves when done. */
export function glideTo(y: number, duration = 1.05): Promise<void> {
  return new Promise((resolve) => {
    if (lenis) {
      lenis.scrollTo(y, {
        duration,
        lock: true,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        onComplete: () => resolve(),
      });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
      window.setTimeout(resolve, duration * 1000);
    }
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setupLenis() {
  // Slightly lower lerp = silkier glide; touch keeps native momentum.
  const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 1, touchMultiplier: 1, syncTouch: false, anchors: { offset: -80 }, autoRaf: false });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Pause smooth scroll while something (the mobile menu) locks the body.
  const lockWatch = new MutationObserver(() => {
    if (document.body.style.overflow === "hidden") instance.stop();
    else instance.start();
  });
  lockWatch.observe(document.body, { attributes: true, attributeFilter: ["style"] });

  return () => {
    lockWatch.disconnect();
    gsap.ticker.remove(raf);
    instance.destroy();
  };
}

function setupHeadingReveals() {
  const ctx = gsap.context(() => {
    const headings = gsap.utils.toArray<HTMLElement>("main h2:not(.sr-only):not([data-no-split])");
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
      const split = SplitText.create(heading, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.05,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        onComplete: () => split.revert(),
      });
    }
  });
  return () => ctx.revert();
}

function setupParallax() {
  const ctx = gsap.context(() => {
    for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
      const amount = Number(el.dataset.parallax) || 12;
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
  });
  return () => ctx.revert();
}

function setupMagnetic() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const cleanups: Array<() => void> = [];
  for (const el of document.querySelectorAll<HTMLElement>("[data-magnetic]")) {
    const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      toX((e.clientX - (r.left + r.width / 2)) * 0.28);
      toY((e.clientY - (r.top + r.height / 2)) * 0.32);
    };
    const leave = () => {
      toX(0);
      toY(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    });
  }
  return () => cleanups.forEach((fn) => fn());
}

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const teardown = setupLenis();
    return () => {
      teardown();
      lenis = null;
    };
  }, []);

  // Per-page effects: re-run after each navigation once the new DOM is in.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let undo: Array<() => void> = [];
    const id = window.setTimeout(() => {
      undo = [setupHeadingReveals(), setupParallax(), setupMagnetic()];
      ScrollTrigger.refresh();
    }, 60);
    return () => {
      window.clearTimeout(id);
      undo.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
