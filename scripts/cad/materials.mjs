// Physically based finishes per material role, tuned against the HDR studio
// (public/models/env/studio.hdr). Cast products are dark and matte like real castings, not
// polished silver (AIA feedback, Malay 2026-11-13): sand-cast grain (normal map), roughness
// variation and tone mottling (base colour map) so they read as cast iron rather than smooth CAD.
// Matched to AIA's product photos and renders, and Malay's feedback (dark, matte castings, not
// polished silver): mid-dark steel grey that still reads as metal (clear soft reflections from
// the studio), fine sand-cast grain, and recesses darker (baked AO; aoFloor = how dark a fully
// enclosed corner gets). Clearly lighter than rubber, as AIA's own renders show them.
// Painted steel for whole mills (shells, heads, structure): the same cast grain and tone
// mottling as the castings, but stretched over metres (tile) and barely raised, so a mill reads as
// weathered painted plate rather than a smooth plastic CAD body.
const paint = { colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.1, mrMap: "cast-mr.jpg", tile: 0.8 };
const cast = { colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.18, mrMap: "cast-mr.jpg", tile: 0.12, aoFloor: 0.5 };
// One look per MOC, the same in every industry:
//   metal         — every "Metal" MOC (Cr-Mo / Hi-Cr / steel castings), and supporting steel
//                   (Verti Mill shaft, Loesche roller body, composite inserts)
//   sinterHicr    — the Hi-Cr parts of Sintercast products: dark grey (AIA, Malay 2026-11-17)
//   sinterCeramic — the Sintercast part itself (ceramic inserts, shoe liners, hammer with
//                   ceramic): light grey (AIA, Malay 2026-11-17)
export const finishes = {
  metal: { color: [0.23, 0.235, 0.245], metallic: 0.88, roughness: 0.78, ...cast },
  sinterHicr: { color: [0.085, 0.087, 0.092], metallic: 0.85, roughness: 0.8, ...cast },
  sinterCeramic: { color: [0.42, 0.425, 0.432], metallic: 0.62, roughness: 0.82, ...cast },
  // Rubber (AIA feedback 2026-11-16): a black that contrasts with the metal grey, matte and slightly
  // rough like moulded rubber. The same rubber and metal shades are used on every product.
  // Composite liners (AIA feedback 2026-11-20: rubber and composite must each look like what they
  // are). composite = the liner body, real rubber: near-black, a fine moulded grain and the soft,
  // low sheen of rubber. compositeInsert = the composite wear inserts: mid grey, dull and
  // non-metallic, with a speckled grain (light and dark grains in a grey matrix,
  // scripts/cad/tex/composite-color.jpg), clearly a different material from the rubber.
  composite: { color: [0.032, 0.033, 0.036], metallic: 0, roughness: 0.74, normalMap: "rubber-normal.jpg", normalScale: 0.85, tile: 0.04, aoFloor: 0.5 },
  compositeInsert: { color: [0.36, 0.362, 0.37], metallic: 0.12, roughness: 0.92, colorMap: "composite-color.jpg", normalMap: "cast-normal.jpg", normalScale: 1.4, mrMap: "cast-mr.jpg", tile: 0.06, aoFloor: 0.45 },
  rubber: { color: [0.04, 0.041, 0.044], metallic: 0, roughness: 0.86, normalMap: "rubber-normal.jpg", normalScale: 1.1, tile: 0.05, aoFloor: 0.5 },
  // Hi-Cr grinding media (its own MOC), matched to photos of as-cast high-chrome balls (AIA feedback
  // 2026-11-20): dark charcoal grey, fairly smooth with a dull, soft and broad sheen (never a sharp
  // or mirror highlight), large dusty blotches and faint casting marks rather than a fine grain.
  // Three tones are mixed across the balls, as in a real heap: charcoal, a darker one and one with
  // a slight warm, rusty cast.
  media: { color: [0.128, 0.129, 0.134], metallic: 0.4, roughness: 0.82, colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.12, mrMap: "cast-mr.jpg", tile: 0.16, aoFloor: 0.4 },
  mediaDark: { color: [0.081, 0.082, 0.087], metallic: 0.4, roughness: 0.8, colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.12, mrMap: "cast-mr.jpg", tile: 0.18, aoFloor: 0.4 },
  mediaWarm: { color: [0.14, 0.126, 0.115], metallic: 0.32, roughness: 0.82, colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.12, mrMap: "cast-mr.jpg", tile: 0.14, aoFloor: 0.4 },
  // Whole mills, in the muted steel blues of AIA's mill renders: shell plate, deeper heads and
  // band faces, bare machined steel trunnions. millBody is the structure around cut-away liners.
  millShell: { color: [0.3, 0.36, 0.45], metallic: 0.55, roughness: 0.5, ...paint, aoFloor: 0.6 },
  millHead: { color: [0.15, 0.2, 0.31], metallic: 0.55, roughness: 0.52, ...paint, aoFloor: 0.55 },
  millTrunnion: { color: [0.5, 0.52, 0.55], metallic: 0.85, roughness: 0.38, ...paint, normalScale: 0.05, aoFloor: 0.5 },
  millBody: { color: [0.3, 0.36, 0.45], metallic: 0.55, roughness: 0.5, ...paint, aoFloor: 0.45 },
  bolt: { color: [0.32, 0.325, 0.335], metallic: 0.95, roughness: 0.38, aoFloor: 0.5 },
};
