import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Lock the site to the home page — other routes redirect to `/`. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
      Skip Next internals and static assets so images/fonts still load.
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?|mp4|webm)$).*)",
  ],
};
