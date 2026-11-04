import "server-only";
import { localSource } from "@/lib/cms/local";
import type { ContentSource } from "@/lib/cms/types";

export { cmsTags } from "@/lib/cms/types";
export type { ContentSource } from "@/lib/cms/types";

/**
 * Selects the content source. Add a vendor here once AIA chooses one, e.g.
 * `case "contentful": return contentfulSource;`. Unknown values fail the build
 * rather than silently serving local drafts in production.
 */
function select(): ContentSource {
  const provider = process.env.CMS_PROVIDER ?? "local";
  switch (provider) {
    case "local":
      return localSource;
    default:
      throw new Error(`Unknown CMS_PROVIDER "${provider}". Supported: local.`);
  }
}

export const cms = select();
