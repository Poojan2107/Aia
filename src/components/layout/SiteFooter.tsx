import Image from "next/image";
import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

function Col({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-lg font-semibold text-white md:text-xl">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[0.98rem] text-white/85 transition hover:text-white"
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
    <footer className="relative overflow-hidden text-white">
      <Image
        src="/images/footer-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-aia-navy/55" />

      <div className="page-pad relative z-10 pt-16 lg:pt-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
          <p className="display max-w-[18ch] text-[clamp(1.75rem,3vw,3rem)] text-white">
            Engineering wear solutions.
            <br />
            Supporting operations worldwide.
          </p>
          <BrandLockup tone="light" />
        </div>

        <div className="bg-aia-orange px-6 py-10 text-white md:px-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <Col title="Solutions" links={footerNav.solutions} />
            </div>
            <div className="lg:col-span-2">
              <Col title="Company" links={footerNav.company} />
            </div>
            <div className="lg:col-span-2">
              <Col title="Resources hub" links={footerNav.resources} />
            </div>
            <div className="lg:col-span-4">
              <p className="mb-4 text-lg font-semibold md:text-xl">
                Investors & Connect
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <ul className="space-y-2">
                  {footerNav.investorsLeft.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.98rem] text-white/85 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {footerNav.investorsRight.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.98rem] text-white/85 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="mb-4 text-lg font-semibold md:text-xl">
                {site.address.label}
              </p>
              <p className="mb-4 whitespace-pre-line text-[0.98rem] leading-relaxed text-white/85">
                {site.address.lines.join("\n")}
              </p>
              <p className="text-[0.98rem] text-white/85">M: {site.phone}</p>
              <p className="text-[0.98rem] text-white/85">F: {site.fax}</p>
              <p className="text-[0.98rem] text-white/85">E: {site.email}</p>
              <a
                href="https://www.linkedin.com"
                className="mt-4 inline-flex size-8 items-center justify-center rounded bg-[#0a66c2] text-sm font-bold"
                aria-label="AIA on LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-y border-white/20 py-10 md:grid-cols-2">
          <div>
            <p className="display mb-5 text-[1.5rem] leading-tight">
              Have a wear or performance challenge?
            </p>
            <Link
              href="/company/contact"
              className="ui-caps inline-flex h-[50px] items-center gap-2.5 rounded-full bg-white px-5 text-aia-orange transition hover:bg-aia-cream"
            >
              <span className="size-2 rounded-full bg-aia-orange" aria-hidden />
              Talk to an expert
            </Link>
          </div>
          <div>
            <p className="display mb-5 text-[1.5rem] leading-tight">
              Find AIA offices, representatives and support across global
              markets.
            </p>
            <Link
              href="/company/global-presence"
              className="ui-caps inline-flex h-[50px] items-center gap-2.5 rounded-full bg-white px-5 text-aia-orange transition hover:bg-aia-cream"
            >
              <span className="size-2 rounded-full bg-aia-orange" aria-hidden />
              Explore global presence
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-white/70">
          <p>© 2026 {site.legalName}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
            <span className="inline-flex items-center gap-1">
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
