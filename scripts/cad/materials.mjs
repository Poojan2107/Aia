// Physically based finishes per material role, tuned against the HDR studio
// (public/models/env/studio.hdr). Cast products are dark and matte like real castings, not
// polished silver (AIA feedback, Malay 2026-11-13): sand-cast grain (normal map), roughness
// variation and tone mottling (base colour map) so they read as cast iron rather than smooth CAD.
// Matched to AIA's own product photos: dark charcoal with a satin sheen, fine grain, recesses
// darker (baked AO, aoFloor = how dark a fully enclosed corner gets).
const cast = { colorMap: "cast-color.jpg", normalMap: "cast-normal.jpg", normalScale: 0.28, mrMap: "cast-mr.jpg", tile: 0.2, aoFloor: 0.3 };
export const finishes = {
  steel: { color: [0.105, 0.107, 0.112], metallic: 0.7, roughness: 0.88, ...cast },
  hicr: { color: [0.125, 0.127, 0.132], metallic: 0.72, roughness: 0.84, ...cast },
  rubber: { color: [0.022, 0.023, 0.025], metallic: 0, roughness: 0.74, normalMap: "rubber-normal.jpg", normalScale: 0.45, tile: 0.08, aoFloor: 0.45 },
  // Sintercast ceramic inlays: warm dark grey, matte, a step lighter than the Hi-Cr matrix so the
  // inlay pattern reads without looking like a separate plastic sheet.
  ceramic: { color: [0.15, 0.144, 0.132], metallic: 0.15, roughness: 0.8, normalMap: "cast-normal.jpg", normalScale: 0.4, tile: 0.1, aoFloor: 0.4 },
  bolt: { color: [0.16, 0.162, 0.168], metallic: 0.9, roughness: 0.4, aoFloor: 0.4 },
};
