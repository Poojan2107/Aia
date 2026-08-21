import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { footprint } from "@/data/site";
import { media } from "@/data/media";

export function AboutBand() {
  return (
    <section className="bg-white" aria-labelledby="about-heading">
      <div className="page-pad flex flex-col gap-2 py-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6 sm:py-16 lg:py-20">
        <h2
          id="about-heading"
          className="display text-[clamp(2rem,8vw,4.5rem)] text-aia-navy"
        >
          About
        </h2>
        <p className="display text-[clamp(1.75rem,7vw,4.5rem)] text-aia-navy">
          AIA Engineering
        </p>
      </div>

      <div className="page-pad mx-auto max-w-5xl pb-12 text-center">
        <MediaSlot
          poster="/images/about-still.jpg"
          posterAlt="AIA Engineering facility"
          src={media.about}
          film
          className="mx-auto mb-10 aspect-[16/10] max-w-4xl rounded-[1.25rem]"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-aia-navy/75 sm:text-lg">
          Across mining, cement, quarry and thermal power, we design and
          manufacture wear solutions for grinding and other demanding
          applications. Our expertise in metallurgy, engineering and
          manufacturing helps extend component life, improve equipment
          reliability and support better operating performance.
        </p>
        <CtaButton href="/company/about" variant="solid" className="w-full justify-center sm:w-auto">
          Discover AIA
        </CtaButton>
      </div>

      <div className="bg-aia-surface-soft">
        <div className="page-pad grid grid-cols-2 gap-y-8 border-y border-aia-line py-10 sm:py-12 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-0 lg:divide-x lg:divide-aia-line">
          {footprint.map((item) => (
            <div key={item.label} className="px-3 text-center sm:px-4 md:px-6">
              <p className="display text-[clamp(1.75rem,6vw,3.5rem)] text-aia-orange">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-snug whitespace-pre-line text-aia-navy/60 sm:text-base md:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
