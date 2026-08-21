"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { CtaButton } from "@/components/ui/CtaButton";
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
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
        <div className="page-pad pointer-events-auto flex items-center justify-between gap-3 py-5 md:py-6">
          <Link href="/" className="min-w-0 shrink" aria-label="AIA Engineering home">
            <BrandLockup tone="light" compact />
          </Link>

          <div className="flex shrink-0 items-center gap-4 text-white md:gap-6">
            <button
              type="button"
              className="ui-caps hidden items-center gap-2 opacity-95 transition hover:opacity-100 sm:inline-flex"
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
              className="inline-flex h-10 items-center gap-2.5 rounded-full border border-white/25 bg-black/35 px-3.5 backdrop-blur-md transition hover:bg-black/45 md:h-[41px]"
              aria-expanded={open}
              aria-controls="mega-menu"
            >
              <span className="ui-caps tracking-[0.08em]">Menu</span>
              <span
                className="relative flex size-[22px] items-center justify-center rounded-full bg-aia-orange"
                aria-hidden
              >
                <span className="absolute top-[7px] h-px w-2.5 bg-white" />
                <span className="absolute top-[11px] h-px w-2.5 bg-white" />
                <span className="absolute top-[15px] h-px w-2.5 bg-white" />
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
        className={`fixed inset-0 z-50 transition-[visibility,opacity] duration-300 ${
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
          className={`absolute inset-0 flex flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-500 ease-[var(--ease-out)] md:inset-auto md:left-1/2 md:top-[max(1.25rem,2.5vh)] md:h-[min(783px,93vh)] md:w-[min(1372px,94vw)] md:-translate-x-1/2 ${
            open
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0 md:-translate-y-3"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between bg-aia-orange px-4 sm:h-20 sm:px-6 md:px-10">
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
            <div className="ml-3 flex shrink-0 items-center gap-3 text-white sm:ml-4 sm:gap-4">
              <button type="button" className="ui-caps hidden items-center gap-2 sm:inline-flex">
                English
                <svg width="8" height="4" viewBox="0 0 8 4" aria-hidden>
                  <path d="M0 0l4 4 4-4" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3.5 sm:h-[41px] sm:px-4"
              >
                <span className="ui-caps">Close</span>
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
              </button>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 overflow-y-auto overscroll-contain lg:grid-cols-[0.95fr_0.85fr_0.7fr] lg:overflow-hidden">
            <div className="flex flex-col border-b border-aia-line p-5 sm:p-8 md:p-12 lg:border-b-0 lg:border-r">
              <h2 id={titleId} className="sr-only">
                Site navigation
              </h2>
              <nav aria-label="Primary">
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
                          <span className="w-7 font-[family-name:var(--font-ui)] text-base text-aia-orange/45 sm:w-8 sm:text-[1.15rem]">
                            {section.index}
                          </span>
                          <span
                            className={`display text-[clamp(1.5rem,4.5vw,2.5rem)] transition-colors duration-300 ${
                              isActive
                                ? "text-aia-navy"
                                : "text-aia-muted group-hover:text-aia-navy/70"
                            }`}
                          >
                            {section.label}
                          </span>
                          <span
                            aria-hidden
                            className={`ml-1 text-aia-orange transition-all duration-300 ${
                              isActive
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-1 opacity-0"
                            }`}
                          >
                            ›
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 border-t border-aia-line pt-6 lg:mt-auto lg:pt-8">
                <p className="display mb-5 max-w-sm text-[1.5rem] leading-tight text-aia-navy sm:text-[2rem]">
                  Have a wear or performance challenge?
                </p>
                <CtaButton href="/company/contact" variant="outline">
                  Talk to an expert
                </CtaButton>
              </div>
            </div>

            <div className="border-b border-aia-line p-5 sm:p-8 md:p-12 lg:border-b-0 lg:border-r lg:overflow-y-auto">
              <ul className="space-y-3.5 sm:space-y-4">
                {active.links.map((link, index) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block text-lg transition-colors duration-300 hover:text-aia-orange sm:text-[1.25rem] ${
                        index === 0
                          ? "font-semibold text-aia-navy"
                          : "font-normal text-aia-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden min-h-[280px] bg-aia-surface-soft lg:block">
              <Image
                key={active.image.src}
                src={active.image.src}
                alt={active.image.alt}
                fill
                sizes="387px"
                className="object-cover animate-fade-up"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
