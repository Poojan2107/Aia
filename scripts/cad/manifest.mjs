// Homepage MOC showcase: which AIA CAD file becomes which web model, and which material
// each part gets. Every entry traces to AIA's own STEP library (models/, never committed)
// and to the product as listed on aiaengineering.com. Converted locally; nothing leaves the PC.
//
// Part roles (finishes in materials.mjs): one look per MOC, the same in every industry.
//   metal         — every Metal MOC part, and supporting steel     rubber — rubber (matte black)
//   sinterHicr    — Hi-Cr parts of Sintercast products (dark grey)  bolt   — fastener steel
//   sinterCeramic — the Sintercast part itself (light grey)
const LIB = "models/Original STEP files repository";

export const products = [
  {
    id: "mining-metal-sag-shell-liner",
    source: `${LIB}/Mining/SAG mill/Products/STEP/2_SAG_SHELL LINER_STEEL_W9_5693_3_E..STEP`,
    aiaRef: "W9_5693_3_E",
    roles: () => "metal",
    // AIA (2026-11-16): remove part markings; the raised marking (brep faces 628-659) stands on a
    // face perpendicular to Y.
    flattenFaces: { from: 628, to: 659, axis: 1 },
  },
  {
    id: "mining-rubber-ball-mill-shell-liner",
    source: `${LIB}/Mining/Ball mill/Products/Overflow/STEP/14.BM OVFL_SHELL LINER_RUBBER_W9_5780_4..STEP`,
    aiaRef: "W9_5780_4",
    roles: () => "rubber",
    // AIA (2026-11-17): remove the raised "SL1" part marking (brep faces 10-66) from the top face (6).
    flattenFaces: { from: 10, to: 66, onto: 6 },
  },
  {
    id: "mining-composite-ball-mill-end-liner",
    source: `${LIB}/Mining/Ball mill/Products/Overflow/STEP/11.BM OVFL_END LINER_COMPOSITE_W9_5724_6..STEP`,
    aiaRef: "W9_5724_6",
    // Hi-Cr inserts (the wear face) up.
    orient: [90, 0, 0],
    // One body (rubber), three identical inserts (Hi-Cr), three small bolts.
    roles: (part) => (part.maxDim > 1000 ? "rubber" : part.maxDim > 300 ? "metal" : "bolt"),
  },
  {
    id: "mining-sintercast-verti-mill-liners",
    // AIA shared the Verti Mill only as 3D PDFs (compressed PRC). The screw sub-assembly
    // (SHAFT_CURVE_LINER_Assem_16461) was decoded locally from "Verty Mill_Assem_Open Door.pdf"
    // with pdf-3d-extractor's prc-decoder.js, offline, into models/_extracted (git-ignored).
    // Bolts, nuts and washers are left out (hidden under the liners, 1.4M triangles).
    source: "models/_extracted/verti-mill-screw.json",
    aiaRef: "Verty Mill assembly 16461 › VTM 4500 flight and shoe liners",
    roles: (part) => (/FLIGHT LINER/i.test(part.name) ? "sinterHicr" : /SHOE LINER/i.test(part.name) ? "sinterCeramic" : "metal"),
  },
  {
    id: "mill-ball-full",
    // The whole ball mill, closed and round (shell, heads, trunnions, bands): AIA's own full-mill
    // export. Shown first; the cut-away (mill-ball-ngds) takes over to show the liners. The inner
    // liner pieces (hidden inside, ~47k triangles each) and fasteners are left out.
    source: `${LIB}/Mining/Ball mill/Mill assembly/FULL MILL_ASSLY/FULL MILL_ASSLY.STL`,
    aiaRef: "FULL MILL_ASSLY (ball mill)",
    roles: (part) => (part.maxDim < 2900 ? null : "millShell:outer"),
    // Colour by surface: trunnions (near the axis) bare steel; faces turned along the axis
    // (heads, band sides) deep blue; the cylinder steel blue.
    triRole: (c, n, centre) => {
      const r = Math.hypot(c[1] - centre[1], c[2] - centre[2]);
      if (r < 2400) return "millTrunnion:outer";
      // The cylinder sits at the full shell radius; hole walls in the heads sit lower.
      return Math.abs(n[0]) > 0.3 || r < 3850 ? "millHead:outer" : "millShell:outer";
    },
    preSimplify: 0.3, preSimplifyError: 0.0006, simplifyError: 0.0004, radialX: true,
    // Baked AO smears along the long shell triangles (creases); the closed mill hardly needs it.
    aoFloor: { "millShell:outer": 0.92, "millHead:outer": 0.85, "millTrunnion:outer": 0.7 },
  },
  {
    id: "mill-sag-full",
    // AIA's full SAG mill: feed end, shell and discharge end, each exported in its own frame
    // (trunnion at x=0). The shell is seated on the feed head (head flange at 2449 mm); the discharge end
    // is mirrored and seated on the shell's far end.
    sources: [
      { tag: "FE", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/FE_ASSLY.STL` },
      { tag: "SH", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/SHELL_ASSLY.STL`, dx: 2422 },
      { tag: "DE", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/DE_ASSLY.STL`, mirrorX: 3073, dx: 6415 },
    ],
    aiaRef: "SAG mill FE_SHELL_DE_FULL ASSEMBLY",
    roles: (part) => (part.maxDim < 2900 ? null : "millShell:outer"),
    triRole: (c, n, centre) => {
      const r = Math.hypot(c[1] - centre[1], c[2] - centre[2]);
      if (r < 1700) return "millTrunnion:outer";
      return Math.abs(n[0]) > 0.3 || r < 4900 ? "millHead:outer" : "millShell:outer";
    },
    preSimplify: 0.3, preSimplifyError: 0.0006, simplifyError: 0.0004, radialX: true,
    aoFloor: { "millShell:outer": 0.92, "millHead:outer": 0.85, "millTrunnion:outer": 0.7 },
  },
  {
    id: "mill-sag-cut",
    // The same SAG mill cut in half along its axis (the half facing the camera removed), so the
    // feed-end liners, shell liners and discharge end inside can be lit on hover.
    sources: [
      { tag: "FE", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/FE_ASSLY.STL` },
      { tag: "SH", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/SHELL_ASSLY.STL`, dx: 2422 },
      { tag: "DE", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/DE_ASSLY.STL`, mirrorX: 3073, dx: 6415 },
    ],
    aiaRef: "SAG mill FE_SHELL_DE_FULL ASSEMBLY (cut away)",
    roles: (part) => {
      if (part.maxDim < 250) return null; // fasteners
      if (part.maxDim > 2900) return "millBody:body"; // shell and heads
      if (part.name.startsWith("FE/")) return "metal:feed-liners";
      if (part.name.startsWith("SH/")) return "metal:shell-liners";
      return "metal:discharge";
    },
    cutAway: () => ([, , z]) => z > 5150,
    preSimplify: { default: 0.04, "millBody:body": 0.3 }, preSimplifyError: 0.001, simplifyError: 0.0006,
  },
  {
    id: "mill-ball-goldfield",
    // AIA's full NGDS ball mill assembly (Goldfield, EEPL discharge, integrated composite liners).
    source: `${LIB}/Mining/Ball mill/Mill assembly/NGDS/STEP/FULL_ASSLY_GOLDFIELD EEPL_WITH INTEGRATED COMPOSITE LINER/FULL_ASSLY_GOLDFIELD EEPL_WITH INTEGRATED COMPOSITE LINER.STEP`,
    aiaRef: "FULL_ASSLY_GOLDFIELD EEPL (ball mill, NGDS)",
    roles: () => "metal",
    deflectionMm: 15, angular: 0.6,
  },
  {
    id: "mill-verti",
    // The whole Verti Mill, decoded locally from "Verty Mill_Assem_Open Door.pdf" (as the screw
    // above). Hidden alternate states and the 1.4M-triangle fastener set are left out.
    source: "models/_extracted/verti-mill-full.json",
    aiaRef: "Verty Mill assembly 16461 (open door)",
    roles: (part) => {
      if (/BOLT_NUT_WASHER|Hinge Bolt/i.test(part.name)) return null;
      if (/FLIGHT LINER/i.test(part.name)) return "sinterHicr:liners";
      if (/SHOE LINER/i.test(part.name)) return "sinterCeramic:liners";
      if (/SHAFT/i.test(part.name)) return "metal:shaft";
      if (/Magnatic Liner/i.test(part.name)) return "metal:wall-liners";
      return "millBody:body";
    },
    // The screw sub-assembly comes out 3.5 m low; lift it into the grinding chamber.
    offset: (part) => (/SHAFT_CURVE_LINER/i.test(part.name) ? [0, 3500, 0] : [0, 0, 0]),
    // The chamber is closed: cut away its front quarter (towards the camera, up to the top of
    // the grinding chamber) so the screw and its liners show.
    cutAway: (part) => (/SHAFT_CURVE_LINER/i.test(part.name) ? null : ([x, y, z]) => x > -200 && z > -200 && y > -100 && y < 5700),
    preSimplify: 0.5, preSimplifyError: 0.002, simplify: 0.5, simplifyError: 0.002,
  },
  {
    id: "quarry-metal-blow-bar",
    // AIA's Quarry parts exist only as 3D PDFs; decoded locally (as the Verti Mill above).
    source: "models/_extracted/quarry-blow-bar.json",
    aiaRef: "Quarry › BLOW BAR (14263_P00277_REV_2)",
    // Stored on its edge in the CAD; laid flat, wide face up, as on AIA's product photo.
    orient: [0, 0, 90],
    roles: () => "metal",
    simplify: 1,
  },
  {
    id: "quarry-sintercast-hammer",
    source: "models/_extracted/quarry-hammer.json",
    aiaRef: "Quarry › HAMMER (9544)",
    // Stored eye-down in the CAD; eye up, as on AIA's product photo.
    orient: [0, 0, 180],
    // One solid in AIA's CAD (ceramic not modelled): the Hi-Cr body, as on the other Sintercast products.
    roles: () => "sinterHicr",
  },
  {
    id: "grinding-media-hicr",
    // AIA has no grinding media CAD ("NA" in AIA's STEP matrix); AIA (Malay, 2026-11-17) approved
    // balls that look like grinding media: generated by scripts/cad/grinding-media.py.
    source: "models/_extracted/grinding-media.json",
    aiaRef: "Hi-Cr grinding media (generated, AIA-approved; no AIA CAD)",
    roles: () => "media",
    simplify: 1,
  },
  {
    id: "quarry-hammer",
    // Quarry products page: the same AIA hammer in the standard Metal finish (the homepage
    // Sintercast tab uses quarry-sintercast-hammer).
    source: "models/_extracted/quarry-hammer.json",
    aiaRef: "Quarry › HAMMER (9544)",
    orient: [0, 0, 180],
    roles: () => "metal",
  },
  {
    id: "quarry-anvil",
    // AIA Quarry part, 3D PDF only: decoded locally (see quarry-metal-blow-bar).
    source: "models/_extracted/quarry-anvil.json",
    aiaRef: "Quarry › ANVIL (11549)",
    roles: () => "metal",
  },
  {
    id: "quarry-feed-disk",
    // AIA Quarry part, 3D PDF only: decoded locally (see quarry-metal-blow-bar).
    source: "models/_extracted/quarry-feed-disk.json",
    aiaRef: "Quarry › FEED DISK (11555)",
    roles: () => "metal",
  },
  {
    id: "quarry-frame-liner",
    // AIA Quarry part, 3D PDF only: decoded locally (see quarry-metal-blow-bar).
    source: "models/_extracted/quarry-frame-liner.json",
    aiaRef: "Quarry › FRAME LINER (12735)",
    roles: () => "metal",
  },
  {
    id: "quarry-impeller",
    // AIA Quarry part, 3D PDF only: decoded locally (see quarry-metal-blow-bar).
    source: "models/_extracted/quarry-impeller.json",
    aiaRef: "Quarry › IMPELLER (11550)",
    roles: () => "metal",
  },
  {
    id: "mining-sag-ngds-de",
    // Mining solutions orbit: SAG mill Next Gen Discharge System (DE assembly).
    source: `${LIB}/Mining/SAG mill/Products/STEP/6.SAG_DE ASM NGDS_W9_5693_26_J-NGDS.STEP`,
    aiaRef: "W9_5693_26_J (SAG DE ASM NGDS)",
    roles: (part) => (/RUBBER/i.test(part.name) ? "rubber" : part.maxDim < 120 ? "bolt" : "metal"),
    deflection: 0.0015,
    angular: 0.3,
    simplify: 0.15,
    simplifyError: 0.002,
  },
  {
    id: "mining-ball-ngds-mill",
    // Mining solutions orbit: Ball mill with Next Gen DE System (full assembly, rubber lined).
    source: `${LIB}/Mining/Ball mill/Mill assembly/NGDS/STEP/23_BM NGDS_FULL ASM_RUBBER_W9_5756_26_C.STEP`,
    aiaRef: "W9_5756_26_C (BM NGDS FULL ASM RUBBER)",
    roles: (part) => (/RUBBER/i.test(part.name) ? "rubber" : part.maxDim < 120 ? "bolt" : "metal"),
    deflection: 0.0015,
    angular: 0.3,
    simplify: 0.15,
    simplifyError: 0.002,
  },
  {
    id: "mill-ball-ngds",
    // Mining solutions: AIA's full ball mill (cut-away, composite liners, Next Gen DE System).
    // Parts are grouped by position along the mill axis (x): FE trunnion ends at ~720 mm, the DE
    // assembly starts at ~11,100 mm. Groups become named materials the page can highlight.
    source: `${LIB}/Mining/Ball mill/Mill assembly/NGDS/STEP/22_BM NGDS_FULL ASM_COMPOSITE_W9_5678_78_D.STEP`,
    aiaRef: "W9_5678_78_D (BM NGDS FULL ASM COMPOSITE)",
    roles: (part) => {
      if (/TRUNION/i.test(part.name)) return "millBody:body";
      // Fasteners sit inside, hidden: left out to keep the web model light.
      if (part.maxDim < 130 || /BOLT|WASHER|NUT|_CW|_RW|SPACER|PLUG|SLEEVE|HEXPIN/i.test(part.name)) return null;
      const x = part.centre[0];
      if (x > 11000) return "metal:discharge";
      if (x < 900) return "metal:feed-liners";
      return "metal:shell-liners";
    },
    deflectionMm: 8,
    angular: 0.5,
    simplify: 0.05,
    simplifyError: 0.002, preSimplify: 0.1, preSimplifyError: 0.004,
  },
  {
    id: "thermal-metal-tube-mill-oblique-wave-liner",
    source: `${LIB}/Thermal/Tube mill/Products/Shell Liners/AIA_A1_084_OW_2.STEP`,
    aiaRef: "AIA_A1_084_OW_2",
    roles: () => "metal",
    // Small part with long gentle curves: keep full tessellation (simplifying shows as facets).
    simplify: 1,
  },
  {
    id: "thermal-sintercast-loesche-lm-roller",
    source: `${LIB}/Thermal/VRM/Products/Loesche/LM/STEP/LM ROLL SINTERCAST.STEP`,
    aiaRef: "V_A1_INS_928 (LM ROLL SINTERCAST)",
    // Named in AIA's CAD: ROLL body, ROLL_INSERT (Hi-Cr), ROLL_CERAMIC.
    roles: (part) => (/CERAMIC/i.test(part.name) ? "sinterCeramic" : /INSERT/i.test(part.name) ? "sinterHicr" : "metal"),
    plainRoles: ["sinterHicr", "sinterCeramic"],
    // Hundreds of small inserts: softer finish and lighter gap shading, so the face reads as one
    // even pattern (as on AIA's Sinter-Cast renders) instead of shimmering as it turns.
    plainRoughness: 0.72,
    aoFloor: { sinterHicr: 0.72, sinterCeramic: 0.72 },
    // 177 parts / 1.1M triangles in the CAD: coarser tessellation, then simplify for the web.
    deflection: 0.0012,
    angular: 0.3,
    simplify: 0.12,
    simplifyError: 0.003,
  },
  {
    id: "cement-metal-tube-mill-liner",
    // Cut locally from AIA's Cement tube mill assembly (FCB 4800, "CHROME"): part IIE2.
    // scripts/cad/step-extract.py → models/_extracted/ (git-ignored with models/).
    source: "models/_extracted/cement-tube-IIE2.STEP",
    aiaRef: "TOTAL_TUBE_MILL_ASSLY_FCB_4800_CHROME › IIE2",
    // Wave (wear) face up.
    orient: [-90, 0, 0],
    roles: () => "metal",
    simplify: 1,
  },
  {
    id: "cement-sintercast-loesche-lm-table",
    // AIA's Cement and Thermal LM TABLE SINTERCAST files are identical; converted from the STEP.
    source: `${LIB}/Thermal/VRM/Products/Loesche/LM/STEP/LM TABLE SINTERCAST.STEP`,
    aiaRef: "V_A2_1540_A (LM TABLE SINTERCAST)",
    // Two bodies: the segment casting and its wear layer (where the Sintercast inserts are modelled).
    roles: (part) => (part.minDim < 80 ? "sinterCeramic" : "sinterHicr"),
  },
];
