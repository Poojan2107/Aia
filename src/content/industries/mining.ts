import type { IndustryProductsContent, IndustryServicesContent } from "@/content/types";
import { caseStudyHref } from "@/content/knowledge/case-studies";

const hero = { src: "/images/mining-hero.jpg", alt: "Interior view through an industrial grinding mill with lined shell and grinding media" };

export const miningProducts: IndustryProductsContent = {
  status: "approved",
  hero: {
    line1: "Engineered Mining Solutions",
    line2: "for enhanced Mill Reliability and Performance",
    image: hero,
  },
  groups: [
    {
      id: "sag",
      name: "SAG Mill",
      note: "Lining and discharge",
      layout: "split",
      products: [
        {
          id: "sag-liners",
          title: "Advanced Lining System",
          subtitle: "Feed End liners and Shell Liners",
          body: "SAG mills operate in a harsh environment of high impact and abrasion. Our feed-end and shell lining systems protect the mill while optimizing material flow through the charge.",
          image: { src: "/images/funnel/funnel-sag-lining.png", alt: "3D cutaway of a SAG mill with advanced lining systems" },
          variants: ["AIS: Steel Bolting — Through", "AIS: Steel Bolting — Headless", "AIS: Steel Bolting — Channel", "AIS: Composite Bolted Bolting"],
        },
        {
          id: "sag-discharge",
          title: "Discharge End Assembly",
          subtitle: "Next Gen PL for SAG mills",
          body: "The Next Gen PL discharge system is designed for efficient evacuation — increasing throughput and reducing energy consumed on slurry that should already have left the mill.",
          image: { src: "/images/funnel/funnel-sag-de.png", alt: "3D view of a SAG mill next-generation discharge-end system" },
          variants: ["Next Gen PL", "PDC — Core Composite Plates with Ceramic", "PL", "EL"],
        },
      ],
    },
    {
      id: "ball",
      name: "Ball Mill",
      note: "Liners, shell, and discharge",
      layout: "feature-grid",
      products: [
        {
          id: "ball-end",
          title: "Advanced Lining System",
          subtitle: "End Liners (Feed & Discharge)",
          body: "Ball mill end liners are designed for fine grinding — supporting optimized charge motion and improved mill performance at both the feed and discharge ends.",
          image: { src: "/images/funnel/funnel-ball-lining.png", alt: "3D cutaway of a ball mill with wave liners and grinding media" },
          variants: ["AIS: Steel Bolting — Channel Type", "AIS: Steel Bolting — Through Type", "AIS: Composite Bolting", "AIS: Composite Headless Bolting"],
        },
        {
          id: "ball-shell",
          title: "Shell Liners",
          subtitle: "Designed with advanced simulation",
          body: "We use advanced simulation to design shell liners that deliver efficient grinding, easier installation, and longer wear life in ball mill duty.",
          image: { src: "/images/mining-lining.png", alt: "Interior of a mill shell with installed lining" },
          variants: ["AIS: Steel Bolting — Channel Type", "AIS: Steel Bolting — Headless", "AIS: Steel Bolting — Headless Through", "AIS: Headless Steel Bolting"],
        },
        {
          id: "grate-conversion",
          title: "Overflow to Grate Discharge Conversion",
          subtitle: "Tighter grind, less wasted energy",
          body: "Converting overflow mills to grate discharge reduces over-grinding and lifts throughput and energy efficiency — with a discharge assembly engineered for the conversion.",
          image: { src: "/images/funnel/funnel-ball-de.png", alt: "3D view of a ball mill grate discharge assembly" },
          variants: ["Grate Liner", "Next Gen DE System"],
        },
      ],
    },
    {
      id: "verti-media",
      name: "Verti Mill & Media",
      note: "Vertical liners and grinding media",
      layout: "overlay",
      products: [
        {
          id: "verti",
          title: "Verti Mill Liners",
          subtitle: "High-chrome liners for vertical mills",
          body: "High-chrome liners specified for Verti Mills, built for superior wear resistance and durability in fine-grinding service.",
          image: { src: "/images/funnel/funnel-verti.png", alt: "3D cutaway of a vertical mill with ceramic composite linings" },
          variants: [],
        },
        {
          id: "media",
          title: "High Chrome Grinding Media",
          subtitle: "12.5 mm to 100 mm",
          body: "High-chrome grinding media designed for maximum grinding performance and longevity — available from 12.5 mm to 100 mm.",
          image: { src: "/images/funnel/funnel-media.png", alt: "3D product render of high-chrome grinding media" },
          variants: [],
        },
      ],
    },
    {
      id: "fastening",
      name: "Mill Fastening Systems",
      note: "SAG and ball mills",
      layout: "board",
      products: [
        {
          id: "fastening-systems",
          title: "Mill Fastening Systems",
          subtitle: "Reliability under demanding conditions",
          body: "Fastening options for SAG and ball mills — through-bolting, channel-type, T-bolt and headless — specified for reliability under demanding mill conditions.",
          image: { src: "/images/mining-lining.png", alt: "Mill lining and fastening in an industrial grinding mill" },
          variants: ["Through Bolting", "Channel Type Bolting", "T-bolt Bolting", "Headless Bolting"],
        },
      ],
    },
  ],
  cases: [
    {
      title: "40ft SAG Mill in Latin America",
      body: "Improving the life of inlet liners for a customer who was facing short life issues.",
      href: caseStudyHref("40ft-sag-mill-in-latin-america"),
      image: { src: "/images/case-1.png", alt: "" },
    },
    {
      title: "34ft SAG Mill in West Africa",
      body: "Optimizing SAG mill performance for our customers through our innovative mill solutions and expertise.",
      href: caseStudyHref("34ft-sag-mill-in-west-africa"),
      image: { src: "/images/case-2.png", alt: "" },
    },
    {
      title: "28ft SAG Mill in Asia",
      body: "Optimizing SAG mill performance with new fastening systems for mill internals and their support.",
      href: caseStudyHref("28ft-sag-mill-in-asia"),
      image: { src: "/images/case-3.png", alt: "" },
    },
  ],
};

