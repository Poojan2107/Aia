type Props = {
  children: React.ReactNode;
  className?: string;
  /** Brackets around the label, e.g. [GALLERY]: off (AIA asked for plain labels). */
  brackets?: boolean;
};

export function SectionLabel({
  children,
  className = "",
  brackets = false,
}: Props) {
  return (
    <p className={`section-label ft ft-label ${className}`}>
      {brackets ? <>[{children}]</> : children}
    </p>
  );
}
