type Props = {
  label: string;
  value: string;
  percent: number;
  tone?: "primary" | "alt";
};

export function MetricGauge({ label, value, percent, tone = "primary" }: Props) {
  const r = 52;
  const length = Math.PI * r;
  const filled = (Math.min(100, Math.max(0, percent)) / 100) * length;
  const d = `M 18 70 A ${r} ${r} 0 0 1 122 70`;
  const stroke = "var(--aia-orange)";

  return (
    <div className="flex h-full min-h-[11.5rem] w-full flex-col items-center justify-between rounded-xl border border-aia-line bg-aia-surface-soft px-3 py-4 text-center sm:min-h-[12.25rem] sm:px-4 sm:py-5">
      <p className="flex min-h-[2.75rem] items-center justify-center text-[0.88rem] font-semibold leading-snug text-aia-navy sm:text-[0.95rem]">
        {label}
      </p>
      <svg
        viewBox="0 0 140 92"
        className="mt-1 w-[7.25rem]"
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
          strokeDasharray={`${filled} ${length}`}
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
