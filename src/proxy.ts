import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homeOnly } from "@/lib/env";
import { legacyRedirects, type RedirectRule } from "@/lib/redirects/legacy";

const redirectMap = new Map<string, RedirectRule>();

function safeDecode(raw: string): string | null {
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}

function normalisePath(decoded: string) {
  const trimmed = decoded.trim().toLowerCase();
  if (trimmed === "/" || trimmed === "") return "/";
  return trimmed.replace(/\/+$/, "");
}

for (const rule of legacyRedirects) {
  const decoded = safeDecode(rule.from) ?? rule.from;
  redirectMap.set(normalisePath(decoded), rule);
}

const LOCALE_REGEX = /^\/(cn|fr|ru|es)(\/.*)?$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const decoded = safeDecode(pathname);

  // Return 400 Bad Request on malformed URI escape sequences instead of 500 crash
  if (decoded === null) {
    return new NextResponse("Bad Request: Malformed URI", { status: 400 });
  }

  // 0. Home-only lock: every page except "/" goes straight home (one hop, no legacy chains).
  if (homeOnly) {
    if (pathname === "/") return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return NextResponse.redirect(url, 307);
  }

  const normalised = normalisePath(decoded);

  // 1. Language copies (/cn/..., /fr/..., /ru/..., /es/...): 302 to English equivalent
  const localeMatch = decoded.match(LOCALE_REGEX);
  if (localeMatch) {
    const rawEnglishPath = localeMatch[2] || "/";
    const englishNormalised = normalisePath(rawEnglishPath);
    const mapped = redirectMap.get(englishNormalised);
    const targetPath = mapped && mapped.status !== 410 ? mapped.to : englishNormalised;
    const url = new URL(targetPath, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 302);
  }

  // 2. Legacy redirects (Phase 2 mapping) — handles trailing slash in a single hop
  const legacyMatch = redirectMap.get(normalised);
  if (legacyMatch) {
    if (legacyMatch.status === 410) {
      return new NextResponse(null, { status: 410 });
    }
    const url = new URL(legacyMatch.to, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, legacyMatch.status);
  }

  // 3. Normalise trailing slash on canonical routes (308 permanent redirect)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = new URL(normalised, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Skip Next internals and static assets so images/fonts/models still load.
    */
    // API routes (health check, revalidation, draft) never go through redirects or the home-only lock.
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?|json|geojson|mp4|webm|mov|MOV|glb|gltf)$).*)",
  ],
};

