# 3D models

`catalog/` holds the product models shown on the site (homepage Materials & Metallurgy today,
product pages later). Every model is converted **locally** from AIA's own CAD — never with an
online converter — and every product, MOC and spec shown with it lives in
`src/data/moc-catalog.ts`.

Pipeline (`scripts/cad/`):

- `manifest.mjs` — which AIA STEP file becomes which model, and the material role of each part.
- `materials.mjs` — matte, realistic finishes per role (cast steel, Hi-Cr, rubber, ceramic, bolt).
- `convert.mjs` — STEP → GLB (OpenCascade via WASM, offline), simplify, meshopt-compress.
- `media.mjs` — grinding media ball sets at the sizes AIA publishes (AIA has no CAD for media).

AIA's source library lives in `models/` at the project root and is git-ignored: it is
confidential and must never be committed.

```
node scripts/cad/convert.mjs            # all products
node scripts/cad/convert.mjs <id> ...   # selected products
node scripts/cad/media.mjs
```
