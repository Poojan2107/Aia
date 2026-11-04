import { documentsFor, scrip } from "@/content/investors";
import type { InvestorPageContent } from "@/content/types";
import { mediaHref } from "@/lib/env";
import { childrenOf, type RouteEntry } from "@/lib/routes";
import { Container, PageHero, Paragraphs, Sections } from "@/components/templates/page/chrome";
import { DocumentLibrary } from "@/components/templates/investors/DocumentLibrary";
import Link from "next/link";

function InvestorNav({ route }: { route: RouteEntry }) {
  const siblings = route.pillar === "investors" ? childrenOf("investors") : [];
  if (!siblings.length) return null;
  return (
    <nav aria-label="Investor pages" className="lg:sticky lg:top-8">
      <p className="mb-4 ui-caps tracking-[0.12em] text-aia-navy/55">Investors</p>
      <ul className="space-y-1">
        {siblings.map((page) => {
          const current = page.id === route.id;
          return (
            <li key={page.id}>
              <Link
                href={page.path}
                aria-current={current ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-[0.9rem] transition ${
                  current ? "bg-aia-navy font-semibold text-white" : "text-aia-navy/75 hover:bg-aia-surface-soft hover:text-aia-orange"
                }`}
              >
                {page.navLabel ?? page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function InvestorPage({ route, content }: { route: RouteEntry; content: InvestorPageContent }) {
  const documents = content.category ? documentsFor(content.category) : [];
  const hrefs = Object.fromEntries(documents.map((doc) => [doc.id, mediaHref(doc.file)]));
  const withNav = route.pillar === "investors";

  return (
    <>
      <PageHero route={route} hero={content.hero} status={content.status} size="compact" />
      <Container className="py-14 sm:py-20">
        <div className={withNav ? "grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16" : ""}>
          <InvestorNav route={route} />
          <div className="min-w-0">
            <Paragraphs items={content.intro} className="mb-10 max-w-[52rem]" />
            {content.sections?.length ? (
              <div className="mb-12">
                <Sections sections={content.sections} />
              </div>
            ) : null}
            {content.contacts?.length ? (
              <div className="mb-12 grid gap-6 md:grid-cols-2">
                {content.contacts.map((contact) => (
                  <address key={contact.title} className="rounded-2xl border border-aia-line p-6 not-italic">
                    <p className="mb-3 text-[1.02rem] font-bold text-aia-navy">{contact.title}</p>
                    {contact.lines.map((line) => (
                      <p key={line} className="text-[0.92rem] leading-[1.7] text-aia-navy/70">
                        {line}
                      </p>
                    ))}
                    {contact.email ? (
                      <a href={`mailto:${contact.email}`} className="mt-3 block text-[0.92rem] font-semibold text-aia-orange">
                        {contact.email}
                      </a>
                    ) : null}
                    {contact.phone ? <p className="text-[0.92rem] text-aia-navy/70">{contact.phone}</p> : null}
                  </address>
                ))}
              </div>
            ) : null}
            {content.category ? (
              <DocumentLibrary
                documents={documents}
                hrefs={hrefs}
                emptyMessage="Filings for this section are moving from the current website. Until then, they remain available on the BSE and NSE websites."
              />
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
}

export function StockTickerPage({ route }: { route: RouteEntry }) {
  return (
    <>
      <PageHero
        route={route}
        size="compact"
        status="draft"
        hero={{ eyebrow: "Investors", line1: "Stock Ticker", image: { src: "/images/tech-research.jpg", alt: "" } }}
      />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <InvestorNav route={route} />
          <div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "NSE symbol", value: scrip.nse },
                { label: "BSE scrip code", value: scrip.bse },
                { label: "ISIN", value: scrip.isin },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-aia-line p-6">
                  <dt className="ui-caps tracking-[0.12em] text-aia-navy/55">{item.label}</dt>
                  <dd className="mt-2 text-[1.4rem] font-bold text-aia-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div
              className="mt-8 flex min-h-[14rem] items-center justify-center rounded-2xl border border-dashed border-aia-line bg-aia-surface-soft p-8 text-center"
              data-integration="stock-feed"
            >
              <p className="max-w-[34rem] text-[0.95rem] leading-[1.7] text-aia-navy/65">
                Live BSE and NSE quotes appear here once the market data feed is connected. The display will show the last
                traded price, change, timestamp and a market-closed state, with the exchange delay disclaimer.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
