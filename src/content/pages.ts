import type { ContentPageContent, Hero } from "@/content/types";
import { footprint } from "@/data/site";

/**
 * Copy for content-template pages, keyed by route id (src/lib/routes.ts).
 *
 * Drafted from the live site inventory, the requirements spec and the keyword
 * pool. Facts shown are ones AIA already publishes on its About page; anything
 * else stays generic until the owning department supplies approved text.
 */

const img = (src: string, alt: string) => ({ src, alt });

export const contentPages: Record<string, ContentPageContent> = {
  about: {
    status: "draft",
    hero: {
      eyebrow: "Company",
      line1: "About AIA",
      line2: "Engineered for the hours you can't afford to lose",
      lead: "AIA Engineering designs, manufactures and supplies high-chromium wear, corrosion and abrasion resistant castings, and works with customers to improve the performance of their grinding and crushing operations.",
      image: img("/images/plant-aerial.png", "Aerial view of an AIA Engineering manufacturing plant"),
    },
    facts: footprint.map((item) => ({ value: item.value, label: item.label })),
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        body: [
          "Headquartered in Ahmedabad, India, AIA Engineering serves mining, cement, quarry and thermal power customers in more than 120 countries. Vega Industries, AIA's international marketing arm, works with customers through subsidiaries, service centres and warehouses around the world.",
          "Our work goes beyond the product: metallurgy, design simulation and field engineering are combined to extend component life, reduce downtime and lower operating cost.",
        ],
        image: img("/images/about-still.jpg", "Inside an AIA Engineering foundry"),
      },
      {
        id: "what-we-do",
        heading: "What we do",
        bullets: [
          "Mill liners, discharge systems and fastening systems for SAG, ball and vertical mills",
          "High-chrome grinding media for mining, cement and thermal power",
          "Wear parts for vertical roller mills, coal pulverisers and crushers",
          "Design modelling, wear monitoring, reline supervision and process optimisation services",
        ],
        links: [
          { label: "Mining", href: "/solutions/mining" },
          { label: "Cement", href: "/solutions/cement" },
          { label: "Quarry", href: "/solutions/quarry/products" },
          { label: "Thermal Power", href: "/solutions/thermal-power" },
        ],
      },
      {
        id: "vision",
        heading: "Vision, mission and values",
        body: ["Approved vision, mission and values statements will be published here (requirements REQ-02)."],
      },
      {
        id: "milestones",
        heading: "Milestones",
        body: ["The company timeline will be added once Corporate Secretarial supplies the approved milestone list (REQ-03)."],
      },
    ],
    related: [
      { label: "Board of Directors", href: "/company/board-of-directors" },
      { label: "Technology & Infrastructure", href: "/company/technology-and-infrastructure" },
      { label: "Global Presence", href: "/company/global-presence" },
    ],
  },

  "technology-infrastructure": {
    status: "draft",
    hero: {
      eyebrow: "Company",
      line1: "Technology & Infrastructure",
      line2: "Metallurgy, design and manufacturing at scale",
      image: img("/images/tech-research.jpg", "Metallurgy laboratory at AIA Engineering"),
    },
    sections: [
      {
        id: "material-engineering",
        heading: "Material engineering",
        body: ["New alloys and material combinations are developed around application requirements, with the aim of improving wear life and delivering greater value in operation."],
        image: img("/images/tech-material.jpg", "High-chrome alloy castings"),
      },
      {
        id: "grinding-research",
        heading: "Grinding research",
        body: ["Pilot-scale mill testing helps determine suitable ball sizes for specific operating conditions, while grindability studies provide data that can guide mill configuration and energy use."],
        image: img("/images/tech-research.png", "Pilot mill testing"),
      },
      {
        id: "performance-development",
        heading: "Performance development",
        body: ["Wear-profile scanning, mill audits and field observations provide feedback to refine designs, support maintenance planning and improve grinding performance over the product lifecycle."],
        image: img("/images/tech-performance.jpg", "Wear profile scanning of a mill liner"),
      },
      {
        id: "manufacturing",
        heading: "Manufacturing clusters",
        body: ["AIA operates manufacturing clusters in Gujarat, Tamil Nadu and Maharashtra. Plant-level capacity, certifications and facility details will be added from the approved facility roster (REQ-35)."],
      },
    ],
  },

  "global-presence": {
    status: "draft",
    hero: {
      eyebrow: "Company",
      line1: "Global Presence",
      line2: "Serving customers in 120+ countries",
      image: img("/images/plant-aerial.png", "Aerial view of an AIA Engineering plant"),
    },
    sections: [
      {
        id: "network",
        heading: "Our network",
        body: [
          "AIA Engineering and Vega Industries support customers through subsidiaries, offices, service centres and warehouses across the Americas, Europe, Africa, the Middle East and Asia Pacific.",
          "Verified addresses, contacts and map locations will be published from the approved global office directory (REQ-58).",
        ],
        bullets: ["India (headquarters and manufacturing)", "United Kingdom", "United States", "Chile", "South Africa", "Australia", "Middle East"],
        links: [{ label: "Contact us", href: "/contact" }],
      },
    ],
  },

  sustainability: {
    status: "draft",
    hero: {
      eyebrow: "Company",
      line1: "Sustainability",
      line2: "Responsible manufacturing",
      image: img("/images/footer-bg.jpg", "Industrial plant at dusk"),
    },
    sections: [
      {
        id: "approach",
        heading: "Our approach",
        body: ["Longer-lasting wear parts mean less metal consumed per tonne processed by our customers. Within our own operations, sustainability priorities cover scrap recycling, energy efficiency, renewable energy and water conservation."],
        image: img("/images/sustainability-gear.jpg", "Recycled steel scrap for melting"),
      },
      {
        id: "reporting",
        heading: "Reports and disclosures",
        body: ["The Business Responsibility and Sustainability Report (BRSR) is published with the Annual Report."],
        links: [{ label: "Reports & Presentations", href: "/investors/reports-and-presentations" }],
      },
    ],
    related: [{ label: "CSR Initiatives", href: "/company/csr" }],
  },

  "mining-ngds": {
    status: "draft",
    hero: {
      eyebrow: "Mining",
      line1: "NGDS",
      line2: "New Generation Discharge System for SAG and ball mills",
      image: img("/images/funnel/funnel-sag-de.png", "Next-generation discharge system of a SAG mill"),
    },
    sections: [
      {
        id: "what-it-is",
        heading: "What NGDS does",
        body: [
          "The discharge end is where grinding efficiency is won or lost. NGDS pulp lifter and grate designs evacuate slurry efficiently, eliminating pulp lifter carry-over and backflow so the mill spends its energy on grinding.",
        ],
        image: img("/images/funnel/funnel-ball-de.png", "Ball mill grate discharge assembly"),
      },
      {
        id: "sag",
        heading: "NGDS for SAG mills",
        bullets: ["Radial and curved pulp lifter designs (RPL, CPL)", "Discharge grates matched to the circuit", "Designed with DEM and flow modelling"],
      },
      {
        id: "ball",
        heading: "NGDS for ball mills",
        bullets: ["Overflow to grate discharge conversion", "Tighter product size control", "Lower energy draw per tonne"],
        links: [
          { label: "Mining Products", href: "/solutions/mining/products" },
          { label: "Mining Services", href: "/solutions/mining/services" },
        ],
      },
    ],
  },

  "career-details": {
    status: "draft",
    hero: {
      eyebrow: "Careers",
      line1: "Life at AIA",
      line2: "Learn, build and grow",
      image: img("/images/gallery-center.jpg", "Engineers at an AIA Engineering facility"),
    },
    sections: [
      {
        id: "development",
        heading: "Training and development",
        body: ["Engineers and professionals at AIA work across metallurgy, design, manufacturing, field service and global business. Details of training programmes and apprenticeships will be added from HR (REQ-56)."],
      },
      {
        id: "safety",
        heading: "Safety culture",
        body: ["Safety comes first on every shop floor and customer site."],
      },
    ],
    related: [{ label: "Open Positions", href: "/careers/open-positions" }],
  },

  policies: {
    status: "draft",
    hero: { line1: "Policies", image: img("/images/footer-bg.jpg", "") },
    sections: [
      { id: "terms", heading: "Terms of use", body: ["Approved website terms of use will be published here (REQ-63)."] },
      { id: "cookies", heading: "Cookie policy", body: ["This website uses only cookies needed for it to work until a consent banner and cookie policy are approved."] },
      { id: "safe-harbour", heading: "Forward-looking statements", body: ["Safe harbour statement for investor materials, as approved by Legal."] },
    ],
  },

  "privacy-policy": {
    status: "draft",
    hero: { line1: "Privacy Policy", image: img("/images/footer-bg.jpg", "") },
    sections: [
      {
        id: "summary",
        heading: "Summary",
        body: [
          "Information submitted through forms on this website is used only to respond to the enquiry and is shared only with the AIA team handling it.",
          "The full privacy policy, approved by Legal under India's Digital Personal Data Protection Act and applicable international law, will replace this summary before launch.",
        ],
      },
    ],
  },
};

/** Hero for hub (pillar landing) pages; children are listed from the page register. */
export const hubHeroes: Record<string, Hero> = {
  company: {
    line1: "Company",
    line2: "Identity, leadership and responsibility",
    image: img("/images/mega-building.jpg", "AIA Engineering corporate office"),
  },
  solutions: {
    line1: "Our Solutions",
    line2: "Mining, cement, quarry and thermal power",
    image: img("/images/service-2.png", "Grinding mill in operation"),
  },
  investors: {
    line1: "Investors",
    line2: "Results, reports and disclosures",
    image: img("/images/tech-research.jpg", "AIA Engineering"),
  },
  "knowledge-hub": {
    line1: "Knowledge Hub",
    line2: "Evidence, insight and media",
    image: img("/images/service-1.jpg", "Mill liners in a grinding mill"),
  },
};
