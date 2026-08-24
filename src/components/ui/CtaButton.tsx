import Link from "next/link";
import { type ComponentProps } from "react";

type Variant = "solid" | "outline" | "ghost" | "cream" | "outline-light";

const variants: Record<Variant, string> = {
  solid:
    "border border-aia-orange bg-aia-orange text-white hover:bg-aia-orange-deep",
  outline:
    "border border-aia-orange bg-transparent text-aia-orange hover:bg-aia-orange hover:!text-white",
  "outline-light":
    "border border-white/80 bg-transparent text-white hover:bg-white hover:text-aia-navy",
  ghost: "border border-transparent bg-transparent text-aia-cream",
  cream:
    "border border-aia-orange bg-aia-orange text-white hover:bg-aia-orange-deep",
};

type Props = {
  href?: string;
  variant?: Variant;
  showDot?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function CtaButton({
  href,
  variant = "solid",
  showDot = true,
  className = "",
  children,
  ...rest
}: Props) {
  const isFilled = variant === "solid" || variant === "cream";
  const classes = [
    "inline-flex h-[50px] max-w-full items-center gap-2.5 rounded-full px-7 text-[14px] leading-8 transition-[color,background-color,border-color,transform] duration-300 ease-[var(--ease-out)] hover:scale-[1.02] active:scale-[0.99]",
    "ui-caps",
    variants[variant],
    className,
  ].join(" ");

  const content = (
    <>
      {showDot ? (
        <span
          aria-hidden
          className={`size-2 shrink-0 rounded-full transition-colors ${
            isFilled
              ? "bg-white"
              : variant === "outline-light"
                ? "bg-white group-hover:bg-aia-navy"
                : "bg-current"
          }`}
        />
      ) : null}
      <span className={isFilled || variant === "outline-light" ? "hero-cta-label text-white" : "hero-cta-label group-hover:!text-white"}>
        {children}
      </span>
    </>
  );

  const style =
    isFilled
      ? ({ color: "#ffffff" } as const)
      : variant === "outline-light"
        ? ({ color: "#ffffff" } as const)
        : undefined;

  if (href) {
    return (
      <Link href={href} className={`group ${classes}`} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={`group ${classes}`} style={style} {...rest}>
      {content}
    </button>
  );
}
