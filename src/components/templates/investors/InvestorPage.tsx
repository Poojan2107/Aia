import { scrip } from "@/content/investors";
import type { InvestorDocument, InvestorPageContent } from "@/content/types";
import { mediaHref } from "@/lib/env";
import { childrenOf, type RouteEntry } from "@/lib/routes";
import { Container, PageHero, Paragraphs, Sections } from "@/components/templates/page/chrome";
import { DocumentLibrary } from "@/components/templates/investors/DocumentLibrary";
import Link from "next/link";

function InvestorNav({ route }: { route: RouteEntry }) {
  const siblings = route.pillar === "investors" ? childrenOf("investors") : [];
  if (!siblings.length) return null;
  return (
    <nav aria-label="Investor pages" className="lg:sticky lg:top-[calc(var(--site-header-h)+1.5rem)]">
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
                  current ? "bg-aia-navy font-semibold text-white" : "text-aia-navy/75 hover:bg-aia-surface-soft hover:text-aia-accent"
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

export function InvestorPage({
  route,
  content,
  documents,
}: {
  route: RouteEntry;
  content: InvestorPageContent;
  documents: InvestorDocument[];
}) {
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
                      <a href={`mailto:${contact.email}`} className="mt-3 block text-[0.92rem] font-semibold text-aia-accent">
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
        hero={{ eyebrow: "Investors", line1: "Stock Ticker", line2: "NSE: AIAENG · BSE: 532683", image: { src: "/images/tech-research.jpg", alt: "AIA Engineering financial market indicators" } }}
      />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <InvestorNav route={route} />
          <div className="space-y-8">
            {/* Scrip Identification */}
            <dl className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "National Stock Exchange", code: "NSE", value: scrip.nse, sub: "Series: EQ" },
                { label: "BSE Limited", code: "BSE", value: scrip.bse, sub: "Group: A" },
                { label: "Depository Security Identifier", code: "ISIN", value: scrip.isin, sub: "NSDL / CDSL" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-aia-line/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-aia-surface-soft px-2 py-0.5 text-[0.72rem] font-bold tracking-wider text-aia-navy/70 border border-aia-line/50">
                      {item.code}
                    </span>
                    <span className="text-[0.75rem] text-aia-navy/50">{item.sub}</span>
                  </div>
                  <dd className="mt-3 text-[1.6rem] font-extrabold tracking-tight text-aia-navy">{item.value}</dd>
                  <dt className="mt-1 text-[0.82rem] text-aia-navy/60">{item.label}</dt>
                </div>
              ))}
            </dl>

            {/* Live Exchange Feed Card */}
            <div
              className="overflow-hidden rounded-2xl border border-aia-line/80 bg-white p-6 sm:p-8 shadow-sm"
              data-integration="stock-feed"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-aia-line/60 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-emerald-700">
                      Exchange Gateway
                    </span>
                  </div>
                  <h3 className="mt-1 text-[1.25rem] font-bold text-aia-navy">
                    AIA Engineering Limited
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.nseindia.com/get-quotes/equity?symbol=AIAENG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-aia-line bg-aia-surface-soft px-3.5 py-1.5 text-[0.82rem] font-semibold text-aia-navy transition hover:border-aia-accent hover:bg-aia-accent hover:text-white"
                  >
                    <span>View on NSE</span>
                    <span aria-hidden>↗</span>
                  </a>
                  <a
                    href="https://www.bseindia.com/stock-share-price/aia-engineering-ltd/aiaeng/532683/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-aia-line bg-aia-surface-soft px-3.5 py-1.5 text-[0.82rem] font-semibold text-aia-navy transition hover:border-aia-accent hover:bg-aia-accent hover:text-white"
                  >
                    <span>View on BSE</span>
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>

              {/* Feed specifications */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-aia-surface-soft/60 p-4 border border-aia-line/40">
                  <p className="text-[0.72rem] font-bold uppercase tracking-wider text-aia-navy/55">Industry Sector</p>
                  <p className="mt-1 text-[0.98rem] font-bold text-aia-navy">Capital Goods</p>
                  <p className="text-[0.78rem] text-aia-navy/50">Industrial Minerals & Mining</p>
                </div>
                <div className="rounded-xl bg-aia-surface-soft/60 p-4 border border-aia-line/40">
                  <p className="text-[0.72rem] font-bold uppercase tracking-wider text-aia-navy/55">Face Value</p>
                  <p className="mt-1 text-[0.98rem] font-bold text-aia-navy">₹2.00</p>
                  <p className="text-[0.78rem] text-aia-navy/50">Per Equity Share</p>
                </div>
                <div className="rounded-xl bg-aia-surface-soft/60 p-4 border border-aia-line/40">
                  <p className="text-[0.72rem] font-bold uppercase tracking-wider text-aia-navy/55">Bloomberg Code</p>
                  <p className="mt-1 text-[0.98rem] font-bold text-aia-navy">AIAE:IN</p>
                  <p className="text-[0.78rem] text-aia-navy/50">Reuters: AIAE.NS</p>
                </div>
                <div className="rounded-xl bg-aia-surface-soft/60 p-4 border border-aia-line/40">
                  <p className="text-[0.72rem] font-bold uppercase tracking-wider text-aia-navy/55">Trading Index</p>
                  <p className="mt-1 text-[0.98rem] font-bold text-aia-navy">NIFTY 500</p>
                  <p className="text-[0.78rem] text-aia-navy/50">BSE 500 / MidCap</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-aia-line/60 bg-aia-surface-soft/30 p-4">
                <p className="text-[0.84rem] leading-relaxed text-aia-navy/65">
                  <strong className="text-aia-navy">Regulatory Notice:</strong> Stock quotes and trading statistics on this platform are delayed by at least 15 minutes in compliance with SEBI regulations. For real-time execution and certified bid/offer depths, please consult authorised stockbrokers or official exchange platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
