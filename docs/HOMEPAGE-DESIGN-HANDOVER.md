# Homepage design handover — Figma "AIA Signature Blue" / 01Homepage

You do NOT need Figma. Everything needed is below. Work only on the homepage
(`src/app/page.tsx` and `src/components/home/*`, `src/components/layout/SiteFooter.tsx`).

## Rules (do not break)

- Blue is the only accent: `var(--aia-accent)` = `#006eff`, hover `var(--aia-accent-deep)` = `#0056d6`.
  Never add orange, a theme toggle, or `data-theme`. Where the design shows orange, use blue.
- Navy text `var(--aia-navy)` = `#041d2c`. Grey body text `#6f757e`. Hairlines `#e3e5e8`.
- Headings use `font-family: var(--font-haas)`. Small uppercase labels use the existing
  `<SectionLabel>` component (renders `[LABEL]` in blue).
- Buttons: reuse `<CtaButton href variant="solid">` (blue pill with white dot). In the design
  buttons are 48px tall, 12px uppercase text.
- All sizes below are at a **1920px-wide** screen. Make them fluid with
  `clamp(min, (px/1920*100)vw, px)`. Page side inset is **134px** → `clamp(1rem, 7vw, 134px)`.
- Links must come from the page register: `import { href } from "@/lib/routes"` (e.g. `href("contact")`).
  Never hard-code old URLs.
- Commit as PoojanUtopia (already configured). **No "Co-Authored-By: Claude" line.**
- Run `npm run check` before committing. Push to remote `aia`, branch `main`.

## Already built — do not redo

| Section | File | Status |
|---|---|---|
| Navbar | `layout/SiteHeader.tsx` + "Navbar" block in `globals.css` | done |
| Hero (mill-hall still) | `home/Hero.tsx` | done |
| What we solve + KPI band (+32% / -24% / +5X) | `home/WhatWeSolve.tsx` | already matched |
| Solutions by industry (4 split panels) | `home/IndustryPanels.tsx` | done |
| Services & support (For Mining / For Cement tabs) | `home/Services.tsx` | already matched |
| Technology & R&D (DEM/FEA/MAGMA/Polyworks) | `home/Technology.tsx` | done |
| About band + 6 stats | `home/AboutBand.tsx` + "about2" CSS | written, **not yet typechecked or viewed** |

Step 0: run `npm run typecheck && npm run lint` and fix anything in `AboutBand.tsx`.
Step 0b: `src/data/locations.ts`, `src/lib/home-only.ts`, `src/proxy.ts` were changed outside
the design work — check `git diff` on them and keep only if intended.

## Images

Design images already in the repo: `public/images/design/` (hero, mill renders, industry photos, tech images, logo mark).

More design images were downloaded to the scratch folder
`C:\Users\pooja\AppData\Local\Temp\claude\a6d8f831fbed045a\d954964e-82b5-4d9e-b3c5-722b018423e1\scratchpad\figma-img\`.
Copy these into `public/images/design/` (convert PNG photos to JPG ~quality 84, max width 1920):

| Scratch file | Save as | Used in |
|---|---|---|
| `60_920b8347` | `footer-bg.jpg` | footer background (night mine plant) |
| `26_a5cb7261` | `logo-aia-vega-white.png` (keep PNG) | footer logo lockup |
| `29_02fa76e6` | `logo-13utopia.png` (keep PNG) | footer "Site by" |
| `58_d619008e` | `sustainability-gear.jpg` | sustainability background |
| `61_89e0fe70` | `insight-media.jpg` | insights row 1 |
| `62_f5d3a042` | `insight-mill-life.jpg` | insights row 2 |
| `59_cd3d4a5e`, `63_acaf4bac`, `64_6cb2f0bb` | `case-1.jpg`, `case-2.jpg`, `case-3.jpg` | case-study cards |
| `21_ee12bea4` | `gallery-ball-mill.jpg` | gallery slide |
| `19_a4da9190` | `gallery-corporate.jpg` | gallery centre slide |
| `20_60edb2d2` | `gallery-grate.jpg` | gallery slide |

If the scratch folder is gone, keep the existing images in `public/images/` (same subjects).

## Remaining sections, top to bottom

### 1. Global map (`home/GlobalMap.tsx`, existing — adjust only)
- Background white, ~180px vertical padding.
- Left column (x=134, ~420px wide), navy, 24px light, line-height 1.4:
  "Our offices, production facilities, and warehouses are strategically positioned across the globe to maximize efficiency and client reach."
  Blank line, then: "Explore our office locations, production facilities, and warehouses on our interactive map."
- Under it a **text link** (not a pill): small blue dot + "FIND AIA NEAR YOU", 11–12px uppercase blue → `href("global-presence")`.
- Right column (~x 670–1780): light-grey world map (continents `#d9dcdf` on white), pins.
  Pins: blue dots = "Regional Warehouses"; navy dots = "Subsidiary and Representative Offices".
  Legend bottom-right under the map with those two dots + labels, 11px grey.
