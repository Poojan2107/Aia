"use client";

import { useEffect, useRef, useState } from "react";

/** Colour palettes AIA is choosing between (globals.css, html[data-palette]). Current (the site's
 * own colours) is the default; AIA Brand carries the Motion Gradient (Liquid Drift). */
const PALETTES = [
  { id: "default", name: "Current", note: "The site's own blues", colors: ["#041d2c", "#006eff", "#d96b27", "#f7f7f7"] },
  { id: "brand", name: "AIA Brand", note: "Brand Blue with soft liquid light drifting through it, orange accents", colors: ["#1f2766", "#2b357e", "#0061e0", "#efa500"] },
  { id: "secondary", name: "AIA Secondary", note: "Solid brand Blue with Light Orange", colors: ["#041d2c", "#2b357e", "#efa500", "#f7f7f7"] },
] as const;

type PaletteId = (typeof PALETTES)[number]["id"];
const KEY = "aia-palette";
const DEFAULT: PaletteId = "default";

function apply(id: PaletteId) {
  const root = document.documentElement;
  // AIA Brand = the brand colours plus the liquid drift (html[data-motion], globals.css).
  if (id === "default") delete root.dataset.palette;
  else root.dataset.palette = id;
  if (id === "brand") root.dataset.motion = "liquid";
  else delete root.dataset.motion;
}

/**
 * Navbar item that previews the site in AIA's brand palettes. The choice is kept in this browser
 * only (localStorage), so each reviewer can compare without affecting anyone else.
 */
export function PaletteSwitch() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [current, setCurrent] = useState<PaletteId>(DEFAULT);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let saved: PaletteId = DEFAULT;
    try {
      const v = localStorage.getItem(KEY);
      // "motion" was its own option before; it is AIA Brand now.
      const id = v === "motion" ? "brand" : v;
      if (PALETTES.some((p) => p.id === id)) saved = id as PaletteId;
    } catch {}
    setCurrent(saved);
    apply(saved);
  }, []);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const choose = (id: PaletteId) => {
    setCurrent(id);
    apply(id);
    // Close right after a pick, with a short fade so it doesn't snap away.
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 180);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        className="nav-pill-item"
        aria-expanded={open}
        aria-controls="nav-panel-palette"
        onClick={() => setOpen((o) => !o)}
      >
        Palette
        <svg width="12" height="8" viewBox="0 0 10 6" aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id="nav-panel-palette" hidden={!open} className={`absolute right-0 top-full pt-2.5 animate-in fade-in-0 zoom-in-95 duration-150 transition-[opacity,transform] ease-out ${closing ? "pointer-events-none -translate-y-1 opacity-0" : ""}`}>
        <div className="pal-panel rounded-2xl border border-aia-line/80 bg-white/98 p-3 shadow-[0_24px_60px_rgba(4,29,44,0.16)] backdrop-blur-md" role="radiogroup" aria-label="Colour palette">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={current === p.id}
              className={`pal-option ${current === p.id ? "is-active" : ""}`}
              onClick={() => choose(p.id)}
            >
              <span className="pal-swatch" aria-hidden>
                {p.colors.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </span>
              <span>
                <span className="pal-name">{p.name}</span>
                <span className="pal-note">{p.note}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </li>
  );
}
