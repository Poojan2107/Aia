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
    // One rubber composite body, three identical Hi-Cr inserts (lighter cast steel), three small bolts.
    roles: (part) => (part.maxDim > 1000 ? "composite" : part.maxDim > 300 ? "compositeInsert" : "bolt"),
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
    id: "mill-sag-explode",
    // Take-apart SAG mill for the products showroom: AIA's full FE + shell + DE assembly with every
    // component group kept separate and a travel direction per part (see convert.mjs _EXPLODE).
    sources: [
      { tag: "FE", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/FE_ASSLY.STL` },
      { tag: "SH", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/SHELL_ASSLY.STL`, dx: 2422 },
      { tag: "DE", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/DE_ASSLY.STL`, mirrorX: 3073, dx: 6415 },
    ],
    aiaRef: "SAG mill FE_SHELL_DE_FULL ASSEMBLY (take-apart)",
    roles: (part) => {
      const tag = part.name.split("/")[0];
      const r = Math.hypot(part.centre[1] - 5148, part.centre[2] - 5148);
      if (part.maxDim < 40) return null; // washers, pins
      if (part.maxDim > 2900) {
        if (tag === "FE") return "millHead:feed-head";
        if (tag === "DE") return "millHead:discharge-head";
        if (r < 500) return "millShell:shell";
        return "metal:shell-liners"; // full-length lifter bars
      }
      if (tag === "SH") return part.maxDim < 400 ? "bolt:fasteners" : "metal:shell-liners";
      if (tag === "FE") return part.maxDim < 400 ? "bolt:fasteners" : "metal:feed-liners";
      return part.maxDim < 150 ? "bolt:fasteners" : "metal:discharge";
    },
    // The shell opens in two halves: the top half lifts away.
    triRole: (c, n, centre, part, role) => (role === "millShell:shell" ? (c[1] > centre[1] ? "millShell:shell-top" : "millShell:shell-bottom") : undefined),
    explode: (part, role) => {
      const tag = part.name.split("/")[0];
      if (role === "millShell:shell-top") return [0, 1, 0];
      if (role === "millShell:shell-bottom") return null;
      if (role === "metal:shell-liners") return "radial";
      if (role === "bolt:fasteners") return tag === "SH" ? "radial" : tag === "FE" ? [-1, 0, 0] : [1, 0, 0];
      if (tag === "FE") return [-1, 0, 0];
      return [1, 0, 0];
    },
    // Reduction per group: shell and heads stay fine (they carry the silhouette); liners, grates and
    // bolts take a coarser tolerance, invisible at showroom size, to keep the file light.
    preSimplify: { default: 0.02, "millShell:shell-top": 0.35, "millShell:shell-bottom": 0.35, "millHead:feed-head": 0.35, "millHead:discharge-head": 0.35, "metal:discharge": 0.008, "bolt:fasteners": 0.02 },
    preSimplifyError: { default: 0.006, "millShell:shell-top": 0.0015, "millShell:shell-bottom": 0.0015, "millHead:feed-head": 0.0015, "millHead:discharge-head": 0.0015, "metal:discharge": 0.01, "bolt:fasteners": 0.012 },
    radialX: true,
    // Internal parts are only ever seen opened (lit or ghosted): no surface textures, so no
    // texture seams doubling their vertices. The shell and heads keep their painted finish.
    plainRoles: ["bolt:fasteners", "metal:feed-liners", "metal:shell-liners", "metal:discharge"],
    meshoptLevel: "high",
  },
  {
    id: "fastener-sag-shell",
    // One AIA shell-liner fastener set (bolt, nut, washers) as fitted on the SAG mill shell
    // (FE_SHELL_DE_FULL ASSEMBLY, bolt SH/stl-3), shown on its own in the showroom.
    sources: [{ tag: "SH", file: `${LIB}/Mining/SAG mill/Mill assembly/STEP/FE_SHELL_DE_FULL ASSEMBLY/SHELL_ASSLY.STL`, dx: 2422 }],
    aiaRef: "SAG mill shell fastener (FE_SHELL_DE_FULL ASSEMBLY)",
    roles: (part) => (part.maxDim < 400 && Math.hypot(part.centre[0] - 4181, part.centre[1] - 3731, part.centre[2] - 415) < 260 ? "bolt" : null),
    simplify: 0.6, simplifyError: 0.0004,
  },
  {
    id: "mill-ball-explode",
    // Take-apart ball mill for the products showroom: AIA's full NGDS assembly (Goldfield, EEPL
    // discharge, integrated composite liners), every component group separate, with a travel
    // direction per part (see convert.mjs _EXPLODE). Axis along X through y = z = 0.
    source: `${LIB}/Mining/Ball mill/Mill assembly/NGDS/STEP/FULL_ASSLY_GOLDFIELD EEPL_WITH INTEGRATED COMPOSITE LINER/FULL_ASSLY_GOLDFIELD EEPL_WITH INTEGRATED COMPOSITE LINER.STEP`,
    aiaRef: "FULL_ASSLY_GOLDFIELD EEPL (ball mill, NGDS, take-apart)",
    roles: (part) => {
      const n = part.name || "";
      const x = part.centre[0];
      if (part.maxDim < 40) return null;
      if (n.startsWith("BOLT/")) return "bolt:fasteners";
      if (/FEED SIDE TRUNION/i.test(n)) return "millHead:feed-head";
      // Next Generation Discharge System = the grate plates and pulp lifters only. The DE filler
      // blocks and bars line the shell end, so they belong to the lining system.
      if (/GRATE|PULP LIFTER/i.test(n)) return "metal:discharge";
      if (/FILLER/i.test(n)) return /RUBBER/i.test(n) ? "rubber:shell-liners" : "metal:shell-liners";
      if (/P00424|AIA_STD_238|W9_5396_12/i.test(n)) return /Rubber/i.test(n) ? "rubber:feed-liners" : "metal:feed-liners";
      if (/Shell Liners|Base Plate|Case Plate|Dase Plate|Lugs|P00479/i.test(n)) return "metal:shell-liners";
      if (part.maxDim > 2900) return x > 4000 ? "millHead:discharge-head" : x < -4000 ? "millHead:feed-head" : "millShell:shell";
      return part.maxDim < 400 ? "bolt:fasteners" : "millShell:shell";
    },
    triRole: (c, n, centre, part, role) => (role === "millShell:shell" ? (c[1] > 0 ? "millShell:shell-top" : "millShell:shell-bottom") : undefined),
    explode: (part, role) => {
      const x = part.centre[0];
      if (role === "millShell:shell-top") return [0, 1, 0];
      if (role === "millShell:shell-bottom") return null;
      if (role.endsWith(":shell-liners")) return "radial";
      if (role === "bolt:fasteners") return Math.abs(x) < 5000 ? "radial" : [Math.sign(x), 0, 0];
      if (role.endsWith(":feed-liners") || role === "millHead:feed-head") return [-1, 0, 0];
      if (role.endsWith(":discharge") || role === "millHead:discharge-head") return [1, 0, 0];
      return null;
    },
    // The Goldfield STEP leaves the bolts out; AIA's FULL MILL_ASSLY STL is the same mill
    // (14492 x 8485 mm) and has them: the bolts on the shell and heads are taken from it.
    extraStl: [{
      tag: "BOLT",
      file: `${LIB}/Mining/Ball mill/Mill assembly/FULL MILL_ASSLY/FULL MILL_ASSLY.STL`,
      dx: -7303, dy: -4285, dz: -4230,
      keep: (q) => q.maxDim > 40 && q.maxDim < 400 && Math.hypot(q.centre[1], q.centre[2]) > 4050,
    }],
    deflectionMm: 6, angular: 0.5,
    preSimplify: { default: 0.02, "millShell:shell-top": 0.35, "millShell:shell-bottom": 0.35, "millHead:feed-head": 0.35, "millHead:discharge-head": 0.35, "metal:shell-liners": 0.012, "metal:discharge": 0.03, "bolt:fasteners": 0.03 },
    preSimplifyError: { default: 0.005, "millShell:shell-top": 0.0012, "millShell:shell-bottom": 0.0012, "millHead:feed-head": 0.0012, "millHead:discharge-head": 0.0012, "bolt:fasteners": 0.01 },
    radialX: true,
    plainRoles: ["bolt:fasteners", "metal:feed-liners", "rubber:feed-liners", "metal:shell-liners", "rubber:shell-liners", "metal:discharge"],
    meshoptLevel: "high",
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
    // Three tones mixed across the heap (scripts/cad/materials.mjs: media, mediaDark, mediaWarm).
    roles: (part) => ["media", "mediaDark", "media", "mediaWarm"][Number(/#(\d+)/.exec(part.name)?.[1] ?? 0) % 4],
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
  // SAG mill product page (/solutions/mining/sag-mill): AIA's SAG product STEP set, one model per
  // product variant shown in the components stack.
  {
    id: "sag-feed-end-liner-composite",
    source: `${LIB}/Mining/SAG mill/Products/STEP/1_SAG_FEED END LINER_COMPOSITE_W9_5693_6_C..STEP`,
    aiaRef: "W9_5693_6_C",
    // Rubber composite body, cast wear inserts, bolts (as the composite ball mill end liner).
    roles: (part) => (part.maxDim > 1000 ? "composite" : part.maxDim > 300 ? "compositeInsert" : "bolt"),
  },
  {
    id: "sag-shell-liner-composite",
    source: `${LIB}/Mining/SAG mill/Products/STEP/3.SAG_SHELL LINER_COMPOSITE_W9_5769_24_D..STEP`,
    aiaRef: "W9_5769_24_D",
    roles: (part) => (part.maxDim > 1000 ? "composite" : part.maxDim > 300 ? "compositeInsert" : "bolt"),
  },
  {
    id: "sag-de-radial-pulp-lifter",
    source: `${LIB}/Mining/SAG mill/Products/STEP/4.SAG_DE ASM RPL_W9_5670_1_K-RPL.STEP`,
    aiaRef: "W9_5670_1_K (SAG DE ASM RPL)",
    // The DE trunnion is mill structure, not the product: left out.
    roles: (part) => (/TRUNION/i.test(part.name) ? null : /RUBBER/i.test(part.name) ? "rubber" : part.maxDim < 120 ? "bolt" : "metal"),
    simplify: 0.08,
    simplifyError: 0.002,
  },
  {
    id: "sag-de-curved-pulp-lifter",
    source: `${LIB}/Mining/SAG mill/Products/STEP/5.SAG_DE ASM CPL_W9_5769_34_B-CPL.STEP`,
    aiaRef: "W9_5769_34_B (SAG DE ASM CPL)",
    roles: (part) => (/RUBBER/i.test(part.name) ? "rubber" : part.maxDim < 120 ? "bolt" : "metal"),
    simplify: 0.12,
    simplifyError: 0.002,
  },
  {
    id: "sag-fasteners-through",
    source: `${LIB}/Mining/SAG mill/Products/STEP/7.SAG_FASTENERS_THROUGH.STEP`,
    aiaRef: "SAG FASTENERS THROUGH",
    roles: () => "bolt",
  },
  {
    id: "sag-fasteners-outside",
    source: `${LIB}/Mining/SAG mill/Products/STEP/8.SAG_FASTENERS_OUTSIDE.STEP`,
    aiaRef: "SAG FASTENERS OUTSIDE",
    roles: () => "bolt",
  },
  // Ball mill product page (/solutions/mining/ball-mill): AIA's ball mill product STEP set.
  ...[
    ["ball-end-liner-steel", "Overflow/STEP/13.BM OVFL_END LINER_STEEL_W9_5498_32..STEP", "W9_5498_32", () => "metal"],
    ["ball-end-liner-rubber", "Overflow/STEP/10.BM OVFL_END LINER_RUBBER_W9_5724_4..STEP", "W9_5724_4", (part) => (part.maxDim < 150 ? "bolt" : "rubber")],
    ["ball-shell-liner-steel", "Overflow/STEP/17.BM OVFL_SHELL LINER_STEEL_W9_5498_34..STEP", "W9_5498_34", () => "metal"],
    ["ball-shell-liner-composite", "Overflow/STEP/15.BM OVFL_SHELL LINER_COMPOSITE_W9_5724_9_B..STEP", "W9_5724_9_B", (part) => (part.maxDim > 1000 ? "composite" : part.maxDim > 300 ? "compositeInsert" : "bolt")],
    ["ball-fasteners-through", "Overflow/STEP/18.BM OVFL_FASTENERS_THROUGH.STEP", "BM OVFL FASTENERS THROUGH", () => "bolt"],
    ["ball-fasteners-channel", "Overflow/STEP/19.BM OVFL_FASTENERS_CHANNEL.STEP", "BM OVFL FASTENERS CHANNEL", () => "bolt"],
    ["ball-fasteners-t-type", "Overflow/STEP/20.BM OVFL_FASTENERS_T-TYPE.STEP", "BM OVFL FASTENERS T-TYPE", () => "bolt"],
    ["ball-fasteners-outside", "NGDS/STEP/35_BM NGDS_FASTENERS_OUTSIDE.STEP", "BM NGDS FASTENERS OUTSIDE", () => "bolt"],
    // Integrated composite (AIA: "Integrated Composite, Bolting: Outside").
    ["ball-end-liner-integrated", "NGDS/STEP/26_BM NGDS_FEED END LINER_INTEGRATED_W9_5396_157_B.STEP", "W9_5396_157_B", (part) => (part.maxDim > 1000 ? "composite" : part.maxDim > 300 ? "compositeInsert" : "bolt")],
    // Every part runs the full 2.4 m length: the wide backing plate is the rubber composite body,
    // the long lifter bars are the cast inserts, the small pieces are fittings.
    ["ball-shell-liner-integrated", "NGDS/STEP/30_BM NGDS_SHELL LINER_INTEGRATED_P01080_6_B SL.STEP", "P01080_6_B", (part) => {
      const d = [part.box[3] - part.box[0], part.box[4] - part.box[1], part.box[5] - part.box[2]].sort((a, b) => a - b);
      return d[1] > 1000 ? "composite" : d[2] > 1000 ? "compositeInsert" : "bolt";
    }],
  ].map(([id, file, aiaRef, roles]) => ({ id, source: `${LIB}/Mining/Ball mill/Products/${file}`, aiaRef, roles })),
  // Verti mill product page: the flight and shoe liners of the decoded screw (see
  // mining-sintercast-verti-mill-liners), each set on its own.
  {
    id: "verti-flight-liners",
    source: "models/_extracted/verti-mill-screw.json",
    aiaRef: "Verty Mill assembly 16461 › VTM 4500 flight liners",
    roles: (part) => (/FLIGHT LINER/i.test(part.name) ? "sinterHicr" : null),
  },
  {
    id: "verti-shoe-liners",
    source: "models/_extracted/verti-mill-screw.json",
    aiaRef: "Verty Mill assembly 16461 › VTM 4500 shoe liners",
    roles: (part) => (/SHOE LINER/i.test(part.name) ? "sinterCeramic" : null),
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
