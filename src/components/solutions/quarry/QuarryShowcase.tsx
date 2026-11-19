"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { glideTo } from "@/components/motion/MotionProvider";
import { FloatingModel } from "@/components/solutions/quarry/FloatingModel";
import type { IndustryProductsContent } from "@/content/types";

/** AIA's own Quarry CAD (3D PDFs decoded locally, scripts/cad/manifest.mjs), per product id. */
const MODELS: Record<string, { src: string; orbit?: string }> = {
  "blow-bars": { src: "/models/catalog/quarry-metal-blow-bar.glb", orbit: "35deg 62deg 100%" },
  hammers: { src: "/models/catalog/quarry-hammer.glb", orbit: "30deg 72deg 110%" },
  impellers: { src: "/models/catalog/quarry-impeller.glb" },
  anvil: { src: "/models/catalog/quarry-anvil.glb" },
  "feed-disk": { src: "/models/catalog/quarry-feed-disk.glb", orbit: "20deg 58deg 105%" },
  "frame-liners": { src: "/models/catalog/quarry-frame-liner.glb", orbit: "30deg 55deg 105%" },
};

/**
 * Product benefits, as in the Figma ("Quarry - Product Page"). Blow Bars are the Figma's own lines;
 * the others restate AIA's quarry copy (src/content/industries/quarry.ts) — nothing new is claimed.
 */
const BENEFITS: Record<string, string[]> = {
  "blow-bars": [
    "Highly trusted and established alloy for impact resistance.",
    "High crushing efficiency and low cost per ton of crushing.",
    "Uniform wear profiles for consistent crushing output.",
    "Designed for longer component service life.",
  ],
  hammers: [
    "Superior alloy construction for hammer crushers.",
    "Differential hardening curbs breakage at the shank.",
    "Uniform end-product size and low cost per ton.",
    "Weight-balanced in-house to manage rotor vibration.",
  ],
  impellers: [
    "Superior alloys for high wear resistance at high RPM.",
    "Weight-balanced in-house to manage rotor vibration.",
    "Uniform wear profile for consistent particle size.",
    "Easy installation and maintenance-free operation.",
  ],
  anvil: [
    "Superior alloys for high wear resistance and long lifespan.",
    "Offered in ceramic and non-ceramic variants.",
    "Uniform wear profile across the impact surface.",
    "Easy installation and maintenance-free operation.",
  ],
  "feed-disk": [
    "Superior alloys for high wear resistance and long lifespan.",
    "Offered with or without ceramic.",
    "Distributes material into the rotor.",
    "Resists abrasive wear at the centre of the impeller.",
  ],
  "frame-liners": [
    "Protects the crusher housing.",
    "Superior wear alloys for longer product life.",
    "Designed for easy installation.",
    "Maintenance-free operation.",
  ],
};

type Props = { content: IndustryProductsContent };

/**
 * Figma "Quarry - Product Page" products block, scroll-driven. Desktop: the left column is pinned
 * below the navbar and lists the six parts; the one in view on the right opens (eyebrow, name,
 * description, benefits, enquiry) while the rest stay as titled rows. The right column is the
 * product stack: a blue name bar over each AIA 3D model. Scrolling moves through the stack and the
 * left list follows; clicking a row scrolls to its product. Phones: one card per product (bar,
 * model, then its copy).
 */
