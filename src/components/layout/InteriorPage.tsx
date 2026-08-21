import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { CtaButton } from "@/components/ui/CtaButton";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function InteriorPage({
  title,
  eyebrow = "AIA Engineering",
  description = "This section mirrors the live AIA information architecture. Full editorial content will land with the remaining assets — the experience, navigation, and visual system are already in place.",
}: Props) {
  return (
    <>
      <div className="relative min-h-[42vh] bg-aia-navy text-aia-cream">
        <SiteHeader />
        <div className="page-pad flex min-h-[42vh] flex-col justify-end pb-14 pt-36">
          <p className="mb-4 ui-caps text-aia-cream/55">{eyebrow}</p>
          <h1 className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
            {title}
          </h1>
        </div>
      </div>
      <main className="page-pad py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr] lg:gap-20">
          <div>
            <p className="max-w-2xl text-xl leading-relaxed text-aia-navy/80 md:text-2xl">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaButton href="/company/contact" variant="outline">
                Talk to an expert
              </CtaButton>
              <Link
                href="/"
                className="ui-caps inline-flex h-[50px] items-center text-aia-navy hover:text-aia-orange"
              >
                ← Back to home
              </Link>
            </div>
          </div>
          <aside className="border border-aia-line bg-aia-surface-soft p-8">
            <BrandLockup tone="dark" className="mb-8" />
            <p className="text-sm leading-relaxed text-aia-navy/70">
              Navigation, mega menu, and design language are live. Media and 3D
              assets can drop into the existing slots without restructuring the
              page.
            </p>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}
