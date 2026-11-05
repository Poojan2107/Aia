import { CtaButton } from "@/components/ui/CtaButton";

/** Hero plate from Figma "AIA Signature Blue" / 01Homepage (mill hall still). */
const HERO_PLATE = "/images/design/hero-mill-hall.jpg";

/** Full-viewport plate + Figma Present lockup (90/95 type, 134px inset). */
export function Hero() {
  return (
    <section
      className="hero-viewport relative isolate w-full bg-black"
      aria-label="Hero"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_PLATE}
          alt=""
          fetchPriority="high"
          className="hero-film object-cover object-[center_45%] brightness-[0.84] contrast-[1.04]"
        />
        <div className="hero-scrim" aria-hidden />
      </div>

      <div className="hero-copy z-10" data-hero-lock="figma-1920">
        <div className="hero-lockup">
          <h1 className="hero-enter hero-headline">
            <span>WE ENGINEER FOR</span>
            <span>THE HOURS YOU</span>
            <span>CAN&apos;T AFFORD TO LOSE.</span>
          </h1>

          <div className="hero-enter-late hero-rail">
            <p className="hero-lede">
              <span>Advanced wear solutions engineered to extend component</span>
              <span>life, improve equipment availability and keep critical</span>
              <span>operations performing.</span>
            </p>
            <CtaButton
              href="#solutions"
              variant="solid"
              className="hero-cta !h-[40px] !px-[1.4rem] !text-[11px] !gap-2"
            >
              Explore wear solutions
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
