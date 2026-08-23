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
  const aia =
    tone === "light" ? "/images/logo-aia-clean.png" : "/images/logo-aia-dark.png";
  const vega =
    tone === "light" ? "/images/logo-vega-clean.png" : "/images/logo-vega-dark.png";
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
          compact
            ? "h-[clamp(3.25rem,4.5vw,5.5rem)] max-w-[min(18rem,16vw)]"
            : "h-10 sm:h-12 md:h-14"
        }`}
        priority={compact}
      />

      {showVega ? (
        <>
          <span
            aria-hidden
            className="hidden h-[clamp(2.5rem,4vw,4.25rem)] w-px shrink-0 self-center sm:block"
            style={{ background: divider }}
          />
          <Image
            src={vega}
            alt="Vega Industries"
            width={376}
            height={272}
            className={`hidden w-auto object-contain object-left sm:block ${
              compact
                ? "sm:h-[clamp(3rem,4.5vw,5.25rem)] sm:max-w-[min(8.75rem,7vw)]"
                : "md:h-10 lg:h-12"
            }`}
          />
        </>
      ) : null}
    </span>
  );
}
