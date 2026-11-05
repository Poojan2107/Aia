import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import type { Committee, CsrInitiative, Director } from "@/content/types";
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
      <div className={`relative ${box} overflow-hidden rounded-2xl bg-[#e8eaec] shadow-sm transition-transform duration-300 group-hover:scale-[1.02]`}>
        <Image src={director.portrait.src} alt={director.portrait.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`relative flex ${box} flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c2438] via-[#041d2c] to-[#021019] shadow-inner transition-transform duration-300 group-hover:scale-[1.02]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.14),transparent_70%)]" />
      <div className="relative flex size-20 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm shadow-lg">
        <span className="display text-[1.8rem] font-extrabold tracking-wider text-white/90">
          {initials(director.name)}
        </span>
      </div>
      <div className="absolute bottom-3 text-center">
        <span className="ui-caps text-[0.65rem] tracking-[0.18em] text-white/40">AIA Leadership</span>
      </div>
    </div>
  );
}

export function BoardPage({ route, directors }: { route: RouteEntry; directors: Director[] }) {
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
                        <p className="mt-4 text-[1.02rem] font-bold leading-snug text-aia-navy group-hover:text-aia-accent">{director.name}</p>
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

export function CommitteesPage({ route, committees }: { route: RouteEntry; committees: Committee[] }) {
  return (
    <>
      <PageHero route={route} hero={{ ...boardHero, line1: "Board Committees" }} status="draft" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="space-y-8">
          {committees.map((committee) => (
            <section
              key={committee.slug}
              id={committee.slug}
              className="scroll-mt-32 rounded-2xl border border-aia-line/80 bg-white p-7 sm:p-10 shadow-[0_4px_24px_rgba(4,29,44,0.03)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(4,29,44,0.06)]"
              aria-labelledby={`${committee.slug}-h`}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-aia-line/60 bg-aia-surface-soft px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-aia-navy/70">
                <span className="size-1.5 rounded-full bg-aia-accent" />
                <span>Statutory Committee</span>
              </div>
              <h2 id={`${committee.slug}-h`} className="display text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold text-aia-navy">
                {committee.name}
              </h2>
              <p className="mt-3 max-w-[50rem] text-[1.02rem] leading-[1.75] text-aia-navy/75">{committee.mandate}</p>
              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                <div className="rounded-xl border border-aia-line/60 bg-aia-surface-soft/40 p-6">
                  <h3 className="mb-4 ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-aia-navy/60">Responsibilities & Terms of Reference</h3>
                  <Bullets items={committee.responsibilities} />
                </div>
                <div className="rounded-xl border border-aia-line/60 bg-aia-surface-soft/40 p-6">
                  <h3 className="mb-4 ui-caps text-[0.72rem] font-bold tracking-[0.14em] text-aia-navy/60">Composition</h3>
                  {committee.members.length ? (
                    <ul className="space-y-3">
                      {committee.members.map((member) => (
                        <li key={member.name} className="flex items-center justify-between gap-4 border-b border-aia-line/60 pb-2.5 text-[0.95rem]">
                          <span className="font-semibold text-aia-navy">{member.name}</span>
                          <span className="rounded-full border border-aia-line/60 bg-white px-2.5 py-0.5 text-[0.78rem] font-semibold text-aia-navy/75 shadow-xs">
                            {member.position}
                          </span>
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

export function CsrListingPage({
  route,
  initiatives: csrInitiatives,
  focusAreas: csrFocusAreas,
}: {
  route: RouteEntry;
  initiatives: CsrInitiative[];
  focusAreas: { area: CsrInitiative["area"]; body: string }[];
}) {
  return (
    <>
      <PageHero route={route} hero={csrHero} status="draft" />
      <Container className="py-16 sm:py-20 lg:py-24">
        <h2 className="display mb-8 text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold text-aia-navy">Focus areas</h2>
        <ul className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {csrFocusAreas.map((item) => (
            <li
              key={item.area}
              className="rounded-2xl border border-aia-line/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-aia-accent/40 hover:shadow-[0_16px_36px_rgba(4,29,44,0.06)]"
            >
              <span aria-hidden className="mb-4 block h-[3px] w-10 bg-aia-accent" />
              <p className="text-[1.1rem] font-bold text-aia-navy">{item.area}</p>
              <p className="mt-2 text-[0.92rem] leading-[1.7] text-aia-navy/70">{item.body}</p>
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
