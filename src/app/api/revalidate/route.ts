import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { cmsTags } from "@/lib/cms/types";
import { routeByPath } from "@/lib/routes";

/**
 * Publish webhook for the CMS. On publish or unpublish the CMS POSTs
 *   { "tags": ["cms:page:about"], "paths": ["/company/about"] }
 * with header `x-revalidate-secret: <REVALIDATE_SECRET>`. Tagged data expires
 * immediately; listed register paths regenerate on their next request.
 */
const Body = z.object({
  tags: z.array(z.string().startsWith(`${cmsTags.all}`)).max(100).default([]),
  paths: z.array(z.string().startsWith("/")).max(100).default([]),
});

function authorised(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret");
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  const parsed = Body.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid body", issues: parsed.error.issues }, { status: 400 });
  }

  const { tags, paths } = parsed.data;
  const unknownPaths = paths.filter((path) => !routeByPath(path));
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  for (const path of paths) if (routeByPath(path)) revalidatePath(path);

  return NextResponse.json({ revalidated: { tags, paths: paths.filter((p) => !unknownPaths.includes(p)) }, unknownPaths });
}
