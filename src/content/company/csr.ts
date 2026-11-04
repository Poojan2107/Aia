import type { CsrInitiative } from "@/content/types";

/**
 * Individual CSR initiatives are added here (later: the CMS) once the CSR
 * Committee supplies approved project summaries and media (REQ-55, REQ-22).
 * The listing page shows focus areas and an empty state until then.
 */
export const csrInitiatives: CsrInitiative[] = [];

export const csrFocusAreas: { area: CsrInitiative["area"]; body: string }[] = [
  { area: "Healthcare", body: "Health camps and support for medical infrastructure in communities near AIA's plants." },
  { area: "Education", body: "Support for schools, scholarships and skill development." },
  { area: "Rural Development", body: "Infrastructure and livelihood programmes in rural communities." },
  { area: "Environment", body: "Tree plantation, water conservation and environmental programmes." },
];
