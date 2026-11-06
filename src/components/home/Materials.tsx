"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";

/**
 * Materials & metallurgy — Figma 01Homepage (nodes 620:1852–628:1914).
 * Industry tabs, a material strip, then a product stage (render + hotspot)
 * beside the blue detail panel. Copy follows the Figma for Mining; the other
 * industries reuse AIA's published material families.
 */

type Material = { id: string; label: string; title: string; body: string[] };
type Industry = { id: string; label: string; route: string; cta: string; materials: Material[] };

const mining: Material[] = [
  { id: "metal", label: "Metal", title: "Metal (Cr-Mo / Hi-Cr)", body: ["Built for demanding grinding conditions, our engineered metal alloys combine wear resistance with the strength required for critical mill components.", "Developed around specific operating requirements, these material solutions help improve component reliability and extend wear life."] },
  { id: "rubber", label: "Rubber", title: "Rubber", body: ["Rubber linings absorb impact and resist abrasion in secondary grinding and regrind mills, reducing noise and liner weight.", "Profiles are designed around charge motion to keep wear even across the shell."] },
  { id: "composite", label: "Composite", title: "Composite", body: ["Composite liners pair a wear-resistant metal face with a rubber backing, balancing impact strength with lighter, faster relines."] },
  { id: "integrated", label: "Integrated Composite", title: "Integrated Composite", body: ["A single-piece composite construction that combines metal inserts and elastomer to extend life in high-impact zones."] },
  { id: "steel", label: "Steel/White Iron", title: "Steel / White Iron", body: ["Alloy steel and white iron grades selected for the balance of toughness and hardness each mill position demands."] },
  { id: "sintercast", label: "Hi-Cr with Sintercast", title: "Hi-Cr with Sintercast", body: ["High-chrome castings reinforced with Sintercast ceramic inserts for exceptional abrasion resistance in severe wear zones."] },
  { id: "media", label: "Hi-Cr Grinding Media", title: "Hi-Cr Grinding Media", body: ["High-chrome grinding media engineered for low wear rates and consistent grinding performance across the charge."] },
];

const industries: Industry[] = [
  { id: "mining", label: "Mining", route: "mining-products", cta: "Explore Mining Products", materials: mining },
  {
    id: "cement", label: "Cement", route: "cement-products", cta: "Explore Cement Products",
    materials: [
      { id: "metal", label: "Metal (Hi-Cr)", title: "Metal (Hi-Cr)", body: ["High-chrome liners and diaphragms for tube mills, designed for consistent grinding efficiency and long service life."] },
      { id: "sintercast", label: "Hi-Cr with Sintercast", title: "Hi-Cr with Sintercast", body: ["Ceramic-reinforced high-chrome parts for VRM rollers and tables where abrasion is most severe."] },
      { id: "media", label: "Hi-Cr Grinding Media", title: "Hi-Cr Grinding Media", body: ["Grinding media that lower specific energy consumption and keep cement mills running at target fineness."] },
    ],
  },
  {
    id: "quarry", label: "Quarry", route: "quarry-products", cta: "Explore Quarry Products",
    materials: [
      { id: "blow", label: "Blow Bars", title: "Blow Bars", body: ["Impact crusher blow bars cast for a uniform wear profile and longer life in harsh aggregate duty."] },
      { id: "hammers", label: "Hammers", title: "Hammers", body: ["Crusher hammers engineered to hold their profile under repeated impact."] },
      { id: "components", label: "Crusher Components", title: "Crusher Components", body: ["Impellers, anvils, feed discs and frame liners matched to each crusher and feed."] },
    ],
  },
  {
    id: "thermal", label: "Thermal", route: "thermal-power-products", cta: "Explore Thermal Products",
    materials: [
      { id: "tube", label: "Tube Mill Parts", title: "Tube Mill Parts", body: ["Wear-resistant liners for coal tube mills, designed to maximise uptime between replacements."] },
      { id: "vrm", label: "VRM Parts", title: "VRM Parts", body: ["Rollers, tables and segments for vertical roller mills grinding coal for power generation."] },
      { id: "media", label: "Hi-Cr Grinding Media", title: "Hi-Cr Grinding Media", body: ["Grinding media built for steady mill productivity and fewer replacement cycles."] },
    ],
  },
];

export function Materials() {
  const [industryId, setIndustryId] = useState("mining");
  const industry = industries.find((i) => i.id === industryId) ?? industries[0];
  const [materialId, setMaterialId] = useState(industry.materials[0].id);
  const material = industry.materials.find((m) => m.id === materialId) ?? industry.materials[0];
  const index = industry.materials.indexOf(material) + 1;

  const pickIndustry = (id: string) => {
    const next = industries.find((i) => i.id === id) ?? industries[0];
    setIndustryId(next.id);
    setMaterialId(next.materials[0].id);
  };

  return (
    <section className="mats" aria-labelledby="mats-heading">
      <Reveal className="mats-intro">
        <SectionLabel>Materials &amp; Metallurgy</SectionLabel>
        <h2 id="mats-heading" className="mats-heading">Materials that make the difference</h2>
        <p className="mats-lead">
          Every material has a purpose. Every application has a challenge. We bring them together through engineering designed to perform where it matters most.
        </p>
      </Reveal>

      <div className="mats-tabs" role="tablist" aria-label="Industry">
        {industries.map((i) => (
          <button key={i.id} type="button" role="tab" aria-selected={i.id === industry.id} className="mats-tab" onClick={() => pickIndustry(i.id)}>
            {i.label}
          </button>
        ))}
      </div>

      <div className="mats-strip" role="tablist" aria-label={`${industry.label} materials`}>
        {industry.materials.map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={m.id === material.id} className="mats-chip" onClick={() => setMaterialId(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="mats-stage">
        <div className="mats-visual">
          <span aria-hidden className="mats-shape mats-shape-a" />
          <span aria-hidden className="mats-shape mats-shape-b" />
          <div key={`${industry.id}-${material.id}`} className="mats-render">
            <Image src="/images/design/material-liner.webp" alt={`${material.title} liner component`} width={1145} height={1374} sizes="(max-width: 1024px) 60vw, 30vw" />
          </div>
          <div className="mats-hotspot">
            <span aria-hidden className="mats-hotspot-dot">+</span>
            <div className="mats-hotspot-card">
              <p className="mats-hotspot-title">Advanced lining systems</p>
              <p className="mats-hotspot-body">These advanced systems dynamically regulate the mill&apos;s internal environment to maximize throughput, save energy, and prevent mechanical damage.</p>
            </div>
          </div>
          <Link href={href(industry.route)} className="mats-360">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
              <circle cx="13" cy="13" r="11.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" />
              <circle cx="13" cy="13" r="3" fill="currentColor" />
            </svg>
            360 view
          </Link>
        </div>

        <div className="mats-panel">
          <div key={`${industry.id}-${material.id}`} className="mats-panel-body">
            <p className="mats-kicker">
              {String(index).padStart(2, "0")} / {industry.label} material
            </p>
            <h3 className="mats-title">{material.title}</h3>
            {material.body.map((p) => (
              <p key={p} className="mats-body">{p}</p>
            ))}
            <Link href={href(industry.route)} className="mats-cta" data-magnetic="">
              <span aria-hidden className="mats-cta-dot" />
              {industry.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
