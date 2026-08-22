import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryStack } from "@/components/home/IndustryStack";

export function Industries() {
  return (
    <section
      id="solutions"
      className="bg-aia-surface-soft"
      aria-labelledby="industries-heading"
    >
      <Reveal className="page-pad mx-auto grid max-w-[1440px] items-end gap-6 pb-10 pt-[var(--section-y)] lg:grid-cols-[0.38fr_0.62fr] lg:gap-16 lg:pb-14">
        <SectionLabel>Solutions by industry</SectionLabel>
        <h2
          id="industries-heading"
          className="display text-[clamp(1.85rem,4.8vw,3.875rem)] leading-[1.05] text-aia-navy"
        >
          Explore solutions for Mining, Cement, Quarry and Thermal Power
          applications.
        </h2>
      </Reveal>

      <IndustryStack />
    </section>
  );
}
