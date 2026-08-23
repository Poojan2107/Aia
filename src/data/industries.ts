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

export type Industry = {
  id: string;
  index: string;
  name: string;
  description: string;
  href: string;
  solutions: { id: string; label: string; hotspotId: string }[];
  model: {
    poster: string;
    src?: string;
    alt: string;
    ratio: string;
    still?: { width: number; height: number };
  };
  hotspots: Hotspot[];
};

export const industries: Industry[] = [
  {
    id: "mining",
    index: "01",
    name: "Mining",
    description: "Wear solutions\nengineered for critical-\ngrinding applications.",
    href: "/solutions/mining",
    solutions: [
      { id: "sag", label: "SAG Mill Solutions", hotspotId: "shell" },
      { id: "ball", label: "Ball Mill Solutions", hotspotId: "liners" },
      { id: "verti", label: "Verti Mill Solutions", hotspotId: "feed" },
    ],
    model: {
      poster: "/images/mining-mill-plate.png",
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
    description: "Wear solutions\nfor demanding\ngrinding applications.",
    href: "/solutions/cement",
    solutions: [
      { id: "tube", label: "Tube Mills", hotspotId: "lining" },
      { id: "vrm", label: "Vertical Roller Mill (VRM)", hotspotId: "media" },
    ],
    model: {
      poster: "/images/cement-mill-plate.png",
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
    description: "Wear protection\nfor crushing\napplications.",
    href: "/solutions/quarry",
    solutions: [
      { id: "blow", label: "Blow Bars", hotspotId: "blow" },
      { id: "hammers", label: "Hammers", hotspotId: "hammers" },
      { id: "crusher", label: "Crusher Components", hotspotId: "frame" },
    ],
    model: {
      poster: "/images/quarry-mill-plate.png",
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
    description: "Wear solutions for\ndemanding coal\ngrinding applications.",
    href: "/solutions/thermal",
    solutions: [
      { id: "tube", label: "Tube Mills", hotspotId: "rollers" },
      { id: "vrm", label: "VRM", hotspotId: "classifier" },
    ],
    model: {
      poster: "/images/thermal-mill-plate.png",
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
