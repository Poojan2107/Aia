"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { caseStudies } from "@/content/knowledge/case-studies";
import { articles } from "@/content/knowledge/articles";
import { downloads, faqs, mediaItems } from "@/content/knowledge/resources";
import type { Article, CaseStudy, MediaItem } from "@/content/types";
import { mediaHref } from "@/lib/env";
import type { RouteEntry } from "@/lib/routes";
import { absolute, articleJsonLd, faqPageJsonLd } from "@/lib/seo";
import {
  CardGrid,
  Container,
  EmptyState,
  PageHero,
  Paragraphs,
  formatDate,
} from "@/components/templates/page/chrome";
import { DocumentLibrary } from "@/components/templates/investors/DocumentLibrary";

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

export function CaseStudyListingPage({ route }: { route: RouteEntry }) {
  const [filter, setFilter] = useState<string>("all");

  const visible = useMemo(() => {
    if (filter === "all") return caseStudies;
    return caseStudies.filter((item) => item.industry === filter);
  }, [filter]);

  const cards = visible.map((c) => ({
    href: `/knowledge-hub/case-studies/${c.slug}`,
    title: c.title,
    body: c.summary,
    meta: `${c.industry.replace("-", " ").toUpperCase()} · ${c.region}`,
    image: c.image,
  }));

  return (
    <>
      <PageHero route={route} hero={caseStudiesHero} status="draft" />
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies by industry">
          {industryFilters.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-5 py-2 text-[0.85rem] font-semibold transition ${
                  active
                    ? "bg-aia-navy text-white shadow-sm"
                    : "border border-aia-line bg-white text-aia-navy/70 hover:border-aia-orange hover:text-aia-navy"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {cards.length ? (
          <CardGrid items={cards} columns={3} />
        ) : (
          <EmptyState
            title="No case studies found"
            body="There are currently no case studies listed under this industry."
          />
        )}
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
          <div className="space-y-12">
            <section aria-labelledby="challenge-heading">
              <h2 id="challenge-heading" className="display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold text-aia-navy">
                The Challenge
              </h2>
              <span aria-hidden className="mt-3 block h-[3px] w-12 bg-aia-orange" />
              <Paragraphs items={caseStudy.challenge} className="mt-5" />
            </section>

            <section aria-labelledby="approach-heading">
              <h2 id="approach-heading" className="display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold text-aia-navy">
                Our Approach
              </h2>
              <span aria-hidden className="mt-3 block h-[3px] w-12 bg-aia-orange" />
              <ul className="mt-5 space-y-3">
                {caseStudy.approach.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 bg-aia-orange" />
                    <span className="text-[1rem] leading-relaxed text-aia-navy/80">{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {caseStudy.results?.length > 0 ? (
              <section aria-labelledby="results-heading">
                <h2 id="results-heading" className="display text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold text-aia-navy">
                  Results & Operational Impact
                </h2>
                <span aria-hidden className="mt-3 block h-[3px] w-12 bg-aia-orange" />
                <ul className="mt-5 space-y-3">
                  {caseStudy.results.map((res) => (
                    <li key={res} className="flex items-start gap-3">
                      <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 bg-emerald-600" />
                      <span className="text-[1rem] leading-relaxed text-aia-navy/80">{res}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {caseStudy.pdf ? (
              <div className="rounded-2xl border border-aia-line bg-aia-surface-soft p-6 sm:p-8">
                <h3 className="text-[1.1rem] font-bold text-aia-navy">Download Full Case Study</h3>
                <p className="mt-2 text-[0.92rem] text-aia-navy/70">
                  Read the complete technical report, metallurgical details, and operating data.
                </p>
                <div className="mt-5">
                  <a
                    href={mediaHref(caseStudy.pdf)}
                    download
                    className="inline-flex h-[50px] max-w-full items-center gap-2.5 rounded-full border border-aia-orange bg-aia-orange px-7 text-[14px] leading-8 text-white transition hover:bg-[#d65217] ui-caps"
                  >
                    Download PDF Report
                  </a>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-aia-line p-6">
              <p className="ui-caps tracking-[0.12em] text-aia-navy/55">Operation details</p>
              <dl className="mt-4 space-y-4 text-[0.92rem]">
                <div>
                  <dt className="text-aia-navy/55">Industry</dt>
                  <dd className="font-semibold capitalize text-aia-navy">{caseStudy.industry.replace("-", " ")}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Equipment</dt>
                  <dd className="font-semibold text-aia-navy">{caseStudy.equipment}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Region</dt>
                  <dd className="font-semibold text-aia-navy">{caseStudy.region}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Published</dt>
                  <dd className="font-semibold text-aia-navy">{formatDate(caseStudy.publishedAt)}</dd>
                </div>
              </dl>
            </div>

            {related.length ? (
              <div className="rounded-2xl border border-aia-line p-6">
                <p className="ui-caps mb-4 tracking-[0.12em] text-aia-navy/55">Related Solutions</p>
                <ul className="space-y-2">
                  {related.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-[0.9rem] font-semibold text-aia-navy transition hover:bg-aia-surface-soft hover:text-aia-orange"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="p-2">
              <Link
                href="/knowledge-hub/case-studies"
                className="text-[0.9rem] font-semibold text-aia-orange hover:underline"
              >
                ← Back to all case studies
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

export function ArticleListingPage({ route }: { route: RouteEntry }) {
  const [tab, setTab] = useState<string>("all");

  const visible = useMemo(() => {
    if (tab === "all") return articles;
    return articles.filter((a) => a.kind === tab);
  }, [tab]);

  const cards = visible.map((a) => ({
    href: `/knowledge-hub/news-and-insights/${a.slug}`,
    title: a.title,
    body: a.summary,
    meta: `${formatDate(a.publishedAt)} · ${a.kind.toUpperCase()}`,
    image: a.image.src ? a.image : undefined,
  }));

  return (
    <>
      <PageHero route={route} hero={articleHero} status="draft" />
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by type">
          {articleTabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2 text-[0.85rem] font-semibold transition ${
                  active
                    ? "bg-aia-navy text-white shadow-sm"
                    : "border border-aia-line bg-white text-aia-navy/70 hover:border-aia-orange hover:text-aia-navy"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {cards.length ? (
          <CardGrid items={cards} columns={3} />
        ) : (
          <EmptyState
            title="No articles in this section"
            body="New articles, technical insights, and company updates will be posted here as they are published."
          />
        )}
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
                      className="inline-flex items-center gap-2 font-semibold text-aia-orange hover:underline"
                    >
                      <span>📄</span> {att.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 border-t border-aia-line pt-8">
            <Link
              href="/knowledge-hub/news-and-insights"
              className="text-[0.9rem] font-semibold text-aia-orange hover:underline"
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

function VideoCard({ item }: { item: MediaItem }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-aia-line bg-white">
      <div className="relative aspect-[16/9] w-full bg-[#111]">
        {playing && item.src ? (
          item.src.includes("youtube.com") || item.src.includes("vimeo.com") ? (
            <iframe
              src={item.src}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full border-0"
            />
          ) : (
            <video src={item.src} controls autoPlay className="size-full object-cover">
              <track kind="captions" />
            </video>
          )
        ) : (
          <button
            type="button"
            onClick={() => {
              if (item.src) setPlaying(true);
            }}
            disabled={!item.src}
            className="group relative size-full text-left"
            aria-label={`Play ${item.title}`}
          >
            <Image
              src={item.poster.src}
              alt={item.poster.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-aia-orange text-white shadow-lg transition group-hover:scale-110">
                ▶
              </span>
            </div>
            {item.durationLabel ? (
              <span className="absolute bottom-3 right-3 rounded bg-black/75 px-2 py-0.5 text-xs font-semibold text-white">
                {item.durationLabel}
              </span>
            ) : null}
          </button>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-[1.1rem] font-bold text-aia-navy">{item.title}</h3>
      </div>
    </article>
  );
}

export function MediaPage({ route }: { route: RouteEntry }) {
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
        {mediaItems.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {mediaItems.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Media library is being updated"
            body="Corporate films, foundry footage, and technical presentations will appear here as video files are hosted on the media CDN."
            action={{ label: "Explore Success Stories", href: "/knowledge-hub/case-studies" }}
          />
        )}
      </Container>
    </>
  );
}

/* ----------------------------------------------------------------- Downloads */

export function DownloadsPage({ route }: { route: RouteEntry }) {
  const hero = {
    eyebrow: "Knowledge Hub",
    line1: "Downloads",
    line2: "Brochures, technical datasheets and certificates",
    image: { src: "/images/tech-research.jpg", alt: "AIA Engineering research and downloads" },
  };

  const hrefs = Object.fromEntries(downloads.map((doc) => [doc.id, mediaHref(doc.file)]));

  return (
    <>
      <PageHero route={route} hero={hero} status="draft" size="compact" />
      <Container className="py-14 sm:py-20">
        <DocumentLibrary
          documents={downloads}
          hrefs={hrefs}
          emptyMessage="Technical brochures and product datasheets will be published here as they move from the current site to the media CDN."
        />
      </Container>
    </>
  );
}

/* ---------------------------------------------------------------------- FAQs */

export function FaqsPage({ route }: { route: RouteEntry }) {
  const hero = {
    eyebrow: "Knowledge Hub",
    line1: "Frequently Asked Questions",
    line2: "Clear answers to common questions across products, operations and investor matters",
    image: { src: "/images/footer-bg.jpg", alt: "" },
  };

  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqs>();
    for (const faq of faqs) {
      const list = map.get(faq.category) ?? [];
      list.push(faq);
      map.set(faq.category, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <>
      <JsonLd data={faqPageJsonLd(faqs)} />
      <PageHero route={route} hero={hero} status="draft" size="compact" />
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-[52rem] space-y-12">
          {grouped.map(([category, items]) => (
            <section key={category} aria-labelledby={`faq-cat-${category}`}>
              <h2 id={`faq-cat-${category}`} className="display mb-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold text-aia-navy">
                {category}
              </h2>
              <div className="divide-y divide-aia-line border-y border-aia-line">
                {items.map((item) => (
                  <details key={item.question} className="group py-5 transition">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-aia-navy text-[1.05rem] group-hover:text-aia-orange">
                      <span>{item.question}</span>
                      <span className="shrink-0 text-aia-orange transition duration-200 group-open:rotate-45 text-xl font-light">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-[0.96rem] leading-[1.75] text-aia-navy/75">
                      {item.answer}
                    </p>
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
