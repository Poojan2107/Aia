import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { footprint } from "@/data/site";
import { media } from "@/data/media";

export function AboutBand() {
  return (
    <section className="bg-white" aria-labelledby="about-heading">
      <div className="page-pad flex flex-wrap items-end justify-between gap-6 py-16 lg:py-20">
        <h2
          id="about-heading"
          className="display text-[clamp(2.5rem,6vw,4.5rem)] text-aia-navy"
        >
          About
        </h2>
        <p className="display text-[clamp(2.5rem,6vw,4.5rem)] text-aia-navy">
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
        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-aia-navy/75">
          Across mining, cement, quarry and thermal power, we design and
          manufacture wear solutions for grinding and other demanding
          applications. Our expertise in metallurgy, engineering and
          manufacturing helps extend component life, improve equipment
          reliability and support better operating performance.
        </p>
        <CtaButton href="/company/about" variant="solid">
          Discover AIA
        </CtaButton>
      </div>

      <div className="bg-aia-surface-soft">
        <div className="page-pad grid grid-cols-2 gap-0 divide-x divide-aia-line border-y border-aia-line py-12 md:grid-cols-3 lg:grid-cols-6">
          {footprint.map((item) => (
            <div key={item.label} className="px-4 text-center md:px-6">
              <p className="display text-[clamp(2rem,3vw,3.5rem)] text-aia-orange">
                {item.value}
              </p>
              <p className="mt-2 text-base leading-snug whitespace-pre-line text-aia-navy/60 md:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
