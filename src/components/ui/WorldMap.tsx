type Props = {
  className?: string;
  activeRegion?: string;
};

export function WorldMap({ className = "", activeRegion = "UAE" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#eef2f5] ${className}`}>
      <svg
        viewBox="0 0 1000 520"
        className="relative z-[1] size-full"
        role="img"
        aria-label={`AIA global presence map, focused on ${activeRegion}`}
      >
        <g fill="#c5d0da">
          <path d="M120 140c40-50 110-70 170-55 45 12 70 48 95 55 30 8 55-20 90-10 40 12 55 55 40 85-20 40-70 45-105 35-25-8-40 10-70 15-55 10-110-20-150-55-25-22-35-45-70-70z" />
          <path d="M380 150c35-25 85-20 120 5 30 22 55 20 85 35 40 20 70 65 55 105-12 32-50 45-85 40-40-6-60 18-100 10-50-10-85-55-95-95-8-35 5-75 20-100z" />
          <path d="M560 120c55-30 130-25 180 15 40 30 85 35 110 75 20 32 10 75-25 95-40 22-85 5-120-10-40-18-75 5-115-15-45-22-60-70-45-115 8-25 20-35 15-45z" />
          <path d="M200 300c45-15 90 5 120 35 25 25 70 30 85 70 12 32-10 65-45 70-40 6-65-20-100-25-45-6-85 25-120-5-30-25-20-70 5-100 15-18 35-35 55-45z" />
          <path d="M720 280c40-20 95-10 130 20 30 25 70 30 85 65 15 35-15 70-50 75-40 6-65-25-100-20-50 8-90 40-125 10-28-24-15-70 10-100 15-18 30-35 50-50z" />
          <path d="M780 180c25-15 60-5 75 20 12 20 35 25 40 50 5 28-15 45-40 45-22 0-35-15-55-15-28 0-50 20-70 0-18-18-5-50 15-70 15-15 25-20 35-30z" />
        </g>

        {[
          { x: 280, y: 210, label: "Americas", color: "#2f6fed" },
          { x: 520, y: 175, label: "Europe", color: "#da702e" },
          { x: 620, y: 250, label: "India", color: "#2f6fed" },
          { x: 670, y: 230, label: "UAE", color: "#da702e" },
          { x: 780, y: 280, label: "APAC", color: "#da702e" },
          { x: 450, y: 320, label: "Africa", color: "#2f6fed" },
        ].map((m) => {
          const active = m.label === activeRegion;
          return (
            <g key={m.label}>
              <circle cx={m.x} cy={m.y} r={active ? 8 : 5} fill={m.color} />
              {active ? (
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="16"
                  fill="none"
                  stroke="#da702e"
                  strokeWidth="1.5"
                  opacity="0.5"
                >
                  <animate attributeName="r" values="10;20;10" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
                </circle>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
