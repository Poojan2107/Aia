export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  lx?: number;
  ly?: number;
  align?: "left" | "right" | "top" | "bottom";
  tone?: "yellow" | "slate" | "accent";
};

export type IndustrySolution = {
  id: string;
  label: string;
  image: string;
  imageAlt?: string;
  hotspots: Hotspot[];
};

export type Industry = {
  id: string;
  index: string;
  name: string;
  description: string;
  href: string;
  solutions: IndustrySolution[];
  model: {
    poster: string;
    src?: string;
    alt: string;
    ratio: string;
    still?: { width: number; height: number };
  };
  hotspots: Hotspot[];
};

/** Shared mill callouts — used only when the visible plate has no baked-in labels. */
const millCutawayHotspots: Hotspot[] = [
  { id: "shell", label: "Shell Liners", x: 48, y: 38, lx: 72, ly: 16, align: "right" },
  { id: "media", label: "Grinding Media", x: 44, y: 62, lx: 70, ly: 72, align: "right", tone: "slate" },
  { id: "ore", label: "Ore Charge", x: 52, y: 52, lx: 76, ly: 48, align: "right" },
  { id: "feed", label: "Feed Trunnion", x: 16, y: 48, lx: 2, ly: 28, align: "left" },
  { id: "discharge", label: "Discharge End", x: 84, y: 50, lx: 96, ly: 36, align: "right" },
  { id: "base", label: "Support Pedestal", x: 70, y: 82, lx: 88, ly: 92, align: "right", tone: "slate" },
];

const vertiHotspots: Hotspot[] = [
  { id: "motor", label: "Drive Motor", x: 50, y: 12, lx: 78, ly: 6, align: "right" },
  { id: "screw", label: "Screw Agitator", x: 48, y: 42, lx: 78, ly: 38, align: "right", tone: "accent" },
  { id: "lining", label: "Chamber Lining", x: 30, y: 48, lx: 4, ly: 44, align: "left" },
  { id: "outlet", label: "Outlet Flange", x: 74, y: 56, lx: 94, ly: 56, align: "right" },
  { id: "charge", label: "Media Charge", x: 48, y: 72, lx: 78, ly: 78, align: "right", tone: "slate" },
  { id: "base", label: "Support Base", x: 50, y: 90, lx: 78, ly: 94, align: "right" },
];

