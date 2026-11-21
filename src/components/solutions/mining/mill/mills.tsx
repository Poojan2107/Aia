import type { ReactNode } from "react";
import type { MillState } from "@/components/solutions/mining/MillExplorer";

/**
 * The three mill product pages (Figma "Mining - Product Page", 1183:958, drawn for the SAG mill;
 * Ball and Verti follow the same layout). Each page lives at /solutions/mining/<old slug>, the
 * slug of the matching aiaengineering.com page (/sag-mill, /ball-mill, /verti-mill).
 *
 * Product parity: products, MOCs and bolting types are AIA's own, as listed on
 * aiaengineering.com/sag-mill, /ball-mill and /verti-mill (checked 2026-11-20). Every model is
 * AIA's own CAD (scripts/cad/manifest.mjs). Descriptions restate AIA's site and mining copy
 * (src/content/industries/mining.ts, src/data/moc-catalog.ts); nothing new is claimed.
 */

export type Variant = {
  model: string;
  label: string;
  specs: [string, string][];
  /** Camera angle ("theta phi"); a third value is ignored, the cell sets the distance. */
  orbit?: string;
  /** Framing distance for unusually tall or long parts (overrides the cell default). */
  distance?: string;
};
export type Part = { id: string; title: string; desc: string; variants: Variant[] };
export type Category = {
  id: string;
  title: string;
  /** One line under the component strip in the hero. */
  blurb: string;
  body: ReactNode;
  /** Short points under the body (AIA's own feature lines). */
  points?: string[];
  enquire: string;
  parts: Part[];
  /** How the hero mill opens for this category (absent: the mill stays as it is). */
  state?: MillState;
};
export type Mill = {
  id: "sag" | "ball" | "verti";
  name: string;
  short: string;
  path: string;
  crumb: string;
  title: [string, string];
  lede: string;
  mark: string;
  explorer: { src: string; view: { theta: number; phi: number; distance?: number }; products?: Record<string, { src: string; scale: number }> };
  partsLabel: string;
  categories: Category[];
  ngds: boolean;
  faqHeading: string;
  faqs: { question: string; answer: string }[];
};

const SAG_OPEN = { "shell-top": 6.5, "feed-head": 2.4, "discharge-head": 3.2 };
const BALL_OPEN = { "shell-top": 5.5, "feed-head": 2.4, "discharge-head": 3.2 };

/** AIA's fastener lines (aiaengineering.com, SAG and ball mill pages). */
const FASTENER_POINTS = ["Reliable & durable", "Superior mechanical properties", "Stringent quality control", "Protection from corrosion"];
const FASTENER_DESC = "Reliable and durable, with superior mechanical properties, stringent quality control and protection from corrosion.";

const MOC = (moc: string, bolting: string): [string, string][] => [
  ["Material of construction", moc],
  ["Bolting", bolting],
];

const SURVEY_FAQ = {
  question: "How can a grinding circuit survey improve mill performance?",
  answer:
    "AIA samples and analyses size distribution across your grinding circuit, establishing a baseline that shows where efficiency is being lost, so improvements can be modelled before a change is made on the mill.",
};

