"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  type ThemeId,
  resolveTheme,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeId) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("popstate", callback);
  window.addEventListener("themechange", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("popstate", callback);
    window.removeEventListener("themechange", callback);
  };
}

function getThemeSnapshot(): ThemeId {
  if (typeof window === "undefined") return "orange";
  const params = new URLSearchParams(window.location.search);
  return resolveTheme(
    params.get("theme"),
    window.localStorage.getItem(THEME_STORAGE_KEY),
  );
}

function getThemeServerSnapshot(): ThemeId {
  return "orange";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    applyTheme(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);

    const url = new URL(window.location.href);
    if (next === "orange") {
      url.searchParams.delete("theme");
    } else {
      url.searchParams.set("theme", next);
    }
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event("themechange"));
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
