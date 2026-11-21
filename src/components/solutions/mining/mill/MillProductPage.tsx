"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Faq } from "@/components/home/ClosingSections";
import { FloatingModel } from "@/components/solutions/quarry/FloatingModel";
import { MillExplorer, type MillState } from "@/components/solutions/mining/MillExplorer";
import { MILLS, type Mill } from "@/components/solutions/mining/mill/mills";
import { useAccentRgb } from "@/lib/use-accent-rgb";
import { homeOnly } from "@/lib/env";

/**
 * Mill product page (Figma "Mining - Product Page", 1183:958): /solutions/mining/sag-mill,
 * /ball-mill and /verti-mill, one layout fed by mills.tsx. Hero with the mill's take-apart CAD and
 * a component strip, the pinned category list beside the product stack, NGDS® (SAG and ball),
 * case studies, the CTA band and the FAQ.
 */
export function MillProductPage({ mill }: { mill: Mill }) {
  return (
    <>
      <MillHero mill={mill} />
      <MillComponents mill={mill} />
      {mill.ngds ? <Ngds /> : null}
      <CaseStudies heading={["Where our engineering", "proves its purpose."]} tone="bg-[#f5f5f5]" />
      <section className="qc-cta msr-cta mp-cta" aria-label="Explore AIA mining">
        <Link prefetch={homeOnly ? false : undefined} href="/solutions/mining" className="qc-cta-panel is-blue">
          <span className="qc-cta-title">Explore mining solutions for better grinding performance.</span>
          <span className="qc-cta-foot">
            <span className="qc-cta-label">Explore mining solutions</span>
            <ArrowUpRight />
          </span>
        </Link>
        <Link prefetch={homeOnly ? false : undefined} href="/solutions/mining/services" className="qc-cta-panel">
          <span className="qc-cta-title">Discover the expertise that keeps your mills performing.</span>
          <span className="qc-cta-foot">
            <span className="qc-cta-label">Explore mining services</span>
            <ArrowUpRight />
          </span>
        </Link>
      </section>
      <div className="qc-gap" aria-hidden />
      <Faq heading={mill.faqHeading} items={mill.faqs} />
    </>
  );
}

/* ── Hero: the mill assembled at rest; the component strip under it opens the mill around one
   component and lights it (the mill can still be turned by dragging). ── */

/** Gentle tour: while the hero is on screen and untouched, it steps through the components. */
const TOUR_MS = 4500;

