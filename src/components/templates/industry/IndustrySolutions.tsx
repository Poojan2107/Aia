import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { IndustrySolutionsContent, LinkRef } from "@/content/types";
import {
  CaseCards,
  ClosingCtas,
  FeatureImage,
  IndustryHero,
  SectionHeading,
} from "@/components/templates/industry/shared";

type Props = {
  content: IndustrySolutionsContent;
  label: string;
  contactHref: string;
  /** Products and Services pages of this industry. */
  explore: (LinkRef & { description: string })[];
};

export function IndustrySolutions({ content, label, contactHref, explore }: Props) {
  const { hero, intro, challenges, areas, outcomes, cases } = content;
  const anchors = areas.map((area) => ({ id: area.id, name: area.title }));

  return (
    <>
      <IndustryHero hero={hero} label={label} anchors={anchors} />

      <div className="bg-white text-aia-navy">
        <section className="page-pad mx-auto max-w-[1440px] py-16 sm:py-20 lg:py-28" aria-labelledby="intro-heading">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-20">
            <Reveal>
              <h2 id="intro-heading" className="display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
                {intro.lead}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[1rem] leading-[1.8] text-aia-navy/70 md:text-[1.08rem]">{intro.body}</p>
            </Reveal>
          </div>
        </section>

        <section className="bg-aia-surface-soft py-16 sm:py-20 lg:py-28" aria-labelledby="challenges-heading">
          <div className="page-pad mx-auto max-w-[1440px]">
            <SectionHeading id="challenges" index={0} note="What plants are up against" title="Challenges" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {challenges.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * 80} className="h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-aia-line bg-white p-6">
                      <span className="font-[family-name:var(--font-ui)] text-[0.62rem] font-semibold tracking-[0.16em] text-aia-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-[1.1rem] font-bold leading-snug">{item.title}</h3>
                      <p className="mt-3 text-[0.92rem] leading-[1.7] text-aia-navy/65">{item.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {areas.map((area, i) => (
          <section
            key={area.id}
            id={area.id}
            className={`scroll-mt-24 py-16 sm:py-20 lg:py-28 ${i % 2 === 1 ? "bg-aia-surface-soft" : "bg-white"}`}
            aria-labelledby={`${area.id}-heading`}
          >
            <div className="page-pad mx-auto max-w-[1440px]">
              <SectionHeading id={area.id} index={i + 1} note="Solution area" title={area.title} />
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-14">
                <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <FeatureImage src={area.image.src} alt={area.image.alt} className="aspect-[16/11] w-full" />
                </Reveal>
                <Reveal delay={80} className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-[1rem] leading-[1.8] text-aia-navy/70 md:text-[1.08rem]">{area.body}</p>
                  <ul className="mt-6 space-y-3">
                    {area.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 bg-aia-accent" />
                        <span className="text-[1rem] leading-relaxed text-aia-navy/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        <section className="bg-aia-navy py-16 text-white sm:py-20" aria-labelledby="outcomes-heading">
          <div className="page-pad mx-auto max-w-[1440px]">
            <Reveal>
              <h2 id="outcomes-heading" className="display text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
                What we work towards
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {outcomes.map((outcome) => (
                <li key={outcome} className="bg-aia-navy p-6 text-[1.05rem] font-semibold leading-snug">
                  <span aria-hidden className="mb-4 block h-[3px] w-10 bg-aia-accent" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {explore.length ? (
          <section className="page-pad mx-auto max-w-[1440px] py-16 sm:py-20" aria-labelledby="explore-heading">
            <Reveal>
              <h2 id="explore-heading" className="display mb-8 text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold tracking-[-0.03em]">
                Explore {label}
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {explore.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col justify-between rounded-2xl border border-aia-line p-8 transition duration-300 hover:border-aia-accent hover:shadow-[0_22px_50px_rgba(4,29,44,0.08)]"
                >
                  <span className="text-[1.4rem] font-bold group-hover:text-aia-accent">{item.label}</span>
                  <span className="mt-3 text-[0.95rem] leading-[1.7] text-aia-navy/65">{item.description}</span>
                  <span aria-hidden className="mt-6 text-aia-accent">→</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <CaseCards cases={cases} headingId="solution-cases" />
        <ClosingCtas contactHref={contactHref} />
      </div>
    </>
  );
}
