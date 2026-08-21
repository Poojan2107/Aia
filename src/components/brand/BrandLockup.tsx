type Props = {
  className?: string;
  tone?: "light" | "dark";
  /** Smaller lockup for tight mobile headers */
  compact?: boolean;
};

/** AIA + Vega lockup matching screenshot header treatment. */
export function BrandLockup({
  className = "",
  tone = "light",
  compact = false,
}: Props) {
  const fill = tone === "light" ? "#FFFFFF" : "#041D2C";
  const muted = tone === "light" ? "rgba(255,255,255,0.7)" : "rgba(4,29,44,0.55)";

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-3 md:gap-4 ${className}`}>
      <svg
        viewBox="0 0 248 56"
        className={`w-auto ${compact ? "h-9 sm:h-11 md:h-[58px]" : "h-11 md:h-[58px]"}`}
        role="img"
        aria-label="AIA Engineering Limited"
      >
        <circle cx="28" cy="28" r="26" fill="none" stroke={fill} strokeWidth="2" />
        <text
          x="28"
          y="34"
          textAnchor="middle"
          fill={fill}
          fontFamily="var(--font-display), Helvetica, sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="1"
        >
          AE
        </text>
        <text
          x="66"
          y="24"
          fill={fill}
          fontFamily="var(--font-display), Helvetica, sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="0.5"
        >
          AIA Engineering
        </text>
        <text
          x="66"
          y="42"
          fill={muted}
          fontFamily="var(--font-ui), Helvetica, sans-serif"
          fontSize="12"
          fontWeight="500"
          letterSpacing="1.8"
        >
          LIMITED
        </text>
      </svg>

      <span
        aria-hidden
        className="hidden h-10 w-px md:block md:h-12"
        style={{ background: muted }}
      />

      <svg
        viewBox="0 0 168 56"
        className={`hidden w-auto md:block ${compact ? "md:h-11 lg:h-[58px]" : "md:h-[58px]"}`}
        role="img"
        aria-label="Vega Industries"
      >
        <path
          d="M8 44 L26 10 L44 44 Z"
          fill="none"
          stroke={fill}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path d="M26 18 L26 38" stroke={fill} strokeWidth="2.2" />
        <text
          x="56"
          y="24"
          fill={fill}
          fontFamily="var(--font-display), Helvetica, sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="1"
        >
          VEGA
        </text>
        <text
          x="56"
          y="42"
          fill={muted}
          fontFamily="var(--font-ui), Helvetica, sans-serif"
          fontSize="11"
          fontWeight="500"
          letterSpacing="1.6"
        >
          INDUSTRIES
        </text>
      </svg>
    </span>
  );
}
