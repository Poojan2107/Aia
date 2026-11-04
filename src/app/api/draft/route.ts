import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { routeByPath } from "@/lib/routes";

/**
 * CMS preview on staging: GET /api/draft?secret=<DRAFT_SECRET>&path=/company/about
 * turns on Draft Mode and opens the page. Only register paths are accepted, so
 * this cannot be used as an open redirect. GET /api/draft?disable=1 turns it off.
 */
function validSecret(given: string | null) {
  const expected = process.env.DRAFT_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const draft = await draftMode();

  if (params.get("disable") === "1") {
    draft.disable();
    redirect("/");
  }

  if (!validSecret(params.get("secret"))) {
    return new Response("Invalid preview token", { status: 401 });
  }

  const route = routeByPath(params.get("path") ?? "/");
  if (!route) {
    return new Response("Unknown page", { status: 404 });
  }

  draft.enable();
  redirect(route.path);
}
