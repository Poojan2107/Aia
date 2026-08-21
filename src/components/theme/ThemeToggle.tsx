"use client";

import { themes, type ThemeId } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

/** Compact accent switcher for dual-palette client review. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50"
      role="group"
      aria-label="Accent colour"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-aia-navy/90 p-1.5 shadow-[0_16px_40px_rgba(4,29,44,0.4)] backdrop-blur-md">
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
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                active
                  ? "bg-white text-aia-navy"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                aria-hidden
                className="size-2.5 rounded-full ring-1 ring-black/10"
                style={{ background: item.swatch }}
              />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
