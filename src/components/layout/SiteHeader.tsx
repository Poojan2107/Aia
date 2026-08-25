"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { CtaButton } from "@/components/ui/CtaButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { megaSections } from "@/data/nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(megaSections[1]?.id ?? "company");
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = megaSections.find((s) => s.id === activeId) ?? megaSections[0];

  return (
    <>
      {/* Hero overlay only — no dark sticky bar after scroll */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 bg-transparent">
        <div className="site-header-bar pointer-events-auto flex items-center justify-between gap-3">
          <Link href="/" className="min-w-0 shrink" aria-label="AIA Engineering home">
            <BrandLockup tone="light" compact />
          </Link>

          <div className="site-header-actions">
            <button
              type="button"
              className="site-header-lang"
              aria-haspopup="listbox"
            >
              En
              <svg width="8" height="4" viewBox="0 0 8 4" aria-hidden>
                <path d="M0 0l4 4 4-4" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="site-header-menu"
              aria-expanded={open}
              aria-controls="mega-menu"
            >
              <span className="site-header-menu-label">MENU</span>
              <span className="site-header-menu-icon" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mega-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed inset-0 z-[60] transition-[visibility,opacity] duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/45 backdrop-blur-[28px]"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-0 flex flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-500 ease-[var(--ease-out)] md:inset-auto md:left-1/2 md:top-[max(2.75rem,6.5vh)] md:h-[min(620px,78vh)] md:w-[min(1120px,86vw)] md:-translate-x-1/2 ${
            open
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0 md:-translate-y-3"
          }`}
        >
          <div className="flex h-[3.25rem] shrink-0 items-center justify-between bg-aia-orange px-4 sm:h-16 sm:px-6 md:px-10">
            <label className="flex min-w-0 flex-1 items-center gap-3 text-white/75">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M20 20l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">Search</span>
              <input
                type="search"
                placeholder="Search here..."
                className="w-full min-w-0 bg-transparent text-base text-white outline-none placeholder:text-white/45 md:text-[1.1rem]"
              />
            </label>
            <div className="ml-3 flex shrink-0 items-center gap-2 text-white sm:ml-4 sm:gap-3">
              <ThemeToggle />
              <button
                type="button"
                className="ui-caps hidden items-center gap-2 !text-[12px] !font-medium !leading-none tracking-[0.08em] lg:inline-flex"
              >
                ENGLISH
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  <path
                    d="M1 1 L5 5 L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 shrink-0 items-center gap-2 rounded-full bg-white/10 px-3.5 transition hover:bg-white/20 sm:h-9"
              >
                <span className="ui-caps !text-[12px] !font-medium !leading-none tracking-[0.08em]">
                  CLOSE
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  <path
                    d="M1.5 1.5 L8.5 8.5 M8.5 1.5 L1.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mega-menu-body grid min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid-cols-[0.9fr_0.8fr_1fr] lg:overflow-hidden">
            <div className="mega-menu-col mega-menu-col--primary flex flex-col">
              <h2 id={titleId} className="sr-only">
                Site navigation
              </h2>
              <nav aria-label="Primary" className="mega-menu-pad flex-1">
                <ul className="space-y-4 sm:space-y-5">
                  {megaSections.map((section) => {
                    const isActive = section.id === active.id;
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(section.id)}
                          onMouseEnter={() => setActiveId(section.id)}
                          onFocus={() => setActiveId(section.id)}
                          className="group flex w-full items-center gap-3 text-left sm:gap-5"
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span className="w-7 font-[family-name:var(--font-ui)] text-sm text-aia-orange/45 sm:w-8 sm:text-base">
                            {section.index}
                          </span>
                          <span
                            className={`display whitespace-nowrap text-[clamp(1.25rem,3.5vw,2rem)] transition-colors duration-300 ${
                              isActive
                                ? "!font-bold text-aia-navy"
                                : "!font-semibold text-aia-muted group-hover:text-aia-navy/70"
                            }`}
                          >
                            {section.label}
                          </span>
                          <span
                            aria-hidden
                            className={`ml-2 inline-flex size-[0.55em] shrink-0 items-center justify-center text-aia-orange transition-all duration-300 ${
                              isActive
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-1 opacity-0"
                            }`}
                          >
                            <svg
                              viewBox="0 0 10 16"
                              fill="none"
                              className="h-[0.9em] w-auto"
                              aria-hidden
                            >
                              <path
                                d="M2 2 L8 8 L2 14"
                                stroke="currentColor"
                                strokeWidth="2.25"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                              />
                            </svg>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mega-menu-cta mega-menu-pad lg:mt-auto">
                <p className="display mb-5 max-w-sm !font-bold text-[1.5rem] leading-tight text-aia-navy sm:text-[1.9rem]">
                  Have a wear or performance challenge?
                </p>
                <CtaButton
                  href="/company/contact"
                  variant="outline"
                  className="!h-9 !gap-2 !px-4 !text-[10px] !leading-none [&>span:first-child]:!size-1.5"
                >
                  Talk to an expert
                </CtaButton>
              </div>
            </div>

            <div className="mega-menu-col mega-menu-col--links mega-menu-pad lg:overflow-y-auto">
              <div className="space-y-8">
                {active.groups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-3 text-xl font-medium text-aia-navy sm:text-[1.35rem]">
                      {group.title}
                    </p>
                    <ul className="space-y-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block text-lg font-light text-aia-muted transition-colors duration-300 hover:text-aia-orange sm:text-[1.2rem]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mega-menu-col mega-menu-col--media relative hidden min-h-0 bg-aia-surface-soft lg:block">
              <Image
                key={active.image.src}
                src={active.image.src}
                alt={active.image.alt}
                fill
                sizes="(min-width: 1024px) 32vw, 420px"
                className="object-cover object-center animate-fade-up"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
