# AIA Engineering Website

Next.js 16 (App Router) foundation for the new AIA Engineering digital platform. Built by 13UTOPiA.
The current visuals are placeholders; the redesign replaces components and styles only.

## Run

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
npm run dev
```

`npm run check` runs typecheck, lint, tests and the production build.
`npm run qa` (with a server running, `BASE_URL=...`) checks every page for errors, mobile overflow and accessibility.

## How it is organised

| Concern | Where |
|---|---|
| Every page and its URL (drives routing, nav, breadcrumbs, sitemap.xml) | `src/lib/routes.ts` |
| Page content (local files today, headless CMS later) | `src/content/*` via the adapter in `src/lib/cms` |
| Page structure (templates) | `src/components/templates/*`, chosen in `src/lib/render.tsx` |
| Visuals (replace in the redesign) | components + `src/app/globals.css` |
| Old-site redirects (301 / 302 locales / 410) | `src/lib/redirects/legacy.ts`, applied in `src/proxy.ts`; export with `scripts/export-redirects.ts` → `docs/redirect-map.csv` |
| SEO: metadata, JSON-LD, robots, sitemap, llms.txt | `src/lib/seo.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `public/llms.txt` |
| Security headers + CSP | `next.config.ts` |
| Env config / validation | `.env.example`, `src/lib/env.ts`, `src/lib/env.server.ts` (checked at startup) |
| Contact form | `src/app/contact/actions.ts` (validation, honeypot, rate limit, webhook) |
| CMS publish webhook / preview | `POST /api/revalidate`, `GET /api/draft` |
| Health check | `GET /api/health` |

## Common tasks

- **Add a page:** add an entry to `staticRoutes` in `src/lib/routes.ts`, add its content for the template, done. Tests fail if content or links are missing.
- **Change a URL:** change `path` and add the old one to `previousPaths` (a 301 is generated).
- **Add a CMS:** implement `ContentSource` (`src/lib/cms/types.ts`), register it in `src/lib/cms/index.ts`, set `CMS_PROVIDER`. Tag fetches with `cmsTags` so the webhook can refresh them.
- **Investor documents:** add entries to `investorDocuments` (`src/content/investors.ts`) with the S3 key in `file` and the old WordPress URL in `legacyUrl`.

## Deploy (AWS)

`output: "standalone"` + `Dockerfile` → ECR → ECS Fargate behind ALB + CloudFront + WAF (Mumbai). Media (PDFs, video, 3D) goes to S3 behind CloudFront via `NEXT_PUBLIC_MEDIA_URL`. Production refuses to start without `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_MEDIA_URL`, `CONTACT_WEBHOOK_URL` and `REVALIDATE_SECRET`. Anything not `NEXT_PUBLIC_SITE_ENV=production` is noindexed.

## Known open items

- Content is draft (`status: "draft"`); see `docs/draft-content-inventory.md` for what AIA must approve.
- Investor PDFs, media files and brochures await AIA's WordPress/media export (the live site blocks crawlers).
- `/wp-content/...` PDF URLs need entries in `investorDocuments.legacyUrl` before cut-over.
- Videos (~290 MB) and large images are still in `public/`; move to the media CDN. `scripts/optimize-images.mjs` can shrink images if needed.
- Colour contrast / touch-target warnings from `npm run qa` belong to the redesign.
- Full plan and history: `docs/PLATFORM-FOUNDATION-PLAN.md`.
