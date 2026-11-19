"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FloatingModel } from "@/components/solutions/quarry/FloatingModel";
import { useAccentRgb } from "@/lib/use-accent-rgb";

type MillId = "sag" | "ball" | "verti";
/** A product points at the part groups it covers on a full mill; grinding media is parked. */
type Product = { name: string; mill?: MillId; groups?: string[] };

/** AIA's full mills (scripts/cad/manifest.mjs), shown whole in the orbit. */
/** `full`: the closed mill shown until a product is picked; then it fades out and the cut-away
 * (src) fades in with that product's parts lit. */
const MILLS: Record<MillId, { src: string; orbit: string; name: string; full?: { src: string; orbit: string } }> = {
  sag: {
    src: "/models/catalog/mill-sag-cut.glb",
    orbit: "-12deg 56deg 125%",
    name: "SAG mill",
    full: { src: "/models/catalog/mill-sag-full.glb", orbit: "-35deg 66deg 118%" },
  },
  ball: {
    src: "/models/catalog/mill-ball-ngds.glb",
    orbit: "-30deg 48deg 85%",
    name: "Ball mill",
    full: { src: "/models/catalog/mill-ball-full.glb", orbit: "-30deg 64deg 128%" },
  },
  verti: { src: "/models/catalog/mill-verti.glb", orbit: "20deg 64deg 90%", name: "Verti mill" },
};
type Pillar = {
  title: string;
  lead: string;
  products: Product[];
  services: string[];
  metrics: { value: string; label: string }[];
};

/** AIA mining value diagram: two outcomes, the products and services behind them, and the gains. */
const PILLARS: Pillar[] = [
  {
    title: "Maximise Mill Uptime",
    lead: "Our advanced mill lining systems and specialised technical services work together to extend component life, reduce reline time and improve mill availability.",
    products: [
      { name: "SAG Mill Lining Systems", mill: "sag", groups: ["feed-liners", "shell-liners"] },
      { name: "Ball Mill Lining Systems", mill: "ball", groups: ["feed-liners", "shell-liners"] },
      { name: "Verti Mill Ceramic Composite Alloys", mill: "verti", groups: ["liners"] },
    ],
    services: ["Design Modelling", "Installation Supervision", "Wear Monitoring: Scanning"],
    metrics: [
      { value: "40%", label: "Liner life improvement" },
      { value: "20%", label: "Installation time reduction" },
    ],
  },
  {
    title: "Improve Grinding Efficiency",
    lead: "Our discharge systems, grinding media and process services work together to increase throughput, improve recovery and reduce the energy spent on every tonne.",
    products: [
      { name: "SAG Mill Next Gen DE System", mill: "sag", groups: ["discharge"] },
      { name: "Ball Mill Next Gen DE System", mill: "ball", groups: ["discharge"] },
      { name: "Hi-Cr Grinding Media" },
    ],
    services: ["Circuit Diagnostics & Optimisation", "Holistic Process Modelling", "Mill Operational Expertise"],
    metrics: [
      { value: "20%", label: "Throughput increase" },
      { value: "20%", label: "Energy savings" },
    ],
  },
];

