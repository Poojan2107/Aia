"use client";

import { useState } from "react";
import Link from "next/link";
import { QuarryContactForm } from "@/components/solutions/quarry/QuarryContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Draft FAQ: every answer restates AIA's own quarry product copy (aiaengineering.com/quarry,
 * src/content/industries/quarry.ts). Nothing here adds facts; AIA to confirm before launch.
 */
const FAQS = [
  {
    q: "Which crushers do AIA's quarry wear parts fit?",
    a: "Blow bars are made for impact crushers and hammers for hammer crushers. Impellers, anvils and feed disks are wear parts for vertical shaft impactors (VSI), and frame liners protect the crusher housing.",
  },
  {
    q: "Are the wear parts available with ceramic?",
    a: "Yes. Blow bars, hammers, impellers, anvils and feed disks are offered both with and without ceramic.",
  },
  {
    q: "Why are blow bars, hammers and impellers supplied weight-balanced?",
    a: "Each set is weight-balanced in-house to manage rotor vibration, for high crushing efficiency and a uniform wear profile.",
  },
  {
    q: "How do AIA hammers resist breakage?",
    a: "AIA hammers are constructed with a superior alloy and use differential hardening to curb breakage at the shank.",
  },
  {
    q: "What do the frame liners do?",
    a: "Frame liners protect the crusher housing. They are designed for easy installation and maintenance-free operation, with superior wear alloys for longer product life.",
  },
];

export function QuarryClosing() {
  const [open, setOpen] = useState(0);
  return (
    <>
      {/* Contact: the real enquiry form, preset to Quarry. */}
      <section id="quarry-contact" className="qc-contact" aria-labelledby="qc-contact-title">
        <span className="qc-shard qc-shard-a" aria-hidden />
        <span className="qc-shard qc-shard-b" aria-hidden />
        <div className="qc-contact-copy">
          <SectionLabel>Talk to our quarry team</SectionLabel>
          <h2 id="qc-contact-title" className="qc-title">
            The right crusher wear parts are always within reach.
          </h2>
          <p className="qc-lede">
            Tell us about your crusher and operating conditions. Our team will help you identify the right blow bars,
            hammers, VSI parts and liners for your quarry.
          </p>
        </div>
        <div className="qc-contact-form">
          <QuarryContactForm />
        </div>
      </section>

      {/* CTA band: blue | white, as on the solutions pages. */}
      <section className="qc-cta" aria-label="Explore AIA">
        <a href="#quarry-contact" className="qc-cta-panel is-blue">
          <span className="qc-cta-title">Find the right wear parts for your crushers.</span>
          <span className="qc-cta-foot">
            <span className="qc-cta-label">Talk to an expert</span>
            <Arrow />
          </span>
        </a>
        <a href="#crusher-wear" className="qc-cta-panel">
          <span className="qc-cta-title">Explore the parts that keep crushing lines running.</span>
          <span className="qc-cta-foot">
            <span className="qc-cta-label">View crusher wear parts</span>
            <Arrow />
          </span>
        </a>
      </section>

      {/* White breathing space under the CTA band, as in the Figma, then the FAQ. */}
      <div className="qc-gap" aria-hidden />
      {/* FAQ */}
      <section className="qc-faq" aria-labelledby="qc-faq-title">
        <div className="qc-faq-head">
          <SectionLabel>Frequently asked questions</SectionLabel>
          <h2 id="qc-faq-title" className="qc-title">
            Everything you need to know about our quarry products.
          </h2>
          <div className="qc-faq-ctas">
            <a href="#quarry-contact" className="qc-faq-cta">
              <span aria-hidden className="qc-faq-cta-dot" />
              Ask an expert
            </a>
            <Link href="/knowledge-hub/faqs" className="qc-faq-cta is-outline">
              <span aria-hidden className="qc-faq-cta-dot" />
              View all FAQs
            </Link>
          </div>
        </div>
        <ul className="qc-faq-list">
          {FAQS.map((f, i) => (
            <li key={f.q} className={`qc-faq-item ${open === i ? "is-open" : ""}`}>
              <button type="button" className="qc-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
              <div className="qc-faq-a" hidden={open !== i}>
                <p>{f.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
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
