# AIA Homepage — Figma spec (1920)

Source: Figma file **AIA - Website Mega Menu**, frame **AIA_Homepage** (`85:3`).  
Artboard: **1920 × 20370**. Page inset: **134px** (content starts at x=134).

Do not treat screenshots as type specs. These numbers are from the Figma API.

## Typefaces in the file

| Role | Figma font | Weight | Notes |
|------|------------|--------|--------|
| Hero / industry titles / services H2 | Neue Haas Grotesk Display Pro | 700 / 600 / 500 / 400 (Light) | Commercial (Monotype). Site currently substitutes Plus Jakarta / Inter until licensed files are added. |
| What we solve heading | Onest | 600 SemiBold | Available on Google Fonts. |
| Labels, nav, CTAs, mill list | Sinteca | 500 / 400 | Commercial. Site substitutes Inter until files are added. |

Orange label: `#f36500` (What we solve) / `#da702e` (Services). Navy: `#041d2c`. Body: `#090909`.

## Hero

| Element | Font | Size / LH | Tracking | Size box |
|---------|------|-----------|----------|----------|
| Headline `WE ENGINEER FOR THE HOURS YOU CAN'T AFFORD TO LOSE.` | Neue Haas Display Bold | **90 / 95** | 0 | 1042 × 285 |
| Stats copy | Sinteca Regular | **18 / 28** | 0 | 524 × 84 |
| CTA `EXPLORE WEAR SOLUTIONS` | Sinteca Medium | **14 / 32** | — | 183 × 32 |
| Hero plate | — | — | — | 1920 × 1076 |

## What we solve

| Element | Font | Size / LH | Tracking | Box / layout |
|---------|------|-----------|----------|----------------|
| `[WHAT WE SOLVE]` | Sinteca Medium | **18 / 28** | **1.44px** | 174 × 28 at (134, 1204) |
| Heading `For over four decades, AIA been engineering longer life into the parts that keep industry moving.` | Onest SemiBold | **56 / 60** | 0 | 952 × 180 at (838, 1204) |
| Body | Neue Haas Display Light | **28 / 38** | 0.4px | **530 × 266** at (134, 1562) |
| CTA `SEE HOW WE SOLVE WEAR` | Sinteca Medium | **14 / 32** | — | 241 × 50 at (838, 1432) |
| Film | — | — | — | **864 × 486** at (838, 1562) |

Two-column: label+body **530px**; heading+CTA+film **~952px**, gap **~174px** between columns (838 − 134 − 530).

## Industries (first plate: Mining)

| Element | Font | Size / LH | Box |
|---------|------|-----------|-----|
| `01` | Sinteca Regular | **32 / 42** | 28 × 23 |
| `Mining` | Neue Haas Display Medium | **52 / 48** | 152 × 48 |
| Description | Neue Haas Display Light | **40 / 40** | 354 × 120 |
| `SAG Mill Solutions` etc. | Sinteca Regular | **18 / 30** | ~151 × 30 |
| `EXPLORE MINING` | Sinteca Regular | **14 / 32** | 118 × 32 |
| Mill still | — | — | **778 × 438** (Mining) / **800 × 450** (Cement) |

Copy: “Wear solutions engineered for critical- grinding applications.”  
Links: SAG Mill Solutions, Ball Mill Solutions, Verti Mill Solutions.

## Services & support

| Element | Font | Size / LH | Tracking | Box |
|---------|------|-----------|----------|-----|
| `[SERVICES & SUPPORT]` | Sinteca Medium | **18 / 28** | 1.44px | 224 × 28 at (134, 6277) |
| `We don't just supply. We help you perform.` | Neue Haas Display Medium | **62 / 65** | 0 | 569 × 130 at (134, 6337) |
| `TALK TO AN EXPERT` | Sinteca Medium | **14 / 32** | — | 129 × 32 |
| Tabs `For mining` / `For Cement` | Sinteca Medium | **20 / 30** | 0 | — |
| Row title e.g. Design Modelling | Neue Haas Display Roman | **24 / 26** | 0.35px | 179 × 26 at x=869 |
| Row body | Neue Haas Display Light | **24 / 34** | 0.35px | 606 × 68 at x=1189 |
| Row rule | — | — | — | **1077px** wide |

Left column sticky in implementation; list is the right column (title 316px + 141px gap + 606px body).

## Technology

| Element | Size / LH |
|---------|-----------|
| `[TECHNOLOGY AND R&D]` | Sinteca 18 / 28 |
| `Engineered for what wear demands.` | Neue Haas Medium **62 / 65** |
| Intro body | Neue Haas Light **28 / 38** |
| Card title | Neue Haas Medium **32 / 42** |
| `01 / MATERIAL ENGINEERING` | Sinteca Medium 18 |
| Card body | Neue Haas Light **24 / 34** |

## Other headings (same 62 family)

- Case studies: `When the challenge is real, performance has to be proven.` 62 / 62, 828 × 124  
- Insights: `Ideas & Insights from AIA` 62 / 62  
- Footer line: `Engineering wear solutions. Supporting operations worldwide.` **48 / 58**

## How to re-pull

`GET https://api.figma.com/v1/files/Z8fYuxxhrFBuYiYfpsBKMm/nodes?ids=85:3`  
Header: `X-Figma-Token`. Do not commit tokens.