export const miningServices: IndustryServicesContent = {
  status: "approved",
  hero: {
    line1: "Mining Services",
    line2: "Design, installation, monitoring, and process optimization",
    image: hero,
  },
  groups: [
    {
      id: "design-wear",
      name: "Design & Wear",
      note: "Model, scan, and reline",
      services: [
        {
          id: "design-modelling",
          title: "Design Modelling & Virtual Validation",
          subtitle: "Discrete Element Method simulation",
          body: "Using advanced DEM simulation, we model liner profiles, lifter designs and charge motion specific to your mill and ore characteristics — validating the lining system before a component is manufactured.",
          image: { src: "/images/funnel/funnel-design.png", alt: "DEM particle simulation inside a grinding mill" },
        },
        {
          id: "wear-scanning",
          title: "Liner Wear Monitoring & Scanning",
          subtitle: "3D scan overlay through the wear cycle",
          body: "We track liner wear progression throughout each cycle with 3D scanning — giving maintenance teams data to schedule activities in advance.",
          image: { src: "/images/funnel/funnel-scan.png", alt: "3D laser scan overlay on a worn mill liner" },
        },
        {
          id: "reline",
          title: "Reline Supervision",
          subtitle: "On-site support through shutdown",
          body: "Our engineers supervise every reline on-site, overseeing installation sequence, bolt torquing and quality assurance so liners are fitted correctly and the mill returns to operation quickly.",
          image: { src: "/images/funnel/funnel-install.png", alt: "Mill liner being installed in the shell" },
        },
      ],
    },
    {
      id: "process-ops",
      name: "Process & Operations",
      note: "Survey, model, and support",
      services: [
        {
          id: "circuit-survey",
          title: "Grinding Circuit Survey",
          subtitle: "Sampling and size-distribution analysis",
          body: "We sample and analyse size distribution across your grinding circuit — establishing a baseline that shows where efficiency is being lost.",
          image: { src: "/images/funnel/funnel-circuit.png", alt: "Grinding circuit with SAG mill, ball mill and cyclones" },
        },
        {
          id: "process-modelling",
          title: "Process Modelling (JKSimMet)",
          subtitle: "Calibrated circuit models",
          body: "Using JKSimMet, we model throughput, power draw and product size response of your circuit to proposed changes — before a change is made on the mill.",
          image: { src: "/images/funnel/funnel-process.png", alt: "Process-model view of a grinding mill" },
        },
        {
          id: "mill-support",
          title: "Mill Operation Support",
          subtitle: "Alongside your metallurgy and operations teams",
          body: "We work with your operations team on charge mass, media sizing, fill level and operating speed so efficiency gains are implemented and held.",
          image: { src: "/images/funnel/funnel-ops.png", alt: "Operating grinding mill with tumbling charge" },
        },
      ],
    },
    {
      id: "media-lab",
      name: "Media & Laboratory",
      note: "Alloy, size, and recovery",
      services: [
        {
          id: "marked-ball",
          title: "Marked Ball Test (MBT)",
          subtitle: "Grinding media alloy selection",
          body: "Evaluate grinding media wear to support alloy selection and cost-effective media performance.",
          image: { src: "/images/funnel/funnel-media.png", alt: "High-chrome grinding media" },
        },
        {
          id: "media-size",
          title: "Grinding Media Size Optimization",
          subtitle: "Charge sizing for mill efficiency",
          body: "Determine suitable grinding media sizes to improve grinding efficiency and mill performance.",
          image: { src: "/images/funnel/funnel-ball-lining.png", alt: "Grinding media inside a ball mill" },
        },
        {
          id: "bench-testing",
          title: "Laboratory Bench Testing",
          subtitle: "Grinding media and recovery optimisation",
          body: "Laboratory chemistry and wear testing to understand grinding behaviour and support improved mineral recovery.",
          image: { src: "/images/funnel/funnel-process.png", alt: "Process testing overlay on a grinding mill model" },
        },
      ],
    },
  ],
};
