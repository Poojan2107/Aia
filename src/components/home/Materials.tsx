"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";
import { MaterialViewer3D, type MocShadingType, type HotspotData } from "@/components/home/MaterialViewer3D";

/**
 * Materials & Metallurgy Section (Figma 01Homepage).
 * 100% Product Parity with official AIA Engineering & Vega Industries catalog:
 * https://aiaengineering.com/mining/ | /cement/ | /quarry/ | /thermal/
 *
 * Visual & Navigation Hierarchy strictly follows Figma 01Homepage:
 * 1. Industry Tabs (.mats-tabs -> .mats-tab): Mining | Cement | Quarry | Thermal
 * 2. Materials / Wear Parts Strip (.mats-strip -> .mats-chip)
 * 3. Product Stage (.mats-stage):
 *    - Left (.mats-visual): Interactive 3D CAD Hologram with Physical Material PBR Shading & Surface Hotspot
 *    - Right (.mats-panel): Signature Engineering Blue Panel with drawing references, technical specifications & CTA
 */

export type SpecItem = {
  label: string;
  value: string;
};

export type MaterialItem = {
  id: string;
  label: string;
  title: string;
  drawingRef?: string;
  primaryMoc: string;
  shadingType: MocShadingType;
  modelSrc?: string;
  poster?: string;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  hotspot?: HotspotData;
  body: string[];
  specs?: SpecItem[];
};

export type Industry = {
  id: string;
  label: string;
  route: string;
  cta: string;
  categoryNotice?: string;
  materials: MaterialItem[];
};

