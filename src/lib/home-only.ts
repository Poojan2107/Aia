/** Paths that remain navigable while the site is home-only. */
export function isHomeOnlyAllowedHref(href: string | null | undefined): boolean {
  if (!href) return true;
  const value = href.trim();
  if (!value || value === "#") return true;
  if (value.startsWith("#")) return true;
  if (value.startsWith("mailto:") || value.startsWith("tel:")) return false;

  // Relative app paths
  if (value.startsWith("/")) {
    const path = value.split(/[?#]/)[0] ?? "/";
    return path === "/" || path === "";
  }

  // Absolute same-origin checked at runtime in HomeOnlyGuard
  return false;
}