- One open tooltip card (on UAE): blue `#006eff` box, white text, 3 lines: "UAE" / "Tel: …" / email.

### 2. Vision (`home/Vision.tsx`, existing — verify only)
- Background `#f5f5f5`. Left half: portrait of Mr. Bhadresh Shah (cut-out) with large **blue** triangle shards behind him and white mist at the bottom (current plate `vision-plate-hq-white.webp` is this).
- Right half: faint outlined quote marks (light grey) top-right; heading "A vision that / continues to guide us." 52px semibold navy;
  italic grey quote: "Customer Excellence is our philosophy. Our focus remains on improving productivity while reducing environmental impact. We promise to deliver value through ethical, sustainable, and profitable means."
  Then blue dot + "MR. BHADRESH KANTILAL SHAH" (11px uppercase blue) and below "(MANAGING DIRECTOR - AIA ENGINEERING)" grey 11px.
- The Figma also shows a second orange copy of this block — **ignore it**.

### 3. Gallery (`home/Gallery.tsx`)
- Background `#f1f2f4`, ~150px top padding.
- Centred: `[GALLERY]` label, heading "See what better performance looks like." (62px, 2 lines), grey subtext 2 lines:
  "Explore AIA solutions, applications and engineering through videos that show how our products are designed to perform in demanding operating conditions."
- Carousel: centre slide ~800×504 (larger, in front); side slides ~470×440, vertically centred, partly cut off at the screen edges. No rounded corners.
  Slides: Ball Mill Lining Solutions poster, AIA corporate film (aerial plant), Next Gen grate discharge render.
- Under the centre slide: red YouTube icon + "AIA Engineering Corporate Film" (14px navy).
- Controls row centred: circular prev button (blue outline, blue arrow), 9 small dots (active = blue), circular next button (grey outline).
- Clicking a slide plays its video (keep current video behaviour).

### 4. Case studies (`home/CaseStudies.tsx`)
- Background `#f5f5f5`.
- Top row: left heading "When the challenge is real, / performance has to be proven." (62px semibold navy, 2 lines);
  right: blue pill "VIEW CASE STUDY" → `href("case-studies")`, and under it two small circular arrow buttons (prev / next).
- 3 cards in a row (each ~530px wide, gap ~30px): image with 12px rounded corners, ratio ~4:3;
  on hover a centred "Know More →" (white underlined text + blue circle arrow).
  Title 20px semibold navy, meta 14px grey:
  - "40ft SAG mill in latin america" — "Life improvement - Throughput Increase - Power Reduction"
  - "15ft Ball mill in India" — "Throughput Increase - Power Consumption"
  - "34ft SAG mill in West Africa" — "Life improvement - Throughput Increase"
  (data already in `src/data/content.ts` → `caseStudies`).

### 5. Sustainability (`ClosingSections.tsx` → `Sustainability`)
- Full-bleed background image (gear with a sapling, sunset, AIA building blurred), height ~1080, dark left gradient.
- Left column white text (x=134, ~620px wide):
  heading "Can heavy industry / think lighter?" 62px;
  paragraph 18px: "YES, We believe it can. By using resources more efficiently, reducing waste and embracing reuse and recycling," blank line "we're working to lower the environmental impact of our operations while continuing to deliver the performance industry depends on."
- Two stats side by side: "1,00,000+" / "Tree plantation during the year" and "30%" / "Energy comes from the renewable energy resources" (numbers 48px, labels 15px).
- Two white-outline pills: "SEE HOW WE THINK LIGHTER" → `href("sustainability")`, "SOCIAL RESPONSIBILITY" → `href("csr")`.

