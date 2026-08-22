import { industries } from "@/data/industries";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelShowcase } from "@/components/home/ModelShowcase";
import { Reveal } from "@/components/ui/Reveal";

export function Industries() {
  return (
    <section
      id="solutions"
      className="bg-aia-surface-soft"
      aria-labelledby="industries-heading"
    >
      <Reveal className="page-pad mx-auto grid max-w-[1440px] gap-6 py-14 sm:gap-8 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16 lg:py-24">
        <SectionLabel>Solutions by industry</SectionLabel>
        <h2
          id="industries-heading"
          className="display text-[clamp(1.85rem,4.8vw,3.875rem)] leading-[1.05] text-aia-navy"
        >
          Explore solutions for Mining, Cement, Quarry and Thermal Power
          applications.
        </h2>
      </Reveal>

      <div className="divide-y divide-aia-line border-y border-aia-line bg-white">
        {industries.map((industry) => (
          <article key={industry.id} className="page-pad mx-auto max-w-[1440px] py-12 sm:py-16 lg:py-20">
            <ModelShowcase industry={industry} />
          </article>
        ))}
      </div>
    </section>
  );
}
