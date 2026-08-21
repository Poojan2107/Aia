"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

type LinkItem = readonly { label: string; href: string }[];

function FooterLinks({
  title,
  links,
  open,
  onToggle,
}: {
  title: string;
  links: LinkItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/20 last:border-b-0 sm:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left sm:pointer-events-none sm:py-0"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-white md:text-xl">{title}</span>
        <span
          aria-hidden
          className={`text-xl leading-none transition-transform sm:hidden ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <ul
        className={`footer-accordion-panel space-y-2 overflow-hidden transition-[max-height,opacity,padding] duration-300 sm:mt-4 ${
          open
            ? "max-h-96 pb-4 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center text-[0.98rem] text-white/85 transition hover:text-white"
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
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenSection((prev) => (prev === id ? null : id));

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

      <div className="page-pad relative z-10 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:pt-16 lg:pt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10 sm:gap-8">
          <p className="display max-w-[18ch] text-[clamp(1.5rem,5vw,3rem)] text-white">
            Engineering wear solutions.
            <br />
            Supporting operations worldwide.
          </p>
          <BrandLockup tone="light" compact />
        </div>

        <div className="bg-aia-orange px-4 py-2 text-white sm:px-6 sm:py-10 md:px-10 md:py-12">
          <div className="grid sm:gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <FooterLinks
                title="Solutions"
                links={footerNav.solutions}
                open={openSection === "solutions"}
                onToggle={() => toggle("solutions")}
              />
            </div>
            <div className="lg:col-span-2">
              <FooterLinks
                title="Company"
                links={footerNav.company}
                open={openSection === "company"}
                onToggle={() => toggle("company")}
              />
            </div>
            <div className="lg:col-span-2">
              <FooterLinks
                title="Resources hub"
                links={footerNav.resources}
                open={openSection === "resources"}
                onToggle={() => toggle("resources")}
              />
            </div>

            <div className="border-b border-white/20 sm:col-span-2 sm:border-b-0 lg:col-span-4">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left sm:pointer-events-none sm:py-0"
                onClick={() => toggle("investors")}
                aria-expanded={openSection === "investors"}
              >
                <span className="text-lg font-semibold md:text-xl">
                  Investors & Connect
                </span>
                <span
                  aria-hidden
                  className={`text-xl leading-none transition-transform sm:hidden ${
                    openSection === "investors" ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`footer-accordion-panel overflow-hidden transition-[max-height,opacity,padding] duration-300 sm:mt-4 ${
                  openSection === "investors"
                    ? "max-h-[28rem] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <ul className="space-y-1">
                    {footerNav.investorsLeft.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-10 items-center text-[0.98rem] text-white/85 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {footerNav.investorsRight.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex min-h-10 items-center text-[0.98rem] text-white/85 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left sm:pointer-events-none sm:py-0"
                onClick={() => toggle("contact")}
                aria-expanded={openSection === "contact"}
              >
                <span className="text-lg font-semibold md:text-xl">
                  {site.address.label}
                </span>
                <span
                  aria-hidden
                  className={`text-xl leading-none transition-transform sm:hidden ${
                    openSection === "contact" ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`footer-accordion-panel overflow-hidden transition-[max-height,opacity,padding] duration-300 sm:mt-4 ${
                  openSection === "contact"
                    ? "max-h-96 pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="mb-4 whitespace-pre-line text-[0.98rem] leading-relaxed text-white/85">
                  {site.address.lines.join("\n")}
                </p>
                <p className="text-[0.98rem] text-white/85">M: {site.phone}</p>
                <p className="text-[0.98rem] text-white/85">F: {site.fax}</p>
                <p className="break-all text-[0.98rem] text-white/85">
                  E: {site.email}
                </p>
                <a
                  href="https://www.linkedin.com"
                  className="mt-4 inline-flex size-11 items-center justify-center rounded bg-[#0a66c2] text-sm font-bold"
                  aria-label="AIA on LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-y border-white/20 py-8 sm:py-10 md:grid-cols-2">
          <div>
            <p className="display mb-5 text-[1.25rem] leading-tight sm:text-[1.5rem]">
              Have a wear or performance challenge?
            </p>
            <Link
              href="/company/contact"
              className="ui-caps inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-5 text-aia-orange transition hover:bg-aia-cream sm:w-auto sm:justify-start"
            >
              <span className="size-2 rounded-full bg-aia-orange" aria-hidden />
              Talk to an expert
            </Link>
          </div>
          <div>
            <p className="display mb-5 text-[1.25rem] leading-tight sm:text-[1.5rem]">
              Find AIA offices, representatives and support across global
              markets.
            </p>
            <Link
              href="/company/global-presence"
              className="ui-caps inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-5 text-aia-orange transition hover:bg-aia-cream sm:w-auto sm:justify-start"
            >
              <span className="size-2 rounded-full bg-aia-orange" aria-hidden />
              Explore global presence
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>© 2026 {site.legalName}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="inline-flex min-h-10 items-center hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/sitemap.xml" className="inline-flex min-h-10 items-center hover:text-white">
              Sitemap
            </Link>
            <span className="inline-flex min-h-10 items-center gap-1">
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
