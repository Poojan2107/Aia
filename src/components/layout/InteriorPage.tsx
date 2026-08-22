import Link from "next/link";
import Image from "next/image";
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
  description = "Explore how AIA Engineering supports critical operations with engineered wear solutions, application expertise, and a global presence built around performance.",
}: Props) {
  return (
    <>
      <div className="relative min-h-[56vh] overflow-hidden bg-aia-navy text-white">
        <Image
          src="/images/plant-aerial.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.55)_0%,rgba(4,29,44,0.72)_100%)]"
        />
        <SiteHeader />
        <div className="page-pad relative z-10 mx-auto flex min-h-[56vh] max-w-[1440px] flex-col justify-end pb-16 pt-36">
          <p className="mb-4 ui-caps tracking-[0.12em] text-white/60">{eyebrow}</p>
          <h1 className="display max-w-[16ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">
            {title}
          </h1>
        </div>
      </div>
      <main className="page-pad py-[var(--section-y)]">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.15fr_0.7fr] lg:gap-20">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-aia-navy/70 md:text-[1.35rem] md:leading-[1.65]">
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
          <aside className="border border-aia-line bg-aia-surface-soft p-8 md:p-10">
            <div className="mb-8 max-w-full overflow-hidden">
              <BrandLockup tone="dark" showVega={false} />
            </div>
            <p className="mb-6 text-[1.05rem] leading-relaxed text-aia-navy/65">
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
    </>
  );
}
