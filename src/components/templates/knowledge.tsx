import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Article, CaseStudy, Faq, InvestorDocument, MediaItem } from "@/content/types";
import { mediaHref } from "@/lib/env";
import type { RouteEntry } from "@/lib/routes";
import { absolute, articleJsonLd, faqPageJsonLd } from "@/lib/seo";
import { Container, EmptyState, PageHero, Paragraphs, formatDate } from "@/components/templates/page/chrome";
import { DocumentLibrary } from "@/components/templates/investors/DocumentLibrary";
import { FilteredCardGrid, VideoCard } from "@/components/templates/filters";

/* ----------------------------------------------------------------- Case Studies */

const caseStudiesHero = {
  eyebrow: "Knowledge Hub",
  line1: "Success Stories",
  line2: "Proven impact in critical grinding circuits",
  image: { src: "/images/service-1.jpg", alt: "Mill liners in an industrial grinding mill" },
};

const industryFilters = [
  { id: "all", label: "All Industries" },
  { id: "mining", label: "Mining" },
  { id: "cement", label: "Cement" },
  { id: "quarry", label: "Quarry" },
  { id: "thermal-power", label: "Thermal Power" },
] as const;

export function CaseStudyListingPage({ route, caseStudies }: { route: RouteEntry; caseStudies: CaseStudy[] }) {
  const cards = caseStudies.map((c) => ({
    tag: c.industry,
    href: `${route.path}/${c.slug}`,
    title: c.title,
    body: c.summary,
    meta: `${c.industry.replace("-", " ").toUpperCase()} · ${c.region}`,
    image: c.image,
  }));
  const options = industryFilters.filter((f) => f.id === "all" || caseStudies.some((c) => c.industry === f.id));

  return (
    <>
      <PageHero route={route} hero={caseStudiesHero} status="draft" />
      <Container className="py-14 sm:py-20 lg:py-24">
        <FilteredCardGrid
          label="Filter case studies by industry"
          options={[...options]}
          cards={cards}
          empty={{ title: "No case studies found", body: "There are currently no case studies listed under this industry." }}
        />
      </Container>
    </>
  );
}

const industryLinks: Record<string, { label: string; href: string }[]> = {
  mining: [
    { label: "Mining Solutions", href: "/solutions/mining" },
    { label: "Mining Products", href: "/solutions/mining/products" },
    { label: "Mining Services", href: "/solutions/mining/services" },
  ],
  cement: [
    { label: "Cement Solutions", href: "/solutions/cement" },
    { label: "Cement Products", href: "/solutions/cement/products" },
    { label: "Cement Services", href: "/solutions/cement/services" },
  ],
  quarry: [
    { label: "Quarry Products", href: "/solutions/quarry/products" },
  ],
  "thermal-power": [
    { label: "Thermal Power Solutions", href: "/solutions/thermal-power" },
    { label: "Thermal Power Products", href: "/solutions/thermal-power/products" },
  ],
};

