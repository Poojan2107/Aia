"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { MillExplorer, type MillState } from "@/components/solutions/mining/MillExplorer";
import { useAccentRgb } from "@/lib/use-accent-rgb";
import { CaseStudies } from "@/components/home/CaseStudies";

/**
 * Mining products showroom (Figma "Mining – Product Showroom", 1156:26): a hero, an intro, one
 * showcase per mill (AIA's own assembled mill CAD; pointing at a component takes the mill apart
 * around it and lights it, see MillExplorer), case studies and the CTA band.
 * Case studies, the CTA band and the footer are the site's shared ones (homepage carousel,
 * quarry page band). Copy follows the Figma; the hero photo is a stand-in until it is exported.
 */

type Component = { name: string; body?: string; state: MillState };
type Mill = {
  id: string;
  index: string;
  title: string;
  mark: string;
  lede: string;
  explorer: { src: string; view: { theta: number; phi: number; distance?: number }; products?: Record<string, { src: string; scale: number }> };
  components: Component[];
  side: "right" | "left";
};

/*
 * Take-apart states. Distances are metres along each part's own travel direction (the shell's top
 * half lifts, heads and end liners slide out along the axis, shell liners and bolts move straight
 * out from it). The chosen component comes out just enough to stand apart, is lit and is framed at
 * the centre (MillExplorer fits the camera to it); the rest fade back. For fasteners the mill opens
 * the same way and the bolts come straight out of their holes, around the liners they hold.
 */
const SAG_OPEN = { "shell-top": 6.5, "feed-head": 2.4, "discharge-head": 3.2 };
const BALL_OPEN = { "shell-top": 5.5, "feed-head": 2.4, "discharge-head": 3.2 };

const MILLS: Mill[] = [
  {
    id: "sag",
    index: "01.",
    title: "SAG Mill Components",
    mark: "SAG",
    lede: "Engineered for impact resistance and mill shell protection.",
    explorer: { src: "/models/catalog/mill-sag-explode.glb", view: { theta: -38, phi: 66, distance: 0.82 } },
    components: [
      {
        name: "Advanced Lining Systems",
        body: "Feed end and shell liners developed to protect mill internals, resist impact and abrasion, and optimize.",
        state: { amounts: { ...SAG_OPEN, "feed-head": 5.0, "feed-liners": 1.8, "shell-liners": 0.25 }, focus: ["shell-liners", "feed-liners"] },
      },
      {
        name: "Discharge End Assembly",
        state: { amounts: { "shell-top": 3.0, "discharge-head": 6.0, discharge: 2.6 }, focus: ["discharge"], ghost: 0.18 },
      },
      {
        name: "High-Quality Fasteners",
        state: { amounts: { ...SAG_OPEN, fasteners: 0.7 }, focus: ["fasteners"], ghost: 0.16 },
      },
    ],
    side: "right",
  },
  {
    id: "ball",
    index: "02.",
    title: "Ball Mill Components",
    mark: "Ball",
    lede: "Engineered for efficient grinding and optimised material flow.",
    explorer: {
      src: "/models/catalog/mill-ball-explode.glb",
      view: { theta: -34, phi: 68, distance: 0.8 },
      products: { media: { src: "/models/catalog/grinding-media-hicr.glb", scale: 0.55 } },
    },
    components: [
      {
        name: "Advanced Lining Systems",
        body: "Ball mill shell and end liners designed for wear protection and optimised charge movement.",
        state: { amounts: { ...BALL_OPEN, "feed-head": 5.0, "feed-liners": 1.8 }, focus: ["shell-liners", "feed-liners"] },
      },
      {
        name: "Next Generation Discharge System",
        state: { amounts: { "shell-top": 2.6, "discharge-head": 6.0, discharge: 2.6 }, focus: ["discharge"], ghost: 0.18 },
      },
      { name: "Hi-Cr Grinding Media", state: { product: "media" } },
      {
        name: "High-Quality Fasteners",
        body: "They are made from high-grade alloy steel (like Grade 10.9 or 12.9) that can handle tons of pressure without snapping or stretching.",
        state: { amounts: { ...BALL_OPEN, fasteners: 0.6 }, focus: ["fasteners"], ghost: 0.16 },
      },
    ],
    side: "left",
  },
  {
    id: "verti",
    index: "03.",
    title: "Verti Mill Components",
    mark: "Verti",
    lede: "Engineered for abrasion resistance and extended component life in fine grinding applications.",
    explorer: { src: "/models/catalog/mill-verti.glb", view: { theta: 20, phi: 68, distance: 1.0 } },
    components: [
      {
        name: "Flight Liners",
        body: "High chrome (Hi-Cr) liners engineered for wear protection in vertical grinding applications.",
        state: { focus: ["sinterHicr:liners"] },
      },
      { name: "Shoe Liners", state: { focus: ["sinterCeramic:liners"] } },
    ],
    side: "right",
  },
];

