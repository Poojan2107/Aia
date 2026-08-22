export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Label anchor relative to dot */
  align?: "left" | "right" | "top" | "bottom";
  tone?: "yellow" | "slate";
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
      poster: "/images/mining-mill.png",
      src: "/models/mining.glb",
      alt: "3D cutaway of a mining grinding mill with AIA wear components",
    },
    hotspots: [
      { id: "gear", label: "Ring Gear", x: 22, y: 30, align: "left", tone: "slate" },
      { id: "feed", label: "Feed End Liners", x: 34, y: 38, align: "top" },
      { id: "shell", label: "Shell Liners", x: 48, y: 30, align: "top" },
      {
        id: "liners",
        label: "High Quality Fasteners",
        x: 78,
        y: 32,
        align: "right",
      },
      {
        id: "trunnion",
        label: "Discharge Trunnion",
        x: 88,
        y: 50,
        align: "right",
        tone: "slate",
      },
      { id: "de", label: "DE Assembly", x: 72, y: 68, align: "bottom", tone: "slate" },
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
      poster: "/images/cement-mill.png",
      src: "/models/cement.glb",
      alt: "3D cement tube mill with AIA wear solutions",
    },
    hotspots: [
      { id: "gear", label: "Ring Gear", x: 28, y: 22, align: "left", tone: "slate" },
      { id: "lining", label: "Lining System", x: 42, y: 28, align: "top" },
      { id: "diaphragm", label: "Diaphragms", x: 61, y: 37, align: "right", tone: "slate" },
      { id: "fasteners", label: "High Quality Fasteners", x: 84, y: 34, align: "right" },
      { id: "media", label: "Grinding Media", x: 56, y: 73, align: "bottom", tone: "slate" },
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
      poster: "/images/quarry-mill.png",
      src: "/models/quarry.glb",
      alt: "3D quarry crusher with AIA wear protection",
    },
    hotspots: [
      { id: "feed", label: "Feed Inlet", x: 22, y: 22, align: "left" },
      { id: "blow", label: "Blow Bars", x: 48, y: 38, align: "top" },
      { id: "hammers", label: "Hammers", x: 40, y: 58, align: "left" },
      { id: "anvil", label: "Anvil", x: 55, y: 72, align: "bottom" },
      { id: "impellers", label: "Impellers", x: 62, y: 48, align: "right" },
      { id: "frame", label: "Frame Liners", x: 70, y: 34, align: "right" },
      { id: "discharge", label: "Discharge Outlet", x: 78, y: 70, align: "right" },
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
      poster: "/images/thermal-mill.png",
      src: "/models/thermal.glb",
      alt: "3D thermal power vertical roller mill",
    },
    hotspots: [
      { id: "classifier", label: "Classifier", x: 52, y: 14, align: "top" },
      { id: "liners", label: "Liner Plates", x: 28, y: 42, align: "left" },
      { id: "rollers", label: "Grinding Rollers", x: 62, y: 48, align: "right" },
      { id: "table", label: "Roller Table", x: 48, y: 72, align: "bottom" },
      {
        id: "discharge",
        label: "Discharge Outlet",
        x: 50,
        y: 88,
        align: "bottom",
        tone: "slate",
      },
    ],
  },
];