export function CaseStudyPage({
  route,
  caseStudy,
}: {
  route: RouteEntry;
  caseStudy: CaseStudy;
}) {
  const jsonLd = articleJsonLd({
    title: caseStudy.title,
    description: caseStudy.summary,
    publishedAt: caseStudy.publishedAt,
    image: caseStudy.image.src,
    url: absolute(route.path),
    type: "Article",
  });

  const related = industryLinks[caseStudy.industry] ?? [];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        route={route}
        hero={{
          eyebrow: `${caseStudy.industry.replace("-", " ").toUpperCase()} · ${caseStudy.equipment}`,
          line1: caseStudy.title,
          lead: caseStudy.summary,
          image: caseStudy.image,
        }}
        status={caseStudy.status}
      />

      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,0.32fr)] lg:gap-16">
          <div className="space-y-10">
            <section aria-labelledby="challenge-heading" className="rounded-2xl border border-aia-line/80 bg-white p-7 sm:p-9 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="size-2 rounded-full bg-aia-accent" />
                <span className="ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-aia-navy/60">Problem Statement</span>
              </div>
              <h2 id="challenge-heading" className="display text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold text-aia-navy">
                The Challenge
              </h2>
              <Paragraphs items={caseStudy.challenge} className="mt-5 text-[1.02rem] leading-[1.8]" />
            </section>

            <section aria-labelledby="approach-heading" className="rounded-2xl border border-aia-line/80 bg-white p-7 sm:p-9 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="size-2 rounded-full bg-aia-accent" />
                <span className="ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-aia-navy/60">Engineered Solution</span>
              </div>
              <h2 id="approach-heading" className="display text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold text-aia-navy">
                Our Approach
              </h2>
              <ul className="mt-6 space-y-3.5">
                {caseStudy.approach.map((point) => (
                  <li key={point} className="flex items-start gap-3.5">
                    <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 rounded-full bg-aia-accent" />
                    <span className="text-[1.02rem] leading-relaxed text-aia-navy/85">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {caseStudy.results?.length > 0 ? (
              <section aria-labelledby="results-heading" className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-white via-emerald-50/20 to-emerald-50/40 p-7 sm:p-9 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="size-2 rounded-full bg-emerald-600" />
                  <span className="ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-emerald-800">Verified Outcomes</span>
                </div>
                <h2 id="results-heading" className="display text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold text-aia-navy">
                  Results & Operational Impact
                </h2>
                <ul className="mt-6 space-y-3.5">
                  {caseStudy.results.map((res) => (
                    <li key={res} className="flex items-start gap-3.5">
                      <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 rounded-full bg-emerald-600" />
                      <span className="text-[1.02rem] font-medium leading-relaxed text-aia-navy/90">{res}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {caseStudy.pdf ? (
              <div className="rounded-2xl border border-aia-line/80 bg-aia-surface-soft/80 p-6 sm:p-8">
                <h3 className="text-[1.15rem] font-bold text-aia-navy">Download Full Technical Case Study</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-aia-navy/70">
                  Read the complete metallurgical analysis, circuit operating data, and field engineering notes.
                </p>
                <div className="mt-5">
                  <a
                    href={mediaHref(caseStudy.pdf)}
                    download
                    className="inline-flex h-[50px] max-w-full items-center gap-2.5 rounded-full border border-aia-accent bg-aia-accent px-7 text-[14px] leading-8 font-semibold text-white transition hover:bg-aia-accent-deep shadow-sm"
                  >
                    <span>Download PDF Report</span>
                    <span aria-hidden>↓</span>
                  </a>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-aia-line/80 bg-white p-6 sm:p-7 shadow-xs">
              <p className="ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-aia-navy/60">Operation Profile</p>
              <dl className="mt-4 space-y-4 text-[0.92rem]">
                <div className="border-b border-aia-line/60 pb-3">
                  <dt className="text-aia-navy/55">Industry</dt>
                  <dd className="mt-0.5 font-bold capitalize text-aia-navy">{caseStudy.industry.replace("-", " ")}</dd>
                </div>
                <div className="border-b border-aia-line/60 pb-3">
                  <dt className="text-aia-navy/55">Equipment</dt>
                  <dd className="mt-0.5 font-bold text-aia-navy">{caseStudy.equipment}</dd>
                </div>
                <div className="border-b border-aia-line/60 pb-3">
                  <dt className="text-aia-navy/55">Region</dt>
                  <dd className="mt-0.5 font-bold text-aia-navy">{caseStudy.region}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Published</dt>
                  <dd className="mt-0.5 font-bold text-aia-navy">{formatDate(caseStudy.publishedAt)}</dd>
                </div>
              </dl>
            </div>

            {related.length ? (
              <div className="rounded-2xl border border-aia-line/80 bg-white p-6 sm:p-7 shadow-xs">
                <p className="ui-caps mb-4 text-[0.72rem] font-bold tracking-[0.14em] text-aia-navy/60">Related Solutions</p>
                <ul className="space-y-2">
                  {related.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[0.9rem] font-semibold text-aia-navy transition hover:bg-aia-surface-soft hover:text-aia-accent"
                      >
                        <span>{link.label}</span>
                        <span className="text-aia-accent transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="px-2">
              <Link
                href="/knowledge-hub/case-studies"
                className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-aia-accent hover:underline"
              >
                <span>←</span>
                <span>Back to all case studies</span>
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

/* ------------------------------------------------------------- News & Insights */

const articleHero = {
  eyebrow: "Knowledge Hub",
  line1: "News & Insights",
  line2: "Technical updates, announcements and perspectives",
  image: { src: "/images/tech-research.jpg", alt: "AIA Engineering technical insights" },
};

const articleTabs = [
  { id: "all", label: "All" },
  { id: "news", label: "News" },
  { id: "insight", label: "Insights" },
  { id: "event", label: "Events" },
] as const;

export function ArticleListingPage({ route, articles }: { route: RouteEntry; articles: Article[] }) {
  const cards = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((a) => ({
      tag: a.kind,
      href: `${route.path}/${a.slug}`,
      title: a.title,
      body: a.summary,
      meta: `${formatDate(a.publishedAt)} · ${a.kind.toUpperCase()}`,
      image: a.image.src ? a.image : undefined,
    }));

  return (
    <>
      <PageHero route={route} hero={articleHero} status="draft" />
      <Container className="py-14 sm:py-20 lg:py-24">
        <FilteredCardGrid
          label="Filter articles by type"
          options={[...articleTabs]}
          cards={cards}
          empty={{
            title: "No articles in this section",
            body: "New articles, technical insights and company updates will be posted here as they are published.",
          }}
        />
      </Container>
    </>
  );
}

export function ArticlePage({ route, article }: { route: RouteEntry; article: Article }) {
  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.summary,
    publishedAt: article.publishedAt,
    image: article.image.src,
    url: absolute(route.path),
    type: "NewsArticle",
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        route={route}
        hero={{
          eyebrow: `${article.kind.toUpperCase()} · ${formatDate(article.publishedAt)}`,
          line1: article.title,
          image: article.image.src ? article.image : { src: "/images/tech-research.jpg", alt: "" },
        }}
        status={article.status}
        size="compact"
      />

      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-[50rem]">
          <Paragraphs items={article.body} className="text-[1.08rem] leading-[1.85]" />

          {article.attachments?.length ? (
            <div className="mt-12 rounded-2xl border border-aia-line bg-aia-surface-soft p-6">
              <p className="ui-caps mb-3 tracking-[0.12em] text-aia-navy/55">Attachments & Related Documents</p>
              <ul className="space-y-2">
                {article.attachments.map((att) => (
                  <li key={att.href}>
                    <a
                      href={att.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-aia-accent hover:underline"
                    >
                      {att.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 border-t border-aia-line pt-8">
            <Link
              href="/knowledge-hub/news-and-insights"
              className="text-[0.9rem] font-semibold text-aia-accent hover:underline"
            >
              ← Back to News & Insights
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

/* ------------------------------------------------------------- Videos & Media */

export function MediaPage({ route, items }: { route: RouteEntry; items: MediaItem[] }) {
  const hero = {
    eyebrow: "Knowledge Hub",
    line1: "Videos & Media",
    line2: "Films from manufacturing, mill solutions and field engineering",
    image: { src: "/images/plant-aerial.png", alt: "AIA Engineering manufacturing facility" },
  };

  return (
    <>
      <PageHero route={route} hero={hero} status="draft" />
      <Container className="py-14 sm:py-20 lg:py-24">
        {items.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Media library is being updated"
            body="Corporate films, foundry footage and technical presentations will appear here once the video files are hosted on the media CDN."
            action={{ label: "Explore Success Stories", href: "/knowledge-hub/case-studies" }}
          />
        )}
      </Container>
    </>
  );
}

/* ----------------------------------------------------------------- Downloads */

export function DownloadsPage({ route, documents }: { route: RouteEntry; documents: InvestorDocument[] }) {
  const hero = {
    eyebrow: "Knowledge Hub",
    line1: "Downloads",
    line2: "Brochures, technical datasheets and certificates",
    image: { src: "/images/tech-research.jpg", alt: "AIA Engineering research and downloads" },
  };
  const hrefs = Object.fromEntries(documents.map((doc) => [doc.id, mediaHref(doc.file)]));

  return (
    <>
      <PageHero route={route} hero={hero} status="draft" size="compact" />
      <Container className="py-14 sm:py-20">
        <DocumentLibrary
          documents={documents}
          hrefs={hrefs}
          emptyMessage="Technical brochures and product datasheets will be published here as they move from the current site to the media CDN."
        />
      </Container>
    </>
  );
}

/* ---------------------------------------------------------------------- FAQs */

export function FaqsPage({ route, faqs }: { route: RouteEntry; faqs: Faq[] }) {
  const hero = {
    eyebrow: "Knowledge Hub",
    line1: "Frequently Asked Questions",
    line2: "Products, operations and investor matters",
    image: { src: "/images/footer-bg.jpg", alt: "" },
  };

  const grouped = new Map<string, Faq[]>();
  for (const faq of faqs) grouped.set(faq.category, [...(grouped.get(faq.category) ?? []), faq]);

  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />
      <PageHero route={route} hero={hero} status="draft" size="compact" />
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-[52rem] space-y-12">
          {Array.from(grouped.entries()).map(([category, items], i) => (
            <section key={category} aria-labelledby={`faq-cat-${i}`}>
              <h2 id={`faq-cat-${i}`} className="display mb-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold text-aia-navy">
                {category}
              </h2>
              <div className="divide-y divide-aia-line border-y border-aia-line">
                {items.map((item) => (
                  <details key={item.question} className="group py-5 transition">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.05rem] font-bold text-aia-navy group-hover:text-aia-accent">
                      <span>{item.question}</span>
                      <span aria-hidden className="shrink-0 text-xl font-light text-aia-accent transition duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[0.96rem] leading-[1.75] text-aia-navy/75">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
