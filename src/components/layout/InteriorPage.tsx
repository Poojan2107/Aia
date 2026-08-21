import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { CtaButton } from "@/components/ui/CtaButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function InteriorPage({
  title,
  eyebrow = "AIA Engineering",
  description = "Explore how AIA Engineering supports critical operations with engineered wear solutions, application expertise, and a global presence built around performance.",
}: Props) {
  return (
    <>
      <div className="relative min-h-[48vh] overflow-hidden bg-aia-navy text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(var(--aia-accent-rgb),0.28),transparent_55%)]"
        />
        <SiteHeader />
        <div className="page-pad relative z-10 flex min-h-[48vh] flex-col justify-end pb-14 pt-36">
          <p className="mb-4 ui-caps text-white/55">{eyebrow}</p>
          <h1 className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
            {title}
          </h1>
        </div>
      </div>
      <main className="page-pad py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.7fr] lg:gap-20">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-aia-navy/75 md:text-xl">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaButton href="/company/contact" variant="solid">
                Talk to an expert
              </CtaButton>
              <Link
                href="/"
                className="ui-caps inline-flex h-[50px] items-center text-aia-navy transition hover:text-aia-orange"
              >
                ← Back to home
              </Link>
            </div>
          </div>
          <aside className="overflow-hidden border border-aia-line bg-aia-surface-soft p-8 md:p-10">
            <div className="mb-8 max-w-full overflow-hidden">
              <BrandLockup tone="dark" showVega={false} />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-aia-navy/70">
              Looking for a specific application, location, or resource? Our
              teams can help you find the right wear solution and support model.
            </p>
            <CtaButton href="/company/global-presence" variant="outline">
              Explore global presence
            </CtaButton>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <AssistChip />
      <ThemeToggle />
    </>
  );
}
