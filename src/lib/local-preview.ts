/**
 * Paths that stay reachable while HOME_ONLY is on, next to the homepage.
 * PREVIEWS_LIVE: true opens them on every host (shared with AIA on the live preview site);
 * false keeps them to a local machine only.
 */
export const PREVIEWS_LIVE = true;

export const LOCAL_PREVIEW_PATHS = ["/solutions/quarry/products", "/solutions/mining"] as const;

export function isLocalHostname(hostname: string | null | undefined): boolean {
  if (!hostname) return false;
  const host = hostname.trim().toLowerCase().split(":")[0] ?? "";
  return host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "[::1]";
}

/** Whether preview paths are open for a request or page served from this hostname. */
export function isPreviewHost(hostname: string | null | undefined): boolean {
  return PREVIEWS_LIVE || isLocalHostname(hostname);
}

export function isLocalPreviewPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split(/[?#]/)[0]?.replace(/\/+$/, "") || "/";
  return (LOCAL_PREVIEW_PATHS as readonly string[]).includes(path);
}
