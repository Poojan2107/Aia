"use client";

import Link from "next/link";
import { Faq } from "@/components/home/ClosingSections";
import { homeOnly } from "@/lib/env";
import { href } from "@/lib/routes";

/**
 * Quarry page closing: the FAQ (the homepage FAQ with the Figma's quarry questions), then the
 * other industries (the mining page's CTA panels, one per industry), then the site footer. Case
 * studies were removed from this page at the client's request.
 * Answers restate AIA's own quarry product copy (src/content/industries/quarry.ts); the blow-bar
 * sizing answer is the Figma's. AIA to confirm before launch.
 */
const FAQS = [
  {
    question: "Why is weight balancing important for impact crusher blow bars?",
    answer:
      "Each blow bar set is supplied with in-house weight-balanced conditions to take care of rotor vibration, supporting high crushing efficiency and a uniform wear profile.",
  },
  {
    question: "How do blow bars help maintain consistent aggregate size?",
    answer:
      "AIA blow bars are engineered with uniform wear profiles to support consistent end-product sizing throughout their service life.",
  },
  {
    question: "What materials are used in AIA's impact crusher wear parts?",
    answer:
      "Blow bars use an impact-resistant, non-conventional alloy; hammers, impellers, anvils, feed disks and frame liners use superior wear alloys. Most parts are offered with and without ceramic.",
  },
  {
    question: "How do I select the right crusher hammer material?",
    answer:
      "AIA hammers use a superior alloy with differential hardening to curb breakage at the shank, with or without ceramic. Share your crusher and operating conditions and our team will recommend the right variant.",
  },
  {
    question: "What VSI crusher wear parts does AIA offer?",
    answer: "For vertical shaft impactors, AIA offers impellers, anvils and feed disks, each available with and without ceramic.",
  },
];

export function QuarryClosing() {
  return (
    <>
      <Faq heading="Everything you need to know about our crusher wear parts." items={FAQS} />
      <OtherIndustries />
    </>
  );
}

/** The other three industries, with the homepage's own lines for each (IndustryPanels). */
const OTHERS = [
  { route: "mining", title: "Advanced comminution technologies for critical grinding media.", label: "Explore mining" },
  { route: "cement", title: "Innovative solutions for cement grinding excellence.", label: "Explore cement" },
  { route: "thermal-power", title: "Wear resistant solutions for demanding coal grinding applications.", label: "Explore thermal" },
];

/**
 * Other industries, in the CTA panels used on the mining page (.qc-cta-panel) on a soft palette
 * tint. The first is lit blue; hovering another moves the blue to it, with a fade.
 */
function OtherIndustries() {
  return (
    <>
      <section className="qc-cta qx-others" aria-labelledby="qx-others-heading">
        <header className="qx-others-head">
          <p className="qx-others-eyebrow">Beyond quarry</p>
          <h2 id="qx-others-heading" className="qx-others-heading">Explore our other industries.</h2>
        </header>
        {OTHERS.map((o, i) => (
          <Link
            key={o.route}
            prefetch={homeOnly ? false : undefined}
            href={href(o.route)}
            className={`qc-cta-panel qx-panel ${i === 0 ? "is-lit" : ""}`}
          >
            <span className="qc-cta-title">{o.title}</span>
            <span className="qc-cta-foot">
              <span className="qc-cta-label">{o.label}</span>
              <span className="qc-cta-arrow" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </span>
          </Link>
        ))}
      </section>
      {/* Breathing space under the CTA band before the footer, as on the mining page. */}
      <div className="qc-gap" aria-hidden />
    </>
  );
}
