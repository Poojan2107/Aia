import { CtaButton } from "@/components/ui/CtaButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { href } from "@/lib/routes";
import { LazyVideo } from "@/components/ui/LazyVideo";

/**
 * Technology and R&D — Figma "AIA Signature Blue" / 01Homepage.
 * Intro row, then four simulation capabilities in alternating image/text rows.
 */

const capabilities = [
  {
    id: "dem",
    kicker: "01/Understanding wear and charge motion",
    title: "Discrete Element Method (DEM)",
    body: "Using Discrete Element Method (DEM) simulation, we study charge motion, grinding media trajectories and impact energy inside mills. These insights support SAG and ball mill liner design, helping identify opportunities to improve grinding efficiency, optimise wear patterns and extend liner service life. DEM is also used to understand discharge flow dynamics.",
    video: "/videos/DEM.mp4",
    alt: "DEM simulation of charge motion inside a mill",
  },
  {
    id: "fea",
    kicker: "02/Structural integrity in every design",
    title: "Finite Element Analysis (FEA)",
    body: "Finite Element Analysis (FEA) helps us evaluate the structural performance of mill liners and critical components under simulated operating conditions. By studying stress concentration, deformation and load distribution, we refine component geometry, weight and material selection to reduce the risk of premature failure.",
    video: "/videos/FEA.mp4",
    alt: "FEA stress map across a mill liner segment",
  },
  {
    id: "magma",
    kicker: "03/Solidification simulation for defect-free castings",
    title: "MAGMA Casting Simulation",
    body: "Through MAGMA casting process simulation, we study metal flow and solidification behaviour to identify potential casting defects before production. These simulations support process refinement, improved metallurgical quality and more consistent manufacturing of wear-resistant castings.",
    video: "/videos/Magma.mp4",
    alt: "Casting solidification simulation of a liner mould",
  },
  {
    id: "polyworks",
    kicker: "04/Accuracy verified at every detail",
    title: "PolyWorks: 3D Scanning & Inspection",
    body: "Using high-precision 3D scanning and dimensional inspection, we compare manufactured mill components with their approved design models. PolyWorks supports accurate measurement, quality verification and reliable fitment of engineered mill liners and wear parts.",
    video: "/videos/Polyworks.mp4",
    alt: "3D scanner comparing a manufactured liner to its CAD model",
  },
] as const;

export function Technology() {
  return (
    <section className="tech2 bg-white text-aia-navy" aria-labelledby="tech-heading">
      <Reveal className="tech2-intro">
        <div>
          <SectionLabel className="tech2-label">Technology and R&D</SectionLabel>
          <h2 id="tech-heading" className="tech2-heading ft ft-h62">
            <span>Engineered for</span>
            <span className="text-aia-accent">what wear demands.</span>
          </h2>
        </div>
        <div className="tech2-copy">
          <p className="tech2-body ft ft-body28">
            Every operating environment presents a different wear challenge. At AIA Engineering, we combine advanced metallurgy, mill operational parameters and requirements, simulation and precision engineering to develop mill liners and wear-resistant components around the conditions they are expected to face.
          </p>
          <CtaButton href={href("technology-infrastructure")} variant="solid" className="tech2-cta">
            Explore our technology
          </CtaButton>
        </div>
      </Reveal>

      <div className="tech2-rows">
        {capabilities.map((cap, i) => (
          <ScrollReveal key={cap.id} as="article" className={`tech2-row ${i % 2 === 1 ? "is-flipped" : ""}`}>
            <div className="tech2-media rounded-[1.25rem]">
              <LazyVideo
                src={cap.video}
                label={cap.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="tech2-text">
              <p className="tech2-kicker">
                <span className="ft ft-num18">{cap.kicker.split("/")[0]} /</span>{" "}
                <span className="ft ft-kicker18">{cap.kicker.split("/").slice(1).join("/")}</span>
              </p>
              <h3 className="tech2-title ft ft-h32">{cap.title}</h3>
              <p className="tech2-row-body ft ft-body24">{cap.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
