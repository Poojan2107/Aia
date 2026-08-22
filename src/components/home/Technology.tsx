import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { technologyPillars } from "@/data/content";
import { assets } from "@/data/assets";
import { media } from "@/data/media";

const posters = [
  "/images/tech-material.png",
  "/images/tech-research.png",
  "/images/tech-performance.png",
];

export function Technology() {
  return (
    <section className="bg-white text-aia-navy" aria-labelledby="tech-heading">
      <Reveal className="page-pad mx-auto grid max-w-[1440px] gap-8 py-[var(--section-y)] sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel className="mb-6">Technology and R&D</SectionLabel>
          <h2
            id="tech-heading"
            className="display max-w-[12ch] text-[clamp(1.85rem,4.8vw,3.875rem)] font-semibold leading-[1.05] lg:text-[3.875rem] lg:leading-[4.0625rem]"
          >
            Engineered for what wear demands.
          </h2>
        </div>
        <div>
          <p className="mb-6 max-w-[50.75rem] text-base font-light leading-relaxed text-[#090909] sm:mb-8 sm:text-lg md:text-[1.75rem] md:leading-[2.375rem]">
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

      <div className="space-y-4 pb-[var(--section-y)] sm:space-y-8">
        {technologyPillars.map((pillar, index) => {
          const textLeft = index === 1;
          const videoSrc = media.tech[pillar.index as keyof typeof media.tech];
          return (
            <Reveal key={pillar.index} as="article" delay={index * 80} className="page-pad mx-auto grid max-w-[1440px] items-center gap-6 py-8 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-16">
              <div
                className={
                  textLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"
                }
              >
                <p className="mb-3 font-[family-name:var(--font-ui)] text-[1.125rem] font-medium leading-[2.625rem] text-[#b0b0b0] sm:mb-4">
                  {pillar.index} / {pillar.label.toUpperCase()}
                </p>
                <h3 className="display mb-4 max-w-[16ch] text-[clamp(1.55rem,3.4vw,2rem)] font-semibold leading-[2.625rem] sm:mb-5">
                  {pillar.title}
                </h3>
                <p className="max-w-[37.875rem] text-base font-light leading-relaxed text-[#090909] sm:text-lg md:text-[1.5rem] md:leading-[2.125rem]">
                  {pillar.description}
                </p>
              </div>
              <MediaSlot
                poster={posters[index] ?? posters[0]}
                posterAlt={`${pillar.label} visual`}
                src={videoSrc}
                playback={videoSrc ? "click" : "ambient"}
                film={Boolean(videoSrc)}
                className={`order-1 aspect-[16/10] rounded-[40px] bg-aia-surface-soft ${
                  textLeft ? "lg:order-2" : "lg:order-1"
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
