"use client";

import { PaletteSwitch } from "@/components/layout/PaletteSwitch";
import Link from "next/link";
import { homeOnly } from "@/lib/env";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/data/nav";

/**
 * Site navigation: AIA mark + Vega on the left, and the sitemap pillars in one
 * menu — Company, Our Solutions, Investors, Knowledge Hub, Careers, Contact Us.
 * Mobile keeps the full accordion drawer.
 */

function isCurrent(item: NavItem, pathname: string) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return (item.groups ?? []).some((g) => g.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`)));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="8" viewBox="0 0 10 6" aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
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
  const base = `nav-pill-item ${current ? "is-current" : ""}`;

  if (!item.groups) {
    return (
      <li>
        <Link prefetch={homeOnly ? false : undefined} href={item.href} className={base} aria-current={current ? "page" : undefined}>
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
          <div className={wide ? `grid gap-x-10 gap-y-6 ${item.groups.length > 2 ? "grid-cols-4" : "grid-cols-2"}` : ""}>
            {item.groups.map((group, gi) => (
              <div key={group.title ?? gi}>
                {group.title ? (
                  <p className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-aia-navy/45">{group.title}</p>
                ) : null}
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link prefetch={homeOnly ? false : undefined}
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-2.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[0.88rem] font-medium text-aia-navy/80 transition hover:bg-aia-surface-soft hover:text-aia-accent"
                      >
                        <span>{link.label}</span>
                        <span className="text-[0.75rem] opacity-0 transition-opacity group-hover:opacity-100 text-aia-accent">→</span>
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

/**
 * Navbar navigation lock (presentation mode): links in the navbar and the mobile menu do nothing
 * when clicked (except NAV_OPEN); menus still open so the site structure can be shown. Set to false to unlock.
 */
const NAV_LOCKED = true;
/** Pages still reachable while locked: the home logo and the quarry products page. */
const NAV_OPEN = ["/", "/solutions/quarry"];
const blockNav = (e: React.MouseEvent) => {
  if (!NAV_LOCKED) return;
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
  if (a && !NAV_OPEN.includes(a.getAttribute("href") ?? "")) e.preventDefault();
};

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(() => mainNav.find((item) => isCurrent(item, pathname))?.id ?? null);

  return (
    <div id="mobile-menu" className="fixed inset-0 z-50 flex flex-col bg-aia-navy text-white lg:hidden" role="dialog" aria-modal="true" aria-label="Site navigation" onClickCapture={blockNav}>
      <div className="flex items-center justify-between px-5 py-4">
        <Link prefetch={homeOnly ? false : undefined} href="/" onClick={onClose} aria-label="AIA Engineering home">
          <Image
            src="/images/brand/aia-vega-white.svg"
            alt="AIA Engineering Limited and Vega Industries"
            width={704}
            height={229}
            className="h-10 w-auto object-contain"
            priority
            unoptimized
            sizes="160px"
          />
        </Link>
        <button type="button" onClick={onClose} className="flex size-11 items-center justify-center rounded-full border border-white/25" aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav aria-label="Main" data-lenis-prevent="" className="flex-1 overflow-y-auto px-5 pb-10">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {mainNav.map((item) => {
            const open = expanded === item.id;
            if (!item.groups) {
              return (
                <li key={item.id}>
                  <Link prefetch={homeOnly ? false : undefined} href={item.href} onClick={onClose} className="block py-4 text-[1.1rem] font-semibold">
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
                  {item.groups.map((group, gi) => (
                    <div key={group.title ?? gi} className="mt-3">
                      {group.title ? <p className="mb-1 text-[0.72rem] uppercase tracking-[0.12em] text-white/45">{group.title}</p> : null}
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link prefetch={homeOnly ? false : undefined} href={link.href} onClick={onClose} className="block py-1.5 text-[0.98rem] text-white/80 hover:text-aia-accent">
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
      </nav>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

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

  useEffect(() => {
    lastY.current = window.scrollY;
    setSolid(window.scrollY > window.innerHeight * 0.82);

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setSolid(y > window.innerHeight * 0.82);

      if (y < 24 || openId || mobileOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      if (Math.abs(delta) < 6) return;

      setHidden(delta > 0);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openId, mobileOpen]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-aia-navy">
        Skip to content
      </a>
      <header
        className={`site-nav fixed inset-x-0 top-0 z-40${solid ? " is-solid" : ""}${hidden ? " is-hidden" : ""}`}
      
        onClickCapture={blockNav}
      >
        <div className="site-nav-bar">
          <Link prefetch={homeOnly ? false : undefined} href="/" className="site-nav-brand" aria-label="AIA Engineering home">
            <Image
              src="/images/brand/aia-vega-white.svg"
              alt="AIA Engineering Limited and Vega Industries"
              width={704}
              height={229}
              className="site-nav-brand-logo"
              priority
              unoptimized
              sizes="(max-width: 768px) 160px, 240px"
            />
          </Link>

          <nav ref={navRef} aria-label="Main" className="site-nav-pill hidden lg:flex">
            <ul className="flex items-center">
              {mainNav.map((item) => (
                <DesktopItem
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onOpen={() => {
                    setHidden(false);
                    setOpenId(item.id);
                  }}
                  onClose={() => setOpenId((id) => (id === item.id ? null : id))}
                  current={isCurrent(item, pathname)}
                />
              ))}
              <PaletteSwitch />
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
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
