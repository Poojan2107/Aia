"use client";

import { themes, type ThemeId } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50"
      role="group"
      aria-label="Prototype color palette"
    >
      <div className="min-w-[11.5rem] rounded-2xl border border-white/15 bg-aia-navy/92 p-2 shadow-[0_18px_48px_rgba(4,29,44,0.4)] backdrop-blur-md">
        <p className="px-2 pb-1.5 pt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
          Submit both
        </p>
        <div className="grid gap-1">
          {(Object.keys(themes) as ThemeId[]).map((id) => {
            const item = themes[id];
            const active = theme === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                aria-pressed={active}
                title={`${item.label} — ${item.note}`}
                className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${
                  active
                    ? "bg-white text-aia-navy shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  aria-hidden
                  className="size-3.5 shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ background: item.swatch }}
                />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold leading-none">
                    {item.label}
                  </span>
                  <span
                    className={`mt-1 block text-[10px] leading-tight ${
                      active ? "text-aia-navy/55" : "text-white/45"
                    }`}
                  >
                    {item.note}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
