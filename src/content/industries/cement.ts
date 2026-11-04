import type {
  IndustryProductsContent,
  IndustryServicesContent,
  IndustrySolutionsContent,
} from "@/content/types";
import { caseStudyHref } from "@/content/knowledge/case-studies";

/**
 * Draft copy assembled from the live /cement/, /tube-mill/ and /vrm/ pages,
 * the product taxonomy in the requirements spec (REQ-23) and the keyword pool.
 * Product Management must confirm product names and variants before launch.
 */

const heroImage = { src: "/images/hero-plate.jpg", alt: "Grinding mill hall with large tube mills" };

const cases = [
  {
    title: "15ft Ball Mill in India",
    body: "Reducing grinding media wear rate with high-chrome media matched to the mill.",
    href: caseStudyHref("15-ft-ball-mill-in-india"),
    image: { src: "/images/case-2.png", alt: "" },
  },
];

export const cementSolutions: IndustrySolutionsContent = {
  status: "draft",
  hero: {
    eyebrow: "Cement",
    line1: "Wear Solutions for Cement Grinding",
    line2: "Tube mills and vertical roller mills",
    image: heroImage,
  },
  intro: {
    lead: "Cement plants depend on raw, coal and finish mills running between planned shutdowns. Wear on liners, diaphragms, media and roller mill parts decides how long that is and how much energy each tonne takes.",
    body: "AIA Engineering supplies lining systems, diaphragms, grinding media and vertical roller mill wear parts for cement plants, designed around the mill and the material it grinds and supported by audits, process optimisation and installation supervision.",
  },
  challenges: [
    { title: "Shutdown intervals", body: "Liner and diaphragm wear forces stops outside planned maintenance windows." },
    { title: "Energy per tonne", body: "Grinding is the largest consumer of electrical energy in a cement plant." },
    { title: "Product fineness", body: "Worn internals and media change residue and Blaine, affecting cement quality." },
    { title: "VRM wear", body: "Roller and table wear reduces output and increases vibration in vertical roller mills." },
  ],
  areas: [
    {
      id: "tube-mill",
      title: "Tube Mills",
      body: "Lining systems, intermediate and discharge diaphragms and grinding media for two-chamber cement and raw mills.",
      image: { src: "/images/cement-mill.png", alt: "Cutaway of a cement tube mill with lining and diaphragm" },
      points: ["First-chamber and classifying liners", "Intermediate and discharge diaphragms", "High-chrome grinding media"],
    },
    {
      id: "vrm",
      title: "Vertical Roller Mills",
      body: "Wear parts for the grinding rollers, tables and housings of vertical roller mills used for raw meal, cement and slag.",
      image: { src: "/images/funnel/cement.png", alt: "Vertical roller mill grinding rollers and table" },
      points: ["Roller tyres and segments", "Table segments", "Armour rings and housing liners"],
    },
  ],
  outcomes: ["Longer intervals between shutdowns", "Lower specific power consumption", "Stable product fineness", "Lower wear cost per tonne"],
  cases,
};

export const cementProducts: IndustryProductsContent = {
  status: "draft",
  hero: {
    line1: "Engineered Cement Solutions",
    line2: "for tube mills and vertical roller mills",
    image: heroImage,
  },
  groups: [
    {
      id: "tube-mill",
      name: "Tube Mill",
      note: "Liners and diaphragms",
      layout: "split",
      products: [
        {
          id: "tube-mill-liners",
          title: "Lining System",
          subtitle: "First-chamber and classifying liners",
          body: "Shell liners designed for the impact of the first chamber and the ball classification of the second, protecting the mill and keeping the charge working efficiently.",
          image: { src: "/images/cement-mill.png", alt: "Tube mill shell with first-chamber and classifying liners" },
          variants: ["First Chamber Liners", "Classifying Liners", "Feed Head Liners"],
        },
        {
          id: "diaphragms",
          title: "Diaphragms",
          subtitle: "Intermediate and discharge",
          body: "Diaphragms control material flow and retention between chambers and at discharge, so each chamber grinds at the right fineness.",
          image: { src: "/images/cement-mill-clean.png", alt: "Cement mill intermediate diaphragm" },
          variants: ["Intermediate Diaphragm", "Discharge Diaphragm"],
        },
      ],
    },
    {
      id: "vrm",
      name: "Vertical Roller Mill",
      note: "Rollers, table and housing",
      layout: "feature-grid",
      products: [
        {
          id: "vrm-rollers",
          title: "Grinding Rollers",
          subtitle: "Roller tyres and segments",
          body: "Roller tyres and segments in wear-resistant alloys for raw meal, cement and slag grinding in vertical roller mills.",
          image: { src: "/images/funnel/cement.png", alt: "Vertical roller mill grinding roller" },
          variants: ["Roller Tyres", "Roller Segments"],
        },
        {
          id: "vrm-table",
          title: "Table Segments",
          subtitle: "Grinding table wear protection",
          body: "Table segments that hold their profile under the rollers, keeping the grinding bed stable.",
          image: { src: "/images/cement-mill-plate.png", alt: "Vertical roller mill grinding table segments" },
          variants: [],
        },
        {
          id: "vrm-armour",
          title: "Armour Rings & Housing Liners",
          subtitle: "Protection around the table",
          body: "Armour rings and liners that protect the mill housing and nozzle ring area from abrasive material.",
          image: { src: "/images/industry/cement.jpg", alt: "Cement vertical roller mill housing" },
          variants: [],
        },
      ],
    },
    {
      id: "media",
      name: "Grinding Media",
      note: "High-chrome media for cement mills",
      layout: "board",
      products: [
        {
          id: "cement-media",
          title: "High Chrome Grinding Media",
          subtitle: "Matched to each chamber",
          body: "High-chrome grinding media for cement, raw and coal mills, sized and specified for the duty of each chamber to keep wear and power per tonne low.",
          image: { src: "/images/funnel/funnel-media.png", alt: "High-chrome grinding media" },
          variants: ["First Chamber Media", "Second Chamber Media", "Raw Mill Media", "Coal Mill Media"],
        },
      ],
    },
  ],
  cases,
};

