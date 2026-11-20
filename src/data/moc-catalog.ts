/**
 * Materials of construction (MOC) showcase — single source of truth.
 *
 * Tabs per industry follow AIA's MOC list (docs/MOC.docx). Every product, spec and line of
 * copy comes from aiaengineering.com or AIA's approved Homepage Content Master; every 3D model
 * is converted locally from AIA's own STEP library (scripts/cad, models/ — never committed).
 * An entry without `model` is not shown until AIA's CAD for it is converted.
 */
export type MocEntry = {
  id: string;
  /** MOC name exactly as in AIA's MOC list. */
  moc: string;
  /** Product shown, as named on aiaengineering.com. */
  product: string;
  /** Specification facts as published on aiaengineering.com. */
  specs: string[];
  body: [string, string];
  /** Web model converted from AIA's CAD (public/models/catalog). */
  model?: string;
  /** AIA's own product image from aiaengineering.com, used where AIA's CAD exists only as a 3D PDF. */
  image?: string;
  /** AIA drawing / file reference the model was converted from. */
  aiaRef?: string;
  /** Optional camera framing override for the 3D viewer. */
  orbit?: string;
  /** Optional point the camera looks at (model-viewer camera-target, metres), for tall models. */
  target?: string;
  /** Optional floor shadow strength for the 3D viewer (default 1.25). */
  shadow?: number;
  /** Optional camera field of view for the 3D viewer (default 30deg). */
  fov?: string;
};

export type MocIndustry = {
  id: "mining" | "cement" | "quarry" | "thermal";
  label: string;
  route: string;
  cta: string;
  entries: MocEntry[];
};

const media30 = (industry: string): MocEntry => ({
  id: `${industry}-media`,
  moc: "Hi-Cr Grinding Media",
  product: "Hi-Cr Grinding Media",
  specs: ["Hi-Chrome: up to 30% Cr", "Size: 12.5 mm – 100 mm"],
  body: [
    "Hi-Cr grinding media with up to 30% chromium, supplied in sizes from 12.5 mm to 100 mm.",
    "Marked Ball Test (MBT) for a cost-effective alloy, backed by a performance guarantee.",
  ],
  // AIA has no CAD for grinding media ("NA" in AIA's STEP matrix); AIA (Malay, 2026-11-17)
  // approved balls that look like grinding media: generated (scripts/cad/grinding-media.py).
  model: "/models/catalog/grinding-media-hicr.glb",
  aiaRef: "Hi-Cr grinding media (generated, AIA-approved)",
  // Straight on, as AIA's grinding media photo the balls are arranged after; balls are placed as
  // in the photo (some above the floor), so the floor shadow is kept faint.
  orbit: "0deg 86deg 76%",
  shadow: 0.35,
  // Long-lens view like the photo, so the balls overlap as they do there.
  fov: "10deg",
});

