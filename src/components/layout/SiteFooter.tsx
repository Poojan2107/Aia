import Image from "next/image";
import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

const headingClass = "footer-h";
const linkClass = "footer-a";

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className={headingClass}>{title}</p>
      <ul>
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect width="28" height="28" rx="3" fill="white" />
      <path
        d="M8.2 11.4h2.35v8.4H8.2v-8.4Zm1.17-3.75c.76 0 1.38.62 1.38 1.38 0 .77-.62 1.39-1.38 1.39a1.39 1.39 0 0 1 0-2.77ZM12.35 11.4h2.25v1.15h.03c.31-.59 1.08-1.21 2.22-1.21 2.38 0 2.82 1.56 2.82 3.59v4.87h-2.35v-4.32c0-1.03-.02-2.35-1.43-2.35-1.43 0-1.65 1.12-1.65 2.28v4.39h-2.35v-8.4Z"
        fill="var(--aia-orange)"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer id="site-footer" className="site-footer">
      <Image
        src="/images/footer-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_30%]"
        aria-hidden
        priority={false}
      />
      <div aria-hidden className="site-footer-scrim" />

      <div className="page-pad page-max site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-lead">
            Engineering wear solutions.
            <br />
            Supporting operations worldwide.
          </p>
          <BrandLockup tone="light" className="site-footer-logos" />
        </div>

        <div className="site-footer-panel">
          <div className="site-footer-grid">
            <FooterCol title="Solutions" links={footerNav.solutions} />
            <FooterCol title="Company" links={footerNav.company} />
            <FooterCol title="Resources hub" links={footerNav.resources} />

            <div className="site-footer-invest">
              <p className={headingClass}>Investors &amp; Connect</p>
              <div className="site-footer-invest-cols">
                <ul>
                  {footerNav.investorsLeft.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul>
                  {footerNav.investorsRight.map((link) => (
                    <li key={`r-${link.label}`}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="site-footer-office">
              <p className={headingClass}>{site.address.label}</p>
              <address className="not-italic">
                <p className="footer-a footer-address">
                  {site.address.lines.join(" ")}
                </p>
                <dl className="footer-contact">
                  <div>
                    <dt>M</dt>
                    <dd>
                      <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>F</dt>
                    <dd>{site.fax}</dd>
                  </div>
                  <div>
                    <dt>E</dt>
                    <dd>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </dd>
                  </div>
                </dl>
              </address>
              <a
                href="https://www.linkedin.com"
                className="site-footer-li"
                aria-label="AIA on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-cta">
          <div className="site-footer-cta-cell">
            <p>Have a wear or performance challenge?</p>
            <Link href="/company/contact" className="site-footer-btn">
              <span aria-hidden />
              Talk to an expert
            </Link>
          </div>
          <div className="site-footer-cta-cell">
            <p>
              Find AIA offices, representatives and support across global
              markets.
            </p>
            <Link href="/company/global-presence" className="site-footer-btn">
              <span aria-hidden />
              Explore global presence
            </Link>
          </div>
        </div>

        <div className="site-footer-legal">
          <p>© 2026 {site.legalName}. All Rights Reserved.</p>
          <nav>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
            <span>
              En
              <svg width="8" height="4" viewBox="0 0 8 4" aria-hidden>
                <path d="M0 0l4 4 4-4" fill="currentColor" />
              </svg>
            </span>
          </nav>
          <p className="site-footer-by">
            Site by <b>I3</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
