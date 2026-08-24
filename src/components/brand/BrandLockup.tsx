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

  if (compact) {
    return (
      <span className={`site-header-logo ${className}`.trim()}>
        <Image
          src={aia}
          alt="AIA Engineering Limited"
          width={820}
          height={272}
          className="site-header-logo-aia"
          priority
        />
        {showVega ? (
          <>
            <span aria-hidden className="site-header-logo-divider" />
            <Image
              src={vega}
              alt="Vega Industries"
              width={376}
              height={272}
              className="site-header-logo-vega"
            />
          </>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex max-w-full items-center gap-3 md:gap-[0.9rem] ${className}`}
    >
      <Image
        src={aia}
        alt="AIA Engineering Limited"
        width={820}
        height={272}
        className="h-10 w-auto object-contain object-left sm:h-12 md:h-14"
      />

      {showVega ? (
        <>
          <span
            aria-hidden
            className="hidden h-10 w-px shrink-0 self-center sm:block md:h-12"
            style={{ background: divider }}
          />
          <Image
            src={vega}
            alt="Vega Industries"
            width={376}
            height={272}
            className="hidden w-auto object-contain object-left sm:block md:h-10 lg:h-12"
          />
        </>
      ) : null}
    </span>
  );
}