function MillHero({ mill }: { mill: Mill }) {
  const accent = useAccentRgb();
  const [chosen, setChosen] = useState<string | null>(null);
  const [hold, setHold] = useState(false); // a click keeps the pick; hover alone lets it go
  const stageRef = useRef<HTMLDivElement>(null);
  const [touring, setTouring] = useState(true);
  const [tourStep, setTourStep] = useState(-1); // -1: the mill at rest between rounds
  const [inView, setInView] = useState(false);

  // Runs only while the hero is in view; any hover, tap, focus or drag ends it for good.
  useEffect(() => {
    const el = stageRef.current; // the mill stage, not the whole (taller than the screen) hero
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(Boolean(e?.isIntersecting)), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!touring || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = mill.categories.length;
    const t = window.setTimeout(
      () => setTourStep((s) => (s + 1 >= steps ? -1 : s + 1)),
      tourStep === -1 ? 2200 : TOUR_MS,
    );
    return () => window.clearTimeout(t);
  }, [touring, inView, tourStep, mill.categories.length]);
  const stopTour = () => {
    if (touring) setTouring(false);
  };
  const pick = touring ? (mill.categories[tourStep]?.id ?? null) : chosen;
  const setPick = (id: string | null) => {
    stopTour();
    setChosen(id);
  };
  const states = useMemo(
    () => Object.fromEntries([["rest", {} satisfies MillState], ...mill.categories.map((c) => [c.id, c.state ?? {}])]),
    [mill],
  );
  const current = mill.categories.find((c) => c.id === pick);

  const toCategory = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-mp-cat="${id}"]`);
    if (!el) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-h")) || 72;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - header, behavior: "smooth" });
  };

  return (
    <section className="mp-hero" aria-labelledby="mp-title" style={{ ["--mp-tour" as string]: `${TOUR_MS}ms` }}>
      <div className="mp-hero-head">
        <nav className="mp-crumbs" aria-label="Breadcrumb">
          <Link prefetch={false} href="/">Home</Link> / <Link prefetch={false} href="/solutions/mining">Mining</Link> /{" "}
          <Link prefetch={false} href="/solutions/mining/products">Mining Products</Link> / <span aria-current="page">{mill.crumb}</span>
        </nav>
        <div className="mp-hero-row">
          <h1 id="mp-title" className="mp-title">
            {mill.title[0]}
            <br />
            {mill.title[1]}
          </h1>
          <p className="mp-lede">{mill.lede}</p>
        </div>
      </div>

      <div ref={stageRef} className="mp-stage" onPointerDown={stopTour}>
        <span className="mp-mark" aria-hidden>
          {mill.mark}
        </span>
        <div className="mp-mill">
          <MillExplorer
            key={mill.id}
            src={mill.explorer.src}
            view={mill.explorer.view}
            products={mill.explorer.products}
            poster={`/images/mining/mill-${mill.id}-rest.webp`}
            states={states}
            state={pick ?? "rest"}
            accent={accent}
            alt={`${mill.name}: AIA's mill CAD; choosing a component below takes the mill apart around it`}
          />
        </div>
        <span className="mp-hint" aria-hidden>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
          Drag to turn · choose a component
        </span>
      </div>

      <div className="mp-strip" onMouseLeave={() => !hold && setPick(null)}>
        <ol className="mp-strip-list" style={{ ["--n" as string]: mill.categories.length }}>
          {mill.categories.map((c, i) => {
            const on = c.id === pick;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  className={`mp-strip-item ${on ? "is-on" : ""} ${on && touring ? "is-tour" : ""}`}
                  aria-pressed={on}
                  onMouseEnter={() => !hold && setPick(c.id)}
                  onFocus={() => setPick(c.id)}
                  onClick={() => {
                    if (on && hold) {
                      setHold(false);
                      setPick(null);
                    } else {
                      setHold(true);
                      setPick(c.id);
                    }
                  }}
                >
                  <span className="mp-strip-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mp-strip-title">{c.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mp-strip-detail" aria-live={touring ? "off" : "polite"}>
          {current ? (
            <p key={current.id} className="mp-strip-blurb">
              {current.blurb}{" "}
              <button type="button" className="mp-strip-more" onClick={() => toCategory(current.id)}>
                View components
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </button>
            </p>
          ) : (
            <p className="mp-strip-blurb is-idle">Choose a component to see where it sits in the {mill.name}.</p>
          )}
        </div>
      </div>

      {/* Mill switcher at the right edge: this mill spelled out, the others by letter. */}
      <nav className="mp-mills" aria-label="Mills">
        {MILLS.map((m) =>
          m.id === mill.id ? (
            <span key={m.id} className="mp-mills-item is-current" aria-current="page">
              {m.name}
            </span>
          ) : (
            <Link key={m.id} prefetch={false} href={m.path} className="mp-mills-item" aria-label={m.name}>
              <span className="mp-mills-short" aria-hidden>
                {m.short}
              </span>
              <span className="mp-mills-long" aria-hidden>
                {m.name}
              </span>
            </Link>
          ),
        )}
      </nav>
    </section>
  );
}

/* ── Components: pinned category list (left) beside the product stack (right) ── */

/**
 * Product framing in the stack cells: the camera angle is the variant's own (or the default), the
 * distance follows how many products share the card, so each part fills its cell without running
 * into its caption (one product: tall cell, close; four in a 2x2: short cells, further back).
 */
const CELL_DISTANCE: Record<number, string> = { 1: "80%", 2: "86%", 3: "96%", 4: "108%" };
const cellOrbit = (orbit: string | undefined, count: number, distance?: string) =>
  `${(orbit ?? "30deg 66deg").split(" ").slice(0, 2).join(" ")} ${distance ?? CELL_DISTANCE[count] ?? "100%"}`;

function MillComponents({ mill }: { mill: Mill }) {
  const parts = useMemo(() => mill.categories.flatMap((c) => c.parts.map((p) => ({ ...p, category: c.id }))), [mill]);
  const [active, setActive] = useState(parts[0].id);
  const [openCat, setOpenCat] = useState(mill.categories[0].id);
  const stackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // The pinned list is often taller than the screen once a category opens: keep the open
  // category at the top of the list so its products and enquiry button stay in view.
  useEffect(() => {
    const rail = railRef.current;
    const cat = rail?.querySelector<HTMLElement>(`[data-mp-railcat="${openCat}"]`);
    if (!rail || !cat) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Wait for the panels to finish opening and closing before measuring.
    const t = window.setTimeout(() => rail.scrollTo({ top: Math.max(0, cat.offsetTop - 12), behavior: reduce ? "auto" : "smooth" }), 520);
    return () => window.clearTimeout(t);
  }, [openCat]);

  // The product in view (crossing 45% of the screen, or nearest to it) opens its category and part.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let best: HTMLElement | null = null;
      let dist = Infinity;
      stack.querySelectorAll<HTMLElement>("[data-mp-part]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = r.top <= mid && r.bottom >= mid ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
        if (d < dist) {
          dist = d;
          best = el;
        }
      });
      const el = best as HTMLElement | null;
      if (!el) return;
      setActive(el.dataset.mpPart!);
      setOpenCat(el.dataset.mpCatOf!);
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

  const goTo = (partId: string) => {
    const el = stackRef.current?.querySelector<HTMLElement>(`[data-mp-part="${partId}"]`);
    if (!el) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-h")) || 72;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - header,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section id="components" className="mp-comp" aria-label={`${mill.name} components`}>
      <div ref={railRef} className="mp-rail">
        <div className="mp-rail-inner">
          <p className="mp-eyebrow">Component categories:</p>
          {mill.categories.map((c) => {
            const open = c.id === openCat;
            return (
              <div key={c.id} data-mp-railcat={c.id} className={`mp-cat ${open ? "is-open" : ""}`}>
                <button type="button" className="mp-cat-head" aria-expanded={open} aria-controls={`mp-cat-${c.id}`} onClick={() => goTo(c.parts[0].id)}>
                  <span className="mp-cat-title">{c.title}</span>
                  <span className="mp-cat-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M6 13l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div id={`mp-cat-${c.id}`} className="mp-cat-panel" aria-hidden={!open}>
                  <div className="mp-cat-inner">
                    <p className="mp-cat-body">{c.body}</p>
                    {c.points?.length ? (
                      <ul className="mp-points">
                        {c.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mp-eyebrow mp-eyebrow--sub">{mill.partsLabel}</p>
                    <ul className="mp-parts">
                      {c.parts.map((p) => (
                        <li key={p.id}>
                          <button type="button" className={`mp-part ${p.id === active ? "is-active" : ""}`} tabIndex={open ? 0 : -1} onClick={() => goTo(p.id)}>
                            <span className="mp-part-text">
                              <span className="mp-part-title">{p.title}</span>
                              <span className="mp-part-desc">{p.desc}</span>
                            </span>
                            <svg className="mp-part-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                              <path d="m9 6 6 6-6 6" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <CtaButton
                      href="/contact"
                      variant="solid"
                      className="mp-enquire !h-[38px] w-fit !gap-1.5 !px-[18px] !text-[10px] !leading-none [&>span:first-child]:!size-1.5"
                    >
                      {c.enquire}
                    </CtaButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div ref={stackRef} className="mp-stack">
        {mill.categories.map((c) =>
          c.parts.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              data-mp-part={p.id}
              data-mp-cat-of={c.id}
              data-mp-cat={i === 0 ? c.id : undefined}
              className="mp-card"
            >
              <h3 className="mp-bar">{p.title}</h3>
              <p className="mp-card-desc">{p.desc}</p>
              <div className="mp-cells" data-n={p.variants.length}>
                {p.variants.map((v) => (
                  <figure key={v.model} className="mp-cell">
                    <div className="mp-cell-model">
                      <FloatingModel
                        src={`/models/catalog/${v.model}.glb`}
                        poster={`/models/catalog/${v.model}.poster.webp`}
                        orbit={cellOrbit(v.orbit, p.variants.length, v.distance)}
                        alt={`${v.label}, 3D model from AIA's CAD`}
                      />
                    </div>
                    <figcaption>
                      <p className="mp-cell-name">{v.label}</p>
                      <ul className="mp-specs">
                        {v.specs.map(([k, val]) => (
                          <li key={k}>
                            {k}: <strong>{val}</strong>
                          </li>
                        ))}
                      </ul>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          )),
        )}
      </div>
    </section>
  );
}

/* ── NGDS® with its film (plays in place, like the homepage gallery) ── */

function Ngds() {
  const [playing, setPlaying] = useState(false);
  const id = "Ewxm_uvmJSE"; // Vega's Next Gen Pulp Lifter (AIA's YouTube)
  return (
    <section className="mp-ngds" aria-labelledby="mp-ngds-title">
      <span className="mp-ngds-shard" aria-hidden />
      <p className="mp-ngds-mark" aria-hidden>
        NGDS<sup>®</sup>
      </p>
      <h2 id="mp-ngds-title" className="mp-ngds-title">
        <span className="sr-only">NGDS®: </span>A new approach to one of
        <br />
        grinding&apos;s longstanding challenges.
      </h2>
      <div className="mp-ngds-film">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Vega's Next Gen Pulp Lifter"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="mp-ngds-play" onClick={() => setPlaying(true)} aria-label="Play: Vega's Next Gen Pulp Lifter">
            {/* eslint-disable-next-line @next/next/no-img-element -- local poster, fixed 16:9 frame */}
            <img src="/images/gallery-next-gen-pulp-lifter.webp" alt="" loading="lazy" />
            <span className="mp-ngds-play-btn" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="mp-ngds-cta">
        <CtaButton href="/solutions/mining/ngds" variant="solid" className="!h-10 !px-6 !text-[11px]">
          Explore the NGDS difference
        </CtaButton>
      </div>
    </section>
  );
}

function ArrowUpRight() {
  return (
    <span className="qc-cta-arrow" aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}
