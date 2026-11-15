// Physically based finishes per material role, tuned against the HDR studio
// (public/models/env/studio.hdr). Cast products are dark and matte like real castings, not
// polished silver (AIA feedback, Malay 2026-11-13): sand-cast grain (normal map), roughness
// variation and tone mottling (base colour map) so they read as cast iron rather than smooth CAD.
const cast = { colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.42, mrMap: "cast-mr.jpg", tile: 0.25 };
export const finishes = {
  steel: { color: [0.25, 0.255, 0.265], metallic: 0.78, roughness: 1, ...cast },
  hicr: { color: [0.29, 0.295, 0.305], metallic: 0.76, roughness: 0.95, ...cast },
  rubber: { color: [0.03, 0.031, 0.034], metallic: 0, roughness: 0.78, normalMap: "rubber-normal.jpg", normalScale: 0.5, tile: 0.08 },
  // Sintercast ceramic inlays: warm mid-grey, matte; reads as inlays in the dark Hi-Cr matrix.
  ceramic: { color: [0.31, 0.305, 0.29], metallic: 0.1, roughness: 0.82, normalMap: "cast-normal.jpg", normalScale: 0.5, tile: 0.1 },
  bolt: { color: [0.2, 0.205, 0.215], metallic: 0.9, roughness: 0.42 },
};
