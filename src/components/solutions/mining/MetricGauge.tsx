type Props = {
  label: string;
  value: string;
  percent: number;
  tone?: "primary" | "alt";
  drawn?: boolean;
};

export function MetricGauge({
  label,
  value,
  percent,
  drawn = true,
}: Props) {
  const r = 52;
  const length = Math.PI * r;
  const filled = (Math.min(100, Math.max(0, percent)) / 100) * length;
  const offset = drawn ? length - filled : length;
  const d = `M 18 70 A ${r} ${r} 0 0 1 122 70`;
  const stroke = "var(--aia-orange)";

  return (
    <div className="flex h-full min-h-[9.5rem] w-full flex-col items-center justify-between rounded-xl border border-aia-line bg-aia-surface-soft px-3 py-3 text-center sm:min-h-[10.25rem] sm:px-4 sm:py-4">
      <p className="flex min-h-[2.25rem] items-center justify-center text-[0.82rem] font-semibold leading-snug text-aia-navy sm:text-[0.9rem]">
        {label}
      </p>
      <svg
        viewBox="0 0 140 92"
        className="mt-1 w-[6.5rem]"
        role="img"
        aria-label={`${label}: ${value}`}
      >
        <path
          d={d}
          fill="none"
          stroke="#ececec"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={length.toFixed(2)}
          strokeDashoffset={offset.toFixed(2)}
          className="motion-reduce:transition-none"
          style={{ transition: "stroke-dashoffset 1.15s var(--ease-out)" }}
        />
        <text
          x="70"
          y="68"
          textAnchor="middle"
          fill="var(--aia-navy)"
          fontSize="14"
          fontWeight="700"
          fontFamily="var(--font-ui), sans-serif"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}
