import Link from "next/link";
import { type ComponentProps } from "react";

type Variant = "solid" | "outline" | "ghost" | "cream";

const variants: Record<Variant, string> = {
  solid:
    "border border-aia-orange bg-aia-orange text-white hover:bg-[#c86124]",
  outline:
    "border border-aia-orange bg-transparent text-aia-orange hover:bg-aia-orange hover:text-white",
  ghost: "border border-transparent bg-transparent text-aia-cream",
  cream:
    "border border-aia-orange bg-aia-orange text-white hover:bg-[#c86124]",
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
  const classes = [
    "inline-flex h-[50px] items-center gap-2.5 rounded-full px-5 transition-colors duration-300",
    "ui-caps",
    variants[variant],
    className,
  ].join(" ");

  const content = (
    <>
      {showDot ? (
        <span
          aria-hidden
          className="size-2 shrink-0 rounded-full bg-current"
        />
      ) : null}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