export const MILLS: Mill[] = [
  {
    id: "sag",
    name: "SAG Mill",
    short: "S",
    path: "/solutions/mining/sag-mill",
    crumb: "SAG Mill Components",
    title: ["SAG Mill Liners &", "Wear Components."],
    lede: "Application-specific lining systems, discharge assemblies and high-quality fasteners engineered for demanding SAG grinding conditions.",
    mark: "SAG",
    explorer: { src: "/models/catalog/mill-sag-explode.glb", view: { theta: -38, phi: 66, distance: 0.9 } },
    partsLabel: "SAG mill components:",
    ngds: true,
    categories: [
      {
        id: "lining",
        title: "Advanced lining system",
        blurb: "Feed end and shell liners in steel and composite, protecting the mill against impact and abrasion.",
        body: (
          <>
            Our <strong>SAG mill feed end liners</strong> and <strong>shell liners</strong> are designed around mill dimensions and
            operating conditions to ensure wear protection, optimal lift angles and efficient comminution.
          </>
        ),
        points: ["MOC: steel and composite", "Through and outside bolting"],
        enquire: "Enquire about liners",
        state: { amounts: { ...SAG_OPEN, "feed-head": 5.0, "feed-liners": 1.8, "shell-liners": 0.25 }, focus: ["shell-liners", "feed-liners"] },
        parts: [
          {
            id: "feed-end-liners",
            title: "Feed End Liners",
            desc: "Engineered to protect the mill feed end against the impact and abrasion of incoming ore. Offered in steel (through bolting) and composite (outside bolting).",
            variants: [{ model: "sag-feed-end-liner-composite", label: "Composite feed end liner", specs: MOC("Composite", "Outside"), orbit: "210deg 65deg 82%" }],
          },
          {
            id: "shell-liners",
            title: "Shell Liners",
            desc: "Protect the mill shell against high impact and abrasion while optimising material flow through the charge.",
            variants: [
              { model: "mining-metal-sag-shell-liner", label: "Steel shell liner", specs: MOC("Steel", "Through") },
              { model: "sag-shell-liner-composite", label: "Composite shell liner", specs: MOC("Composite", "Outside") },
            ],
          },
        ],
      },
      {
        id: "discharge",
        title: "Discharge end assembly",
        blurb: "Next Gen PL, CPL and RPL discharge assemblies that evacuate slurry efficiently.",
        body: (
          <>
            The discharge end is where grinding efficiency is won or lost. Our <strong>Next Gen PL</strong>, <strong>CPL</strong> and{" "}
            <strong>RPL</strong> solutions for SAG mills eliminate pulp lifter carry-over and slurry backflow.
          </>
        ),
        points: ["MOC: steel, composite and rubber with ceramic"],
        enquire: "Enquire about discharge assemblies",
        state: { amounts: { "shell-top": 3.0, "discharge-head": 6.0, discharge: 2.6 }, focus: ["discharge"], ghost: 0.18 },
        parts: [
          {
            id: "next-gen-pl",
            title: "Next Gen PL",
            desc: "Designed for efficient evacuation: increasing throughput and reducing energy consumed on slurry that should already have left the mill.",
            variants: [{ model: "mining-sag-ngds-de", label: "Next Gen PL discharge end assembly", specs: [["Design", "Next Gen PL (NGDS®)"]] }],
          },
          {
            id: "pulp-lifters",
            title: "CPL & RPL",
            desc: "Curved and radial pulp lifter assemblies for the SAG mill discharge end, with grates matched to the circuit.",
            variants: [
              { model: "sag-de-curved-pulp-lifter", label: "Curved pulp lifter assembly", specs: [["Design", "Curved pulp lifter (CPL)"]] },
              { model: "sag-de-radial-pulp-lifter", label: "Radial pulp lifter assembly", specs: [["Design", "Radial pulp lifter (RPL)"]] },
            ],
          },
        ],
      },
      {
        id: "fasteners",
        title: "High quality fasteners",
        blurb: "Through and outside bolting, built for reliability under heavy impact.",
        body: <>Fasteners for SAG mill liners in <strong>through</strong> and <strong>outside bolting</strong>.</>,
        points: FASTENER_POINTS,
        enquire: "Enquire about fasteners",
        state: { amounts: { ...SAG_OPEN, fasteners: 0.7 }, focus: ["fasteners"], ghost: 0.16 },
        parts: [
          {
            id: "liner-fasteners",
            title: "Liner Fasteners",
            desc: FASTENER_DESC,
            variants: [
              { model: "sag-fasteners-through", label: "Through bolting fastener set", specs: [["Bolting", "Through bolting"]] },
              { model: "sag-fasteners-outside", label: "Outside bolting fastener set", specs: [["Bolting", "Outside bolting"]] },
            ],
          },
        ],
      },
    ],
    faqHeading: "Everything you need to know about our SAG Mill components.",
    faqs: [
      {
        question: "What materials are used in SAG mill discharge systems?",
        answer: "AIA's SAG mill discharge end assemblies (Next Gen PL, CPL and RPL) are offered in steel, composite and rubber with ceramic.",
      },
      {
        question: "How do I select the right material for SAG mill liners?",
        answer:
          "The right material for SAG mill liners depends on mill dimensions, operating conditions and wear requirements. AIA offers steel and composite liners engineered to withstand impact and abrasion while supporting longer liner life and grinding efficiency.",
      },
      {
        question: "What is the difference between radial and curved pulp lifters?",
        answer:
          "Both carry slurry out through the discharge end: radial pulp lifters (RPL) with vanes running out from the mill centre, curved pulp lifters (CPL) with curved vanes. AIA offers both alongside its Next Gen PL, and recommends the design for your circuit.",
      },
      {
        question: "Can AIA help improve mineral recovery?",
        answer:
          "Yes. Alongside its products, AIA offers grinding circuit surveys, process modelling and laboratory testing that support improved grinding efficiency and mineral recovery.",
      },
      SURVEY_FAQ,
    ],
  },
  {
    id: "ball",
    name: "Ball Mill",
    short: "B",
    path: "/solutions/mining/ball-mill",
    crumb: "Ball Mill Components",
    title: ["Ball Mill Liners &", "Wear Components."],
    lede: "End and shell lining systems, the Next Gen DE System, Hi-Cr grinding media and fasteners engineered for efficient ball mill grinding.",
    mark: "Ball",
    explorer: {
      src: "/models/catalog/mill-ball-explode.glb",
      view: { theta: -34, phi: 68, distance: 0.88 },
      products: { media: { src: "/models/catalog/grinding-media-hicr.glb", scale: 0.55 } },
    },
    partsLabel: "Ball mill components:",
    ngds: true,
    categories: [
      {
        id: "lining",
        title: "Advanced lining system",
        blurb: "End and shell liners in rubber, composite, integrated composite, steel and white iron.",
        body: (
          <>
            Our <strong>ball mill end liners</strong> (feed and discharge) and <strong>shell liners</strong> are designed with
            advanced simulation for efficient grinding, easier installation and longer wear life.
          </>
        ),
        points: ["MOC: rubber, composite, integrated composite, steel, white iron", "Channel type, outside and through bolting"],
        enquire: "Enquire about liners",
        state: { amounts: { ...BALL_OPEN, "feed-head": 5.0, "feed-liners": 1.8 }, focus: ["shell-liners", "feed-liners"] },
        parts: [
          {
            id: "end-liners",
            title: "End Liners (Feed & Discharge)",
            desc: "Designed for fine grinding, supporting optimised charge motion and improved mill performance at both the feed and discharge ends.",
            variants: [
              { model: "ball-end-liner-rubber", label: "Rubber end liner", specs: MOC("Rubber", "Channel type"), orbit: "62deg 74deg 82%" },
              { model: "mining-composite-ball-mill-end-liner", label: "Composite end liner", specs: MOC("Composite", "Channel type") },
              { model: "ball-end-liner-integrated", label: "Integrated composite end liner", specs: MOC("Integrated composite", "Outside") },
              { model: "ball-end-liner-steel", label: "Steel end liner", specs: MOC("Steel / White iron", "Through") },
            ],
          },
          {
            id: "shell-liners",
            title: "Shell Liners",
            desc: "Designed with advanced simulation to deliver efficient grinding, easier installation and longer wear life in ball mill duty.",
            variants: [
              { model: "mining-rubber-ball-mill-shell-liner", label: "Rubber shell liner", specs: MOC("Rubber", "Channel type") },
              { model: "ball-shell-liner-composite", label: "Composite shell liner", specs: MOC("Composite", "Channel type") },
              { model: "ball-shell-liner-integrated", label: "Integrated composite shell liner", specs: MOC("Integrated composite", "Outside") },
              { model: "ball-shell-liner-steel", label: "Steel shell liner", specs: MOC("Steel / White iron", "Through") },
            ],
          },
        ],
      },
      {
        id: "discharge",
        title: "Overflow to Next Gen DE System",
        blurb: "Converting overflow mills to grate discharge to cut over-grinding and lift throughput.",
        body: (
          <>
            Converting <strong>overflow mills to grate discharge</strong> reduces over-grinding and lifts throughput and energy
            efficiency, with a <strong>Next Gen DE System</strong> engineered for the conversion.
          </>
        ),
        enquire: "Enquire about the Next Gen DE System",
        state: { amounts: { "shell-top": 2.6, "discharge-head": 6.0, discharge: 2.6 }, focus: ["discharge"], ghost: 0.18 },
        parts: [
          {
            id: "next-gen-de",
            title: "Next Gen DE System",
            desc: "A discharge end assembly engineered for converting overflow ball mills to grate discharge.",
            variants: [{ model: "mining-ball-ngds-mill", label: "Ball mill with the Next Gen DE System", specs: [["Design", "Next Gen DE System (NGDS®)"]] }],
          },
        ],
      },
      {
        id: "media",
        title: "Hi-Cr grinding media",
        blurb: "Hi-Chrome grinding media, up to 30% Cr, from 12.5 mm to 100 mm.",
        body: (
          <>
            <strong>Hi-Cr grinding media</strong> backed by AIA&apos;s Marked Ball Test, bench testing and an on-site Vega
            mineral lab.
          </>
        ),
        points: ["Marked Ball Test (MBT): cost-effective alloy", "Bench test: optimised alloy for improved recovery", "Performance guarantee"],
        enquire: "Enquire about grinding media",
        state: { product: "media" },
        parts: [
          {
            id: "grinding-media",
            title: "Hi-Cr Grinding Media",
            desc: "Hi-Chrome grinding media with up to 30% Cr, from 12.5 mm to 100 mm.",
            variants: [
              {
                model: "grinding-media-hicr",
                label: "Hi-Cr grinding media",
                specs: [
                  ["Hi-Chrome", "Up to 30% Cr"],
                  ["Size", "12.5 mm – 100 mm"],
                ],
                orbit: "0deg 80deg 90%",
              },
            ],
          },
        ],
      },
      {
        id: "fasteners",
        title: "High quality fasteners",
        blurb: "Through, channel type, T type and outside bolting.",
        body: (
          <>
            Fasteners for ball mill liners in <strong>through</strong>, <strong>channel type</strong>, <strong>T type</strong> and{" "}
            <strong>outside bolting</strong>.
          </>
        ),
        points: FASTENER_POINTS,
        enquire: "Enquire about fasteners",
        state: { amounts: { ...BALL_OPEN, fasteners: 0.6 }, focus: ["fasteners"], ghost: 0.16 },
        parts: [
          {
            id: "liner-fasteners",
            title: "Liner Fasteners",
            desc: FASTENER_DESC,
            variants: [
              { model: "ball-fasteners-through", label: "Through bolting fastener set", specs: [["Bolting", "Through bolting"]] },
              // A long channel bar: seen along its length at an angle, not end-on.
              { model: "ball-fasteners-channel", label: "Channel type bolting fastener", specs: [["Bolting", "Channel type bolting"]], orbit: "38deg 52deg 72%" },
              { model: "ball-fasteners-t-type", label: "T type bolting fastener set", specs: [["Bolting", "T type bolting"]] },
              // AIA's CAD draws the set apart along its axis (bolt, cup washer, rubber washer).
              { model: "ball-fasteners-outside", label: "Outside bolting fastener set (exploded view)", specs: [["Bolting", "Outside bolting"]], orbit: "30deg 80deg", distance: "128%" },
            ],
          },
        ],
      },
    ],
    faqHeading: "Everything you need to know about our Ball Mill components.",
    faqs: [
      {
        question: "Which liner materials does AIA offer for ball mills?",
        answer:
          "AIA offers ball mill end and shell liners in rubber and composite (channel type bolting), integrated composite (outside bolting), and steel or white iron (through bolting).",
      },
      {
        question: "Why convert an overflow ball mill to grate discharge?",
        answer:
          "Converting overflow mills to grate discharge reduces over-grinding and lifts throughput and energy efficiency, with a Next Gen DE System engineered for the conversion.",
      },
      {
        question: "What sizes of Hi-Cr grinding media are available?",
        answer:
          "AIA supplies Hi-Chrome grinding media with up to 30% Cr, from 12.5 mm to 100 mm, with the Marked Ball Test (MBT) to select a cost-effective alloy and a performance guarantee.",
      },
      {
        question: "Which fastening systems are available for ball mills?",
        answer: "Through bolting, channel type bolting, T type bolting and outside bolting.",
      },
      SURVEY_FAQ,
    ],
  },
  {
    id: "verti",
    name: "Verti Mill",
    short: "V",
    path: "/solutions/mining/verti-mill",
    crumb: "Verti Mill Components",
    title: ["Verti Mill Flight &", "Shoe Liners."],
    lede: "Flight liners in Hi-Cr and shoe liners in Sintercast® alloy for Verti Mills up to VTM 4,500, reducing replacement cycles and downtime.",
    mark: "Verti",
    explorer: { src: "/models/catalog/mill-verti.glb", view: { theta: 20, phi: 68, distance: 0.82 } },
    partsLabel: "Verti mill components:",
    ngds: false,
    categories: [
      {
        id: "flight",
        title: "Flight liners",
        blurb: "Flight liners in Hi-Cr, with lifting eyes for ease of installation.",
        body: (
          <>
            <strong>Flight liners in Hi-Cr</strong> for Verti Mills up to VTM 4,500, with lifting eyes for ease of installation.
          </>
        ),
        points: ["MOC: Hi-Cr", "For models up to VTM 4,500", "Lifting eyes for ease of installation"],
        enquire: "Enquire about flight liners",
        state: { focus: ["sinterHicr:liners"] },
        parts: [
          {
            id: "flight-liners",
            title: "Flight Liners",
            desc: "Flight liners in Hi-Cr for Verti Mills up to VTM 4,500, with lifting eyes for ease of installation.",
            variants: [{ model: "verti-flight-liners", label: "Verti mill flight liners", specs: [["Material of construction", "Hi-Cr"]] }],
          },
        ],
      },
      {
        id: "shoe",
        title: "Shoe liners",
        blurb: "Shoe liners in Sintercast®, with 3X the life expectancy of Hi-Cr.",
        body: (
          <>
            <strong>Shoe liners in Sintercast® alloy</strong> (Hi-Cr iron embedded with ceramic particles), reducing wear on the
            shoe liners and the number of replacement cycles.
          </>
        ),
        points: ["Sintercast has 3X life expectancy compared to Hi-Cr", "Fewer replacement cycles and less downtime", "Increased mill availability"],
        enquire: "Enquire about shoe liners",
        state: { focus: ["sinterCeramic:liners"] },
        parts: [
          {
            id: "shoe-liners",
            title: "Shoe Liners",
            desc: "Shoe liners in Sintercast alloy (Hi-Cr iron embedded with ceramic particles), reducing wear on the shoe liners.",
            variants: [{ model: "verti-shoe-liners", label: "Verti mill shoe liners", specs: [["Material of construction", "Sintercast®"]] }],
          },
        ],
      },
    ],
    faqHeading: "Everything you need to know about our Verti Mill components.",
    faqs: [
      {
        question: "Which Verti Mill models does AIA supply liners for?",
        answer: "AIA (Vega) supplies flight and shoe liners for Verti Mill models up to VTM 4,500.",
      },
      {
        question: "What are AIA's Verti Mill liners made of?",
        answer: "Flight liners are Hi-Cr; shoe liners are Sintercast alloy, Hi-Cr iron embedded with ceramic particles, which reduces wear on the shoe liners.",
      },
      {
        question: "How long do Sintercast shoe liners last?",
        answer: "Sintercast has 3X life expectancy compared to Hi-Cr, for fewer replacement cycles, less downtime and increased mill availability.",
      },
      SURVEY_FAQ,
    ],
  },
];

export const millById = (id: string) => MILLS.find((m) => m.id === id);
