// Homepage MOC showcase: which AIA CAD file becomes which web model, and which material
// each part gets. Every entry traces to AIA's own STEP library (models/, never committed)
// and to the product as listed on aiaengineering.com. Converted locally; nothing leaves the PC.
//
// Part roles (finishes are defined in materials.mjs):
//   steel   — cast steel / Cr-Mo (matte, dark)        hicr    — Hi-Cr white iron (matte grey)
//   rubber  — rubber (matte black)                    ceramic — ceramic in Sintercast (light, speckled)
//   bolt    — fastener steel
const LIB = "models/Original STEP files repository";

export const products = [
  {
    id: "mining-metal-sag-shell-liner",
    source: `${LIB}/Mining/SAG mill/Products/STEP/2_SAG_SHELL LINER_STEEL_W9_5693_3_E..STEP`,
    aiaRef: "W9_5693_3_E",
    roles: () => "steel",
  },
  {
    id: "mining-rubber-ball-mill-shell-liner",
    source: `${LIB}/Mining/Ball mill/Products/Overflow/STEP/14.BM OVFL_SHELL LINER_RUBBER_W9_5780_4..STEP`,
    aiaRef: "W9_5780_4",
    roles: () => "rubber",
  },
  {
    id: "mining-composite-ball-mill-end-liner",
    source: `${LIB}/Mining/Ball mill/Products/Overflow/STEP/11.BM OVFL_END LINER_COMPOSITE_W9_5724_6..STEP`,
    aiaRef: "W9_5724_6",
    // Hi-Cr inserts (the wear face) up.
    orient: [90, 0, 0],
    // One body (rubber), three identical inserts (Hi-Cr), three small bolts.
    roles: (part) => (part.maxDim > 1000 ? "rubber" : part.maxDim > 300 ? "hicr" : "bolt"),
  },
  {
    id: "thermal-metal-tube-mill-oblique-wave-liner",
    source: `${LIB}/Thermal/Tube mill/Products/Shell Liners/AIA_A1_084_OW_2.STEP`,
    aiaRef: "AIA_A1_084_OW_2",
    roles: () => "hicr",
    // Small part with long gentle curves: keep full tessellation (simplifying shows as facets).
    simplify: 1,
  },
  {
    id: "thermal-sintercast-loesche-lm-roller",
    source: `${LIB}/Thermal/VRM/Products/Loesche/LM/STEP/LM ROLL SINTERCAST.STEP`,
    aiaRef: "V_A1_INS_928 (LM ROLL SINTERCAST)",
    // Named in AIA's CAD: ROLL body, ROLL_INSERT (Hi-Cr), ROLL_CERAMIC.
    roles: (part) => (/CERAMIC/i.test(part.name) ? "ceramic" : /INSERT/i.test(part.name) ? "hicr" : "steel"),
    plainRoles: ["hicr", "ceramic"],
    // Hundreds of small inserts: softer finish and lighter gap shading, so the face reads as one
    // even pattern (as on AIA's Sinter-Cast renders) instead of shimmering as it turns.
    plainRoughness: 0.72,
    aoFloor: { hicr: 0.72, ceramic: 0.72 },
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
    roles: () => "hicr",
    simplify: 1,
  },
  {
    id: "cement-sintercast-loesche-lm-table",
    // AIA's Cement and Thermal LM TABLE SINTERCAST files are identical; converted from the STEP.
    source: `${LIB}/Thermal/VRM/Products/Loesche/LM/STEP/LM TABLE SINTERCAST.STEP`,
    aiaRef: "V_A2_1540_A (LM TABLE SINTERCAST)",
    // Two bodies: the segment casting and its wear layer (where the Sintercast inserts are modelled).
    roles: (part) => (part.minDim < 80 ? "ceramic" : "hicr"),
  },
];
