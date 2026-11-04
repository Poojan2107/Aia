import "server-only";
import { z } from "zod";

/**
 * Server configuration checked once at startup (src/instrumentation.ts).
 * Production refuses to start without what it needs; other environments only
 * warn, so local development works with an empty .env.
 */
const url = z.url();
const secret = z.string().min(32, "must be at least 32 characters");

const production = z.object({
  NEXT_PUBLIC_SITE_URL: url,
  NEXT_PUBLIC_MEDIA_URL: url,
  CONTACT_WEBHOOK_URL: url,
  REVALIDATE_SECRET: secret,
  DRAFT_SECRET: secret.optional(),
  CMS_PROVIDER: z.enum(["local"]).default("local"),
});

export function checkServerEnv() {
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
  const result = production.safeParse(process.env);
  if (result.success) return;

  const problems = result.error.issues.map((issue) => `  ${issue.path.join(".")}: ${issue.message}`).join("\n");
  if (isProduction) {
    throw new Error(`Invalid production environment:\n${problems}`);
  }
  console.warn(`[env] Not production-ready (fine for local/staging):\n${problems}`);
}