export const cementServices: IndustryServicesContent = {
  status: "draft",
  hero: {
    line1: "Cement Services",
    line2: "Audits, optimisation and installation support",
    image: heroImage,
  },
  groups: [
    {
      id: "design-install",
      name: "Design & Installation",
      note: "Plan the next lining cycle",
      services: [
        {
          id: "design-modelling",
          title: "Design Modelling",
          subtitle: "Tube mills and VRMs",
          body: "Engineering and modelling for tube mills and VRMs around specific cement plant conditions.",
          image: { src: "/images/funnel/funnel-design.png", alt: "Design simulation of a grinding mill" },
        },
        {
          id: "reline-supervision",
          title: "Reline Supervision",
          subtitle: "On-site installation support",
          body: "On-site support for liner installation and replacement on cement grinding mills.",
          image: { src: "/images/funnel/funnel-install.png", alt: "Liner installation inside a mill" },
        },
        {
          id: "shutdown-planning",
          title: "Shutdown Planning Support",
          subtitle: "Shorter planned stops",
          body: "Technical planning for liner replacement windows to reduce downtime during planned shutdowns.",
          image: { src: "/images/funnel/funnel-ops.png", alt: "Operating cement mill" },
        },
      ],
    },
    {
      id: "audit-optimise",
      name: "Audit & Optimisation",
      note: "Find and fix losses",
      services: [
        {
          id: "mill-audits",
          title: "Mill Audits",
          subtitle: "Wear profiles and operating data",
          body: "Field audits that capture wear profiles and operating data to guide the next lining cycle.",
          image: { src: "/images/funnel/funnel-scan.png", alt: "Wear profile scan of a mill liner" },
        },
        {
          id: "process-optimisation",
          title: "Process Optimisation",
          subtitle: "Throughput and energy",
          body: "Support for grinding circuit settings that improve throughput and energy use in cement plants.",
          image: { src: "/images/funnel/funnel-circuit.png", alt: "Grinding circuit diagram" },
        },
        {
          id: "internals-optimisation",
          title: "Mill Internals Optimisation",
          subtitle: "Diaphragms and liners",
          body: "Review of diaphragms, liners and internals to improve grinding performance and energy use.",
          image: { src: "/images/cement-mill.png", alt: "Cement mill internals" },
        },
      ],
    },
    {
      id: "wear-media",
      name: "Wear & Media",
      note: "Monitor and manage",
      services: [
        {
          id: "wear-monitoring",
          title: "Wear Monitoring",
          subtitle: "Liners and media",
          body: "Monitor liner and grinding-media wear to plan maintenance windows with less disruption.",
          image: { src: "/images/funnel/funnel-scan.png", alt: "Wear monitoring scan" },
        },
        {
          id: "vrm-support",
          title: "VRM Support",
          subtitle: "Rollers and tables",
          body: "Technical support for vertical roller mill wear parts, rollers and table performance.",
          image: { src: "/images/funnel/cement.png", alt: "Vertical roller mill" },
        },
        {
          id: "media-support",
          title: "Grinding Media Support",
          subtitle: "Charge management",
          body: "Support for media selection and charge management to improve cement mill grinding efficiency.",
          image: { src: "/images/funnel/funnel-media.png", alt: "Grinding media" },
        },
      ],
    },
  ],
};
