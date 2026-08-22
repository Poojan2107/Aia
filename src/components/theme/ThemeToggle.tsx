"use client";

import { themes, type ThemeId } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

/** Compact orange/blue switch for the mega menu. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/35 bg-white/10 p-1 ${className}`}
      role="group"
      aria-label="Accent colour"
    >
      {(Object.keys(themes) as ThemeId[]).map((id) => {
        const item = themes[id];
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            aria-pressed={active}
            title={item.note}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] transition sm:px-3 sm:text-[11px] ${
              active
                ? "bg-white text-aia-navy"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              aria-hidden
              className="size-2 rounded-full ring-1 ring-black/10"
              style={{ background: item.swatch }}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