const industries: Industry[] = [
  /* ─────────────────────────────────────────────────────────────────────────
     1. MINING (https://aiaengineering.com/mining/)
     Verified 1:1 against official AIA Engineering SAG Mill, Ball Mill & Vertimill pages:
     - /sag-mill/ (Feed End Liners, Shell Liners, DE Assemblies, Fasteners)
     - /ball-mill/ (End Liners, Shell Liners, Hi-Cr Grinding Media, Fasteners)
     - /verti-mill/ (Flight Liners in Hi-Cr, Shoe Liners in Sintercast Ceramic)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "mining",
    label: "Mining",
    route: "mining-products",
    cta: "Explore Mining Mill Solutions",
    materials: [
      {
        id: "metal",
        label: "Metal (Hi-Cr)",
        title: "Metal (Cr-Mo / Hi-Cr) Shell Wave Lifter",
        drawingRef: "DWG: W9_5498_34",
        primaryMoc: "Metal (Cr-Mo / High-Chromium White Cast Iron)",
        shadingType: "metal",
        modelSrc: "/models/materials_normalized/mining_01_metal_wave_lifter.glb",
        poster: "/images/design/material-liner.webp",
        cameraOrbit: "35deg 75deg 125%",
        cameraTarget: "0m 0m 0m",
        fieldOfView: "32deg",
        hotspot: {
          title: "DEM-Engineered Wave Trajectory",
          body: "Discrete Element Method (DEM) profile calibrated to propel balls into the toe of the charge, maximizing impact without shell damage.",
          position: "0.0m 0.2m 0.08m",
          normal: "0m 0m 1m",
        },
        body: [
          "Built for demanding grinding conditions, our engineered metal alloys combine supreme wear resistance with the strength required for critical mill components.",
          "Discrete Element Method (DEM) optimized profiles maintain ball trajectory throughout liner life, protecting mill shells and maximizing throughput.",
        ],
        specs: [
          { label: "Applicable Equipment", value: "Tumbling Ball Mills (Overflow & Grate)" },
          { label: "Product Category", value: "Shell Liners (Wave Lifter)" },
          { label: "Material of Construction (M.O.C.)", value: "Steel / White Iron (Hi-Cr Cr-Mo)" },
          { label: "Hardness Range", value: "62 – 66 HRC" },
          { label: "Bolting System", value: "Through Bolting (Heavy-Duty M36 Oval Neck)" },
        ],
      },
      {
        id: "composite",
        label: "Composite",
        title: "Ball Mill End Liner (Composite Hi-Cr / Rubber)",
        drawingRef: "DWG: W9_5724_6",
        primaryMoc: "High-Chrome Inserts in Resilient Rubber Matrix",
        shadingType: "composite",
        modelSrc: "/models/materials_normalized/mining_03_composite_end_liner.glb",
        poster: "/images/design/material-liner.webp",
        cameraOrbit: "25deg 75deg 130%",
        cameraTarget: "0m 0m 0m",
        fieldOfView: "32deg",
        hotspot: {
          title: "Dual-Matrix High-Chrome Wear Inserts",
          body: "Hardened high-chromium alloy inserts absorb direct impact wear, while the resilient vulcanized rubber backing isolates the mill head from shock.",
          position: "0.0m 0.05m 0.15m",
          normal: "0 0 1",
        },
        body: [
          "Composite liners pair wear-resistant high-chrome alloy inserts with an energy-absorbing elastomer cushion, balancing extreme wear life with lighter, faster relines.",
          "Official AIA product engineered for ball mill feed and discharge end heads, eliminating cracking and reducing mill structural strain.",
        ],
        specs: [
          { label: "Applicable Equipment", value: "Tumbling Ball Mills & Primary Mills" },
          { label: "Product Category", value: "End Liners (Feed & Discharge)" },
          { label: "Material of Construction (M.O.C.)", value: "Composite (High-Chrome Inserts in Rubber Matrix)" },
          { label: "Insert Hardness", value: "63 – 67 HRC (Alloy Face) / 65 Shore A (Rubber)" },
          { label: "Bolting System", value: "Channel Type Bolting" },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     2. CEMENT (https://aiaengineering.com/cement/)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "cement",
    label: "Cement",
    route: "cement-products",
    cta: "Explore Cement Solutions",
    materials: [
      {
        id: "metal",
        label: "Metal (Hi-Cr)",
        title: "Metal (Hi-Cr) Diaphragms & Liners",
        drawingRef: "DWG: W5_5202_49",
        primaryMoc: "High-Chromium White Iron (12% – 27% Cr)",
        shadingType: "metal",
        poster: "/images/design/material-liner.webp",
        hotspot: {
          title: "Level Control Intermediate Diaphragm",
          body: "Precision-slotted screen plates classify material and ball charges between grinding compartments.",
          position: "0 755 400",
          normal: "0 0 1",
        },
        body: [
          "High-chrome liners and diaphragms for tube mills, designed for consistent grinding efficiency and long service life.",
          "Custom slotted profiles maintain optimum material flow and ball classification between grinding chambers.",
        ],
        specs: [
          { label: "Metallurgy / Alloy", value: "High-Chromium Alloy (12 – 27% Cr)" },
          { label: "Hardness Range", value: "58 – 64 HRC" },
          { label: "Application", value: "Level Control Intermediate Diaphragms Dia 4800" },
          { label: "Slot Apertures", value: "Anti-clogging slotted screen plates" },
        ],
      },
      {
        id: "sintercast",
        label: "Hi-Cr with Sintercast",
        title: "Hi-Cr with Sintercast VRM Roller",
        drawingRef: "DWG: VRM_LOESCHE_LM",
        primaryMoc: "High-Chrome Cast Iron + Ceramic Composite Matrix",
        shadingType: "sintercast",
        poster: "/images/design/material-liner.webp",
        hotspot: {
          title: "Ceramic Reinforced Grinding Track",
          body: "Ceramic composite inserts arrest high-stress three-body grinding abrasion, ensuring uniform tyre wear.",
          position: "0 314 647",
          normal: "0 0 1",
        },
        body: [
          "Ceramic-reinforced high-chrome parts for VRM rollers and tables where abrasion is most severe.",
          "Delivers extended grinding campaign intervals for vertical roller mills handling abrasive clinker and slag.",
        ],
        specs: [
          { label: "Alloy Grade", value: "High-Chrome Cast Iron + Ceramic Matrix" },
          { label: "Hardness Range", value: "64 – 68 HRC (Matrix) / > 1800 HV (Ceramics)" },
          { label: "Application", value: "Vertical Roller Mills (Raw & Clinker Grinding)" },
          { label: "Wear Pattern", value: "Consistent profile retention without washboarding" },
        ],
      },
      {
        id: "media",
        label: "Hi-Cr Grinding Media",
        title: "Hi-Cr Grinding Media (Cement)",
        drawingRef: "CAT REF: VEGA_CEMENT_MEDIA",
        primaryMoc: "High-Chromium White Cast Iron",
        shadingType: "media",
        poster: "/images/design/material-liner.webp",
        hotspot: {
          title: "Heat-Resistant Hyper-Eutectic Ball",
          body: "Engineered to withstand temperatures up to 130°C and chemical grinding aid attrition in finish cement mills.",
          position: "0 539 415",
          normal: "0 0 1",
        },
        body: [
          "Grinding media that lower specific energy consumption and keep cement mills running at target fineness.",
          "Resists chemical attrition and temperature degradation inside finish cement ball mills.",
        ],
        specs: [
          { label: "Chromium Content", value: "10% to 30% Cr" },
          { label: "Core Hardness", value: "60 – 66 HRC" },
          { label: "Energy Advantage", value: "Lowers specific power consumption (kWh/t)" },
          { label: "Diameter Range", value: "15mm – 100mm" },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     3. QUARRY (https://aiaengineering.com/quarry/)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "quarry",
    label: "Quarry",
    route: "quarry-products",
    cta: "Explore Quarry Solutions",
    categoryNotice: "Quarry operations feature specialized high-impact wear products and crusher components engineered for aggregate and sand production.",
    materials: [
      {
        id: "blow",
        label: "Blow Bars",
        title: "Impact Crusher Blow Bars (HSI)",
        drawingRef: "CAT REF: VEGA_HSI_BLOWBAR",
        primaryMoc: "High-Chrome Alloy with Ceramic Inserts",
        shadingType: "metal",
        poster: "/images/quarry-mill.png",
        hotspot: {
          title: "Ceramic-Reinforced Striking Face",
          body: "Ceramic inserts maintain a sharp striking edge under high-velocity aggregate impact.",
        },
        body: [
          "Impact crusher blow bars cast for a uniform wear profile and longer life in harsh aggregate duty.",
          "Ceramic-reinforced composite inserts maintain a sharp striking edge, improving aggregate cubicity and reducing downtime.",
        ],
        specs: [
          { label: "Metallurgy", value: "High-Chrome Alloy with Ceramic Inserts" },
          { label: "Hardness Range", value: "62 – 66 HRC" },
          { label: "Application", value: "Horizontal Shaft Impactors (Primary & Secondary)" },
          { label: "Reversibility", value: "Dual-edge reversible wear profile" },
        ],
      },
      {
        id: "hammers",
        label: "Hammers",
        title: "Heavy-Duty Crusher Hammers",
        drawingRef: "CAT REF: VEGA_HAMMER_MILL",
        primaryMoc: "Martensitic Alloy Steel / High-Chrome Head",
        shadingType: "metal",
        poster: "/images/quarry-mill-clean.png",
        hotspot: {
          title: "Dual-Hardness Shock Absorption",
          body: "Tough ductile shank absorbs rotor shock while high-hardness head resists stone attrition.",
        },
        body: [
          "Crusher hammers engineered to hold their profile under repeated impact.",
          "Balanced head-to-shank weight ratios minimize rotor bearing stress while maximizing rock shattering efficiency.",
        ],
        specs: [
          { label: "Metallurgy", value: "Martensitic Alloy Steel / High-Chrome Head" },
          { label: "Hardness Range", value: "60 – 65 HRC (Head) / 45 HRC (Shank)" },
          { label: "Application", value: "Secondary & Tertiary Aggregate Hammer Mills" },
          { label: "Balancing", value: "Dynamically balanced to eliminate rotor vibration" },
        ],
      },
      {
        id: "components",
        label: "Crusher Components",
        title: "VSI Impellers & Wear Components",
        drawingRef: "CAT REF: VEGA_VSI_WEAR",
        primaryMoc: "High-Alloy White Cast Iron & Tungsten Matrix",
        shadingType: "metal",
        poster: "/images/funnel/quarry.png",
        hotspot: {
          title: "Precision VSI Wear Protection",
          body: "High-velocity rock-on-rock impeller components designed to maximize sand yield and aggregate shape.",
        },
        body: [
          "Impellers, anvils, feed discs and frame liners matched to each crusher and feed.",
          "Manufactured with high-alloy tungsten-carbide and ceramic reinforcement for unmatched wear life in manufactured sand production.",
        ],
        specs: [
          { label: "Components", value: "Impeller Tips, Anvils, Feed Tubes & Plates" },
          { label: "Hardness Range", value: "64 – 68 HRC" },
          { label: "Application", value: "Vertical Shaft Impactors (VSI)" },
          { label: "Compatibility", value: "Universal drop-in fit for major crusher OEMs" },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     4. THERMAL (https://aiaengineering.com/thermal/)
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "thermal",
    label: "Thermal",
    route: "thermal-power-products",
    cta: "Explore Thermal Solutions",
    materials: [
      {
        id: "tube",
        label: "Tube Mill Parts",
        title: "BBD Coal Tube Mill Shell Liners",
        drawingRef: "DWG: BBD_4772",
        primaryMoc: "High-Chromium White Iron",
        shadingType: "metal",
        poster: "/images/design/material-liner.webp",
        hotspot: {
          title: "Conical Shell Wave Profile",
          body: "Engineered wave profile drives continuous coal circulation, reducing pulveriser power demand.",
          position: "696 -1644 193",
          normal: "0 0 1",
        },
        body: [
          "Wear-resistant liners for coal tube mills, designed to maximise uptime between replacements.",
          "Proprietary metallurgy withstands abrasive quartz and pyritic impurities in thermal coal.",
        ],
        specs: [
          { label: "Alloy Grade", value: "High-Chromium White Iron" },
          { label: "Hardness Range", value: "60 – 65 HRC" },
          { label: "Application", value: "BBD 4772 / 4760 Coal Pulverising Tube Mills" },
          { label: "Geometry", value: "Conical wave lifter with integral locking bosses" },
        ],
      },
      {
        id: "vrm",
        label: "VRM Parts",
        title: "Vertical Roller Mill Parts (V-Cast)",
        drawingRef: "DWG: RAYMOND_XRP",
        primaryMoc: "V-Cast High-Hardness Tempered Alloy Steel",
        shadingType: "vcast",
        poster: "/images/design/material-liner.webp",
        hotspot: {
          title: "V-Cast Hardened Grinding Track",
          body: "High fracture toughness prevents cracking under coal tramp iron ingress while sustaining profile shape.",
          position: "0 314 647",
          normal: "0 0 1",
        },
        body: [
          "Rollers, tables and segments for vertical roller mills grinding coal for power generation.",
          "V-Cast metallurgy resists tramp metal impact while delivering steady fineness for boiler combustion efficiency.",
        ],
        specs: [
          { label: "Alloy Grade", value: "V-Cast High-Hardness Tempered Alloy Steel" },
          { label: "Hardness Range", value: "62 – 66 HRC" },
          { label: "Application", value: "Raymond & XRP Bowl Coal Pulverisers" },
          { label: "Fastening System", value: "High-strength bolt-on segmented tyres" },
        ],
      },
      {
        id: "media",
        label: "Hi-Cr Grinding Media",
        title: "Centrifugally Cast Hollow Grinding Media",
        drawingRef: "DWG: BABCOCK_E_MILL",
        primaryMoc: "Centrifugally Cast High-Chrome Alloy",
        shadingType: "media",
        modelSrc: "/models/materials/Babcock_EMill_Hollow_Grinding_Ball_HiChrome.glb",
        poster: "/images/design/material-liner.webp",
        hotspot: {
          title: "Centrifugal Hollow Core",
          body: "Hollow geometry maintains optimal ball-to-track grinding contact pressure without overloading pulveriser drive motors.",
          position: "0 539 415",
          normal: "0 0 1",
        },
        body: [
          "Grinding media built for steady mill productivity and fewer replacement cycles.",
          "Engineered specifically for coal pulverisers in thermal power plants to maintain consistent coal fineness and low unburnt carbon.",
        ],
        specs: [
          { label: "Type", value: "Centrifugally Cast Hollow Grinding Ball" },
          { label: "Hardness Range", value: "60 – 65 HRC" },
          { label: "Application", value: "Babcock 8.5E & 10E Coal Pulverisers" },
          { label: "Balance", value: "Precision wall thickness for uniform mass distribution" },
        ],
      },
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
    // Blocked: only verified Mining solutions are active and selectable
    if (id !== "mining") return;
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

      {/* ── Tier 1: Industry Tabs (Figma 01Homepage: .mats-tabs) ── */}
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
                  return; // Blocked: nothing else is clickable or changes even on multiple clicks
                }
                pickIndustry(ind.id);
              }}
            >
              {ind.label}
            </button>
          );
        })}
      </div>

      {/* ── Tier 2: Materials / Wear Parts Strip (Figma 01Homepage: .mats-strip) ── */}
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

      {/* Category Notice (e.g. Quarry Wear Products clarification) */}
      {industry.categoryNotice && (
        <aside className="mats-notice" role="note" aria-label="Category clarification notice">
          <span className="mats-notice-badge">Notice</span>
          <p className="mats-notice-text">{industry.categoryNotice}</p>
        </aside>
      )}

      {/* ── Main Product Stage: 3D CAD Hologram Left + Signature Blue Panel Right ── */}
      <div className="mats-stage">
        {/* Left Side: 3D Interactive Viewport with Material PBR Shading */}
        <div className="mats-visual">
          <span aria-hidden className="mats-shape mats-shape-a" />
          <span aria-hidden className="mats-shape mats-shape-b" />

          <MaterialViewer3D
            key={`${industry.id}-${material.id}`}
            src={material.modelSrc}
            poster={material.poster}
            alt={`${material.title} precision CAD model`}
            mocType={material.shadingType}
            hotspot={material.hotspot}
            cameraOrbit={material.cameraOrbit}
            cameraTarget={material.cameraTarget}
            fieldOfView={material.fieldOfView}
          />

          <div className="mats-360" aria-label="360 view indicator">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
              <circle cx="13" cy="13" r="11.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" />
              <circle cx="13" cy="13" r="3" fill="currentColor" />
            </svg>
            {material.modelSrc ? "Drag to Rotate 360°" : "Engineering Component View"}
          </div>
        </div>

        {/* Right Side: Detailed Metallurgy & Engineering Blue Panel */}
        <div className="mats-panel">
          <div key={`${industry.id}-${material.id}`} className="mats-panel-body">
            <div className="mats-panel-header">
              <p className="mats-kicker">
                {String(index).padStart(2, "0")} / {industry.label} material
              </p>
              {material.drawingRef && (
                <span className="mats-dwg-badge">{material.drawingRef}</span>
              )}
            </div>

            <h3 className="mats-title">{material.title}</h3>

            <div className="mats-body-container">
              {material.body.map((p) => (
                <p key={p} className="mats-body">{p}</p>
              ))}
            </div>

            {material.specs && material.specs.length > 0 && (
              <div className="mats-specs" aria-label="Component engineering specifications">
                {material.specs.map((sp) => (
                  <div key={sp.label} className="mats-spec-item">
                    <span className="mats-spec-label">{sp.label}</span>
                    <span className="mats-spec-val">{sp.value}</span>
                  </div>
                ))}
              </div>
            )}

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
