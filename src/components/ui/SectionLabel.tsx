type Props = {
  children: React.ReactNode;
  className?: string;
  /** Figma often wraps labels in brackets, e.g. [GALLERY] */
  brackets?: boolean;
};

export function SectionLabel({
  children,
  className = "",
  brackets = true,
}: Props) {
  return (
    <p className={`section-label ${className}`}>
      {brackets ? <>[{children}]</> : children}
    </p>
  );
}
