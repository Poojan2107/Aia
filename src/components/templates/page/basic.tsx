import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import type { ContentPageContent, Hero } from "@/content/types";
import { allRoutes, childrenOf, type Pillar, type RouteEntry } from "@/lib/routes";
import { CardGrid, Container, LinkList, PageHero, Sections } from "@/components/templates/page/chrome";

export function HubPage({ route, hero }: { route: RouteEntry; hero: Hero }) {
  const children = childrenOf(route.id);
  return (
    <>
      <PageHero route={route} hero={{ ...hero, lead: hero.lead ?? route.description }} />
      <Container className="py-16 sm:py-20 lg:py-24">
        <CardGrid items={children.map((child) => ({ href: child.path, title: child.title, body: child.description }))} />
      </Container>
    </>
  );
}

export function ContentPage({ route, content }: { route: RouteEntry; content: ContentPageContent }) {
  return (
    <>
      <PageHero route={route} hero={content.hero} status={content.status} />
      {content.facts?.length ? (
        <section className="border-b border-aia-line bg-aia-surface-soft" aria-label="Key facts">
          <Container className="py-10">
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {content.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="order-2 mt-1 text-[0.85rem] text-aia-navy/65">{fact.label}</dt>
                  <dd className="display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-aia-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}
      <Container className="py-16 sm:py-20 lg:py-24">
        <Sections sections={content.sections} />
        {content.related?.length ? (
          <div className="mt-14 border-t border-aia-line pt-10">
            <p className="mb-4 ui-caps tracking-[0.12em] text-aia-navy/55">Related</p>
            <LinkList links={content.related} />
          </div>
        ) : null}
      </Container>
    </>
  );
}

export function LegalPage({ route, content }: { route: RouteEntry; content: ContentPageContent }) {
  return (
    <>
      <PageHero route={route} hero={content.hero} status={content.status} size="compact" />
      <Container className="py-16 sm:py-20">
        <div className="max-w-[52rem]">
          <Sections sections={content.sections} />
        </div>
      </Container>
    </>
  );
}

export function ThankYouPage({ route }: { route: RouteEntry }) {
  return (
    <>
      <PageHero
        route={route}
        size="compact"
        hero={{ line1: "Thank you", line2: "Your enquiry has been received", image: { src: "/images/footer-bg.jpg", alt: "" } }}
      />
      <Container className="py-16 sm:py-20">
        <Reveal className="max-w-[44rem]">
          <p className="text-[1.08rem] leading-[1.8] text-aia-navy/75">
            The right team will get back to you, usually within two working days. If your request is urgent, call our corporate office.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/">Back to home</CtaButton>
            <CtaButton href="/solutions" variant="outline">
              Explore solutions
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

const pillarOrder: { pillar: Pillar; label: string }[] = [
  { pillar: "company", label: "Company" },
  { pillar: "solutions", label: "Our Solutions" },
  { pillar: "investors", label: "Investors" },
  { pillar: "knowledge-hub", label: "Knowledge Hub" },
  { pillar: "careers", label: "Careers" },
  { pillar: "contact", label: "Contact" },
  { pillar: "utility", label: "Legal" },
];

export function HtmlSitemapPage({ route }: { route: RouteEntry }) {
  const routes = allRoutes().filter((entry) => entry.indexable !== false);
  return (
    <>
      <PageHero route={route} size="compact" hero={{ line1: "Sitemap", image: { src: "/images/footer-bg.jpg", alt: "" } }} />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {pillarOrder.map(({ pillar, label }) => {
            const items = routes.filter((entry) => entry.pillar === pillar);
            if (!items.length) return null;
            return (
              <section key={pillar} aria-labelledby={`map-${pillar}`}>
                <h2 id={`map-${pillar}`} className="mb-4 text-[1.1rem] font-bold text-aia-navy">
                  {label}
                </h2>
                <ul className="space-y-2">
                  {items.map((entry) => (
                    <li key={entry.id}>
                      <Link href={entry.path} className="text-[0.95rem] text-aia-navy/75 hover:text-aia-orange hover:underline">
                        {entry.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
