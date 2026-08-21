"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  type ThemeId,
  isThemeId,
  resolveTheme,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("orange");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = resolveTheme(
      params.get("theme"),
      window.localStorage.getItem(THEME_STORAGE_KEY),
    );
    setThemeState(next);
    applyTheme(next);
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    applyTheme(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);

    const url = new URL(window.location.href);
    if (next === "orange") {
      url.searchParams.delete("theme");
    } else {
      url.searchParams.set("theme", next);
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("theme");
      if (isThemeId(fromUrl)) {
        setThemeState(fromUrl);
        applyTheme(fromUrl);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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
