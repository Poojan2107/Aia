# AIA Thumbnail & Media Card Standardization Guide

This document defines the official design, dimension, and naming standards for all thumbnails across the AIA Engineering web platform, based on the **AIA Signature Blue** design system.

---

## 1. Specifications by Media Type

| Category | Aspect Ratio | Base Display (1x) | Export Size (2x Retina) | Target Container / Radius | Key Visual Elements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Case Studies** (Stories) | **~4:3** (`532:395`) | `532 × 395 px` | `1064 × 790 px` | `aspect-[532/395]`<br>`rounded-[1.25rem]` (20px) | • White AE monogram top-left<br>• AIA Blue (`#006eff`) diagonal shard top-right<br>• Bold white title in-image<br>• Blue facet bottom-left<br>• Hover scrim + "Read Case Study →" |
| **Blogs & Insights** | **~2:1** (`778:400`) | `778 × 400 px` | `1556 × 800 px` | `aspect-[2/1]` or `778/400`<br>`rounded-[18px]` | • Clean industrial/lab photo<br>• Blue geometric shard top-right<br>• Blue corner facet bottom-right with AE monogram<br>• Blue node arcs/accent lines |
| **Gallery & Video Posters** | **16:9** or `800:504` | `800 × 504 px` | `1600 × 1008 px` | Carousel center slide<br>`rounded-none` (sharp) | • Mill cutaways / plant aerials / 3D renders<br>• Corporate watermark top-right<br>• YouTube / Play overlay |
| **Product & Mill Systems** | **4:3** or **16:9** | `640 × 480 px` | `1280 × 960 px` | `rounded-[1.25rem]` | • Studio product render or clean mill cutaway on neutral/dark plate |

---

## 2. Visual Anatomy Rules

```
┌─────────────────────────────────────────────────────────────┐
│ [AE Mark]                                   ▲ [Blue Shard]  │
│                                            /                │
│                                           /                 │
│                                                             │
│ 40ft SAG Mill                                               │
│ in latin america                                            │
│                                                             │
│ \                                                           │
│  ▼ [Blue Facet]                                             │
└─────────────────────────────────────────────────────────────┘
```

1. **Brand Accent Color:**
   * Primary: `#006eff` (AIA Signature Blue)
   * Deep hover: `#0056d6`
2. **Typography in Thumbnail:**
   * Font: Haas Grotesk Bold (`var(--font-haas)`)
   * Color: Pure White (`#ffffff`)
   * Hierarchy: 2-line maximum (e.g., Equipment Size + Mill Type on Line 1, Geography/Application on Line 2)
3. **Corner Treatment:**
   * Case Studies: `border-radius: 20px` (`rounded-[1.25rem]`).
   * Blogs / Insights: `border-radius: 18px` (`rounded-[18px]`).
   * Gallery: `0px` (flat/sharp per brand handover).
4. **Interactive Hover State (Case Studies):**
   * Background scrim: `rgba(0, 0, 0, 0.35)`
   * Underlined label: "Read Case Study" (16px, Haas / Inter)
   * Circular CTA arrow: `size-8` (`32px`), background `#006eff`, white right arrow `→`.

---

## 3. Standardized File Naming & Location

All thumbnails live in:
```
public/images/thumbnails/
```

### Naming Conventions:
* **All lowercase, hyphen-separated** (`kebab-case`).
* **No spaces, no double extensions** (`.jpg.jpeg` is strictly forbidden).
* **Format:** Web-optimized `.jpg` (quality 88-92%) or `.webp`.

| Category | Filename Pattern | Example |
| :--- | :--- | :--- |
| Case Studies | `case-<size>-<mill-type>-<region>.jpg` | `case-40ft-sag-latin-america.jpg`<br>`case-28ft-sag-asia.jpg`<br>`case-34ft-sag-west-africa.jpg` |
| Blogs / Insights | `blog-<topic-slug>.jpg` | `blog-grinding-media.jpg`<br>`blog-mill-life.jpg` |
| Gallery Video Posters | `gallery-<topic-slug>.jpg` | `gallery-ball-mill-lining.jpg`<br>`gallery-corporate-film.jpg` |

---

## 4. Frontend Component Mapping

### Case Studies (`src/components/home/CaseStudies.tsx`):
```tsx
<div className="cases-media relative mb-5 aspect-[532/395] w-full overflow-hidden rounded-[1.25rem] bg-[#e8eaec]">
  <Image
    src={item.image}
    alt={item.title}
    fill
    sizes="(max-width: 1024px) 100vw, 532px"
    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
  />
</div>
```

### Blogs / Insights (`src/components/home/ClosingSections.tsx`):
```tsx
<div className="relative order-1 aspect-[2/1] overflow-hidden rounded-[18px] bg-aia-surface-soft lg:order-2 lg:h-[min(300px,30vw)] lg:w-full lg:max-w-[34rem] lg:aspect-auto lg:justify-self-end">
  <Image
    src={item.image}
    alt=""
    fill
    sizes="(max-width: 1024px) 100vw, 45vw"
    className="object-cover object-center transition duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
  />
</div>
```

