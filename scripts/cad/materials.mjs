// Physically based finishes per material role, tuned against the HDR studio
// (public/models/env/studio.hdr). Cast products are dark and matte like real castings, not
// polished silver (AIA feedback, Malay 2026-11-13): sand-cast grain (normal map), roughness
// variation and tone mottling (base colour map) so they read as cast iron rather than smooth CAD.
// Matched to AIA's product photos and renders, and Malay's feedback (dark, matte castings, not
// polished silver): mid-dark steel grey that still reads as metal (clear soft reflections from
// the studio), fine sand-cast grain, and recesses darker (baked AO; aoFloor = how dark a fully
// enclosed corner gets). Clearly lighter than rubber, as AIA's own renders show them.
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
  rubber: { color: [0.022, 0.023, 0.025], metallic: 0, roughness: 0.74, normalMap: "rubber-normal.jpg", normalScale: 0.45, tile: 0.08, aoFloor: 0.45 },
  // Hi-Cr grinding media (its own MOC): dark charcoal cast balls with a satin sheen and a fine
  // pitted skin, as on AIA's and industry photos of high-chrome media (not mirror chrome).
  media: { color: [0.17, 0.172, 0.178], metallic: 0.9, roughness: 0.48, colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.35, mrMap: "cast-mr.jpg", tile: 0.03, aoFloor: 0.35 },
  bolt: { color: [0.32, 0.325, 0.335], metallic: 0.95, roughness: 0.38, aoFloor: 0.5 },
};
