import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { technologyPillars } from "@/data/content";
import { media } from "@/data/media";

const posters = [
  "/images/tech-material.jpg",
  "/images/tech-research.jpg",
  "/images/tech-performance.jpg",
];

export function Technology() {
  return (
    <section className="bg-white text-aia-navy" aria-labelledby="tech-heading">
      <div className="page-pad grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <SectionLabel className="mb-6">Technology and R&D</SectionLabel>
          <h2
            id="tech-heading"
            className="display max-w-[12ch] text-[clamp(2rem,4vw,3.875rem)]"
          >
            Engineered for what wear demands.
          </h2>
        </div>
        <div>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-aia-navy/70 md:text-[1.35rem]">
            Every operating environment creates a different wear challenge. AIA
            combines application knowledge, metallurgy and research to develop
            materials and wear solutions around the conditions they are expected
            to face.
          </p>
          <CtaButton href="/company/technology" variant="solid">
            Explore our technology
          </CtaButton>
        </div>
      </div>

      <div className="space-y-4 pb-16">
        {technologyPillars.map((pillar, index) => {
          const mediaLeft = index !== 1;
          const videoSrc = media.tech[pillar.index as keyof typeof media.tech];
          return (
            <article
              key={pillar.index}
              className="page-pad grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={mediaLeft ? "lg:order-2" : undefined}>
                <p className="mb-4 ui-caps text-aia-muted">
                  {pillar.index} / {pillar.label}
                </p>
                <h3 className="display mb-5 max-w-[16ch] text-[clamp(1.6rem,2.5vw,2rem)]">
                  {pillar.title}
                </h3>
                <p className="max-w-xl text-lg leading-relaxed text-aia-navy/70">
                  {pillar.description}
                </p>
              </div>
              <MediaSlot
                poster={posters[index] ?? posters[0]}
                posterAlt={`${pillar.label} visual`}
                src={videoSrc}
                className={`aspect-[16/10] rounded-[1.5rem] bg-aia-surface-soft ${mediaLeft ? "lg:order-1" : ""}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
