import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";

/**
 * Technology and R&D — Figma "AIA Signature Blue" / 01Homepage.
 * Intro row, then four simulation capabilities in alternating image/text rows.
 */

const capabilities = [
  {
    id: "dem",
    kicker: "01/Understanding wear before it happens.",
    title: "Discrete Element Method (DEM)",
    body: "We simulate charge motion inside the mill to study grinding media trajectories. Using DEM (Discrete Element Method), we analyze impact energy, wear patterns, and throughput (SPH) to optimize liner designs that improve grinding efficiency, extend liner wear life, and enhance overall mill performance.",
    image: "/images/design/tech-dem.jpg",
    alt: "DEM simulation of charge motion inside a mill",
  },
  {
    id: "fea",
    kicker: "02/Structural integrity in every design",
    title: "Finite Element Analysis (FEA)",
    body: "Using FEA (Finite Element Analysis), we replicate real operating conditions to evaluate the structural integrity of mill components. The simulation analyzes stress concentration, deformation, and load distribution, helping optimize liner profiles, weight, and material selection to reduce the risk of premature failure.",
    image: "/images/design/tech-fea.jpg",
    alt: "FEA stress map across a mill liner segment",
  },
  {
    id: "magma",
    kicker: "03/Solidification simulation for defect-free castings",
    title: "MAGMA",
    body: "Through casting process simulations, we identify potential casting defects before physical production begins. This enables us to refine the casting process, minimize metallurgical defects, and improve overall casting quality.",
    image: "/images/design/tech-magma.jpg",
    alt: "Casting solidification simulation of a liner mould",
  },
  {
    id: "polyworks",
    kicker: "04/Accuracy verified at every detail.",
    title: "Polyworks",
    body: "Using advanced 3D scanning techniques, we conduct high-precision quality inspections by comparing manufactured components with their original design models, ensuring dimensional accuracy and supporting seamless liner installation on-site.",
    image: "/images/design/tech-polyworks.jpg",
    alt: "3D scanner comparing a manufactured liner to its CAD model",
  },
] as const;

export function Technology() {
  return (
    <section className="tech2 bg-white text-aia-navy" aria-labelledby="tech-heading">
      <Reveal className="tech2-intro">
        <div>
          <SectionLabel className="tech2-label">Technology and R&D</SectionLabel>
          <h2 id="tech-heading" className="tech2-heading">
            <span>Engineered for</span>
            <span className="text-aia-accent">what wear demands.</span>
          </h2>
        </div>
        <div className="tech2-copy">
          <p className="tech2-body">
            Every operating environment creates a different wear challenge. AIA combines application knowledge, metallurgy and research to develop materials and wear solutions around the conditions they are expected to face.
          </p>
          <CtaButton href={href("technology-infrastructure")} variant="solid" className="tech2-cta">
            Explore our technology
          </CtaButton>
        </div>
      </Reveal>

      <div className="tech2-rows">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.id} as="article" className={`tech2-row ${i % 2 === 1 ? "is-flipped" : ""}`}>
            <div className="tech2-media">
              <Image src={cap.image} alt={cap.alt} fill sizes="(max-width: 1024px) 92vw, 50vw" className="object-cover" />
            </div>
            <div className="tech2-text">
              <p className="tech2-kicker">{cap.kicker}</p>
              <h3 className="tech2-title">{cap.title}</h3>
              <p className="tech2-row-body">{cap.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
