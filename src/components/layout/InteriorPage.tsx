import Link from "next/link";
import Image from "next/image";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import type { InteriorContent } from "@/data/pages";

type Props = InteriorContent;

export function InteriorPage({
  title,
  eyebrow,
  description,
  image,
  highlights,
  related,
}: Props) {
  const millPlate = image.includes("/mill-");

  return (
    <>
      <div className="relative min-h-[56vh] overflow-hidden bg-aia-navy text-white">
        <Image
          src={millPlate ? "/images/plant-aerial.png" : image}
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
          <Reveal>
            <p className="mb-4 ui-caps tracking-[0.12em] text-white/60">{eyebrow}</p>
            <h1 className="display max-w-[16ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">
              {title}
            </h1>
          </Reveal>
        </div>
      </div>

      <main className="page-pad py-[var(--section-y)]">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-aia-navy/70 md:text-[1.35rem] md:leading-[1.65]">
              {description}
            </p>
            <ul className="mt-10 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.55em] size-[7px] shrink-0 bg-aia-orange"
                  />
                  <span className="text-[1.05rem] leading-relaxed text-aia-navy/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
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

          <aside>
            <div
              className={`relative mb-8 overflow-hidden bg-aia-surface-soft ${
                millPlate ? "aspect-[16/10] bg-white" : "aspect-[16/10]"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={millPlate ? "object-contain p-4" : "object-cover"}
              />
            </div>
            <div className="border border-aia-line bg-aia-surface-soft p-8 md:p-10">
              <div className="mb-8 max-w-full overflow-hidden">
                <BrandLockup tone="dark" showVega={false} />
              </div>
              <p className="mb-6 text-[1.05rem] leading-relaxed text-aia-navy/65">
                Looking for a specific application, location, or resource? Our
                teams can help you find the right wear solution and support model.
              </p>
              {related.length ? (
                <ul className="mb-8 space-y-2">
                  {related.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.95rem] text-aia-navy/80 underline-offset-4 hover:text-aia-orange hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              <CtaButton href="/company/global-presence" variant="outline">
                Explore global presence
              </CtaButton>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
      <AssistChip />
    </>
  );
}