### 6. FAQ (`ClosingSections.tsx` → `Faq`, likely already matching — verify)
- Two equal columns. Left (bg `#f2f3f5`): `[FREQUENTLY ASKED QUESTION]` label, heading "Here are the essentials about AIA, what we make, and how our solutions support your operations." 52px, blue pill "ASK AN EXPERT" → `href("contact")`.
- Right: question rows (18px navy) with right chevron and hairline separators; the open row has a `#f2f3f5` background, question in blue, chevron pointing down, answer 13px grey.

### 7. Insights (`ClosingSections.tsx` → `Insights`)
- White background. Centred heading "Ideas & Insights from AIA" 52px.
- Tabs left-aligned at x=134: "Blogs" (blue, 2px blue underline when active), "News", "Press Release"; a full-width hairline under the tabs.
- Each row (hairline between rows, ~70px vertical padding): left column date (13px grey, e.g. "08 December 2026"), title 32px semibold navy clamped to 3 lines with "…", then "READ ARTICLE ›" 11px blue uppercase; middle image ~780×400 with 8px corners; right a 40px circle outline arrow (blue).
- Rows: "What Plant Teams Should Look for When Selecting Grinding Media and…" (grinding-media image) and "The Role of Material, Design and Operating Conditions in Extending Mill…" (mill-life image).

### 8. Footer (`layout/SiteFooter.tsx`) — biggest remaining change
- Background: `footer-bg.jpg` with a dark navy overlay (~70%).
- Top row (~120px padding top): left tagline "Engineering wear solutions. / Supporting operations worldwide." white 44px; right: white AIA logo with "AIA Engineering Limited", a thin vertical white line, white Vega logo.
- Blue panel (`#006eff`), from x≈305 to x≈1615 (~1310px wide, centred), padding ~80px, white text. Column headings 20px medium white, links 14px `rgba(255,255,255,0.8)`, 30px line spacing.
  Row 1, three columns:
  - **Solutions**: Mining, Cement, Quarry, Thermal Power, Services & Optimisation
  - **Company**: About AIA, Board of Directors, Technology & Infrastructure, Global Presence, Sustainability, CSR Initiatives, Memorandum of Association, Careers, Contact us
  - **Resources hub**: Success Stories, Blogs & Insights, News & Events, Videos / Media, Downloads, FAQs
  Row 2:
  - **Investors & Connect** spanning two columns: Financials, Shareholding, KYC, Reports & Presentations, Corporate Governance, Policies, IEPF, Code of Conduct | List of Stock Exchanges, Scheme of Amalgamation, Corporate Announcement & Disclosure, Investor Regulation 46 (LODR), Investor Contact us
  - **India · Corporate Office**: "11-12, Sigma Corporates, B/h. HOF Showroom, Sindhubhavan Road, Bodakdev, Ahmedabad – 380054, India." / "M: +91 79 6604 7800" / "F: +91 79 6604 7848" / "E: info@aiaengineering.com" / LinkedIn icon.
  Map every link to the matching route via `href(...)` (see ids in `src/lib/routes.ts`; `footerNav` in `src/data/nav.ts` may already have them).
- Below the panel, a full-width row split into two cells by thin white/15% hairlines (top border + vertical divider):
  - "Have a wear or performance challenge?" (24px white) + white pill "TALK TO AN EXPERT" (navy text) → `href("contact")`
  - "Find AIA offices, representatives and support across global markets." + white pill "EXPLORE GLOBAL PRESENCE" → `href("global-presence")`
- Bottom bar (thin top hairline): left "© 2026 AIA Engineering Limited, All Rights Reserved." (13px white/70);
  centre links "Privacy Policy", "Sitemap", "En ⌄"; right "Site by" + small white 13UTOPIA logo.

## Clean-up and finish

1. Remove now-unused files if nothing imports them: `home/Industries.tsx`, `home/IndustryStack.tsx`, `home/ModelShowcase.tsx` (grep first). Remove CSS only if its classes are no longer used.
2. Check widths 375, 768, 1440, 1920: no horizontal scroll; split layouts stack on mobile.
3. `npm run check` must pass.
4. Commit (no Claude co-author line), push to `aia main`, confirm the Vercel deploy builds.