export const mocCatalog: MocIndustry[] = [
  {
    id: "mining",
    label: "Mining",
    route: "mining-products",
    cta: "Explore Mining Products",
    entries: [
      {
        id: "mining-metal",
        moc: "Metal (Cr-Mo / Hi-Cr)",
        product: "SAG Mill Shell Liner",
        specs: ["SAG Mill", "M.O.C: Steel", "Bolting: Through"],
        // AIA-approved copy (Homepage Content Master, 05 Materials & Metallurgy).
        body: [
          "Engineered for demanding grinding environments, our wear-resistant metal alloys are developed to provide the strength, toughness and abrasion resistance required by critical mill components.",
          "Combining metallurgical expertise with application-specific design, these material solutions help support component reliability, improved wear life and consistent mill performance.",
        ],
        model: "/models/catalog/mining-metal-sag-shell-liner.glb",
        aiaRef: "W9_5693_3_E",
      },
      {
        id: "mining-rubber",
        moc: "Rubber",
        product: "Ball Mill Shell Liner",
        specs: ["Overflow Ball Mill", "M.O.C: Rubber", "Bolting: Channel Type"],
        body: [
          "Rubber shell liners for overflow ball mills, fixed with channel-type bolting.",
          "Part of AIA's advanced lining systems for ball mills, offered alongside composite, integrated composite and steel/white iron.",
        ],
        model: "/models/catalog/mining-rubber-ball-mill-shell-liner.glb",
        aiaRef: "W9_5780_4",
      },
      {
        id: "mining-composite",
        moc: "Composite",
        product: "Ball Mill End Liner",
        specs: ["Overflow Ball Mill", "M.O.C: Composite", "Bolting: Channel Type"],
        body: [
          "Composite end liners (feed and discharge) for overflow ball mills, fixed with channel-type bolting.",
          "Part of AIA's advanced lining systems for ball mills, offered alongside rubber, integrated composite and steel/white iron.",
        ],
        model: "/models/catalog/mining-composite-ball-mill-end-liner.glb",
        aiaRef: "W9_5724_6",
      },
      {
        id: "mining-sintercast",
        moc: "Sintercast®",
        product: "Verti Mill Liners",
        specs: ["Verti Mill", "Flight and shoe liners", "Sintercast alloy"],
        body: [
          "Shoe liners in Sintercast alloy (Hi-Cr iron embedded with ceramic particles), reducing wear on the shoe liners.",
          "Sintercast has 3X life expectancy compared to Hi-Cr, for fewer replacement cycles and increased mill availability.",
        ],
        // AIA's Verti Mill CAD exists only as 3D PDFs: the screw (VTM 4500 flight and shoe liners)
        // was decoded locally from AIA's assembly PDF (scripts/cad/manifest.mjs). Colours per AIA
        // (Malay, 2026-11-17): flight liners dark grey, shoe liners light grey.
        model: "/models/catalog/mining-sintercast-verti-mill-liners.glb",
        aiaRef: "Verty Mill assembly 16461 › VTM 4500 flight and shoe liners",
        // Framed on the liner section from the side, as in AIA's own Verti Mill views (the full
        // shaft is 9 m tall; it stays in the model and shows when the visitor turns or zooms out).
        orbit: "-20deg 76deg 70%",
        target: "0m -1.7m 0m",
      },
      media30("mining"),
    ],
  },
  {
    id: "cement",
    label: "Cement",
    route: "cement-products",
    cta: "Explore Cement Products",
    entries: [
      {
        id: "cement-metal",
        moc: "Metal (Hi-Cr)",
        product: "Tube Mill 2nd Chamber Liner",
        specs: ["Tube Mill · 2nd Chamber", "M.O.C: Metal (Hi-Cr)"],
        body: [
          "Lining systems for cement tube mills: feed head liners, 1st chamber liners and 2nd chamber / mono chamber liners in Metal (Steel/Hi-Cr).",
          "Complemented by drying chamber, level control and outlet diaphragms, and grinding media.",
        ],
        // Cut locally from AIA's Cement tube mill assembly (FCB 4800, CHROME), part IIE2. AIA's
        // position codes (drawing 2124233/907 S/22): "I…" = 1st compartment, "II…" = 2nd compartment.
        model: "/models/catalog/cement-metal-tube-mill-liner.glb",
        aiaRef: "TOTAL_TUBE_MILL_ASSLY_FCB_4800_CHROME › IIE2",
      },
      {
        id: "cement-sintercast",
        moc: "Sintercast®",
        product: "VRM Table Segment (Loesche LM)",
        specs: ["Loesche LM 15.2 – LM 74.4", "Hi-Cr · Sinter-Cast · V-Cast"],
        body: [
          "Table segments and rollers for Loesche vertical roller mills, offered in Hi-Cr, Sinter-Cast and V-Cast.",
          "AIA also supplies roller and table segments for FLS, Pfeiffer and Polysius vertical roller mills.",
        ],
        // AIA's Cement and Thermal Loesche LM table files are identical: converted from
        // LM TABLE SINTERCAST.STEP (the Thermal tab shows the matching roller).
        model: "/models/catalog/cement-sintercast-loesche-lm-table.glb",
        aiaRef: "V_A2_1540_A",
      },
      media30("cement"),
    ],
  },
  {
    id: "quarry",
    label: "Quarry",
    route: "quarry-products",
    cta: "Explore Quarry Products",
    entries: [
      {
        id: "quarry-metal",
        moc: "Mono Metal",
        product: "Blow Bars",
        specs: ["Impact crushers"],
        body: [
          "An impact-resistant, non-conventional alloy for maximum crushing efficiency.",
          "Supplied as weight-balanced sets to take care of rotor vibration, for a uniform wear profile and long lifespan.",
        ],
        // AIA's CAD exists only as a 3D PDF (Quarry/BLOW BAR): decoded locally (scripts/cad/manifest.mjs).
        model: "/models/catalog/quarry-metal-blow-bar.glb",
        aiaRef: "Quarry › BLOW BAR (14263_P00277_REV_2)",
      },
      {
        id: "quarry-sintercast",
        moc: "Sintercast®",
        product: "Hammers with Ceramic",
        specs: ["Impact crushers", "With ceramic"],
        body: [
          "Constructed with a superior alloy, AIA's hammers come with differential hardening to curb breakage at the shank, offered with or without ceramic.",
          "Supplied in in-house weight-balanced condition to take care of rotor vibration, for high crushing efficiency and a uniform wear profile.",
        ],
        // AIA defines Sintercast as Hi-Cr iron embedded with ceramic particles; the Quarry page offers
        // hammers "with ceramic". AIA's CAD exists only as a 3D PDF (Quarry/HAMMER): decoded locally.
        model: "/models/catalog/quarry-sintercast-hammer.glb",
        aiaRef: "Quarry › HAMMER (9544)",
        // A tall, compact part: a wider framing keeps the whole hammer clear of the stage edges.
        orbit: "35deg 68deg 128%",
      },
    ],
  },
  {
    id: "thermal",
    label: "Thermal",
    route: "thermal-power-products",
    cta: "Explore Thermal Products",
    entries: [
      {
        id: "thermal-metal",
        moc: "Metal (Hi-Cr)",
        product: "Tube Mill Shell Liner (Oblique Wave)",
        specs: ["Tube Mill", "M.O.C: Metal (Hi-Cr)"],
        body: [
          "Oblique wave shell liners for thermal power tube mills, in Hi-Cr.",
          "Part of AIA's tube mill lining system: inlet side end liners and long conical, short conical, oblique wave and cylindrical shell liners.",
        ],
        model: "/models/catalog/thermal-metal-tube-mill-oblique-wave-liner.glb",
        aiaRef: "AIA_A1_084_OW_2",
      },
      {
        id: "thermal-sintercast",
        moc: "Sintercast®",
        product: "VRM Grinding Roller (Loesche LM)",
        specs: ["Loesche LM 12.2 – LM 43.4", "Sinter-Cast"],
        body: [
          "Grinding rollers and table segments for Loesche vertical roller mills, offered in Sinter-Cast and V-Cast.",
          "Sintercast is AIA's Hi-Cr iron embedded with ceramic particles.",
        ],
        model: "/models/catalog/thermal-sintercast-loesche-lm-roller.glb",
        aiaRef: "V_A1_INS_928",
      },
      {
        id: "thermal-media",
        moc: "Hi-Cr Grinding Media",
        product: "Hi-Cr Grinding Media",
        specs: ["Hi-Chrome: up to 18% Cr", "Size: 20 mm – 80 mm"],
        body: [
          "Hi-Cr grinding media with up to 18% chromium, supplied in sizes from 20 mm to 80 mm.",
          "Marked Ball Test (MBT) for a cost-effective alloy, backed by a performance guarantee.",
        ],
        // Same grinding media model as the other tabs (see media30 above).
        model: "/models/catalog/grinding-media-hicr.glb",
        aiaRef: "Hi-Cr grinding media (generated, AIA-approved)",
        orbit: "0deg 86deg 76%",
        shadow: 0.35,
        fov: "10deg",
      },
    ],
  },
];

/** Entries that have a real converted AIA model (what the homepage shows today). */
export const readyEntries = (industry: MocIndustry) => industry.entries.filter((e) => e.model);
