import type { IndustryProductsContent } from "@/content/types";

/**
 * Quarry products — inventory and copy from the live aiaengineering.com/quarry/
 * page. Local-only preview while the site remains home-locked; Product Management
 * should confirm alloys and variants before a public launch.
 */
export const quarryProducts: IndustryProductsContent = {
  status: "draft",
  hero: {
    line1: "ENGINEERED FOR",
    line2: "THE QUARRY.",
    lead:
      "AIA and Vega deliver impact-resistant crusher wear parts that extend component life, protect crushing efficiency and keep aggregate lines available.",
    image: { src: "/images/industry/quarry.jpg", alt: "Crusher and conveyor at a quarry operation" },
  },
  groups: [
    {
      id: "crusher-wear",
      name: "Crusher Wear Parts",
      note: "Blow bars, hammers, VSI parts and housing protection",
      layout: "split",
      products: [
        {
          id: "blow-bars",
          title: "Blow Bars",
          subtitle: "Impact crushers · maximum crushing efficiency",
          body:
            "AIA Engineering Ltd./Vega Industries have developed an impact-resistant, non-conventional alloy for maximum crushing efficiency. This blow bars solution is offered with and without ceramic, and is a set supplied with in-house weight-balanced conditions to take care of rotor vibration.",
          image: { src: "/images/quarry-mill.png", alt: "Impact crusher rotor with blow bars" },
          variants: ["With ceramic", "Without ceramic", "Weight-balanced sets"],
        },
        {
          id: "hammers",
          title: "Hammers",
          subtitle: "Hammer crushers · differential hardening",
          body:
            "Constructed with a superior alloy, AIA hammers use differential hardening to curb breakage at the shank. Variants include solutions with or without ceramic, also supplied weight-balanced in-house to manage rotor vibration — for high crushing efficiency, low cost per ton, uniform end-product size and long lifespan.",
          image: { src: "/images/quarry-mill-clean.png", alt: "Crusher hammers for quarry duty" },
          variants: ["With ceramic", "Without ceramic", "Differential hardening"],
        },
        {
          id: "impellers",
          title: "Impellers",
          subtitle: "VSI rotors · high-RPM wear resistance",
          body:
            "AIA impellers are made with superior alloys for high wear resistance and are weight-balanced in-house to manage rotor vibration. Available with and without ceramic for high-RPM vertical shaft impactors, with easy installation, maintenance-free operation and a uniform wear profile for consistent particle size.",
          image: { src: "/images/funnel/quarry.png", alt: "Vertical shaft impactor impeller" },
          variants: ["With ceramic", "Without ceramic", "High-RPM alloy"],
        },
        {
          id: "anvil",
          title: "Anvil",
          subtitle: "Impact surfaces · long wear life",
          body:
            "AIA anvils are made with superior alloys for high wear resistance and long lifespan, offered in ceramic and non-ceramic variants. They deliver a uniform wear profile with easy installation and maintenance-free operation.",
          image: { src: "/images/quarry-mill-plate.png", alt: "VSI crusher anvils" },
          variants: ["With ceramic", "Without ceramic"],
        },
        {
          id: "feed-disk",
          title: "Feed Disk",
          subtitle: "Feed distribution into the rotor",
          body:
            "Feed disks are constructed with superior alloys for high wear resistance and long lifespan, and are offered with or without ceramic. AIA and Vega feed disks distribute material into the rotor while resisting abrasive wear at the centre of the impeller.",
          image: { src: "/images/industry/quarry.jpg", alt: "VSI crusher feed disk" },
          variants: ["With ceramic", "Without ceramic"],
        },
        {
          id: "frame-liners",
          title: "Frame Liners",
          subtitle: "Crusher housing protection",
          body:
            "Designed for easy installation and maintenance-free operation, frame liners protect the crusher housing and deliver longer product life with superior wear alloys.",
          image: { src: "/images/gallery-2.png", alt: "Impact crusher frame liners" },
          variants: [],
        },
      ],
    },
  ],
  cases: [],
};
