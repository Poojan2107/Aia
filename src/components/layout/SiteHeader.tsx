"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { mainNav, type NavItem } from "@/data/nav";

/**
 * Standard site navigation: logo, the six sitemap pillars with dropdowns on
 * desktop (hover, click or keyboard), and an accordion drawer on mobile.
 * Transparent over the dark page heroes, solid once the page scrolls.
 */

function isCurrent(item: NavItem, pathname: string) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return (item.groups ?? []).some((g) => g.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`)));
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 24;
const getScrolledServer = () => false;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DesktopItem({ item, open, onOpen, onClose, current }: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  current: boolean;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = `nav-panel-${item.id}`;
  const base = `flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[0.84rem] font-semibold transition-colors xl:px-4 xl:text-[0.88rem] ${
    current ? "text-aia-orange" : "text-white hover:text-aia-orange"
  }`;

  if (!item.groups) {
    return (
      <li>
        <Link href={item.href} className={base} aria-current={current ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }

  const wide = item.groups.length > 1;
  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onOpen();
  };
  const leave = () => {
    closeTimer.current = setTimeout(onClose, 150);
  };

  return (
    <li
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && enter()}
      onPointerLeave={(e) => e.pointerType === "mouse" && leave()}
    >
      <button
        type="button"
        className={base}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {item.label}
        <Chevron open={open} />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={`absolute top-full pt-2.5 ${wide ? "left-1/2 -translate-x-1/2" : "left-0"} animate-in fade-in-0 zoom-in-95 duration-150`}
      >
        <div className={`rounded-2xl border border-aia-line/80 bg-white/98 p-6 text-aia-navy shadow-[0_24px_60px_rgba(4,29,44,0.16)] backdrop-blur-md ${wide ? "w-max max-w-[min(92vw,58rem)]" : "w-72"}`}>
          <Link
            href={item.href}
            onClick={onClose}
            className="group mb-4 flex items-center justify-between border-b border-aia-line pb-3 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-aia-orange hover:text-[#d65217]"
          >
            <span>{item.label} Overview</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <div className={wide ? `grid gap-x-10 gap-y-6 ${item.groups.length > 2 ? "grid-cols-4" : "grid-cols-2"}` : ""}>
            {item.groups.map((group, gi) => (
              <div key={group.title ?? gi}>
                {group.title ? (
                  <p className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-aia-navy/45">{group.title}</p>
                ) : null}
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center justify-between whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.88rem] font-medium text-aia-navy/80 transition hover:bg-aia-surface-soft hover:text-aia-orange"
                      >
                        <span>{link.label}</span>
                        <span className="text-[0.75rem] opacity-0 transition-opacity group-hover:opacity-100 text-aia-orange">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(() => mainNav.find((item) => isCurrent(item, pathname))?.id ?? null);

  return (
    <div id="mobile-menu" className="fixed inset-0 z-50 flex flex-col bg-aia-navy text-white lg:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" onClick={onClose} aria-label="AIA Engineering home">
          <BrandLockup tone="light" compact />
        </Link>
        <button type="button" onClick={onClose} className="flex size-11 items-center justify-center rounded-full border border-white/25" aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 pb-10">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {mainNav.map((item) => {
            const open = expanded === item.id;
            if (!item.groups) {
              return (
                <li key={item.id}>
                  <Link href={item.href} onClick={onClose} className="block py-4 text-[1.1rem] font-semibold">
                    {item.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left text-[1.1rem] font-semibold"
                  aria-expanded={open}
                  aria-controls={`m-${item.id}`}
                  onClick={() => setExpanded(open ? null : item.id)}
                >
                  {item.label}
                  <Chevron open={open} />
                </button>
                <div id={`m-${item.id}`} hidden={!open} className="pb-4">
                  <Link href={item.href} onClick={onClose} className="mb-2 block text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-aia-orange">
                    {item.label} overview
                  </Link>
                  {item.groups.map((group, gi) => (
                    <div key={group.title ?? gi} className="mt-3">
                      {group.title ? <p className="mb-1 text-[0.72rem] uppercase tracking-[0.12em] text-white/45">{group.title}</p> : null}
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} onClick={onClose} className="block py-1.5 text-[0.98rem] text-white/80 hover:text-aia-orange">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenId(null);
      setMobileOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-aia-navy">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || openId
            ? "border-b border-white/10 bg-aia-navy/95 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="page-pad mx-auto flex h-[var(--site-header-h)] max-w-[1440px] items-center justify-between gap-4">
          <Link href="/" className="min-w-0 shrink-0" aria-label="AIA Engineering home">
            <BrandLockup tone="light" compact />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {mainNav.map((item) => (
                <DesktopItem
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onOpen={() => setOpenId(item.id)}
                  onClose={() => setOpenId((id) => (id === item.id ? null : id))}
                  current={isCurrent(item, pathname)}
                />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden xl:block">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-11 items-center justify-center rounded-full border border-white/30 text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {mobileOpen ? <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} /> : null}
    </>
  );
}
