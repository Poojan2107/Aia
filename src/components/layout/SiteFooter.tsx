import Image from "next/image";
import Link from "next/link";
import { homeOnly } from "@/lib/env";
import { href } from "@/lib/routes";

/**
 * Footer — Figma "AIA Signature Blue" / 01Homepage: tagline and logos over a
 * dark plant photo, the blue link panel, two CTA cells and the bottom bar.
 */

type FooterLink = [label: string, routeId: string];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Solutions",
    links: [["Mining", "mining"], ["Cement", "cement"], ["Quarry", "quarry-products"], ["Thermal Power", "thermal-power"], ["Services & Optimisation", "mining-services"]],
  },
  {
    title: "Company",
    links: [["About AIA", "about"], ["Board of Directors", "board-of-directors"], ["Technology & Infrastructure", "technology-infrastructure"], ["Global Presence", "global-presence"], ["Sustainability", "sustainability"], ["CSR Initiatives", "csr"], ["Memorandum of Association", "memorandum-of-association"], ["Careers", "careers"], ["Contact us", "contact"]],
  },
  {
    title: "Resources hub",
    links: [["Success Stories", "case-studies"], ["Blogs & Insights", "news-insights"], ["News & Events", "news-insights"], ["Videos / Media", "videos-media"], ["Downloads", "downloads"], ["FAQs", "faqs"]],
  },
];

const investorLinks: FooterLink[][] = [
  [["Financials", "investor-financials"], ["Shareholding", "investor-shareholding"], ["KYC", "investor-kyc"], ["Reports & Presentations", "investor-reports"], ["Corporate Governance", "investor-governance"], ["Policies", "investor-policies"], ["IEPF", "investor-iepf"], ["Code of Conduct", "investor-code-of-conduct"]],
  [["List of Stock Exchanges", "investor-stock-exchanges"], ["Scheme of Amalgamation", "investor-amalgamation"], ["Corporate Announcement & Disclosure", "investor-announcements"], ["Investor Regulation 46 (LODR)", "investor-regulation-46"], ["Investor Contact us", "investor-contact"]],
];

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="foot-links">
      {links.map(([label, id]) => (
        <li key={label}>
          <Link prefetch={homeOnly ? false : undefined} href={href(id)} className="ft ft-link22">{label}</Link>
        </li>
      ))}
    </ul>
  );
}

function Pill({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link prefetch={homeOnly ? false : undefined} href={to} className="foot-pill" data-magnetic="">
      <span aria-hidden className="foot-pill-dot" />
      <span className="ft ft-cta">{children}</span>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="foot">
      <Image src="/images/design/footer-bg.jpg" alt="" fill sizes="100vw" className="foot-bg" data-parallax="14" />
      <div aria-hidden className="foot-scrim" />

      <div className="foot-inner">
        <div className="foot-top">
          <p className="foot-tagline ft ft-h48">
            Engineering wear solutions.
            <br />
            Supporting operations worldwide.
          </p>
          <Image
            src="/images/brand/aia-vega-white.svg"
            alt="AIA Engineering Limited and Vega Industries"
            width={704}
            height={229}
            className="foot-logos"
            sizes="(max-width: 768px) 200px, 320px"
            unoptimized
          />
        </div>

        <div className="foot-panel">
          <div className="foot-grid">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="foot-heading ft ft-h28">{col.title}</h2>
                <LinkList links={col.links} />
              </div>
            ))}
            <div className="foot-investors">
              <h2 className="foot-heading ft ft-h28">Investors &amp; Connect</h2>
              <div className="foot-investor-cols">
                {investorLinks.map((links, i) => (
                  <LinkList key={i} links={links} />
                ))}
              </div>
            </div>
            <div className="foot-offices">
              <div>
                <h2 className="foot-heading ft ft-h28">India · Corporate Office</h2>
                <address className="foot-address">
                  <p className="ft ft-addr22">11–12, Sigma Corporates,<br /> B/h. HOF Showroom, Sindhubhavan Road,<br /> Bodakdev, Ahmedabad – 380054, India.</p>
                  <p className="ft ft-contact22 mt-3">M: <a href="tel:+917966047800">+91 79 6604 7800</a></p>
                  <p className="ft ft-contact22">F: +91 79 6604 7848</p>
                  <p className="ft ft-contact22">E: <a href="mailto:info@aiaengineering.com">info@aiaengineering.com</a></p>
                </address>
              </div>
              {/* Vega's global headquarters, as listed on aiaengineering.com/contact-us. */}
              <div className="foot-office-vega">
                <h2 className="foot-heading ft ft-h28">UAE · Vega Global Headquarters</h2>
                <address className="foot-address">
                  <p className="ft ft-addr22">Vega Industries (Middle East) F.Z.C<br /> Po Box 4275 A1-304/314,<br /> Ajman Free Zone, Ajman, UAE.</p>
                  <p className="ft ft-contact22 mt-3">M: <a href="tel:+97167420241">+971 6 7420241</a></p>
                  <p className="ft ft-contact22">E: <a href="mailto:middleeast.sales@vega-industries.com">middleeast.sales@<wbr /><span className="whitespace-nowrap">vega-industries.com</span></a></p>
                </address>
              </div>
              <div className="foot-social" aria-label="Follow us on LinkedIn">
                <a href="https://www.linkedin.com/company/aia-engineering-ltd/" className="foot-linkedin" rel="noopener noreferrer" target="_blank">
                  <LinkedInIcon />
                  <span>AIA Engineering</span>
                </a>
                {/* TODO(AIA): Vega Industries LinkedIn URL to confirm; placeholder until then. */}
                <a href={VEGA_LINKEDIN} className="foot-linkedin" rel="noopener noreferrer" target="_blank">
                  <LinkedInIcon />
                  <span>Vega Industries</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="foot-ctas">
          <div className="foot-cta">
            <p className="ft ft-h32t lg:whitespace-nowrap">Have a wear or<br />performance challenge?</p>
            <Pill to={href("contact")}>Talk to an expert</Pill>
          </div>
          <div className="foot-cta">
            <p className="ft ft-h32t lg:whitespace-nowrap">Find AIA offices, representatives<br />and support across global markets.</p>
            <Pill to={href("global-presence")}>Explore global presence</Pill>
          </div>
        </div>

        <div className="foot-bottom">
          <p className="ft ft-legal22">© 2026 AIA Engineering Limited, All Rights Reserved.</p>
          <nav aria-label="Legal" className="foot-legal">
            <Link prefetch={homeOnly ? false : undefined} href={href("privacy-policy")} className="ft ft-legal22">Privacy Policy</Link>
            <Link prefetch={homeOnly ? false : undefined} href={href("html-sitemap")} className="ft ft-legal22">Sitemap</Link>
            <span className="ft ft-legal22">En</span>
          </nav>
          <p className="foot-credit ft ft-legal22">
            <a
              href="https://13utopia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-credit-link text-white/70 transition-colors duration-200 hover:text-white"
              aria-label="Site by 13UTOPIA, opens in a new tab"
            >
              <span>Site by</span>
              <Image
                src="/images/design/logo-13utopia.png"
                alt="13UTOPIA"
                width={423}
                height={168}
                className="foot-credit-logo transition-transform duration-200 hover:scale-105"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Vega Industries LinkedIn page: placeholder until AIA confirms the URL. */
const VEGA_LINKEDIN = "https://www.linkedin.com/";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
