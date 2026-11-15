"use client";

import Link from "next/link";
import { homeOnly } from "@/lib/env";
import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";
import { MaterialViewer3D } from "@/components/home/MaterialViewer3D";
import { mocCatalog } from "@/data/moc-catalog";

export function Materials() {
  const [industryId, setIndustryId] = useState<string>("mining");
  const industry = mocCatalog.find((i) => i.id === industryId) ?? mocCatalog[0];
  // Every MOC in AIA's MOC list is shown; entries without a converted model show a placeholder.
  const entries = industry.entries;

  const [entryId, setEntryId] = useState(entries[0]?.id);
  const entry = entries.find((e) => e.id === entryId) ?? entries[0];
  const index = entries.indexOf(entry) + 1;

  const pickIndustry = (id: string) => {
    const next = mocCatalog.find((i) => i.id === id);
    if (!next) return;
    setIndustryId(next.id);
    setEntryId(next.entries[0].id);
  };

  return (
    <section className="mats" aria-labelledby="mats-heading">
      <Reveal className="mats-intro">
        <SectionLabel>Materials &amp; Metallurgy</SectionLabel>
        <h2 id="mats-heading" className="mats-heading">Material of construction that makes the difference.</h2>
        <p className="mats-lead">
          Every material has a purpose. Every application brings a different wear challenge. Through advanced metallurgy, wear-resistant alloys and application-specific engineering, we develop material solutions designed to withstand demanding operating conditions and deliver reliable performance.
        </p>
      </Reveal>

      {/* ── Tier 1: Industry tabs (an industry shows once it has a converted AIA model) ── */}
      <div className="mats-tabs" role="tablist" aria-label="Industry">
        {mocCatalog.map((ind) => {
          const available = ind.entries.length > 0;
          return (
            <button
              key={ind.id}
              type="button"
              role="tab"
              aria-selected={ind.id === industry.id}
              aria-disabled={!available}
              tabIndex={available ? 0 : -1}
              className={`mats-tab ${!available ? "mats-tab--blocked" : ""}`}
              onClick={() => pickIndustry(ind.id)}
            >
              {ind.label}
            </button>
          );
        })}
      </div>

      {/* ── Tier 2: MOC chips (AIA's MOC list) ── */}
      <div className="mats-strip" role="tablist" aria-label={`${industry.label} materials`}>
        {entries.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === entry.id}
            className="mats-chip"
            onClick={() => setEntryId(m.id)}
          >
            {m.moc.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Stage: AIA CAD model left, material panel right ── */}
      <div className="mats-stage">
        <div className="mats-visual">
          <MaterialViewer3D
            key={entry.id}
            src={entry.model}
            image={entry.image}
            alt={entry.model ? `${entry.product} in ${entry.moc}, 3D model from AIA's CAD` : `${entry.product}, AIA Engineering`}
            info={{ material: entry.moc, featuredApp: entry.product, specs: entry.specs }}
            orbit={entry.orbit}
          />
        </div>

        <div className="mats-panel">
          <div key={entry.id} className="mats-panel-body">
            <p className="mats-kicker">
              {String(index).padStart(2, "0")} / {industry.label} material
            </p>

            <h3 className="mats-title">{entry.moc}</h3>

            <ul className="mats-bullets" aria-label="Material details">
              {entry.body.map((line, idx) => (
                <li key={idx} className="mats-bullet-item">
                  <span className="mats-bullet-dot">•</span>
                  <span className="mats-bullet-text">{line}</span>
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
