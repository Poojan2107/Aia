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
      { id: "gear", label: "Ring Gear", x: 20, y: 36, lx: 8, ly: 18, align: "left", tone: "slate" },
      { id: "feed", label: "Feed End Liners", x: 38, y: 34, lx: 34, ly: 10, align: "top" },
      { id: "shell", label: "Shell Liners", x: 51, y: 28, lx: 52, ly: 8, align: "top", tone: "accent" },
      { id: "liners", label: "High Quality Fasteners", x: 64, y: 32, lx: 80, ly: 12, align: "top" },
      { id: "trunnion", label: "Discharge Trunnion", x: 88, y: 50, lx: 96, ly: 42, align: "right", tone: "slate" },
      { id: "de", label: "DE Assembly", x: 82, y: 76, lx: 86, ly: 90, align: "bottom", tone: "slate" },
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
      { id: "gear", label: "Ring Gear", x: 20, y: 30, lx: 8, ly: 14, align: "left", tone: "slate" },
      { id: "lining", label: "Lining System", x: 40, y: 30, lx: 36, ly: 10, align: "top", tone: "accent" },
      { id: "diaphragm", label: "Diaphragms", x: 58, y: 34, lx: 64, ly: 12, align: "top", tone: "slate" },
      { id: "fasteners", label: "High Quality Fasteners", x: 86, y: 30, lx: 92, ly: 14, align: "right" },
      { id: "media", label: "Grinding Media", x: 50, y: 68, lx: 50, ly: 88, align: "bottom", tone: "slate" },
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
      { id: "feed", label: "Feed Inlet", x: 48, y: 12, lx: 36, ly: 4, align: "top" },
      { id: "blow", label: "Blow Bars", x: 50, y: 30, lx: 50, ly: 16, align: "top", tone: "accent" },
      { id: "hammers", label: "Hammers", x: 34, y: 52, lx: 14, ly: 48, align: "left" },
      { id: "frame", label: "Frame Liners", x: 74, y: 30, lx: 90, ly: 18, align: "right" },
      { id: "impellers", label: "Impellers", x: 60, y: 46, lx: 82, ly: 46, align: "right" },
      { id: "anvil", label: "Anvil", x: 50, y: 66, lx: 50, ly: 80, align: "bottom" },
      { id: "discharge", label: "Discharge Outlet", x: 78, y: 76, lx: 90, ly: 78, align: "right" },
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
      { id: "classifier", label: "Classifier", x: 52, y: 12, lx: 74, ly: 8, align: "right" },
      { id: "liners", label: "Liner Plates", x: 30, y: 40, lx: 8, ly: 38, align: "left" },
      { id: "rollers", label: "Grinding Rollers", x: 58, y: 50, lx: 80, ly: 46, align: "right", tone: "accent" },
      { id: "table", label: "Roller Table", x: 50, y: 68, lx: 74, ly: 70, align: "right" },
      { id: "discharge", label: "Discharge Outlet", x: 50, y: 90, lx: 50, ly: 98, align: "bottom", tone: "slate" },
    ],
  },
];
