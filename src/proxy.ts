import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { homeOnly } from "@/lib/env";
import { legacyRedirects, type RedirectRule } from "@/lib/redirects/legacy";

const redirectMap = new Map<string, RedirectRule>();

function normalisePath(raw: string) {
  const decoded = decodeURIComponent(raw).trim().toLowerCase();
  if (decoded === "/" || decoded === "") return "/";
  return decoded.replace(/\/+$/, "");
}

for (const rule of legacyRedirects) {
  redirectMap.set(normalisePath(rule.from), rule);
}

const LOCALE_REGEX = /^\/(cn|fr|ru|es)(\/.*)?$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalised = normalisePath(pathname);

  // 1. Language copies (/cn/..., /fr/..., /ru/..., /es/...): 302 to English equivalent
  const localeMatch = pathname.match(LOCALE_REGEX);
  if (localeMatch) {
    const rawEnglishPath = localeMatch[2] || "/";
    const englishNormalised = normalisePath(rawEnglishPath);
    const mapped = redirectMap.get(englishNormalised);
    const targetPath = mapped && mapped.status !== 410 ? mapped.to : englishNormalised;
    const url = new URL(targetPath, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 302);
  }

  // 2. Legacy redirects (Phase 2 mapping)
  const legacyMatch = redirectMap.get(normalised);
  if (legacyMatch) {
    if (legacyMatch.status === 410) {
      return new NextResponse(null, { status: 410 });
    }
    const url = new URL(legacyMatch.to, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, legacyMatch.status);
  }

  // 3. Home-only preview guard
  if (homeOnly) {
    if (pathname === "/" || pathname === "") {
      return NextResponse.next();
    }
    if (pathname === "/dev/models" || pathname.startsWith("/dev/models/")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Skip Next internals and static assets so images/fonts/models still load.
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?|mp4|webm|glb|gltf)$).*)",
  ],
};

