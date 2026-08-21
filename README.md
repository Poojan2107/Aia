# AIA Engineering Website

Next.js App Router build of the AIA mega-menu / homepage from Figma.

## Run

```bash
npm install
npm run dev
```

## What’s complete

- Full homepage matching Figma structure and copy
- Mega menu with search, language, section switch, CTA
- Industry showcases with interactive hotspots on 3D stills
- Video-ready media slots that look finished as cinematic stills until files arrive
- Stylized global map, gallery film frame, sustainability band, FAQ, insights, footer
- SEO: metadata, JSON-LD, robots, sitemap
- Nav destinations resolve to polished interior shells (no dead ends)

## When assets arrive

Set paths in `src/data/media.ts` and drop files under `public/videos/` / `public/models/`. Posters and hotspot UI stay; video/3D hydrate in place.
