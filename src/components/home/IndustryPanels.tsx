"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { href } from "@/lib/routes";

/**
 * "Solutions by industry" — Figma "AIA Signature Blue" / 01Homepage.
 * An intro band, then one split panel per industry: an exploded mill render
 * over a large outline word on one side, and the industry copy, an
 * application picker, a CTA and a site photo on the other. Sides alternate.
 */

type Spot = { id: string; x: number; y: number; title: string; body: string };

type Application = { id: string; label: string; word: string };

type Panel = {
  id: string;
  index: string;
  title: string;
  lead: string;
  cta: string;
  href: string;
  photo: string;
  photoAlt: string;
  render: { src: string; width: number; height: number; alt: string };
  applications: Application[];
  spots: Spot[];
};

const sagSpots: Spot[] = [
  { id: "lining", x: 21, y: 46, title: "Advanced lining systems", body: "These advanced systems dynamically regulate the mill's internal environment to maximize throughput, save energy, and prevent mechanical damage." },
  { id: "shell", x: 41, y: 14, title: "Shell liners", body: "Lifter and plate profiles designed around the charge motion of each mill." },
  { id: "discharge", x: 79, y: 48, title: "Discharge end", body: "Pulp lifters and grates that keep slurry moving and protect throughput." },
  { id: "feed", x: 63, y: 4, title: "Feed end", body: "Feed head liners matched to ore size and impact energy." },
];

const tubeSpots: Spot[] = [
  { id: "fasteners", x: 52, y: 60, title: "High quality fasteners", body: "They are made from high-grade alloys like grade 8.8 or 10.9, that can handle stress or prevent mechanical damage." },
  { id: "diaphragm", x: 46, y: 26, title: "Diaphragms", body: "Intermediate and discharge diaphragms that control material flow between chambers." },
  { id: "lining", x: 26, y: 40, title: "Lining system", body: "Classifying and lifting liners for consistent grinding efficiency." },
  { id: "media", x: 87, y: 64, title: "Grinding media", body: "Hi-Cr grinding media engineered for low wear rates." },
];

const sag = { src: "/images/design/mill-sag-exploded.webp", width: 1774, height: 887, alt: "Exploded view of a SAG mill showing its blue liner system" };
const tube = { src: "/images/design/mill-tube-exploded.webp", width: 444, height: 222, alt: "Exploded view of a cement tube mill showing liners, diaphragms and grinding media" };

const panels: Panel[] = [
  {
    id: "mining",
    index: "01",
    title: "Mining Industry",
    lead: "Wear solutions engineered for critical-grinding applications.",
    cta: "View all mining solutions",
    href: href("mining"),
    photo: "/images/design/industry-mining.jpg",
    photoAlt: "Open-pit mine seen from above",
    render: sag,
    applications: [
      { id: "sag", label: "SAG Mill", word: "SAG" },
      { id: "ball", label: "Ball Mill", word: "BALL" },
      { id: "vertical", label: "Vertical Mill", word: "VERTI" },
    ],
    spots: sagSpots,
  },
  {
    id: "cement",
    index: "02",
    title: "Cement Industry",
    lead: "Wear protection for crushing applications.",
    cta: "View all cement solutions",
    href: href("cement"),
    photo: "/images/design/industry-cement.jpg",
    photoAlt: "Cement plant with preheater tower",
    render: tube,
    applications: [
      { id: "tube", label: "Tube Mill", word: "TUBE" },
      { id: "vrm", label: "Vertical Roller Mill (VRM)", word: "VRM" },
    ],
    spots: tubeSpots,
  },
  {
    id: "quarry",
    index: "03",
    title: "Quarry Industry",
    lead: "Wear protection for crushing applications.",
    cta: "View all quarry solutions",
    href: href("quarry-products"),
    photo: "/images/design/industry-quarry.jpg",
    photoAlt: "Aggregate conveyor and stockpile at a quarry",
    render: sag,
    applications: [
      { id: "blow", label: "Blow Bars", word: "BLOW" },
      { id: "hammers", label: "Hammers", word: "HAMMER" },
      { id: "crusher", label: "Crusher Components", word: "CRUSH" },
    ],
    spots: sagSpots,
  },
  {
    id: "thermal",
    index: "04",
    title: "Thermal Industry",
    lead: "Wear solutions for demanding coal grinding applications.",
    cta: "View all thermal solutions",
    href: href("thermal-power"),
    photo: "/images/design/industry-thermal.jpg",
    photoAlt: "Thermal power station cooling towers at dusk",
    render: sag,
    applications: [
      { id: "tube", label: "Tube Mill", word: "TUBE" },
      { id: "vrm", label: "Vertical Roller Mill (VRM)", word: "VRM" },
    ],
    spots: sagSpots,
  },
];

