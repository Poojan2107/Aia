import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";

export function Hero() {
  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#041d2c]"
      aria-label="Hero"
    >
      <Image
        src="/images/hero-plate.jpg"
        alt="Industrial grinding operations at an AIA customer site"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.4)_0%,rgba(4,29,44,0.12)_38%,rgba(4,29,44,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(52%,620px)] bg-gradient-to-r from-black/45 via-black/15 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      <div className="page-pad relative z-10 flex min-h-[100svh] flex-col justify-end pb-24 pt-28 sm:pb-16 sm:pt-36 md:pb-20 lg:pb-24">
        <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-[1.4fr_0.7fr] lg:gap-16">
          <h1 className="display max-w-[14ch] text-[clamp(2.35rem,7.2vw,5.5rem)] uppercase text-white">
            We engineer for
            <br />
            the hours you
            <br />
            can&apos;t afford to lose.
          </h1>

          <div className="max-w-md lg:justify-self-end lg:pb-1">
            <p className="mb-7 text-base leading-relaxed text-white/95 sm:mb-8 md:text-lg">
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
