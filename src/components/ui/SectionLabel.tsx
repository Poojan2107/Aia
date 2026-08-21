type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: Props) {
  return (
    <p
      className={`font-[family-name:var(--font-ui)] text-[1.05rem] uppercase tracking-[0.04em] text-aia-orange ${className}`}
    >
      [{children}]
    </p>
  );
}