export function QuarryShowcase({ content }: Props) {
  const group = content.groups[0];
  const products = group.products;
  const [active, setActive] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Figma layout at Figma sizes: the open product sits at the top of the pinned rail with the
  // remaining products under it. The list slides up by exactly the closed rows above the open
  // product, in one move timed with the panels opening and closing (no second correction).
  const prevActive = useRef(0);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const before = prevActive.current;
    prevActive.current = active;
    const place = () => {
      // Measure a row that is not animating: neither the product opening nor the one closing (its
      // height is still collapsing at this moment), so the slide is exactly one full row each.
      const items = Array.from(list.querySelectorAll<HTMLElement>(".qs-item"));
      const still = items.find((_, k) => k !== active && k !== before);
      const rowH = still?.offsetHeight ?? 0; // the full row, divider included
      list.style.transform = `translateY(${-active * rowH}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Desktop: one wheel gesture moves exactly one product. The page glides until the next product
  // fills the screen and its tab is open, then holds; scrolling past the first or last product
  // releases back to normal page scrolling. While the showcase is in view the chat button steps
  // aside so it never covers the panel.
  useEffect(() => {
    const stack = stackRef.current;
    const section = stack?.closest<HTMLElement>(".qs");
    if (!stack || !section) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let busy = false;
    const tops = () =>
      Array.from(stack.querySelectorAll<HTMLElement>("[data-qs-card]")).map((c) => c.getBoundingClientRect().top + window.scrollY);
    const onWheel = (e: WheelEvent) => {
      if (!desktop.matches || reduced.matches || Math.abs(e.deltaY) < 2) return;
      const t = tops();
      const y = window.scrollY;
      const first = t[0];
      const last = t[t.length - 1];
      const down = e.deltaY > 0;
      let target: number | null = null;
      if (down && y < first - 4 && first - y < window.innerHeight) target = first; // entering from above
      else if (!down && y > last + 4 && y - last < window.innerHeight) target = last; // entering from below
      else if (y >= first - 4 && y <= last + 4) {
        let i = 0;
        t.forEach((top, k) => {
          if (Math.abs(top - y) < Math.abs(t[i] - y)) i = k;
        });
        if (down && i < t.length - 1) target = t[i + 1];
        else if (!down && i > 0) target = t[i - 1];
        else if (Math.abs(t[i] - y) > 4) target = t[i]; // settle onto the nearest product first
      }
      if (target === null && !busy) return; // past the ends: normal scrolling
      e.preventDefault();
      e.stopImmediatePropagation();
      if (busy || target === null) return;
      busy = true;
      glideTo(target).then(() => window.setTimeout(() => (busy = false), 220));
    };
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });

    const root = document.documentElement;
    const io = new IntersectionObserver(([en]) => root.classList.toggle("qs-in-view", !!en?.isIntersecting), { threshold: 0.15 });
    io.observe(section);
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      io.disconnect();
      root.classList.remove("qs-in-view");
    };
  }, []);

  // The active product is the card whose middle is closest to the middle of the screen.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = stack.querySelectorAll<HTMLElement>("[data-qs-card]");
      const mid = window.innerHeight * 0.55;
      let best = 0;
      let dist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
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

  const goTo = (i: number) => {
    const card = stackRef.current?.querySelectorAll<HTMLElement>("[data-qs-card]")[i];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const y = window.scrollY + r.top + r.height / 2 - window.innerHeight * 0.55;
    window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section id={group.id} className="qs" aria-label={group.name}>
      {/* Left: pinned list, the product in view opened. */}
      <div className="qs-rail">
        <ul ref={listRef} className="qs-list">
          {products.map((p, i) => {
            const open = i === active;
            return (
              <li key={p.id} className={`qs-item ${open ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="qs-row"
                  aria-expanded={open}
                  aria-controls={`qs-panel-${p.id}`}
                  onClick={() => goTo(i)}
                >
                  <span className="qs-row-title">{p.title}</span>
                  <span className="qs-row-icon" aria-hidden>
                    <Arrow />
                  </span>
                </button>
                <div id={`qs-panel-${p.id}`} className="qs-panel" aria-hidden={!open}>
                  <div className="qs-panel-inner">
                    <ProductCopy id={p.id} title={p.title} body={p.body} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: the product stack. */}
      <div ref={stackRef} className="qs-stack">
        {products.map((p, i) => {
          const model = MODELS[p.id];
          return (
            <article key={p.id} id={p.id} data-qs-card className={`qs-card ${i === active ? "is-active" : ""}`}>
              <h3 className="qs-bar">{p.title}</h3>
              <div className="qs-media">
                {model ? (
                  <FloatingModel src={model.src} orbit={model.orbit} alt={`${p.title}, 3D model from AIA's CAD`} />
                ) : null}
              </div>
              {/* Phones: the copy sits under its own product. */}
              <div className="qs-card-copy">
                <ProductCopy id={p.id} title={p.title} body={p.body} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProductCopy({ id, title, body }: { id: string; title: string; body: string }) {
  const benefits = BENEFITS[id] ?? [];
  return (
    <>
      <p className="qs-eyebrow">Quarry components</p>
      <p className="qs-name">{title}</p>
      <p className="qs-text">{body}</p>
      {benefits.length > 0 && (
        <>
          <p className="qs-eyebrow qs-eyebrow--benefit">Product benefit:</p>
          <ul className="qs-benefits">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </>
      )}
      <CtaButton
        href="/contact"
        variant="solid"
        className="qs-cta !h-[38px] w-fit !gap-1.5 !px-[18px] !text-[10px] !leading-none [&>span:first-child]:!size-1.5"
      >
        Enquire about {title}
      </CtaButton>
    </>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}
