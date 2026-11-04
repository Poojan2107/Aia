import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/** Media CDN origin (S3 behind CloudFront), when NEXT_PUBLIC_MEDIA_URL is absolute. */
const mediaOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_MEDIA_URL ?? "").origin;
  } catch {
    return "";
  }
})();

/**
 * Static CSP (no nonces) so every page stays statically generated and CDN
 * cacheable; nonces would force dynamic rendering of the whole site. Next's
 * inline bootstrap scripts need 'unsafe-inline'. Add analytics or embed hosts
 * here deliberately, after consent design is agreed.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://ajax.googleapis.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' blob: data: ${mediaOrigin}`.trim(),
  `media-src 'self' blob: ${mediaOrigin}`.trim(),
  "font-src 'self'",
  `connect-src 'self' ${mediaOrigin}`.trim(),
  "frame-src https://www.youtube-nocookie.com https://player.vimeo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90, 92, 95, 98],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    const headers = [{ source: "/(.*)", headers: securityHeaders }];
    // Staging and previews must never be indexed, even if a page forgets its meta tag.
    if (process.env.NEXT_PUBLIC_SITE_ENV !== "production") {
      headers.push({ source: "/(.*)", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] });
    }
    return headers;
  },
};

export default nextConfig;
