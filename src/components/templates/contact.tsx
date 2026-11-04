import Link from "next/link";
import { site } from "@/data/site";
import type { RouteEntry } from "@/lib/routes";
import { Container, PageHero } from "@/components/templates/page/chrome";
import { ContactForm } from "@/components/templates/ContactForm";

const contactHero = {
  eyebrow: "Contact Us",
  line1: "Connect with Our Engineering Teams",
  line2: "Technical consultation & operational support worldwide",
  lead: "Whether you need assistance with mill internals, alloy selection, grinding media trials, or statutory shareholder enquiries, our technical teams and corporate offices are ready to assist.",
  image: { src: "/images/hero-plate.jpg", alt: "AIA Engineering corporate and manufacturing support" },
};

export function ContactPage({
  route,
  initialIndustry,
}: {
  route: RouteEntry;
  initialIndustry?: string;
}) {
  return (
    <>
      <PageHero route={route} hero={contactHero} status="approved" size="compact" />

      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:gap-16">
          {/* Main Form */}
          <div>
            <h2 className="display text-[clamp(1.5rem,2.8vw,2.2rem)] font-extrabold text-aia-navy">
              Send an Enquiry
            </h2>
            <p className="mt-2 text-[0.95rem] text-aia-navy/70">
              Complete the form below and the appropriate application engineering or corporate team will respond within two business days.
            </p>
            <div className="mt-8 rounded-2xl border border-aia-line bg-aia-surface-soft p-6 sm:p-10">
              <ContactForm initialIndustry={initialIndustry} />
            </div>
          </div>

          {/* Sidebar / Office Information */}
          <aside className="space-y-8">
            {/* Corporate Office */}
            <div className="rounded-2xl border border-aia-line p-6 sm:p-8">
              <p className="ui-caps mb-4 tracking-[0.12em] text-aia-navy/55">{site.address.label}</p>
              <address className="not-italic text-[0.95rem] leading-[1.8] text-aia-navy/75">
                <p className="font-bold text-aia-navy">{site.legalName}</p>
                {site.address.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <dl className="mt-6 space-y-3 border-t border-aia-line pt-6 text-[0.92rem]">
                <div className="flex items-center gap-3">
                  <dt className="w-16 text-aia-navy/55">Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="font-semibold text-aia-navy hover:text-aia-orange">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="w-16 text-aia-navy/55">Fax</dt>
                  <dd className="text-aia-navy/75">{site.fax}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="w-16 text-aia-navy/55">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="font-semibold text-aia-orange hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quick Links / Pathways */}
            <div className="rounded-2xl border border-aia-line bg-white p-6 sm:p-8">
              <p className="ui-caps mb-3 tracking-[0.12em] text-aia-navy/55">Specific Enquiries</p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/company/global-presence"
                    className="group block rounded-xl border border-aia-line p-4 transition hover:border-aia-orange hover:bg-aia-surface-soft"
                  >
                    <p className="text-[0.95rem] font-bold text-aia-navy group-hover:text-aia-orange">
                      Global Presence & Offices →
                    </p>
                    <p className="mt-1 text-[0.85rem] text-aia-navy/60">
                      Locate our subsidiaries, service centres and warehouses in 120+ countries.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investors/contact"
                    className="group block rounded-xl border border-aia-line p-4 transition hover:border-aia-orange hover:bg-aia-surface-soft"
                  >
                    <p className="text-[0.95rem] font-bold text-aia-navy group-hover:text-aia-orange">
                      Investor Relations Contact →
                    </p>
                    <p className="mt-1 text-[0.85rem] text-aia-navy/60">
                      Reach the Company Secretary, Compliance Officer or Registrar & Share Transfer Agent.
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers/open-positions"
                    className="group block rounded-xl border border-aia-line p-4 transition hover:border-aia-orange hover:bg-aia-surface-soft"
                  >
                    <p className="text-[0.95rem] font-bold text-aia-navy group-hover:text-aia-orange">
                      Careers & Job Openings →
                    </p>
                    <p className="mt-1 text-[0.85rem] text-aia-navy/60">
                      View current vacancies and send your CV to our recruitment team.
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

