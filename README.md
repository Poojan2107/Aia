# Aia

Landing page for **Aia** — turn a Figma file into a live site.

## Local

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static files land in `out/`.

## Live

After this is merged to `main`, GitHub Pages publishes the site at:

**https://poojan2107.github.io/Aia/**

In the repo: **Settings → Pages → Source → GitHub Actions**.

Drop Figma exports (PNG/SVG) in `public/figma/` when you have them. Swap colors and copy in `src/lib/theme.ts`. The page itself lives in `src/app/page.tsx`.
