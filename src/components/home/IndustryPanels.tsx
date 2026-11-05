"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { href } from "@/lib/routes";

/**
 * "Solutions by industry" — Figma 01Homepage (node 611:1848).
 * Centred intro, then four full-bleed photo panels (1920×1080) that stack as
 * the page scrolls: index, large title over a hairline, lead copy, an Explore
 * pill, and thumbnails linking to the other three industries.
 */

type Industry = {
  id: string;
  index: string;
  name: string;
  lead: string[];
  cta: string;
  route: string;
  photo: string;
  alt: string;
};

const industries: Industry[] = [
  { id: "mining", index: "01", name: "Mining", lead: ["Wear solutions", "engineered for critical-", "grinding applications."], cta: "Explore mining", route: "mining", photo: "/images/design/ind-mining.jpg", alt: "Excavator loading a haul truck at a mine" },
  { id: "cement", index: "02", name: "Cement", lead: ["Wear solutions", "for demanding", "grinding applications."], cta: "Explore cement", route: "cement", photo: "/images/design/ind-cement.jpg", alt: "Cement plant with preheater tower" },
  { id: "quarry", index: "03", name: "Quarry", lead: ["Wear protection", "for crushing", "applications."], cta: "Explore quarry", route: "quarry-products", photo: "/images/design/ind-quarry.jpg", alt: "Mobile crusher and conveyor at a quarry" },
  { id: "thermal", index: "04", name: "Thermal", lead: ["Wear solutions for", "demanding coal", "grinding applications."], cta: "Explore thermal", route: "thermal-power", photo: "/images/design/ind-thermal.jpg", alt: "Thermal power station with cooling towers" },
];

/** Drives --p (0→1 while a panel is on screen) for the photo zoom and text reveal. */
function usePanelProgress(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el?.style.setProperty("--p", "1");
      el?.classList.add("is-in");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 1.6)));
      el.style.setProperty("--p", p.toFixed(3));
      if (r.top < vh * 0.55) el.classList.add("is-in");
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
  }, [ref]);
}

function Panel({ industry, z }: { industry: Industry; z: number }) {
  const ref = useRef<HTMLElement>(null);
  usePanelProgress(ref);
  const others = industries.filter((i) => i.id !== industry.id);
  const titleId = `inds-${industry.id}`;

  return (
    <article ref={ref} className="inds-panel" style={{ zIndex: z }} aria-labelledby={titleId}>
      <div className="inds-photo">
        <Image src={industry.photo} alt={industry.alt} fill sizes="100vw" className="object-cover" priority={z === 1} />
      </div>
      <div aria-hidden className="inds-shade" />
      <div className="inds-content">
        <p className="inds-index inds-rise" style={{ "--d": "0ms" } as React.CSSProperties}>{industry.index}</p>
        <span aria-hidden className="inds-rule" />
        <div className="inds-row">
          <h3 id={titleId} className="inds-title inds-rise" style={{ "--d": "80ms" } as React.CSSProperties}>{industry.name}</h3>
          <div className="inds-side inds-rise" style={{ "--d": "180ms" } as React.CSSProperties}>
            <p className="inds-lead">
              {industry.lead.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <Link href={href(industry.route)} className="inds-cta" data-magnetic="">
              <span aria-hidden className="inds-cta-dot" />
              {industry.cta}
            </Link>
          </div>
        </div>
        <ul className="inds-thumbs inds-rise" style={{ "--d": "280ms" } as React.CSSProperties} aria-label="Other industries">
          {others.map((o) => (
            <li key={o.id}>
              <Link href={href(o.route)} className="inds-thumb" aria-label={`${o.name} solutions`}>
                <Image src={o.photo} alt="" fill sizes="172px" className="object-cover" />
                <span className="inds-thumb-label">{o.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function IndustryPanels() {
  return (
    <section id="solutions" aria-labelledby="industries-heading" className="inds">
      <div className="inds-intro">
        <SectionLabel className="inds-intro-label">Solutions by industry</SectionLabel>
        <h2 id="industries-heading" className="inds-intro-heading">
          Explore solutions for Mining, Cement, Quarry and Thermal Power applications.
        </h2>
      </div>
      <div className="inds-stack">
        {industries.map((industry, i) => (
          <Panel key={industry.id} industry={industry} z={i + 1} />
        ))}
      </div>
    </section>
  );
}
