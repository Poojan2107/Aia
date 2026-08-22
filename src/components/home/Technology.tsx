import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { technologyPillars } from "@/data/content";
import { media } from "@/data/media";

const posters = [
  "/images/tech-material.png",
  "/images/tech-research.png",
  "/images/tech-performance.png",
];

export function Technology() {
  return (
    <section className="bg-white text-aia-navy" aria-labelledby="tech-heading">
      <Reveal className="page-pad mx-auto grid max-w-[1440px] gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <SectionLabel className="mb-6">Technology and R&D</SectionLabel>
          <h2
            id="tech-heading"
            className="display max-w-[12ch] text-[clamp(1.85rem,4.8vw,3.875rem)]"
          >
            Engineered for what wear demands.
          </h2>
        </div>
        <div>
          <p className="mb-6 max-w-xl text-base leading-relaxed text-aia-navy/70 sm:mb-8 sm:text-lg md:text-[1.35rem]">
            Every operating environment creates a different wear challenge. AIA
            combines application knowledge, metallurgy and research to develop
            materials and wear solutions around the conditions they are expected
            to face.
          </p>
          <CtaButton
            href="/company/technology"
            variant="solid"
            className="w-full justify-center sm:w-auto"
          >
            Explore our technology
          </CtaButton>
        </div>
      </Reveal>

      <div className="space-y-2 pb-12 sm:space-y-6 sm:pb-16">
        {technologyPillars.map((pillar, index) => {
          const textLeft = index === 1;
          const videoSrc = media.tech[pillar.index as keyof typeof media.tech];
          return (
            <article
              key={pillar.index}
              className="page-pad mx-auto grid max-w-[1440px] items-center gap-6 py-8 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-16"
            >
              <div
                className={
                  textLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"
                }
              >
                <p className="mb-3 font-[family-name:var(--font-ui)] text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-aia-muted sm:mb-4 sm:text-[0.85rem]">
                  {pillar.index}/ {pillar.label.toUpperCase()}
                </p>
                <h3 className="display mb-4 max-w-[16ch] text-[clamp(1.45rem,3.5vw,2.15rem)] sm:mb-5">
                  {pillar.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-aia-navy/65 sm:text-lg">
                  {pillar.description}
                </p>
              </div>
              <MediaSlot
                poster={posters[index] ?? posters[0]}
                posterAlt={`${pillar.label} visual`}
                src={videoSrc}
                className={`order-1 aspect-[16/10] rounded-[1.75rem] bg-aia-surface-soft sm:rounded-[2rem] ${
                  textLeft ? "lg:order-2" : "lg:order-1"
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
