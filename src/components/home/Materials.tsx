"use client";

import Link from "next/link";
import { homeOnly } from "@/lib/env";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";
import { MaterialViewer3D, type MocShadingType, type HotspotData } from "@/components/home/MaterialViewer3D";

export type MaterialItem = {
  id: string;
  label: string;
  title: string;
  primaryMoc: string;
  shadingType: MocShadingType;
  modelSrc?: string;
  poster?: string;
  orientation?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  hotspot?: HotspotData;
  bullets: string[];
};

export type Industry = {
  id: string;
  label: string;
  route: string;
  cta: string;
  materials: MaterialItem[];
};

const industries: Industry[] = [
  /* ─────────────────────────────────────────────────────────────────────────
     1. MINING (https://aiaengineering.com/mining/)
     100% Authentic CAD models directly converted from AIA's original engineering library.
     Grinding media backed by high-resolution authentic photography (no fake CAD ball).
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "mining",
    label: "Mining",
    route: "mining-products",
    cta: "Explore Mining Products",
    materials: [
      {
        id: "metal",
        label: "METAL",
        title: "Metal (Cr-Mo / Hi-Cr)",
        primaryMoc: "Metal (Cr-Mo / High-Chromium White Cast Iron)",
        shadingType: "metal",
        modelSrc: "/models/materials_exact_cad/BallMill_NGDS_ShellLiner_WaveLifter_Steel_[W9_5680_12].glb",
        poster: "/images/design/material-liner.webp",
        orientation: "0deg 90deg 0deg",
        cameraOrbit: "0deg 55deg 115%",
        cameraTarget: "auto auto auto",
        fieldOfView: "30deg",
        hotspot: {
          material: "Metal (Cr-Mo / Hi-Cr)",
          featuredApp: "Ball Mill Shell Wave Lifter",
          position: "0m 0.05m 0.06m",
          normal: "0m 1m 0m",
        },
        bullets: [
          "Engineered for demanding grinding environments, our wear-resistant metal alloys are developed to provide the strength, toughness and abrasion resistance required by critical mill components.",
          "Combining metallurgical expertise with application-specific design, these material solutions help support component reliability, improved wear life and consistent mill performance.",
        ],
      },
      {
        id: "rubber",
        label: "RUBBER",
        title: "Rubber (Molded Elastomer)",
        primaryMoc: "Molded Vulcanized Elastomer",
        shadingType: "rubber",
        modelSrc: "/models/materials_exact_cad/BallMill_Overflow_ShellLiner_LifterBar_Rubber_[W9_5780_4].glb",
        poster: "/images/design/material-liner.webp",
        orientation: "0deg 90deg 0deg",
        cameraOrbit: "0deg 55deg 115%",
        cameraTarget: "auto auto auto",
        fieldOfView: "30deg",
        hotspot: {
          material: "Molded Vulcanized Elastomer",
          featuredApp: "Ball Mill Overflow Shell Rubber Lifter Bar",
          position: "0m 0.05m 0.06m",
          normal: "0m 1m 0m",
        },
        bullets: [
          "Formulated for extreme impact absorption and slurry abrasion, our vulcanized rubber compounds dramatically reduce structural mill shell stress.",
          "Lightweight elastomer profiles ensure faster, safer relines while lowering overall rotational drive energy demand.",
        ],
      },
      {
        id: "composite",
        label: "COMPOSITE",
        title: "Composite (Hi-Cr / Rubber)",
        primaryMoc: "High-Chrome Inserts in Resilient Rubber Matrix",
        shadingType: "composite",
        modelSrc: "/models/materials_exact_cad/BallMill_Overflow_EndLiner_Composite_HiCr_Rubber_[W9_5724_6].glb",
        poster: "/images/design/material-liner.webp",
        orientation: "0deg 0deg 0deg",
        cameraOrbit: "0deg 150deg 115%",
        cameraTarget: "auto auto auto",
        fieldOfView: "30deg",
        hotspot: {
          material: "Hi-Cr Inserts in Rubber Cushion",
          featuredApp: "Ball Mill Overflow End Liner",
          position: "0m 0.04m 0.06m",
          normal: "0m 1m 0m",
        },
        bullets: [
          "Integrates high-hardness high-chrome alloy wear inserts within an energy-absorbing vulcanized elastomer backing.",
          "Delivers the wear life of premium cast alloy with the dampening properties and reduced weight of engineered rubber.",
        ],
      },
      {
        id: "integrated",
        label: "INTEGRATED COMPOSITE",
        title: "Integrated Composite",
        primaryMoc: "Integrated High-Chrome & Elastomer",
        shadingType: "integrated",
        modelSrc: "/models/materials_exact_cad/BallMill_NGDS_ShellLiner_Integrated_Composite_[P01080_6_B].glb",
        poster: "/images/design/material-liner.webp",
        orientation: "0deg 90deg 0deg",
        cameraOrbit: "0deg 55deg 115%",
        cameraTarget: "auto auto auto",
        fieldOfView: "30deg",
        hotspot: {
          material: "Integrated High-Chrome Lifter & Elastomer Bedding",
          featuredApp: "Non-Grate Discharge (NGDS) Shell Liner",
          position: "0m 0.06m 0.08m",
          normal: "0m 1m 0m",
        },
        bullets: [
          "Monolithic dual-profile casting combining wave lifter and shell plate geometry into a single rigid wear unit.",
          "Eliminates joint migration and slurry washboard erosion, providing consistent grinding lift across the entire campaign.",
        ],
      },
      {
        id: "steel",
        label: "STEEL/WHITE IRON",
        title: "Steel / White Iron",
        primaryMoc: "Martensitic Cr-Mo Steel / White Iron",
        shadingType: "steel",
        modelSrc: "/models/materials_exact_cad/BallMill_Overflow_ShellLiner_WaveLifter_Steel_WhiteIron_[W9_5498_34].glb",
        poster: "/images/design/material-liner.webp",
        orientation: "0deg 90deg 0deg",
        cameraOrbit: "0deg 55deg 115%",
        cameraTarget: "auto auto auto",
        fieldOfView: "30deg",
        hotspot: {
          material: "Martensitic Cr-Mo Steel / White Iron",
          featuredApp: "Ball Mill Overflow Shell Wave Lifter",
          position: "0m 0.05m 0.06m",
          normal: "0m 1m 0m",
        },
        bullets: [
          "Engineered for high-impact ball mills requiring exceptional fracture toughness alongside severe abrasive wear resistance.",
          "Heavy-duty counterbored through-bolting secures the liners solidly against severe charge impact and cyclic fatigue.",
        ],
      },
      {
        id: "sintercast",
        label: "HI-CR WITH SINTERCAST®",
        title: "Hi-Cr with Sintercast®",
        primaryMoc: "High-Chrome Matrix with Sintered Ceramic",
        shadingType: "sintercast",
        modelSrc: "/models/materials_exact_cad/SAGMill_ShellLiner_Composite_[W9_5769_24_D].glb",
        poster: "/images/design/material-liner.webp",
        orientation: "0deg 90deg 0deg",
        cameraOrbit: "15deg 55deg 120%",
        cameraTarget: "auto auto auto",
        fieldOfView: "30deg",
        hotspot: {
          material: "High-Chrome Matrix with Sintered Ceramic Inserts",
          featuredApp: "SAG Mill Heavy Shell Liner",
          position: "0m 0.08m 0.06m",
          normal: "0m 1m 0m",
        },
        bullets: [
          "Ultra-hard sintered ceramic composite inserts metallurgically embedded into a tough high-chromium alloy matrix.",
          "Provides up to 2.5x longer operating life in severe SAG mill zones where sliding gouging abrasion is most destructive.",
        ],
      },
      {
        id: "media",
        label: "HI-CR GRINDING MEDIA",
        title: "Hi-Cr Grinding Media",
        primaryMoc: "High-Chromium White Cast Iron",
        shadingType: "media",
        poster: "/images/products/grinding-1.webp",
        hotspot: {
          material: "High-Chromium White Cast Iron (10% - 30% Cr)",
          featuredApp: "Primary & Secondary Grinding Mills",
        },
        bullets: [
          "Hypereutectic high-chromium alloy grinding media delivering consistent hardness from surface to core.",
          "Minimizes media consumption, maintains spherical shape throughout service, and lowers power consumption per ton ground.",
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     2. CEMENT (Hard-blocked: Mining is hero focus)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "cement",
    label: "Cement",
    route: "cement-products",
    cta: "Explore Cement Solutions",
    materials: [],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     3. QUARRY (Hard-blocked: Mining is hero focus)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "quarry",
    label: "Quarry",
    route: "quarry-products",
    cta: "Explore Quarry Solutions",
    materials: [],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     4. THERMAL (Hard-blocked: Mining is hero focus)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "thermal",
    label: "Thermal",
    route: "thermal-power-products",
    cta: "Explore Thermal Solutions",
    materials: [],
  },
];

export function Materials() {
  const [industryId, setIndustryId] = useState("mining");
  const industry = industries.find((i) => i.id === industryId) ?? industries[0];

  const [materialId, setMaterialId] = useState(industry.materials[0].id);
  const material = industry.materials.find((m) => m.id === materialId) ?? industry.materials[0];
  const index = industry.materials.indexOf(material) + 1;

  const pickIndustry = (id: string) => {
    // Only Mining is interactive; other tabs remain inert safeguards
    if (id !== "mining") return;
    const next = industries.find((i) => i.id === id) ?? industries[0];
    setIndustryId(next.id);
    setMaterialId(next.materials[0].id);
  };

  return (
    <section className="mats" aria-labelledby="mats-heading">
      <Reveal className="mats-intro">
        <SectionLabel>Materials &amp; Metallurgy</SectionLabel>
        <h2 id="mats-heading" className="mats-heading">Materials that make the difference.</h2>
        <p className="mats-lead">
          Every material has a purpose. Every application brings a different wear challenge. Through advanced metallurgy, wear-resistant alloys and application-specific engineering, we develop material solutions designed to withstand demanding operating conditions and deliver reliable performance.
        </p>
      </Reveal>

      {/* ── Tier 1: Industry Tabs ── */}
      <div className="mats-tabs" role="tablist" aria-label="Industry Sector Selector">
        {industries.map((ind) => {
          const isMining = ind.id === "mining";
          return (
            <button
              key={ind.id}
              type="button"
              role="tab"
              aria-selected={ind.id === industry.id}
              aria-disabled={!isMining}
              tabIndex={isMining ? 0 : -1}
              className={`mats-tab ${!isMining ? "mats-tab--blocked" : ""}`}
              onClick={(e) => {
                if (!isMining) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                pickIndustry(ind.id);
              }}
            >
              {ind.label}
            </button>
          );
        })}
      </div>

      {/* ── Tier 2: 7 Material Pill Chips matching Reference Screenshot ── */}
      <div className="mats-strip" role="tablist" aria-label={`${industry.label} materials`}>
        {industry.materials.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === material.id}
            className="mats-chip"
            onClick={() => setMaterialId(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Main Product Stage: 3D CAD Stage Left + Minimal Blue Panel Right ── */}
      <div className="mats-stage">
        {/* Left Side: 3D Viewport with Hotspot Pin & 360 view Pill */}
        <div className="mats-visual">
          <MaterialViewer3D
            key={`${industry.id}-${material.id}`}
            src={material.modelSrc}
            poster={material.poster}
            alt={`${material.title} precision CAD model`}
            mocType={material.shadingType}
            hotspot={material.hotspot}
            orientation={material.orientation}
            cameraOrbit={material.cameraOrbit}
            cameraTarget={material.cameraTarget}
            fieldOfView={material.fieldOfView}
          />
        </div>

        {/* Right Side: Minimal Engineering Blue Panel (Strictly 2 Bullets + CTA) */}
        <div className="mats-panel">
          <div key={`${industry.id}-${material.id}`} className="mats-panel-body">
            <p className="mats-kicker">
              {String(index).padStart(2, "0")} / {industry.label} material
            </p>

            <h3 className="mats-title">{material.title}</h3>

            <ul className="mats-bullets" aria-label="Key Material Benefits">
              {material.bullets.map((bullet, idx) => (
                <li key={idx} className="mats-bullet-item">
                  <span className="mats-bullet-dot">•</span>
                  <span className="mats-bullet-text">{bullet}</span>
                </li>
              ))}
            </ul>

            <Link prefetch={homeOnly ? false : undefined} href={href(industry.route)} className="mats-cta-pill" data-magnetic="">
              <span aria-hidden className="mats-cta-dot" />
              {industry.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
