import type {
  IndustryProductsContent,
  IndustryServicesContent,
  IndustrySolutionsContent,
} from "@/content/types";

/**
 * Draft copy from the live /thermal/, /tube-mill-thermal/ and /vrm-thermal/
 * pages and the keyword pool. Engineering must confirm the mill types and OEM
 * coverage before launch.
 */

const heroImage = { src: "/images/industry/thermal.jpg", alt: "Coal-fired thermal power plant" };

export const thermalSolutions: IndustrySolutionsContent = {
  status: "draft",
  hero: {
    eyebrow: "Thermal Power",
    line1: "Wear Solutions for Coal Pulverisers",
    line2: "Vertical roller, bowl and ball tube mills",
    image: heroImage,
  },
  intro: {
    lead: "A thermal power unit can only run at full load if its coal mills deliver enough fine coal. Wear on grinding elements reduces mill output, fineness and the time between overhauls.",
    body: "AIA Engineering supplies grinding rolls, tyres, bull ring and table segments, tube mill liners and high-chrome media for coal pulverisers, with audits and air-flow studies that help keep mills available and efficient.",
  },
  challenges: [
    { title: "Mill availability", body: "Grinding element wear shortens the time between pulveriser overhauls." },
    { title: "Coal fineness", body: "Worn rolls and rings reduce fineness, affecting combustion and unburnt carbon." },
    { title: "Mill output", body: "Wear reduces mill capacity, limiting unit load on poor coal." },
    { title: "Auxiliary power", body: "Inefficient grinding increases mill power consumption." },
  ],
  areas: [
    {
      id: "vertical-mills",
      title: "Vertical Roller & Bowl Mills",
      body: "Grinding elements for vertical coal mills and bowl mills.",
      image: { src: "/images/thermal-mill.png", alt: "Cutaway of a vertical coal mill" },
      points: ["Grinding rolls and tyres", "Bull ring and table segments"],
    },
    {
      id: "ball-tube-mills",
      title: "Ball Tube Mills",
      body: "Lining systems and high-chrome grinding media for ball tube coal mills.",
      image: { src: "/images/funnel/thermal.png", alt: "Ball tube coal mill" },
      points: ["Tube mill liners", "High-chrome grinding media"],
    },
  ],
  outcomes: ["Longer time between overhauls", "Consistent coal fineness", "Stable mill output", "Lower wear cost per tonne of coal"],
  cases: [],
};

export const thermalProducts: IndustryProductsContent = {
  status: "draft",
  hero: {
    line1: "Engineered Thermal Power Solutions",
    line2: "for coal pulverisers",
    image: heroImage,
  },
  groups: [
    {
      id: "vertical",
      name: "Vertical Roller & Bowl Mills",
      note: "Rolls, tyres and rings",
      layout: "split",
      products: [
        {
          id: "grinding-rolls",
          title: "Grinding Rolls & Tyres",
          subtitle: "Vertical coal mills and bowl mills",
          body: "Grinding rolls and tyres in wear-resistant alloys that keep their profile longer under coal grinding.",
          image: { src: "/images/thermal-mill.png", alt: "Coal mill grinding roll" },
          variants: ["Grinding Rolls", "Roller Tyres"],
        },
        {
          id: "bull-ring",
          title: "Bull Ring & Table Segments",
          subtitle: "Grinding ring and table",
          body: "Bull ring and table segments that form the grinding track under the rolls.",
          image: { src: "/images/thermal-mill-clean.png", alt: "Bull ring segments of a bowl mill" },
          variants: ["Bull Ring Segments", "Table Segments"],
        },
      ],
    },
    {
      id: "tube",
      name: "Ball Tube Mills",
      note: "Liners and media",
      layout: "feature-grid",
      products: [
        {
          id: "tube-liners",
          title: "Tube Mill Liners",
          subtitle: "Ball tube coal mills",
          body: "Shell and end liners for ball tube coal mills, designed for long wear life.",
          image: { src: "/images/funnel/thermal.png", alt: "Ball tube mill liners" },
          variants: [],
        },
        {
          id: "coal-media",
          title: "High Chrome Grinding Media",
          subtitle: "For coal grinding",
          body: "High-chrome grinding media for ball tube coal mills.",
          image: { src: "/images/funnel/funnel-media.png", alt: "High-chrome grinding media" },
          variants: [],
        },
      ],
    },
    {
      id: "ball-race",
      name: "Ball & Race Mills",
      note: "E-mill grinding elements",
      layout: "board",
      products: [
        {
          id: "e-mill",
          title: "Ball & Race Mill Parts",
          subtitle: "E-type coal mills",
          body: "Grinding elements for ball-and-race coal mills.",
          image: { src: "/images/thermal-mill-plate.png", alt: "Ball and race coal mill" },
          variants: ["Grinding Rings", "Hollow Balls"],
        },
      ],
    },
  ],
  cases: [],
};

export const thermalServices: IndustryServicesContent = {
  status: "draft",
  hero: {
    line1: "Thermal Power Services",
    line2: "Pulveriser performance, wear and installation support",
    image: heroImage,
  },
  groups: [
    {
      id: "performance",
      name: "Pulveriser Performance",
      note: "Fineness, air flow and output",
      services: [
        {
          id: "pulveriser-audit",
          title: "Pulveriser Audit",
          subtitle: "Mill condition and performance",
          body: "Assessment of mill condition, wear and operating data to find the causes of low output or poor fineness.",
          image: { src: "/images/funnel/funnel-scan.png", alt: "Coal mill wear assessment" },
        },
        {
          id: "cfd",
          title: "CFD Air-Flow Analysis",
          subtitle: "Computational fluid dynamics",
          body: "CFD studies of air and coal flow inside the mill to improve classification and reduce wear hot spots.",
          image: { src: "/images/funnel/funnel-process.png", alt: "Air-flow simulation inside a coal mill" },
        },
        {
          id: "fineness",
          title: "Fineness Improvement",
          subtitle: "Classification and grinding",
          body: "Recommendations on grinding elements and settings to improve coal fineness.",
          image: { src: "/images/funnel/funnel-circuit.png", alt: "Coal grinding circuit" },
        },
      ],
    },
    {
      id: "wear-install",
      name: "Wear & Installation",
      note: "Plan and fit",
      services: [
        {
          id: "wear-monitoring",
          title: "Wear Monitoring",
          subtitle: "Through each overhaul cycle",
          body: "Measurement of grinding element wear to plan overhauls in advance.",
          image: { src: "/images/funnel/funnel-scan.png", alt: "Wear measurement" },
        },
        {
          id: "installation",
          title: "Installation Supervision",
          subtitle: "During overhauls",
          body: "On-site supervision of grinding element installation during mill overhauls.",
          image: { src: "/images/funnel/funnel-install.png", alt: "Installation inside a mill" },
        },
        {
          id: "media-support",
          title: "Grinding Media Support",
          subtitle: "Ball tube mills",
          body: "Media selection and charge management for ball tube coal mills.",
          image: { src: "/images/funnel/funnel-media.png", alt: "Grinding media" },
        },
      ],
    },
  ],
};