export function MiningShowroom() {
  return (
    <>
      <ShowroomHero />

      <section className="msr-intro" aria-labelledby="msr-intro-title">
        <p className="msr-intro-label">Advanced Wear Components</p>
        <div>
          <h2 id="msr-intro-title" className="msr-intro-title">
            We engineer what goes inside to improve what comes out.
          </h2>
          <p className="msr-intro-text">
            Combining advanced metallurgy with application-specific engineering, we develop <b>SAG mill liners</b>,{" "}
            <b>ball mill liners</b>, advanced discharge systems, high-quality fasteners and <b>high chrome grinding media</b>.
            Our wear-resistant components are engineered to address the unique operating demands of SAG, Ball and Verti Mill
            applications, supporting longer wear life, reliability and grinding efficiency.
          </p>
        </div>
      </section>

      <div id="mill-types">
        {MILLS.map((mill) => (
          <MillShowcase key={mill.id} mill={mill} />
        ))}
      </div>

      <CaseStudies heading={["Where our engineering", "proves its purpose."]} tone="bg-[#f5f5f5]" />

      <section className="qc-cta msr-cta" aria-label="Explore AIA mining">
        <Link href="/solutions/mining" className="qc-cta-panel is-blue">
          <span className="qc-cta-title">Explore mining solutions for your operational challenges.</span>
          <span className="qc-cta-foot">
            <span className="qc-cta-label">Explore mining solutions</span>
            <Arrow />
          </span>
        </Link>
        <a href="#mill-types" className="qc-cta-panel">
          <span className="qc-cta-title">Take a closer look at our engineered components.</span>
          <span className="qc-cta-foot">
            <span className="qc-cta-label">View components</span>
            <Arrow />
          </span>
        </a>
      </section>
      {/* Breathing space under the CTA band before the footer, as on the quarry page. */}
      <div className="qc-gap msr-gap" aria-hidden />
    </>
  );
}

function ShowroomHero() {
  const tagline = ["Advanced wear", "components for", "efficient comminution."];
  return (
    <section className="hero-viewport msr-hero relative isolate w-full bg-black" aria-label="Mining products">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-plate.jpg" alt="" fetchPriority="high" className="hero-film object-cover brightness-[0.7] contrast-[1.05]" />
        <div className="hero-scrim" aria-hidden />
      </div>
      <div className="hero-copy z-10" data-hero-lock="figma-1920">
        <div className="hero-lockup animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div>
            <nav aria-label="Breadcrumb" className="msr-crumbs">
              <Link href="/">Home</Link> / <Link href="/solutions/mining">Mining</Link> / <span aria-current="page">Mining Products</span>
            </nav>
            <h1 className="hero-enter hero-headline ft ft-hero">
              {tagline.map((line, idx) => (
                <Fragment key={idx}>
                  {idx > 0 && <span className="sr-only"> </span>}
                  <span>{line}</span>
                </Fragment>
              ))}
            </h1>
          </div>
          <div className="hero-enter-late hero-rail">
            <p className="hero-lede ft ft-lede msr-hero-lede">
              We engineer <b>SAG, Ball and Verti Mill liners</b>, advanced discharge systems and <b>high chrome grinding media</b> for
              enhanced grinding efficiency, mill reliability and mineral recovery.
            </p>
            <CtaButton href="#mill-types" variant="solid" className="hero-cta !h-[40px] !px-[1.4rem] !text-[11px] !gap-2">
              Explore by mill type
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function MillShowcase({ mill }: { mill: Mill }) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const accent = useAccentRgb();
  // The list reflows as a description opens; a short settle window keeps the cursor from
  // bouncing between neighbours while it does (the last item pointed at wins).
  const lastSwitch = useRef(0);
  const pending = useRef<number | null>(null);
  const point = (i: number) => {
    setHovering(true);
    if (pending.current) window.clearTimeout(pending.current);
    const wait = 320 - (performance.now() - lastSwitch.current);
    const go = () => {
      pending.current = null;
      lastSwitch.current = performance.now();
      setActive(i);
    };
    if (wait <= 0) go();
    else pending.current = window.setTimeout(go, wait);
  };
  const leave = () => {
    if (pending.current) window.clearTimeout(pending.current);
    pending.current = null;
    setHovering(false);
  };
  // At rest the mill is assembled; pointing at a component takes the mill apart around it.
  const states = useMemo(() => Object.fromEntries([["rest", {}], ...mill.components.map((c, i) => [String(i), c.state])]), [mill]);

  return (
    <section id={`mill-${mill.id}`} className={`msr-mill is-${mill.side}`} aria-labelledby={`msr-${mill.id}-title`}>
      <div className="msr-stage">
        <span className="msr-mark" aria-hidden>
          {mill.mark}
        </span>
        <div className="msr-model">
          <MillExplorer
            src={mill.explorer.src}
            view={mill.explorer.view}
            products={mill.explorer.products}
            poster={`/images/mining/mill-${mill.id}-rest.webp`}
            states={states}
            state={hovering ? String(active) : "rest"}
            accent={accent}
            alt={`${mill.title}: AIA's mill CAD; pointing at a component takes the mill apart around it`}
          />
        </div>
        <span className="msr-chip">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          360 view
        </span>
        <span className="msr-legend" aria-hidden>
          <span className="is-aia">AIA Components</span>
          <span>Mill Structure</span>
        </span>
      </div>

      <div className="msr-copy">
        <h2 id={`msr-${mill.id}-title`} className="msr-title">
          <span>{mill.index}</span> {mill.title}
        </h2>
        <p className="msr-lede">{mill.lede}</p>
        <p className="msr-label">Explore our engineered components:</p>
        <ul className="msr-list" onMouseLeave={leave}>
          {mill.components.map((c, i) => (
            <li key={c.name}>
              <button
                type="button"
                className={`msr-item ${i === active ? "is-active" : ""}`}
                aria-expanded={i === active}
                onMouseEnter={() => point(i)}
                onFocus={() => point(i)}
                onBlur={leave}
                onClick={() => {
                  lastSwitch.current = performance.now();
                  setActive(i);
                  setHovering(true);
                }}
              >
                <span className="msr-item-name">{c.name}</span>
                {c.body ? (
                  <span className="msr-item-reveal" aria-hidden={i !== active}>
                    <span className="msr-item-body">{c.body}</span>
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
        {/* Each mill's own product page (/solutions/mining/sag-mill, /ball-mill, /verti-mill). */}
        <CtaButton href={`/solutions/mining/${mill.id}-mill`} variant="solid" className="msr-all">
          Explore all components
        </CtaButton>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <span className="qc-cta-arrow" aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}
