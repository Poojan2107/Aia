"use client";

import { CtaButton } from "@/components/ui/CtaButton";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { assets } from "@/data/assets";
import { media } from "@/data/media";

/** Full-bleed mill-floor film, locked to Figma Present hero. */
export function Hero() {
  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0a1218]"
      aria-label="Hero"
    >
      <MediaSlot
        poster={assets.hero.videoPoster}
        posterAlt="Industrial grinding operations at an AIA customer site"
        src={media.hero}
        playback="ambient"
        overlay="soft"
        priority
        className="absolute inset-0"
        sizes="100vw"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.28)_0%,rgba(4,29,44,0)_32%,rgba(4,29,44,0.18)_62%,rgba(4,29,44,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(42%,520px)] bg-gradient-to-r from-black/28 via-black/8 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/58 via-black/18 to-transparent"
      />

      <div className="page-pad relative z-10 flex h-full flex-col justify-end pb-[5.25rem] pt-28 md:pb-[5.75rem] lg:pb-[6.25rem]">
        <div className="animate-fade-up mx-auto grid w-full max-w-[1440px] items-end gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.65fr)] lg:gap-12 xl:gap-16">
          <h1 className="display text-[clamp(2.5rem,6.5vw,5.25rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] text-white [text-wrap:unset]">
            We engineer for
            <br />
            the hours you can&apos;t
            <br />
            afford to lose.
          </h1>

          <div className="w-full max-w-[24rem] lg:mb-1.5 lg:justify-self-end">
            <p className="mb-6 text-[0.95rem] leading-[1.58] text-white/90 md:text-[1.05rem]">
              Advanced wear solutions engineered to extend component life,
              improve equipment availability and keep critical operations
              performing.
            </p>
            <CtaButton href="#solutions" variant="solid" className="w-full justify-center sm:w-auto">
              Explore wear solutions
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
