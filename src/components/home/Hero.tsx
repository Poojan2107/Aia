import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { media } from "@/data/media";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full" aria-label="Hero">
      <MediaSlot
        poster="/images/hero-bg.jpg"
        posterAlt="Industrial grinding operations at an AIA customer site"
        src={media.hero}
        priority
        overlay="heavy"
        className="absolute inset-0 size-full"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[28%] bg-gradient-to-r from-black/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[42%] bg-gradient-to-t from-black/55 to-transparent"
      />

      <div className="page-pad relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-36 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.75fr]">
          <h1 className="display max-w-[16ch] text-[clamp(2.75rem,6.2vw,5.625rem)] uppercase text-white">
            We engineer for
            <br />
            the hours you
            <br />
            can&apos;t afford to lose.
          </h1>

          <div className="max-w-md animate-fade-up lg:justify-self-end lg:pb-2">
            <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
              Advanced wear solutions engineered to extend component life,
              improve equipment availability and keep critical operations
              performing.
            </p>
            <CtaButton href="#solutions" variant="solid">
              Explore wear solutions
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
