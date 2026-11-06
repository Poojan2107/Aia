/**
 * Public runtime configuration. Everything the browser may see is prefixed
 * NEXT_PUBLIC_; server-only secrets are read where they are used and never
 * imported into client components. See `.env.example`.
 */

function trimSlash(value: string) {
  return value.replace(/\/+$/, "");
}

/** Canonical host for canonicals, sitemaps and absolute URLs. Set per environment. */
export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aiaengineering.com");

/** "production" only on the live site; staging and previews show draft badges and are noindexed. */
export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV ?? "development";
export const isProduction = siteEnv === "production";

/** Media CDN root (S3 behind CloudFront) for investor PDFs, videos and 3D models. */
export const mediaUrl = trimSlash(process.env.NEXT_PUBLIC_MEDIA_URL ?? "/media");

/**
 * Locks the whole site to the home page: every other route redirects to "/" and
 * links to other pages are inert. ON by default; set NEXT_PUBLIC_HOME_ONLY=false
 * to open the full site again.
 */
export const homeOnly = process.env.NEXT_PUBLIC_HOME_ONLY !== "false";

export const showDraftBadges = !isProduction;

export function mediaHref(key: string) {
  if (/^https?:\/\//.test(key)) return key;
  return `${mediaUrl}/${key.replace(/^\/+/, "")}`;
}
