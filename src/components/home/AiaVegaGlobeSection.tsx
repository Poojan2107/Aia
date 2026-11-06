"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * "One vision. Two strengths. Beyond borders." — Figma 01Homepage (node 685:7).
 * AIA on the left, Vega on the right, and the Earth (India lit in gold) as the
 * centrepiece. Orbit routes from the designer's reference draw out from
 * Ahmedabad to Vega's hubs when the section enters; the Earth floats and
 * tilts towards the pointer; hovering a hub highlights its route.
 */

type Hub = {
  id: string;
  city: string;
  company: "AIA" | "Vega";
  /** Chip position, % of the globe box (can sit outside 0–100). */
  x: number;
  y: number;
  /** Route path from Ahmedabad in the same % space. */
  d: string;
};

/** Ahmedabad on the Earth artwork, % of the globe box. */
const ORIGIN = { x: 47.5, y: 37 };

const HUBS: Hub[] = [
  { id: "usa", city: "USA", company: "Vega", x: -6, y: 14, d: "M 47.5 37 C 32 4, 12 2, 2 14" },
  { id: "uk", city: "UK", company: "Vega", x: 74, y: -4, d: "M 47.5 37 C 50 10, 58 -4, 68 -4" },
  { id: "uae", city: "UAE", company: "Vega", x: 90, y: 58, d: "M 47.5 37 C 66 36, 78 44, 84 58" },
  { id: "australia", city: "Australia", company: "Vega", x: 80, y: 97, d: "M 47.5 37 C 70 54, 80 76, 78 94" },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

export function AiaVegaGlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [hover, setHover] = useState<string | null>(null);

  // Pointer tilt: the Earth leans a few degrees towards the cursor.
  useEffect(() => {
    const box = globeRef.current;
    if (!box || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      raf = 0;
      box.style.setProperty("--tilt-x", `${ty.toFixed(2)}deg`);
      box.style.setProperty("--tilt-y", `${tx.toFixed(2)}deg`);
    };
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      tx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 10;
      ty = -((e.clientY - (r.top + r.height / 2)) / r.height) * 10;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const host = box.closest("section") ?? box;
    host.addEventListener("pointermove", move as EventListener);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move as EventListener);
      host.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="collaboration" className={`ovb ${inView ? "is-in" : ""}`} aria-labelledby="ovb-heading">
      <span aria-hidden className="ovb-light ovb-light-a" />
      <span aria-hidden className="ovb-light ovb-light-b" />

      <header className="ovb-head">
        <SectionLabel>AIA Engineering • Vega Industry</SectionLabel>
        <h2 id="ovb-heading" className="ovb-heading">
          One vision. Two strengths.
          <br />
          Beyond borders.
        </h2>
      </header>

      <div className="ovb-grid">
        <article className="ovb-col ovb-col-aia">
          <Image src="/images/design/logo-aia-blue.webp" alt="AIA Engineering Limited" width={1552} height={1015} className="ovb-logo ovb-logo-aia" />
          <h3 className="ovb-kicker">Four decades of creating advanced comminution technologies across industries</h3>
          <p className="ovb-body">
            AIA Engineering Limited is a global leader in manufacturing engineered grinding solutions to improve reliability, efficiency and overall mill performance. With a legacy of over 45 years, AIA Engineering combines engineering expertise with manufacturing capability to deliver application specific solutions across the Mining, Cement, Thermal and Quarry industries.
          </p>
        </article>

        <div className="ovb-globe-wrap">
          <div ref={globeRef} className="ovb-globe">
            <div className="ovb-earth">
              <span aria-hidden className="ovb-glow" />
              <Image src="/images/design/earth-india.webp" alt="Earth with India highlighted, home of AIA Engineering" fill sizes="(max-width: 1024px) 80vw, 32vw" className="ovb-earth-img" priority />
              <span aria-hidden className="ovb-sheen" />
            </div>

            <svg className="ovb-routes" viewBox="0 0 100 100" aria-hidden>
              <ellipse cx="50" cy="50" rx="62" ry="22" className="ovb-orbit ovb-orbit-a" />
              <ellipse cx="50" cy="50" rx="58" ry="48" className="ovb-orbit ovb-orbit-b" />
              {HUBS.map((hub, i) => (
                <g key={hub.id} className={`ovb-route ${hover === hub.id ? "is-hot" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                  <path d={hub.d} pathLength={1} className="ovb-route-line" />
                  <circle r="0.9" className="ovb-spark">
                    <animateMotion dur={`${2.6 + i * 0.35}s`} begin={`${0.9 + i * 0.25}s`} repeatCount="indefinite" path={hub.d} />
                  </circle>
                </g>
              ))}
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="1.4" className="ovb-origin" />
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="1.4" className="ovb-origin-ping" />
            </svg>

            <span className="ovb-chip ovb-chip-hq" style={{ left: `${ORIGIN.x + 3}%`, top: `${ORIGIN.y + 4}%` }}>
              <Image src="/images/design/logo-aia-blue.webp" alt="" width={1552} height={1015} className="ovb-chip-mark" />
              Ahmedabad / AIA Engineering
            </span>
            {HUBS.map((hub, i) => (
              <button
                key={hub.id}
                type="button"
                className={`ovb-chip ${hover === hub.id ? "is-hot" : ""}`}
                style={{ left: `${hub.x}%`, top: `${hub.y}%`, "--i": i } as React.CSSProperties}
                onPointerEnter={() => setHover(hub.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(hub.id)}
                onBlur={() => setHover(null)}
                aria-label={`${hub.city}: ${hub.company} Industries hub, connected to AIA in Ahmedabad`}
              >
                <span aria-hidden className="ovb-chip-dot" />
                <Image src="/images/logo-vega-dark.png" alt="" width={376} height={272} className="ovb-chip-brand" />
                {hub.city} / {hub.company}
              </button>
            ))}
          </div>
        </div>

        <article className="ovb-col ovb-col-vega">
          <Image src="/images/design/logo-vega-color.webp" alt="Vega Industries" width={200} height={145} className="ovb-logo ovb-logo-vega" />
          <h3 className="ovb-kicker">Delivering engineering expertise worldwide across 120+ countries</h3>
          <p className="ovb-body">
            Vega Industries is a wholly owned subsidiary of AIA Engineering Limited. As its international marketing arm, Vega extends AIA&apos;s application expertise to the international markets. Through its 10+ service centers and an established global supply chain network, Vega acts as an end-to-end technical partner in helping customers across 120+ countries improve their grinding operations.
          </p>
        </article>
      </div>

      <p className="ovb-foot">
        <span className="section-label">[Engineered in India. Connected worldwide.]</span>
      </p>
    </section>
  );
}