function ArrowBadge() {
  return (
    <span aria-hidden className="ind-app-badge">
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M2.5 7.5l5-5M3.5 2.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function IndustryPanel({ panel, flip }: { panel: Panel; flip: boolean }) {
  const [appId, setAppId] = useState(panel.applications[0].id);
  const [spotId, setSpotId] = useState(panel.spots[0].id);
  const app = panel.applications.find((a) => a.id === appId) ?? panel.applications[0];
  const headingId = `ind-${panel.id}-title`;

  return (
    <article className={`ind-panel ${flip ? "is-flipped" : ""}`} aria-labelledby={headingId}>
      <div className="ind-visual">
        <span aria-hidden className="ind-word">{app.word}</span>
        <div className="ind-render">
          <Image src={panel.render.src} alt={panel.render.alt} width={panel.render.width} height={panel.render.height} sizes="(max-width: 1024px) 92vw, 52vw" className="ind-render-img" />
          {panel.spots.map((spot) => {
            const active = spot.id === spotId;
            return (
              <div key={spot.id} className={`ind-spot ${active ? "is-active" : ""}`} style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
                <button type="button" className="ind-spot-dot" aria-expanded={active} aria-label={spot.title} onClick={() => setSpotId(spot.id)}>
                  <span aria-hidden>+</span>
                </button>
                {active ? (
                  <div className="ind-spot-card" role="note">
                    <p className="ind-spot-title">{spot.title}</p>
                    <p className="ind-spot-body">{spot.body}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="ind-visual-actions">
          <Link href={panel.href} className="ind-360">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            360 view
          </Link>
          <Link href="#gallery" className="ind-play">
            <svg width="10" height="11" viewBox="0 0 10 11" aria-hidden>
              <path d="M1 1l8 4.5L1 10z" fill="currentColor" />
            </svg>
            Play
          </Link>
        </div>
      </div>

      <div className="ind-info">
        <p className="ind-index">{panel.index}</p>
        <h3 id={headingId} className="ind-title">{panel.title}</h3>
        <p className="ind-lead">{panel.lead}</p>
        <p className="ind-pick-label">Select an application:</p>
        <ul className="ind-apps">
          {panel.applications.map((a) => {
            const active = a.id === app.id;
            return (
              <li key={a.id}>
                <button type="button" className={`ind-app ${active ? "is-active" : ""}`} aria-pressed={active} onClick={() => setAppId(a.id)}>
                  <span>{a.label}</span>
                  {active ? <ArrowBadge /> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <CtaButton href={panel.href} variant="solid" className="ind-cta">
          {panel.cta}
        </CtaButton>
        <div className="ind-photo">
          <Image src={panel.photo} alt={panel.photoAlt} fill sizes="(max-width: 1024px) 92vw, 480px" className="object-cover" />
        </div>
      </div>
    </article>
  );
}

export function IndustryPanels() {
  return (
    <section id="solutions" aria-labelledby="industries-heading">
      <div className="ind-intro">
        <div className="ind-intro-inner">
          <SectionLabel className="ind-intro-label">Solutions by industry</SectionLabel>
          <h2 id="industries-heading" className="ind-intro-heading">
            Explore solutions for Mining, Cement, Quarry and Thermal Power applications.
          </h2>
        </div>
      </div>
      <div className="ind-panels">
        {panels.map((panel, i) => (
          <IndustryPanel key={panel.id} panel={panel} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
