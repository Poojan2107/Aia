import Image from "next/image";

type Props = {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
  /** Hide Vega for tight cards / mobile-first lockups */
  showVega?: boolean;
};

/** Official AIA + Vega lockup from brand assets. */
export function BrandLockup({
  className = "",
  tone = "light",
  compact = false,
  showVega = true,
}: Props) {
  const aia = tone === "light" ? "/images/logo-aia.png" : "/images/logo-aia-dark.png";
  const vega =
    tone === "light" ? "/images/logo-vega.png" : "/images/logo-vega-dark.png";
  const divider =
    tone === "light" ? "rgba(255,255,255,0.45)" : "rgba(4,29,44,0.2)";

  return (
    <span
      className={`inline-flex max-w-full items-center gap-2.5 sm:gap-3 md:gap-3.5 ${className}`}
    >
      <Image
        src={aia}
        alt="AIA Engineering Limited"
        width={246}
        height={82}
        className={`w-auto object-contain object-left ${
          compact
            ? "h-9 max-w-[10.5rem] sm:h-10 sm:max-w-[12rem] md:h-12 md:max-w-[14.5rem]"
            : "h-10 max-w-[12rem] sm:h-11 sm:max-w-[14rem] md:h-[3.35rem] md:max-w-[16rem]"
        }`}
        priority={compact}
      />

      {showVega ? (
        <>
          <span
            aria-hidden
            className="hidden h-7 w-px shrink-0 md:block md:h-9"
            style={{ background: divider }}
          />
          <Image
            src={vega}
            alt="Vega Industries"
            width={188}
            height={136}
            className={`hidden w-auto object-contain object-left md:block ${
              compact
                ? "md:h-[1.15rem] md:max-w-[4.6rem] lg:h-5 lg:max-w-[5.25rem]"
                : "md:h-6 md:max-w-[5.5rem] lg:h-[1.65rem] lg:max-w-[6rem]"
            }`}
          />
        </>
      ) : null}
    </span>
  );
}
