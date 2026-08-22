import Image from "next/image";
import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-[1.05rem] font-semibold text-white md:text-lg">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[0.95rem] leading-snug text-white/90 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#041d2c] text-white">
      {/* Clean photographic plate — no baked-in UI */}
      <Image
        src="/images/footer-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[#041d2c]/82"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.45)_0%,rgba(4,29,44,0.62)_45%,rgba(4,29,44,0.9)_100%)]"
      />

      <div className="page-pad mx-auto relative z-10 max-w-[1440px] pb-[max(1rem,env(safe-area-inset-bottom))] pt-14 md:pt-20">
        {/* Tagline + logos */}
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <p className="display max-w-[18ch] text-[clamp(1.65rem,4vw,2.75rem)] leading-[1.08] text-white">
            Engineering wear solutions.
            <br />
            Supporting operations worldwide.
          </p>
          <BrandLockup tone="light" className="shrink-0 self-start sm:self-end" />
        </div>

        {/* Accent link panel — inset card matching Figma */}
        <div className="rounded-none bg-aia-orange px-5 py-8 text-white sm:px-8 sm:py-10 md:px-10 md:py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-2">
              <FooterCol title="Solutions" links={footerNav.solutions} />
            </div>
            <div className="lg:col-span-2">
              <FooterCol title="Company" links={footerNav.company} />
            </div>
            <div className="lg:col-span-2">
              <FooterCol title="Resources hub" links={footerNav.resources} />
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <p className="mb-4 text-[1.05rem] font-semibold md:text-lg">
                Investors & Connect
              </p>
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <ul className="space-y-2.5">
                  {footerNav.investorsLeft.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] text-white/90 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {footerNav.investorsRight.map((link) => (
                    <li key={`r-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[0.95rem] text-white/90 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="mb-4 text-[1.05rem] font-semibold md:text-lg">
                {site.address.label}
              </p>
              <p className="mb-4 whitespace-pre-line text-[0.95rem] leading-relaxed text-white/90">
                {site.address.lines.join("\n")}
              </p>
              <p className="text-[0.95rem] text-white/90">M: {site.phone}</p>
              <p className="text-[0.95rem] text-white/90">F: {site.fax}</p>
              <p className="break-all text-[0.95rem] text-white/90">
                E: {site.email}
              </p>
              <a
                href="https://www.linkedin.com"
                className="mt-5 inline-flex size-9 items-center justify-center transition hover:opacity-90"
                aria-label="AIA on LinkedIn"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/linkedin.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Dual CTA band */}
        <div className="mt-8 grid gap-8 border-t border-white/20 pt-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="display mb-6 max-w-[16ch] text-[clamp(1.15rem,2.5vw,1.5rem)] leading-tight text-white">
              Have a wear or performance challenge?
            </p>
            <Link
              href="/company/contact"
              className="ui-caps inline-flex h-[50px] min-w-[12rem] items-center justify-center gap-2.5 rounded-full bg-white px-6 font-medium text-aia-orange transition hover:bg-aia-cream"
            >
              <span
                className="size-2 shrink-0 rounded-full bg-aia-orange"
                aria-hidden
              />
              Talk to an expert
            </Link>
          </div>
          <div>
            <p className="display mb-6 max-w-[20ch] text-[clamp(1.15rem,2.5vw,1.5rem)] leading-tight text-white">
              Find AIA offices, representatives and support across global
              markets.
            </p>
            <Link
              href="/company/global-presence"
              className="ui-caps inline-flex h-[50px] min-w-[14rem] items-center justify-center gap-2.5 rounded-full bg-white px-6 font-medium text-aia-orange transition hover:bg-aia-cream"
            >
              <span
                className="size-2 shrink-0 rounded-full bg-aia-orange"
                aria-hidden
              />
              Explore global presence
            </Link>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-t border-white/20 py-6 text-sm text-white/75 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© 2026 {site.legalName}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
            <span className="inline-flex items-center gap-1.5">
              En
              <svg width="8" height="4" viewBox="0 0 8 4" aria-hidden>
                <path d="M0 0l4 4 4-4" fill="currentColor" />
              </svg>
            </span>
          </div>
          <p className="text-white/50">Site by I3</p>
        </div>
      </div>
    </footer>
  );
}
