"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { href } from "@/lib/routes";

/**
 * "Solutions by industry" — Figma 01Homepage (node 611:1848).
 * One pinned 100vh stage. As the visitor scrolls, the next industry's photo
 * wipes up from the bottom with parallax; when its edge crosses the fixed
 * split line, the copy hands over (old title lifts out, new one rises in).
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
  { id: "mining", index: "01", name: "Mining", lead: ["Wear solutions", "for critical grinding", "applications."], cta: "Explore mining", route: "mining", photo: "/images/design/ind-mining-figma.jpg", alt: "Grinding mill and conveyor at a mineral processing plant" },
  { id: "cement", index: "02", name: "Cement", lead: ["Engineered for", "demanding cement", "grinding applications."], cta: "Explore cement", route: "cement", photo: "/images/design/ind-cement.jpg", alt: "Cement plant with preheater tower" },
  { id: "quarry", index: "03", name: "Quarry", lead: ["Wear protection", "for high-impact", "crushing applications."], cta: "Explore quarry", route: "quarry-products", photo: "/images/design/ind-quarry.jpg", alt: "Mobile crusher and conveyor at a quarry" },
  { id: "thermal", index: "04", name: "Thermal", lead: ["Wear solutions for", "demanding coal", "grinding applications."], cta: "Explore thermal", route: "thermal-power", photo: "/images/design/ind-thermal.jpg", alt: "Thermal power station with cooling towers" },
];

/** Split line position as a fraction of the stage height (Figma: 426 / 1073). */
const SPLIT = 0.4;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function IndustryPanels() {
  const trackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      // 0 → n-1 across the track; each unit is one industry handover.
      const p = clamp01(-r.top / range) * (industries.length - 1);

      industries.forEach((_, i) => {
        const layer = layerRefs.current[i];
        const img = imgRefs.current[i];
        if (!layer || !img) return;
        if (i === 0) {
          // Base layer: slow drift while it is the visible photo.
          img.style.transform = reduced ? "" : `translate3d(0, ${(-clamp01(p) * 6).toFixed(2)}%, 0) scale(1.12)`;
          return;
        }
        const local = clamp01(p - (i - 1)); // 0 = waiting below, 1 = fully in
        const wipe = reduced ? (local >= 1 - SPLIT ? 1 : 0) : ease(local);
        layer.style.clipPath = `inset(${((1 - wipe) * 100).toFixed(2)}% 0 0 0)`;
        // Parallax: the incoming photo travels slower than its wipe edge.
        img.style.transform = reduced ? "" : `translate3d(0, ${((1 - wipe) * 22 - clamp01(p - i) * 6).toFixed(2)}%, 0) scale(1.12)`;
      });

      // Copy hands over when the incoming wipe edge crosses the split line.
      let next = 0;
      for (let i = 1; i < industries.length; i++) {
        if (ease(clamp01(p - (i - 1))) >= 1 - SPLIT) next = i;
      }
      if (next !== last) {
        last = next;
        setActive(next);
      }
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

  const current = industries[active];

  return (
    <section id="solutions" aria-labelledby="industries-heading" className="inds">
      <div className="inds-intro">
        <SectionLabel className="inds-intro-label">Solutions by industry</SectionLabel>
        <h2 id="industries-heading" className="inds-intro-heading ft ft-h62">
          Explore engineered wear solutions for Mining, Cement, Quarry and Thermal Power applications.
        </h2>
      </div>

      <div ref={trackRef} className="inds-track" style={{ height: `${industries.length * 100}svh` }}>
        <div className="inds-stage">
          {industries.map((ind, i) => (
            <div
              key={ind.id}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="inds-layer"
              style={i === 0 ? undefined : { clipPath: "inset(100% 0 0 0)" }}
              aria-hidden={i !== active}
            >
              <div
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                className="inds-layer-img"
              >
                <Image src={ind.photo} alt={i === active ? ind.alt : ""} fill sizes="100vw" className="object-cover" priority={i === 0} />
              </div>
            </div>
          ))}
          <div aria-hidden className="inds-shade" />

          <div className="inds-content">
            <div className="inds-index-row">
              <span className="inds-index-window ft ft-index32" aria-hidden>
                {industries.map((ind, i) => (
                  <span key={ind.id} className={`inds-swap ${i === active ? "is-on" : i < active ? "is-past" : ""}`}>
                    {ind.index}
                  </span>
                ))}
              </span>
            </div>
            <span aria-hidden className="inds-rule" />
            <div className="inds-row">
              <h3 className="inds-title-window ft ft-h100" aria-live="polite">
                {industries.map((ind, i) => (
                  <span key={ind.id} className={`inds-title ft ft-h100 inds-swap ${i === active ? "is-on" : i < active ? "is-past" : ""}`} aria-hidden={i !== active}>
                    {ind.name}
                  </span>
                ))}
              </h3>
              <div className="inds-side">
                <div className="inds-lead-window">
                  {industries.map((ind, i) => (
                    <p key={ind.id} className={`inds-lead ft ft-lead40 inds-fade ${i === active ? "is-on" : ""}`} aria-hidden={i !== active}>
                      {ind.lead.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  ))}
                </div>
                <Link href={href(current.route)} className="inds-cta" data-magnetic="">
                  <span aria-hidden className="inds-cta-dot" />
                  <span key={current.id} className="inds-cta-label ft ft-cta">
                    {current.cta}
                  </span>
                </Link>
              </div>
            </div>
            <ul className="inds-thumbs" aria-label="All industries">
              {industries.map((ind, i) => (
                <li key={ind.id}>
                  <Link href={href(ind.route)} className={`inds-thumb ${i === active ? "is-on" : ""}`} aria-label={`${ind.name} solutions`}>
                    <Image src={ind.photo} alt="" fill sizes="172px" className="object-cover" />
                    <span className="inds-thumb-label">{ind.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
