"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { mainNav, type NavItem } from "@/data/nav";

/**
 * Site navigation with liquid-glass header chrome.
 * Logo, pillar links, and megamenu placement stay unchanged.
 */

function isCurrent(item: NavItem, pathname: string) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return (item.groups ?? []).some((g) =>
    g.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`)),
  );
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 16;
const getScrolledServer = () => false;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M1 1l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DesktopItem({
  item,
  open,
  onOpen,
  onClose,
  current,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  current: boolean;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = `nav-panel-${item.id}`;
  const base = [
    "site-nav-link",
    current ? "is-current" : "",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!item.groups) {
    return (
      <li>
        <Link
          href={item.href}
          className={base}
          aria-current={current ? "page" : undefined}
        >
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
        className={`absolute top-full z-50 pt-3 ${wide ? "left-1/2 -translate-x-1/2" : "left-0"} animate-in fade-in-0 zoom-in-95 duration-150`}
      >
        <div
          className={`site-mega ${wide ? "is-wide w-max max-w-[min(92vw,58rem)]" : "w-72"}`}
        >
          <Link
            href={item.href}
            onClick={onClose}
            className="site-mega-overview group"
          >
            <span>{item.label} Overview</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <div
            className={
              wide
                ? `grid gap-x-10 gap-y-6 ${item.groups.length > 2 ? "grid-cols-4" : "grid-cols-2"}`
                : ""
            }
          >
            {item.groups.map((group, gi) => (
              <div key={group.title ?? gi}>
                {group.title ? (
                  <p className="site-mega-group-title">{group.title}</p>
                ) : null}
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="site-mega-link group"
                      >
                        <span>{link.label}</span>
                        <span className="site-mega-link-arrow">→</span>
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

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [openId, setOpenId] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolled,
    getScrolledServer,
  );
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const frosted = scrolled || Boolean(openId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenId(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Always show near the top of the page.
      if (y < 24) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      // Ignore tiny jitter so the bar doesn't flicker.
      if (Math.abs(delta) < 6) return;

      // Keep visible while a megamenu is open.
      if (openId) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      setHidden(delta > 0);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openId]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-aia-navy"
      >
        Skip to content
      </a>
      <header
        className={`site-glass-header fixed inset-x-0 top-0 z-40 ${frosted ? "is-frosted" : "is-clear"}${hidden ? " is-hidden" : ""}`}
      >
        <div className="site-glass-sheen" aria-hidden />
        <div className="page-pad relative mx-auto flex h-[var(--site-header-h)] max-w-[1440px] items-center justify-between gap-4">
          <Link
            href="/"
            className="min-w-0 shrink-0"
            aria-label="AIA Engineering home"
          >
            <BrandLockup tone="light" compact />
          </Link>

          <nav ref={navRef} aria-label="Main" className="min-w-0">
            <ul className="site-nav-list flex max-w-[min(100%,52rem)] items-center">
              {mainNav.map((item) => (
                <DesktopItem
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onOpen={() => {
                    setHidden(false);
                    setOpenId(item.id);
                  }}
                  onClose={() =>
                    setOpenId((id) => (id === item.id ? null : id))
                  }
                  current={isCurrent(item, pathname)}
                />
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
