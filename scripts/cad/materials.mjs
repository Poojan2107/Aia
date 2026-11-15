// Physically based finishes per material role, tuned against the HDR studio
// (public/models/env/studio.hdr). Cast products are dark and matte like real castings, not
// polished silver (AIA feedback, Malay 2026-11-13): sand-cast grain (normal map), roughness
// variation and tone mottling (base colour map) so they read as cast iron rather than smooth CAD.
// Matched to AIA's product photos and renders, and Malay's feedback (dark, matte castings, not
// polished silver): mid-dark steel grey that still reads as metal (clear soft reflections from
// the studio), fine sand-cast grain, and recesses darker (baked AO; aoFloor = how dark a fully
// enclosed corner gets). Clearly lighter than rubber, as AIA's own renders show them.
const cast = { colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.18, mrMap: "cast-mr.jpg", tile: 0.12, aoFloor: 0.5 };
export const finishes = {
  steel: { color: [0.2, 0.205, 0.215], metallic: 0.88, roughness: 0.82, ...cast },
  hicr: { color: [0.23, 0.235, 0.245], metallic: 0.88, roughness: 0.78, ...cast },
  rubber: { color: [0.022, 0.023, 0.025], metallic: 0, roughness: 0.74, normalMap: "rubber-normal.jpg", normalScale: 0.45, tile: 0.08, aoFloor: 0.45 },
  // Sintercast ceramic: light warm grey, matte, as on AIA's Sinter-Cast renders (light face with
  // the dark Hi-Cr matrix around the inserts).
  ceramic: { color: [0.27, 0.262, 0.245], metallic: 0, roughness: 0.82, normalMap: "cast-normal.jpg", normalScale: 0.3, tile: 0.1, aoFloor: 0.55 },
  bolt: { color: [0.32, 0.325, 0.335], metallic: 0.95, roughness: 0.38, aoFloor: 0.5 },
};
