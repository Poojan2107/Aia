import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AssistChip } from "@/components/ui/AssistChip";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ContentStatus, Hero, LinkRef, Section } from "@/content/types";
import { trail, type RouteEntry } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { showDraftBadges } from "@/lib/env";

/** Header, footer, assistant chip and breadcrumb structured data around a page. */
export function PageShell({ route, children }: { route: RouteEntry; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <AssistChip />
      {route.id !== "home" ? <JsonLd data={breadcrumbJsonLd(trail(route.id))} /> : null}
    </>
  );
}

export function Breadcrumbs({ route, tone = "light" }: { route: RouteEntry; tone?: "light" | "dark" }) {
  const items = trail(route.id);
  const base = tone === "light" ? "text-white/60" : "text-aia-navy/55";
  const hover = tone === "light" ? "hover:text-white" : "hover:text-aia-accent";
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] ${base}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.id} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={tone === "light" ? "text-white" : "text-aia-navy"}>
                  {item.navLabel ?? item.title}
                </span>
              ) : (
                <Link href={item.path} className={`transition ${hover}`}>
                  {item.navLabel ?? item.title}
                </Link>
              )}
              {!last ? <span aria-hidden>/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function DraftBadge({ status }: { status: ContentStatus }) {
  if (status !== "draft" || !showDraftBadges) return null;
  return (
    <p className="mt-5 inline-flex rounded-full border border-amber-300/60 bg-amber-200/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-amber-200">
      Draft content: awaiting AIA approval
    </p>
  );
}

export function PageHero({
  route,
  hero,
  status,
  size = "default",
}: {
  route: RouteEntry;
  hero: Hero;
  status?: ContentStatus;
  size?: "default" | "compact";
}) {
  const height = size === "compact" ? "min-h-[48vh]" : "min-h-[62vh]";
  return (
    <section className={`relative ${height} overflow-hidden bg-aia-navy text-white`} aria-labelledby="page-title">
      <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover object-center" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.72)_0%,rgba(4,29,44,0.52)_42%,rgba(4,29,44,0.94)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-aia-navy/80 to-transparent"
      />
      <div className={`page-pad relative z-10 mx-auto flex ${height} max-w-[1440px] flex-col justify-end pb-14 pt-36 sm:pb-16`}>
        <div className="animate-fade-up max-w-[62rem]">
          <Breadcrumbs route={route} />
          {hero.eyebrow ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-aia-accent" />
              <span className="ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-white/90">
                {hero.eyebrow}
              </span>
            </div>
          ) : null}
          <h1 id="page-title" className="display text-[clamp(2.3rem,5.2vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            <span className="block text-white">{hero.line1}</span>
            {hero.line2 ? (
              <span className="mt-2 block bg-gradient-to-r from-aia-accent via-[#ff7a3d] to-aia-accent bg-clip-text text-transparent">
                {hero.line2}
              </span>
            ) : null}
          </h1>
          {hero.lead ? (
            <p className="mt-6 max-w-[46rem] text-[1.08rem] font-light leading-[1.75] text-white/90 md:text-[1.18rem]">
              {hero.lead}
            </p>
          ) : null}
          {status ? <DraftBadge status={status} /> : null}
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-aia-accent/60 to-transparent" />
    </section>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`page-pad mx-auto max-w-[1440px] ${className}`}>{children}</div>;
}

export function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-5 ${className}`}>
      {items.map((text) => (
        <p key={text} className="text-[1rem] leading-[1.8] text-aia-navy/75 md:text-[1.06rem]">
          {text}
        </p>
      ))}
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 bg-aia-accent" />
          <span className="text-[1rem] leading-relaxed text-aia-navy/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LinkList({ links }: { links: LinkRef[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="inline-flex rounded-full border border-aia-line px-4 py-2 text-[0.85rem] font-semibold text-aia-navy transition hover:border-aia-accent hover:bg-aia-accent hover:text-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Renders CMS-style sections: heading, paragraphs, bullets, optional image and links. */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <div className="divide-y divide-aia-line">
      {sections.map((section, i) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 py-14 first:pt-0 sm:py-16" aria-labelledby={`${section.id}-h`}>
          <div className={`grid gap-10 ${section.image ? "lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-16" : ""}`}>
            <Reveal className={section.image && i % 2 === 1 ? "lg:order-2" : ""}>
              <h2 id={`${section.id}-h`} className="display text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-aia-navy">
                {section.heading}
              </h2>
              <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-accent" />
              <div className="mt-6 max-w-[48rem] space-y-6">
                {section.body?.length ? <Paragraphs items={section.body} /> : null}
                {section.bullets?.length ? <Bullets items={section.bullets} /> : null}
                {section.links?.length ? <LinkList links={section.links} /> : null}
              </div>
            </Reveal>
            {section.image ? (
              <Reveal delay={80} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="relative aspect-[16/11] overflow-hidden rounded-[22px] bg-[#e8eaec]">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}

export { CardGrid, EmptyState, formatDate } from "@/components/templates/page/cards";
