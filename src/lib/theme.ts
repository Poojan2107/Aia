export const THEME_STORAGE_KEY = "aia-theme";

export type ThemeId = "orange" | "blue";

export const themes = {
  orange: {
    id: "orange" as const,
    label: "Orange",
    note: "Client preference",
    swatch: "#da702e",
  },
  blue: {
    id: "blue" as const,
    label: "Blue",
    note: "Company recommendation",
    swatch: "#006fff",
  },
} as const;

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === "orange" || value === "blue";
}

export function resolveTheme(
  searchTheme: string | null | undefined,
  storedTheme: string | null | undefined,
): ThemeId {
  if (isThemeId(searchTheme)) return searchTheme;
  if (isThemeId(storedTheme)) return storedTheme;
  return "orange";
}