/** Share of the pinned scroll spent revealing the section before the gains start. */
const INTRO = 0.14;
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Two-tone ring colour at angle a (degrees from the travelling head): the accent fading to a pale tint and back. */
function ringColor(a: number, [r, g, b]: [number, number, number]) {
  const t = (1 - Math.cos((a * Math.PI) / 180)) / 2;
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${mix(r, 214)}, ${mix(g, 228)}, ${mix(b, 248)})`;
}

const METRICS = PILLARS.flatMap((p) => p.metrics);
const TICKS = 120;

/**
 * Mining solutions orbit. Desktop: the section pins; scrolling first reveals it in three beats, then
 * scrubs the four gains past on the right while the ring's two-tone colour travels a quarter turn
 * per gain (the ring itself stays still). The left column shows the
 * outcome behind the current gain (uptime, then efficiency) with its products and services; hovering
 * a product shows AIA's full mill in the orbit with that product's parts lit in AIA blue.
 */
export function SolutionsOrbit() {
  const trackRef = useRef<HTMLDivElement>(null);
  const accent = useAccentRgb();
  const [progress, setProgress] = useState(0);
  // Scroll script: the first part of the pinned track reveals the section in three beats (outcome
  // title, then the orbit and gains, then the product and service lists); the rest scrubs through
  // the four gains. m runs 0..4 across the gains.
  const stage = progress < 0.015 ? 0 : progress < 0.06 ? 1 : progress < 0.11 ? 2 : 3;
  const m = Math.min(METRICS.length - 0.0001, Math.max(0, ((progress - INTRO) / (1 - INTRO)) * METRICS.length));
  const step = Math.floor(m);
  // Gains hold while each is read, then slide to the next over the last 35% of their stretch.
  const frac = m - step;
  const slide = step < METRICS.length - 1 ? smooth(Math.max(0, (frac - 0.65) / 0.35)) : 0;
  const metricY = step + slide;
  // The colour travels a quarter of the ring per gain; the ring itself stays still.
  const hue = m * 90;
  const pillarIndex = step < PILLARS[0].metrics.length ? 0 : 1;
  const pillar = PILLARS[pillarIndex];
  const [hovered, setHovered] = useState<number | null>(null);
  const product = hovered === null ? null : pillar.products[hovered];
  // The mill stays put for parked products (grinding media has no mill view); ball mill by default.
  const [millId, setMillId] = useState<MillId>("ball");
  useEffect(() => {
    if (product?.mill) setMillId(product.mill);
  }, [product]);
  const mill = MILLS[millId];
  const highlight = product?.mill === millId ? product.groups : undefined;

  useEffect(() => setHovered(null), [pillarIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      setProgress(Math.min(0.9999, Math.max(0, -r.top / range)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const ticks = useMemo(
    () =>
      Array.from({ length: TICKS }, (_, i) => {
        const a = (i / TICKS) * Math.PI * 2;
        const r = (v: number) => Math.round(v * 1000) / 1000; // same digits on server and client
        return { deg: (i / TICKS) * 360, x1: r(50 + 47 * Math.sin(a)), y1: r(50 - 47 * Math.cos(a)), x2: r(50 + 49.5 * Math.sin(a)), y2: r(50 - 49.5 * Math.cos(a)) };
      }),
    [],
  );

  return (
    <section className="mso" aria-labelledby="mso-title">
      <header className="mso-head">
        <p className="mso-eyebrow">Understanding our solutions</p>
        <h2 id="mso-title" className="mso-title">
          Bringing engineering and expertise together for better performance.
        </h2>
        <p className="mso-lede">
          Our advanced comminution solutions combine innovative SAG and Ball mill lining systems, SinterCast® lining technology,
          high chrome grinding media and specialised technical services to help mining operations extend liner life, increase
          throughput, improve recovery and reduce operating costs.
        </p>
      </header>

      <div ref={trackRef} className="mso-track">
        <div className="mso-stage" data-stage={stage}>
          {/* Left: outcome, products, services */}
          <div className="mso-left" key={pillarIndex}>
            <p className="mso-count">
              {String(pillarIndex + 1).padStart(2, "0")}
              <span className="mso-count-total">/{String(PILLARS.length).padStart(2, "0")}</span>
            </p>
            <h3 className="mso-pillar">{pillar.title}</h3>
            <p className="mso-lead">{pillar.lead}</p>
            <div className="mso-lists">
            <p className="mso-list-label">Products that enable it</p>
            <ul className="mso-list" onMouseLeave={() => setHovered(null)}>
              {pillar.products.map((p, i) => (
                <li key={p.name}>
                  <button
                    type="button"
                    className={`mso-item ${hovered === i ? "is-active" : ""}`}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onClick={() => setHovered(i)}
                  >
                    {p.name}
                    <span className="mso-item-arrow" aria-hidden>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mso-list-label">Services that support it</p>
            <ul className="mso-list mso-services">
              {pillar.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            </div>
          </div>

          {/* Centre: orbit + model */}
          <div className="mso-center">
            <svg className="mso-ring" viewBox="0 0 100 100" aria-hidden>
              {ticks.map((t, i) => (
                <line
                  key={i}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  style={{ stroke: ringColor(t.deg - hue, accent) }}
                />
              ))}
            </svg>
            <div className="mso-model">
              {mill.full ? (
                <div className={`mso-layer ${highlight ? "" : "is-on"}`} aria-hidden={Boolean(highlight)}>
                  <FloatingModel key={mill.full.src} src={mill.full.src} orbit={mill.full.orbit} alt={`${mill.name}, 3D model from AIA's CAD`} />
                </div>
              ) : null}
              <div className={`mso-layer ${!mill.full || highlight ? "is-on" : ""}`} aria-hidden={Boolean(mill.full) && !highlight}>
                <FloatingModel key={mill.src} src={mill.src} orbit={mill.orbit} highlight={highlight} alt={`${mill.name} cut away, 3D model from AIA's CAD`} />
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              {product?.mill ? `${product.name}, highlighted on the ${mill.name.toLowerCase()}` : mill.name}
            </p>
          </div>

          {/* Right: the four gains */}
          <div className="mso-right">
            <ol className="mso-metrics" style={{ transform: `translateY(calc(${-metricY.toFixed(4)} * var(--mso-row)))` }}>
              {METRICS.map((m, i) => (
                <li key={m.label} className={`mso-metric ${i === step ? "is-active" : ""}`}>
                  <span className="mso-upto">Up to</span>
                  <span className="mso-value">{m.value}</span>
                  <span className="mso-label">{m.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
