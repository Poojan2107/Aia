import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { committees, directors } from "@/content/company/directors";
import { csrFocusAreas, csrInitiatives } from "@/content/company/csr";
import type { CsrInitiative, Director } from "@/content/types";
import type { RouteEntry } from "@/lib/routes";
import {
  Bullets,
  CardGrid,
  Container,
  DraftBadge,
  EmptyState,
  PageHero,
  Paragraphs,
} from "@/components/templates/page/chrome";

const boardHero = { eyebrow: "Company", line1: "Board of Directors", image: { src: "/images/mega-building.jpg", alt: "AIA Engineering corporate office" } };

const categoryLabel: Record<NonNullable<Director["category"]>, string> = {
  executive: "Executive Directors",
  "non-executive": "Non-Executive Directors",
  independent: "Independent Directors",
};

function initials(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Dr)\.\s*/i, "")
    .split(/\s+/)
    .filter((part) => /^[A-Z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Portrait({ director, size }: { director: Director; size: "card" | "large" }) {
  const box = size === "card" ? "aspect-[4/5]" : "aspect-[4/5] max-w-[22rem]";
  if (director.portrait) {
    return (
      <div className={`relative ${box} overflow-hidden rounded-2xl bg-[#e8eaec]`}>
        <Image src={director.portrait.src} alt={director.portrait.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div aria-hidden className={`flex ${box} items-center justify-center rounded-2xl bg-aia-surface-soft`}>
      <span className="display text-[3rem] font-extrabold text-aia-navy/25">{initials(director.name)}</span>
    </div>
  );
}

export function BoardPage({ route }: { route: RouteEntry }) {
  const groups = (["executive", "independent", "non-executive"] as const)
    .map((category) => ({ category, items: directors.filter((d) => d.category === category) }))
    .filter((group) => group.items.length);
  const unassigned = directors.filter((d) => !d.category);

  return (
    <>
      <PageHero route={route} hero={boardHero} status="draft" />
      <Container className="py-16 sm:py-20 lg:py-24">
        {[...groups.map((g) => ({ label: categoryLabel[g.category], items: g.items })), ...(unassigned.length ? [{ label: "Directors", items: unassigned }] : [])].map(
          (group) => (
            <section key={group.label} className="mb-16 last:mb-0" aria-labelledby={`board-${group.label}`}>
              <h2 id={`board-${group.label}`} className="display mb-8 text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold text-aia-navy">
                {group.label}
              </h2>
              <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((director, i) => (
                  <li key={director.slug}>
                    <Reveal delay={(i % 4) * 60}>
                      <Link href={`${route.path}/${director.slug}`} className="group block">
                        <Portrait director={director} size="card" />
                        <p className="mt-4 text-[1.02rem] font-bold leading-snug text-aia-navy group-hover:text-aia-orange">{director.name}</p>
                        <p className="mt-1 text-[0.88rem] text-aia-navy/60">{director.role}</p>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          ),
        )}
        <div className="mt-6 border-t border-aia-line pt-10">
          <CtaButton href="/company/board-committees" variant="outline">
            Board Committees
          </CtaButton>
        </div>
      </Container>
    </>
  );
}

export function DirectorPage({ route, director }: { route: RouteEntry; director: Director }) {
  return (
    <>
      <PageHero route={route} size="compact" hero={{ ...boardHero, line1: director.name, line2: director.role }} status={director.status} />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
          <Portrait director={director} size="large" />
          <div className="max-w-[48rem]">
            <p className="text-[1.15rem] leading-[1.7] text-aia-navy">{director.summary}</p>
            {director.bio.length ? <Paragraphs items={director.bio} className="mt-6" /> : null}
            {director.committees.length ? (
              <div className="mt-10">
                <h2 className="mb-4 text-[1.05rem] font-bold">Committee memberships</h2>
                <Bullets items={director.committees} />
              </div>
            ) : null}
            <div className="mt-10">
              <CtaButton href="/company/board-of-directors" variant="outline">
                All directors
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export function CommitteesPage({ route }: { route: RouteEntry }) {
  return (
    <>
      <PageHero route={route} hero={{ ...boardHero, line1: "Board Committees" }} status="draft" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="space-y-6">
          {committees.map((committee) => (
            <section
              key={committee.slug}
              id={committee.slug}
              className="scroll-mt-24 rounded-2xl border border-aia-line p-7 sm:p-10"
              aria-labelledby={`${committee.slug}-h`}
            >
              <h2 id={`${committee.slug}-h`} className="display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold text-aia-navy">
                {committee.name}
              </h2>
              <p className="mt-3 max-w-[50rem] text-[1rem] leading-[1.7] text-aia-navy/70">{committee.mandate}</p>
              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 ui-caps tracking-[0.12em] text-aia-navy/55">Responsibilities</h3>
                  <Bullets items={committee.responsibilities} />
                </div>
                <div>
                  <h3 className="mb-4 ui-caps tracking-[0.12em] text-aia-navy/55">Composition</h3>
                  {committee.members.length ? (
                    <ul className="space-y-2">
                      {committee.members.map((member) => (
                        <li key={member.name} className="flex justify-between gap-4 border-b border-aia-line pb-2 text-[0.95rem]">
                          <span>{member.name}</span>
                          <span className="text-aia-navy/55">{member.position}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[0.95rem] text-aia-navy/55">Composition to be confirmed by the Company Secretary.</p>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}

const csrHero = { eyebrow: "Company", line1: "CSR Initiatives", line2: "Community programmes", image: { src: "/images/sustainability-alt.jpg", alt: "Community programme supported by AIA Engineering" } };

export function CsrListingPage({ route }: { route: RouteEntry }) {
  return (
    <>
      <PageHero route={route} hero={csrHero} status="draft" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <h2 className="display mb-8 text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold text-aia-navy">Focus areas</h2>
        <ul className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {csrFocusAreas.map((item) => (
            <li key={item.area} className="rounded-2xl border border-aia-line p-6">
              <span aria-hidden className="mb-4 block h-[3px] w-10 bg-aia-orange" />
              <p className="text-[1.05rem] font-bold">{item.area}</p>
              <p className="mt-2 text-[0.92rem] leading-[1.7] text-aia-navy/65">{item.body}</p>
            </li>
          ))}
        </ul>
        <h2 className="display mb-8 text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold text-aia-navy">Initiatives</h2>
        {csrInitiatives.length ? (
          <CardGrid
            items={csrInitiatives.map((item) => ({ href: `${route.path}/${item.slug}`, title: item.title, body: item.summary, meta: item.area, image: item.image }))}
          />
        ) : (
          <EmptyState title="Initiatives coming soon" body="Approved CSR project stories will be published here by the CSR Committee." action={{ label: "Read our CSR policy", href: "/investors/policies" }} />
        )}
      </Container>
    </>
  );
}

export function CsrDetailPage({ route, initiative }: { route: RouteEntry; initiative: CsrInitiative }) {
  return (
    <>
      <PageHero route={route} hero={{ ...csrHero, line1: initiative.title, line2: initiative.area, image: initiative.image }} status={initiative.status} />
      <Container className="py-16 sm:py-20">
        <div className="max-w-[48rem]">
          <p className="text-[1.15rem] leading-[1.7] text-aia-navy">{initiative.summary}</p>
          <Paragraphs items={initiative.body} className="mt-6" />
          <div className="mt-10">
            <DraftBadge status={initiative.status} />
          </div>
        </div>
      </Container>
    </>
  );
}
