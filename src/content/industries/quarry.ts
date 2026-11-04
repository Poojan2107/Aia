import type { IndustryProductsContent } from "@/content/types";

/**
 * Quarry has a Products page only (approved sitemap rule). Draft copy from the
 * live /quarry/ page inventory and the keyword pool; Product Management must
 * confirm alloys and variants before launch.
 */
export const quarryProducts: IndustryProductsContent = {
  status: "draft",
  hero: {
    line1: "Crusher Wear Parts for Quarries",
    line2: "Impact, VSI and hammer crushers",
    image: { src: "/images/industry/quarry.jpg", alt: "Aggregate quarry with crushing plant" },
  },
  groups: [
    {
      id: "impact",
      name: "Impact Crushers",
      note: "Blow bars and frame liners",
      layout: "split",
      products: [
        {
          id: "blow-bars",
          title: "Blow Bars",
          subtitle: "For horizontal shaft impactors",
          body: "Blow bars in wear-resistant alloys and ceramic composites that hold their profile longer in abrasive aggregate crushing.",
          image: { src: "/images/quarry-mill.png", alt: "Impact crusher rotor with blow bars" },
          variants: ["Martensitic Blow Bars", "Ceramic Composite Blow Bars"],
        },
        {
          id: "frame-liners",
          title: "Frame Liners",
          subtitle: "Crusher housing protection",
          body: "Liners that protect the impact crusher frame and aprons from wear, reducing maintenance on the crusher body.",
          image: { src: "/images/quarry-mill-clean.png", alt: "Impact crusher frame liners" },
          variants: [],
        },
      ],
    },
    {
      id: "vsi",
      name: "VSI Crushers",
      note: "Impellers, anvils and feed disks",
      layout: "feature-grid",
      products: [
        {
          id: "vsi-impellers",
          title: "Impellers",
          subtitle: "Vertical shaft impactor rotors",
          body: "Impeller wear parts for vertical shaft impactors producing shaped aggregates and manufactured sand.",
          image: { src: "/images/funnel/quarry.png", alt: "Vertical shaft impactor impeller" },
          variants: [],
        },
        {
          id: "vsi-anvils",
          title: "Anvils",
          subtitle: "Impact surfaces",
          body: "Anvils that take the impact of accelerated material in VSI crushers.",
          image: { src: "/images/quarry-mill-plate.png", alt: "VSI crusher anvils" },
          variants: [],
        },
        {
          id: "vsi-feed-disks",
          title: "Feed Disks",
          subtitle: "Feed distribution",
          body: "Feed disks that distribute material into the rotor and resist abrasive wear at the centre of the impeller.",
          image: { src: "/images/industry/quarry.jpg", alt: "VSI crusher feed disk" },
          variants: [],
        },
      ],
    },
    {
      id: "hammer",
      name: "Hammer Crushers",
      note: "Hammers for crushing duty",
      layout: "overlay",
      products: [
        {
          id: "hammers",
          title: "Crusher Hammers",
          subtitle: "Hammer and impact mills",
          body: "Hammers in wear-resistant alloys for hammer crushers in quarry and cement plant crushing.",
          image: { src: "/images/quarry-mill.png", alt: "Crusher hammers" },
          variants: [],
        },
      ],
    },
  ],
  cases: [],
};