export const industries: Industry[] = [
  {
    id: "mining",
    index: "01",
    name: "Mining",
    description:
      "AIA Engineering Ltd. and Vega Industries provides end-to-end grinding solutions for improving mill reliability and efficiency of the grinding circuit. AIA Engineering’s deep domain expertise in design and metallurgy combined with its manufacturing capabilities focuses on customer value enhancement by increasing production and reducing operating costs. Our solutions go beyond the product. Our team of expert specialists work directly with your team to optimize every stage of your grinding circuit.",
    href: "/solutions/mining",
    solutions: [
      {
        id: "sag",
        label: "SAG Mill Solutions",
        image: "/images/industry/mining.jpg",
        imageAlt: "SAG mill lining solutions",
        hotspots: millCutawayHotspots,
      },
      {
        id: "ball",
        label: "Ball Mill Solutions",
        image: "/images/industry/mining.jpg",
        imageAlt: "Ball mill lining solutions",
        hotspots: millCutawayHotspots,
      },
      {
        id: "verti",
        label: "Verti Mill Solutions",
        image: "/images/industry/mining.jpg",
        imageAlt: "Vertical mill lining solutions",
        hotspots: vertiHotspots,
      },
    ],
    model: {
      poster: "/images/industry/mining.jpg",
      src: "/models/mining.glb",
      alt: "3D cutaway of a mining grinding mill with AIA wear components",
      ratio: "778 / 438",
      still: { width: 778, height: 438 },
    },
    hotspots: [
      { id: "gear", label: "Ring Gear", x: 22, y: 43, lx: 2, ly: 16, align: "left" },
      { id: "feed", label: "Feed End Liners", x: 35, y: 36, lx: 28, ly: 5, align: "top" },
      { id: "shell", label: "Shell Liners", x: 48, y: 28, lx: 49, ly: 3, align: "top" },
      { id: "liners", label: "High Quality Fasteners", x: 63, y: 34, lx: 80, ly: 7, align: "top" },
      { id: "trunnion", label: "Discharge Trunnion", x: 86, y: 50, lx: 96, ly: 44, align: "right" },
      { id: "de", label: "DE Assembly", x: 78, y: 76, lx: 90, ly: 94, align: "bottom" },
    ],
  },
  {
    id: "cement",
    index: "02",
    name: "Cement",
    description:
      "AIA Engineering Ltd. and Vega Industries are world leaders in manufacturing wear parts for cement plants. Our in-depth knowledge of the application benefits our customers to get best in class grinding efficiency, better productivity and sustainable operations. Our solutions consistently deliver improved mill throughput, lower specific energy consumption, and reduced maintenance costs, helping cement producers operate more profitably.",
    href: "/solutions/cement",
    solutions: [
      {
        id: "tube",
        label: "Tube Mills",
        image: "/images/industry/cement.jpg",
        imageAlt: "Cement tube mill wear solutions",
        hotspots: [
          { id: "gear", label: "Ring Gear", x: 18, y: 48, lx: 2, ly: 28, align: "left", tone: "slate" },
          { id: "lining", label: "Lining System", x: 42, y: 40, lx: 42, ly: 12, align: "top", tone: "accent" },
          { id: "diaphragm", label: "Diaphragms", x: 58, y: 42, lx: 72, ly: 14, align: "top", tone: "slate" },
          { id: "fasteners", label: "Fasteners", x: 78, y: 38, lx: 94, ly: 22, align: "right" },
          { id: "media", label: "Grinding Media", x: 48, y: 68, lx: 70, ly: 84, align: "right", tone: "slate" },
        ],
      },
      {
        id: "vrm",
        label: "Vertical Roller Mill (VRM)",
        image: "/images/industry/cement.jpg",
        imageAlt: "Cement vertical roller mill solutions",
        hotspots: [
          { id: "classifier", label: "Classifier", x: 50, y: 14, lx: 78, ly: 6, align: "right" },
          { id: "liners", label: "Liner Plates", x: 30, y: 42, lx: 4, ly: 38, align: "left" },
          { id: "rollers", label: "Grinding Rollers", x: 56, y: 50, lx: 82, ly: 46, align: "right", tone: "accent" },
          { id: "table", label: "Roller Table", x: 50, y: 64, lx: 78, ly: 70, align: "right" },
          { id: "discharge", label: "Discharge Outlet", x: 50, y: 88, lx: 78, ly: 94, align: "right", tone: "slate" },
        ],
      },
    ],
    model: {
      poster: "/images/industry/cement.jpg",
      src: "/models/cement.glb",
      alt: "3D cement tube mill with AIA wear solutions",
      ratio: "800 / 450",
      still: { width: 800, height: 450 },
    },
    hotspots: [
      { id: "gear", label: "Ring Gear", x: 22, y: 34, lx: 4, ly: 12, align: "left", tone: "slate" },
      { id: "lining", label: "Lining System", x: 38, y: 32, lx: 32, ly: 6, align: "top", tone: "accent" },
      { id: "diaphragm", label: "Diaphragms", x: 54, y: 36, lx: 58, ly: 6, align: "top", tone: "slate" },
      { id: "fasteners", label: "High Quality Fasteners", x: 82, y: 32, lx: 90, ly: 12, align: "right" },
      { id: "media", label: "Grinding Media", x: 48, y: 66, lx: 48, ly: 90, align: "bottom", tone: "slate" },
    ],
  },
  {
    id: "quarry",
    index: "03",
    name: "Quarry",
    description:
      "The aggregate and quarry sector demands wear parts that can handle harsh working conditions. AIA Engineering Ltd. and Vega Industries offer durable products to deliver consistent performance with a significantly longer life, enhancing higher equipment availability and reliability.",
    href: "/solutions/quarry",
    solutions: [
      {
        id: "blow",
        label: "Blow Bars",
        image: "/images/industry/quarry.jpg",
        imageAlt: "Quarry blow bar wear parts",
        hotspots: [
          { id: "feed", label: "Feed Inlet", x: 50, y: 18, lx: 28, ly: 6, align: "top" },
          { id: "blow", label: "Blow Bars", x: 52, y: 36, lx: 74, ly: 18, align: "right", tone: "accent" },
          { id: "frame", label: "Frame Liners", x: 70, y: 42, lx: 92, ly: 30, align: "right" },
          { id: "anvil", label: "Anvil", x: 50, y: 64, lx: 74, ly: 78, align: "right" },
          { id: "discharge", label: "Discharge Outlet", x: 72, y: 76, lx: 92, ly: 86, align: "right" },
        ],
      },
      {
        id: "hammers",
        label: "Hammers",
        image: "/images/industry/quarry.jpg",
        imageAlt: "Quarry hammer wear parts",
        hotspots: [
          { id: "feed", label: "Feed Inlet", x: 50, y: 16, lx: 28, ly: 4, align: "top" },
          { id: "hammers", label: "Hammers", x: 38, y: 50, lx: 8, ly: 48, align: "left", tone: "accent" },
          { id: "frame", label: "Frame Liners", x: 70, y: 32, lx: 88, ly: 14, align: "right" },
          { id: "impellers", label: "Impellers", x: 58, y: 46, lx: 86, ly: 46, align: "right" },
          { id: "anvil", label: "Anvil", x: 50, y: 64, lx: 46, ly: 86, align: "bottom" },
        ],
      },
      {
        id: "crusher",
        label: "Crusher Components",
        image: "/images/industry/quarry.jpg",
        imageAlt: "Quarry crusher components",
        hotspots: [
          { id: "feed", label: "Feed Inlet", x: 50, y: 18, lx: 28, ly: 6, align: "top" },
          { id: "blow", label: "Blow Bars", x: 52, y: 36, lx: 74, ly: 18, align: "right", tone: "accent" },
          { id: "frame", label: "Frame Liners", x: 70, y: 42, lx: 92, ly: 30, align: "right" },
          { id: "impellers", label: "Impellers", x: 58, y: 50, lx: 86, ly: 50, align: "right" },
          { id: "discharge", label: "Discharge Outlet", x: 72, y: 76, lx: 92, ly: 86, align: "right" },
        ],
      },
    ],
    model: {
      poster: "/images/industry/quarry.jpg",
      src: "/models/quarry.glb",
      alt: "3D quarry crusher with AIA wear protection",
      ratio: "778 / 438",
      still: { width: 778, height: 438 },
    },
    hotspots: [
      { id: "feed", label: "Feed Inlet", x: 50, y: 16, lx: 28, ly: 4, align: "top" },
      { id: "blow", label: "Blow Bars", x: 52, y: 34, lx: 50, ly: 12, align: "top", tone: "accent" },
      { id: "hammers", label: "Hammers", x: 38, y: 50, lx: 8, ly: 48, align: "left" },
      { id: "frame", label: "Frame Liners", x: 70, y: 32, lx: 88, ly: 14, align: "right" },
      { id: "impellers", label: "Impellers", x: 58, y: 46, lx: 86, ly: 46, align: "right" },
      { id: "anvil", label: "Anvil", x: 50, y: 64, lx: 46, ly: 86, align: "bottom" },
      { id: "discharge", label: "Discharge Outlet", x: 72, y: 74, lx: 90, ly: 80, align: "right" },
    ],
  },
  {
    id: "thermal",
    index: "04",
    name: "Thermal",
    description:
      "AIA Engineering and Vega Industries manufacture specialised wear-resistant mill components for the Thermal Industry. Our grinding systems are designed to maximise uptime, improve mill productivity and reduce the frequency of replacements.",
    href: "/solutions/thermal",
    solutions: [
      {
        id: "tube",
        label: "Tube Mills",
        image: "/images/industry/thermal.jpg",
        imageAlt: "Thermal tube mill wear solutions",
        hotspots: [
          { id: "gear", label: "Ring Gear", x: 18, y: 48, lx: 2, ly: 28, align: "left", tone: "slate" },
          { id: "lining", label: "Lining System", x: 42, y: 40, lx: 42, ly: 12, align: "top", tone: "accent" },
          { id: "media", label: "Grinding Media", x: 48, y: 68, lx: 70, ly: 84, align: "right", tone: "slate" },
          { id: "discharge", label: "Discharge End", x: 84, y: 50, lx: 96, ly: 36, align: "right" },
        ],
      },
      {
        id: "vrm",
        label: "VRM",
        image: "/images/industry/thermal.jpg",
        imageAlt: "Thermal vertical roller mill solutions",
        hotspots: [
          { id: "classifier", label: "Classifier", x: 50, y: 14, lx: 78, ly: 6, align: "right" },
          { id: "liners", label: "Liner Plates", x: 30, y: 42, lx: 4, ly: 38, align: "left" },
          { id: "rollers", label: "Grinding Rollers", x: 56, y: 50, lx: 82, ly: 46, align: "right", tone: "accent" },
          { id: "table", label: "Roller Table", x: 50, y: 64, lx: 78, ly: 70, align: "right" },
          { id: "discharge", label: "Discharge Outlet", x: 50, y: 88, lx: 78, ly: 94, align: "right", tone: "slate" },
        ],
      },
    ],
    model: {
      poster: "/images/industry/thermal.jpg",
      src: "/models/thermal.glb",
      alt: "3D thermal power vertical roller mill",
      ratio: "457 / 500",
      still: { width: 457, height: 500 },
    },
    hotspots: [
      { id: "classifier", label: "Classifier", x: 50, y: 16, lx: 78, ly: 8, align: "right" },
      { id: "liners", label: "Liner Plates", x: 32, y: 42, lx: 4, ly: 40, align: "left" },
      { id: "rollers", label: "Grinding Rollers", x: 56, y: 50, lx: 82, ly: 46, align: "right", tone: "accent" },
      { id: "table", label: "Roller Table", x: 50, y: 64, lx: 78, ly: 68, align: "right" },
      { id: "discharge", label: "Discharge Outlet", x: 50, y: 86, lx: 50, ly: 96, align: "bottom", tone: "slate" },
    ],
  },
];
