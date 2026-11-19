import type { CaseStudy } from "@/content/types";

/**
 * The five case studies on the live site. Slugs keep the WordPress slugs.
 * Narratives are drafts; results stay empty until AIA approves the figures and
 * client attribution (REQ-30, REQ-31). The full PDFs move to the media CDN.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "40ft-sag-mill-in-latin-america",
    title: "40ft SAG Mill in Latin America",
    industry: "mining",
    equipment: "40 ft SAG mill",
    region: "Latin America",
    summary: "Improving the life of mill internals and reducing reline time for a copper concentrator facing maintenance issues.",
    challenge: ["Short life of mill internals and long reline windows were limiting mill availability."],
    approach: [
      "Liner design developed with DEM simulation for the mill's operating conditions",
      "Alloy selection for high-impact SAG duty",
      "On-site reline supervision",
    ],
    results: [],
    image: { src: "/images/thumbnails/case-40ft-sag-latin-america.webp", alt: "Large SAG mill in a copper concentrator" },
    publishedAt: "2026-03-21",
    status: "draft",
  },
  {
    slug: "34ft-sag-mill-in-west-africa",
    title: "34ft SAG Mill in West Africa",
    industry: "mining",
    equipment: "34 ft SAG mill",
    region: "West Africa",
    summary: "Optimising SAG mill performance for a gold operation facing short liner life and throughput limits.",
    challenge: ["Life of mill internals and throughput were below the operation's targets."],
    approach: ["Lining system redesign for the ore and mill speed", "Wear monitoring through the liner cycle"],
    results: [],
    image: { src: "/images/thumbnails/case-34ft-sag-west-africa.webp", alt: "SAG mill at a gold operation" },
    publishedAt: "2026-03-21",
    status: "draft",
  },
  {
    slug: "28ft-sag-mill-in-asia",
    title: "28ft SAG Mill in Asia",
    industry: "mining",
    equipment: "28 ft SAG mill",
    region: "Asia",
    summary: "Optimising SAG mill performance and reducing downtime with new lining and fastening systems.",
    challenge: ["Mill internals life and unplanned downtime were affecting throughput."],
    approach: ["New lining and fastening systems for mill internals", "Engineering support through installation"],
    results: [],
    image: { src: "/images/thumbnails/case-28ft-sag-asia.webp", alt: "SAG mill in an Asian mining operation" },
    publishedAt: "2026-03-21",
    status: "draft",
  },
  {
    slug: "27ft-sag-mill-in-west-africa",
    title: "27ft SAG Mill in West Africa",
    industry: "mining",
    equipment: "27 ft SAG mill",
    region: "West Africa",
    summary: "Improving liner wear life in a SAG mill at a gold operation.",
    challenge: ["Liner wear rate was driving frequent relines."],
    approach: ["Liner profile and alloy review", "Wear measurement through the cycle"],
    results: [],
    image: { src: "/images/case-1.jpg", alt: "SAG mill liners at a gold operation" },
    publishedAt: "2026-03-21",
    status: "draft",
  },
  {
    slug: "15-ft-ball-mill-in-india",
    title: "15ft Ball Mill in India",
    industry: "cement",
    equipment: "15 ft ball mill",
    region: "India",
    summary: "Reducing grinding media wear rate in a ball mill with high-chrome media.",
    challenge: ["Media consumption was raising grinding cost per tonne."],
    approach: ["High-chrome grinding media matched to the application", "Marked ball testing to compare wear rates"],
    results: [],
    image: { src: "/images/case-2.jpg", alt: "Ball mill with high-chrome grinding media" },
    publishedAt: "2026-03-21",
    status: "draft",
  },
];

export function caseStudyHref(slug: string) {
  return `/knowledge-hub/case-studies/${slug}`;
}
