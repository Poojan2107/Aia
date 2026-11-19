"use client";

import { CaseStudies } from "@/components/home/CaseStudies";
import { Faq } from "@/components/home/ClosingSections";

/**
 * Figma "Quarry - Product Page" closing: the shared case studies carousel, then the FAQ (the
 * homepage FAQ with the Figma's quarry questions), then the site footer.
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
      <CaseStudies heading={["Where our engineering", "proves its purpose."]} tone="bg-[#f5f5f5]" />
      <Faq heading="Everything you need to know about our crusher wear parts." items={FAQS} />
    </>
  );
}
