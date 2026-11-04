import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import type { Job } from "@/content/types";
import type { RouteEntry } from "@/lib/routes";
import { absolute, jobPostingJsonLd } from "@/lib/seo";
import { Container, PageHero, formatDate } from "@/components/templates/page/chrome";
import { FilteredJobList } from "@/components/templates/filters";

/* ------------------------------------------------------------- Careers Landing */

const careersLandingHero = {
  eyebrow: "Careers",
  line1: "Build the Future of Industrial Metallurgy",
  line2: "Engineering performance across 120+ countries",
  lead: "At AIA Engineering and Vega Industries, we look for engineers, metallurgists, technicians and business professionals dedicated to precision, safety and operational excellence.",
  image: { src: "/images/hero-plate.jpg", alt: "AIA Engineering manufacturing and foundry operations" },
};

export function CareersPage({ route, jobs }: { route: RouteEntry; jobs: Job[] }) {
  const latestJobs = [...jobs].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, 3);

  return (
    <>
      <PageHero route={route} hero={careersLandingHero} status="draft" />

      {/* Pathways */}
      <section className="border-b border-aia-line bg-aia-surface-soft py-14 sm:py-20" aria-label="Career pathways">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal className="flex flex-col justify-between rounded-2xl border border-aia-line bg-white p-8 sm:p-10">
              <div>
                <p className="ui-caps text-aia-orange tracking-[0.14em]">Culture & Development</p>
                <h2 className="display mt-3 text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold text-aia-navy">
                  Life at AIA
                </h2>
                <p className="mt-4 text-[1rem] leading-[1.8] text-aia-navy/70">
                  Discover how AIA nurtures talent through continuous technical training, world-class safety protocols, and opportunities across our manufacturing clusters and global service centres.
                </p>
              </div>
              <div className="mt-8">
                <CtaButton href="/careers/life-at-aia" variant="outline">
                  Learn about Life at AIA →
                </CtaButton>
              </div>
            </Reveal>

            <Reveal delay={80} className="flex flex-col justify-between rounded-2xl border border-aia-line bg-white p-8 sm:p-10">
              <div>
                <p className="ui-caps text-aia-orange tracking-[0.14em]">Opportunities</p>
                <h2 className="display mt-3 text-[clamp(1.5rem,2.8vw,2.1rem)] font-extrabold text-aia-navy">
                  Open Positions
                </h2>
                <p className="mt-4 text-[1rem] leading-[1.8] text-aia-navy/70">
                  Explore current opportunities in Metallurgy, Application Engineering, Technical Services, Operations, and Business Development.
                </p>
              </div>
              <div className="mt-8">
                <CtaButton href="/careers/open-positions">
                  Browse Open Positions ({jobs.length}) →
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Latest Openings */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="ui-caps text-aia-orange tracking-[0.14em]">Featured Openings</p>
            <h2 className="display mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold text-aia-navy">
              Current Vacancies
            </h2>
          </div>
          <Link
            href="/careers/open-positions"
            className="text-[0.92rem] font-semibold text-aia-orange hover:underline"
          >
            View all openings ({jobs.length}) →
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-aia-line border-y border-aia-line">
          {latestJobs.map((job) => (
            <li key={job.slug}>
              <Link
                href={`/careers/open-positions/${job.slug}`}
                className="group flex flex-col justify-between gap-4 py-6 transition duration-200 hover:bg-aia-surface-soft/60 sm:flex-row sm:items-center sm:px-4"
              >
                <div>
                  <span className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-aia-orange">
                    {job.function} · {job.type}
                  </span>
                  <h3 className="mt-1 text-[1.15rem] font-bold text-aia-navy group-hover:text-aia-orange">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-aia-navy/60">{job.location}</p>
                </div>
                <span className="text-[0.9rem] font-semibold text-aia-orange">
                  View position →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

/* -------------------------------------------------------------- Open Positions */

const jobsHero = {
  eyebrow: "Careers",
  line1: "Open Positions",
  line2: "Find your next role at AIA Engineering and Vega Industries",
  image: { src: "/images/hero-plate.jpg", alt: "" },
};

export function JobsPage({ route, jobs }: { route: RouteEntry; jobs: Job[] }) {
  const rows = jobs.map((job) => ({
    slug: job.slug,
    href: `${route.path}/${job.slug}`,
    title: job.title,
    summary: job.summary,
    function: job.function,
    type: job.type,
    location: job.location,
  }));

  return (
    <>
      <PageHero route={route} hero={jobsHero} status="draft" size="compact" />
      <Container className="py-14 sm:py-20 lg:py-24">
        <FilteredJobList jobs={rows} />
      </Container>
    </>
  );
}

/* ------------------------------------------------------------- Job Detail Page */

export function JobPage({ route, job }: { route: RouteEntry; job: Job }) {
  const jsonLd = jobPostingJsonLd(job, absolute(route.path));

  const applySubject = encodeURIComponent(`Application: ${job.title} (${job.slug})`);
  const mailtoHref = `mailto:${job.applyEmail}?subject=${applySubject}`;

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        route={route}
        hero={{
          eyebrow: `${job.function} · ${job.type} · ${job.location}`,
          line1: job.title,
          lead: job.summary,
          image: { src: "/images/hero-plate.jpg", alt: "" },
        }}
        status={job.status}
        size="compact"
      />

      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,0.32fr)] lg:gap-16">
          <div className="space-y-12">
            <section aria-labelledby="responsibilities-heading">
              <h2 id="responsibilities-heading" className="display text-[clamp(1.4rem,2.6vw,1.9rem)] font-extrabold text-aia-navy">
                Key Responsibilities
              </h2>
              <span aria-hidden className="mt-3 block h-[3px] w-12 bg-aia-orange" />
              <ul className="mt-5 space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 bg-aia-orange" />
                    <span className="text-[1rem] leading-relaxed text-aia-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="requirements-heading">
              <h2 id="requirements-heading" className="display text-[clamp(1.4rem,2.6vw,1.9rem)] font-extrabold text-aia-navy">
                Requirements & Qualifications
              </h2>
              <span aria-hidden className="mt-3 block h-[3px] w-12 bg-aia-orange" />
              <ul className="mt-5 space-y-3">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-[0.55em] size-[7px] shrink-0 bg-aia-orange" />
                    <span className="text-[1rem] leading-relaxed text-aia-navy/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="rounded-2xl border border-aia-line bg-aia-surface-soft p-8">
              <h3 className="text-[1.2rem] font-bold text-aia-navy">Interested in this role?</h3>
              <p className="mt-2 text-[0.95rem] leading-[1.7] text-aia-navy/70">
                Send your resume and a brief introduction to our talent acquisition team. Please reference the position title in your subject line.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <CtaButton href={mailtoHref}>
                  Apply via Email →
                </CtaButton>
                <span className="text-[0.88rem] text-aia-navy/60">
                  to {job.applyEmail}
                </span>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-aia-line p-6">
              <p className="ui-caps mb-4 tracking-[0.12em] text-aia-navy/55">Job Summary</p>
              <dl className="space-y-4 text-[0.92rem]">
                <div>
                  <dt className="text-aia-navy/55">Department / Function</dt>
                  <dd className="font-semibold text-aia-navy">{job.function}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Location</dt>
                  <dd className="font-semibold text-aia-navy">{job.location}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Employment Type</dt>
                  <dd className="font-semibold text-aia-navy">{job.type}</dd>
                </div>
                <div>
                  <dt className="text-aia-navy/55">Date Posted</dt>
                  <dd className="font-semibold text-aia-navy">{formatDate(job.postedAt)}</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-aia-line pt-6">
                <CtaButton href={mailtoHref} className="w-full text-center">
                  Apply for this role
                </CtaButton>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/careers/open-positions"
                className="text-[0.9rem] font-semibold text-aia-orange hover:underline"
              >
                ← Back to all openings
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

