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
      className={`inline-flex max-w-full items-center gap-3 md:gap-[0.9rem] ${className}`}
    >
      <Image
        src={aia}
        alt="AIA Engineering Limited"
        width={820}
        height={272}
        className={`w-auto object-contain object-left ${
          tone === "light" ? "mix-blend-screen" : ""
        } ${
          compact
            ? "h-[40px] max-w-[12.75rem]"
            : "h-10 sm:h-11 md:h-[3.35rem]"
        }`}
        priority={compact}
      />

      {showVega ? (
        <>
          <span
            aria-hidden
            className="hidden h-[clamp(1.35rem,2.4vw,2.75rem)] w-px shrink-0 self-center md:block"
            style={{ background: divider }}
          />
          <Image
            src={vega}
            alt="Vega Industries"
            width={376}
            height={272}
            className={`hidden w-auto object-contain object-left md:block ${
              tone === "light" ? "mix-blend-screen" : ""
            } ${
              compact
                ? "md:h-[22px] md:max-w-[5.75rem]"
                : "md:h-6 lg:h-[1.65rem]"
            }`}
          />
        </>
      ) : null}
    </span>
  );
}
