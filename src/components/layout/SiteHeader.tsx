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
        <div className="page-pad pointer-events-auto flex items-center justify-between py-5 md:py-6">
          <Link href="/" aria-label="AIA Engineering home">
            <BrandLockup tone="light" />
          </Link>

          <div className="flex items-center gap-4 text-white md:gap-6">
            <button
              type="button"
              className="ui-caps hidden items-center gap-2 opacity-90 transition hover:opacity-100 sm:inline-flex"
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
              className="inline-flex h-[41px] items-center gap-2.5 rounded-full border border-white/20 bg-black/25 px-3.5 backdrop-blur-sm transition hover:bg-black/35"
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
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/40 backdrop-blur-[28px]"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute left-1/2 top-[max(1.25rem,2.5vh)] flex h-[min(783px,93vh)] w-[min(1372px,94vw)] -translate-x-1/2 flex-col overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-500 ease-[var(--ease-out)] ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="flex h-20 shrink-0 items-center justify-between bg-aia-orange px-5 md:px-10">
            <label className="flex min-w-0 flex-1 items-center gap-3 text-white/70">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Search</span>
              <input
                type="search"
                placeholder="Search here..."
                className="w-full bg-transparent text-[1.1rem] text-white outline-none placeholder:text-white/40"
              />
            </label>
            <div className="ml-4 flex shrink-0 items-center gap-4 text-white">
              <button type="button" className="ui-caps hidden items-center gap-2 sm:inline-flex">
                English
                <svg width="8" height="4" viewBox="0 0 8 4" aria-hidden>
                  <path d="M0 0l4 4 4-4" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-[41px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4"
              >
                <span className="ui-caps">Close</span>
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
              </button>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[0.95fr_0.85fr_0.7fr]">
            <div className="flex flex-col border-b border-aia-line p-7 md:p-12 lg:border-b-0 lg:border-r">
              <h2 id={titleId} className="sr-only">
                Site navigation
              </h2>
              <nav aria-label="Primary">
                <ul className="space-y-5">
                  {megaSections.map((section) => {
                    const isActive = section.id === active.id;
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveId(section.id)}
                          onFocus={() => setActiveId(section.id)}
                          className="group flex w-full items-center gap-5 text-left"
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span className="w-8 font-[family-name:var(--font-ui)] text-[1.2rem] text-aia-orange-deep/40">
                            {section.index}
                          </span>
                          <span
                            className={`display text-[clamp(1.75rem,3vw,2.5rem)] transition-colors duration-300 ${
                              isActive
                                ? "text-aia-navy"
                                : "text-aia-muted/80 group-hover:text-aia-navy/70"
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

              <div className="mt-auto hidden border-t border-aia-line pt-8 lg:block">
                <p className="display mb-5 max-w-sm text-[2rem] leading-tight text-aia-navy">
                  Have a wear or performance challenge?
                </p>
                <CtaButton href="/company/contact" variant="outline">
                  Talk to an expert
                </CtaButton>
              </div>
            </div>

            <div className="border-b border-aia-line p-7 md:p-12 lg:border-b-0 lg:border-r">
              <ul className="space-y-4">
                {active.links.map((link, index) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block text-[1.25rem] transition-colors duration-300 hover:text-aia-orange ${
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
                className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
