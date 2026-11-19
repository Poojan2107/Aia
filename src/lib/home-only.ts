import { homeOnly } from "@/lib/env";
import { isLocalPreviewPath, isPreviewHost } from "@/lib/local-preview";

/** Paths that remain navigable while the site is home-only. */
export function isHomeOnlyAllowedHref(
  href: string | null | undefined,
  opts?: { hostname?: string | null },
): boolean {
  if (!homeOnly) return true;
  if (!href) return true;
  const value = href.trim();
  if (!value || value === "#") return true;
  if (value.startsWith("#")) return true;
  if (value.startsWith("mailto:") || value.startsWith("tel:")) return false;

  // Relative app paths
  if (value.startsWith("/")) {
    const path = value.split(/[?#]/)[0] ?? "/";
    if (path === "/" || path === "") return true;
    // Preview pages (quarry, mining) stay clickable (see src/lib/local-preview.ts).
    if (isLocalPreviewPath(path) && isPreviewHost(opts?.hostname)) return true;
    return false;
  }

  // Absolute same-origin checked at runtime in HomeOnlyGuard
  return false;
}
