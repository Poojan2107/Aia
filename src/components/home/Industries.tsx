import { industries } from "@/data/industries";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ModelShowcase } from "@/components/home/ModelShowcase";

export function Industries() {
  return (
    <section id="solutions" className="bg-white" aria-labelledby="industries-heading">
      <div className="page-pad grid gap-6 py-14 sm:gap-8 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:py-24">
        <SectionLabel>Solutions by industry</SectionLabel>
        <h2
          id="industries-heading"
          className="display text-[clamp(1.85rem,4.8vw,3.875rem)] leading-[1.05] text-aia-navy"
        >
          Explore solutions for Mining, Cement, Quarry and Thermal Power
          applications.
        </h2>
      </div>

      <div className="divide-y divide-aia-line border-y border-aia-line bg-white">
        {industries.map((industry) => (
          <article key={industry.id} className="page-pad py-12 sm:py-16 lg:py-20">
            <ModelShowcase industry={industry} />
          </article>
        ))}
      </div>
    </section>
  );
}
