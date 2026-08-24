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
      <Reveal className="tech-intro page-pad page-max grid gap-8 pt-[var(--section-y)] sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel className="tech-label mb-6">Technology and R&D</SectionLabel>
          <h2 id="tech-heading" className="tech-heading">
            <span>Engineered for</span>
            <span>what wear demands.</span>
          </h2>
        </div>
        <div className="tech-copy">
          <p className="tech-body">
            <span>Every operating environment creates a different wear challenge. AIA</span>
            <span>combines application knowledge, metallurgy and research to develop</span>
            <span>materials and wear solutions around the conditions they are expected</span>
            <span>to face.</span>
          </p>
          <CtaButton
            href="/company/technology"
            variant="solid"
            className="tech-cta w-full justify-center sm:w-auto"
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
            <Reveal key={pillar.index} as="article" delay={index * 80} className={`tech-pillar page-pad page-max grid items-start gap-6 pb-8 sm:gap-10 sm:pb-12 lg:gap-16${index === 0 ? " tech-first-window" : " pt-8 sm:pt-12"}${textLeft ? " is-text-left" : ""}`}>
              <div
                className={`tech-pillar-copy ${
                  textLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"
                }`}
              >
                <p className="tech-kicker">
                  {pillar.index} / {pillar.label}
                </p>
                <h3 className="tech-pillar-title">{pillar.title}</h3>
                <p className="tech-pillar-body">{pillar.description}</p>
              </div>
              <MediaSlot
                poster={posters[index] ?? posters[0]}
                posterAlt={`${pillar.label} visual`}
                src={videoSrc}
                playback={videoSrc ? "click" : "ambient"}
                film={Boolean(videoSrc)}
                className={`tech-window order-1 rounded-[32px] bg-aia-surface-soft ${
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
