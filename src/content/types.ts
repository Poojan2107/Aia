/**
 * Content shapes for every page template.
 *
 * These are the contract between content (local files today, the headless CMS
 * later) and the templates in `src/components/templates`. Templates render
 * these fields only; visual design lives in the components, never here.
 *
 * Every image carries `alt`. Decorative images use `alt: ""` explicitly.
 */

export type ImageRef = {
  src: string;
  alt: string;
};

export type LinkRef = {
  label: string;
  href: string;
};

/** Marks copy that still needs AIA approval before launch. */
export type ContentStatus = "approved" | "draft";

export type Hero = {
  eyebrow?: string;
  line1: string;
  line2?: string;
  lead?: string;
  image: ImageRef;
};

export type CaseCard = {
  title: string;
  body: string;
  href: string;
  image: ImageRef;
};

/* ----------------------------------------------------------------- Industry */

export type ProductItem = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: ImageRef;
  variants: string[];
};

/** How a product group is laid out; lets every industry reuse the Mining patterns. */
export type ProductGroupLayout = "split" | "feature-grid" | "overlay" | "board";

export type ProductGroup = {
  id: string;
  name: string;
  note: string;
  layout: ProductGroupLayout;
  products: ProductItem[];
};

export type IndustryProductsContent = {
  status: ContentStatus;
  hero: Hero;
  groups: ProductGroup[];
  cases: CaseCard[];
};

export type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: ImageRef;
};

export type ServiceGroup = {
  id: string;
  name: string;
  note: string;
  services: ServiceItem[];
};

export type IndustryServicesContent = {
  status: ContentStatus;
  hero: Hero;
  groups: ServiceGroup[];
};

export type Challenge = { title: string; body: string };

export type SolutionArea = {
  id: string;
  title: string;
  body: string;
  image: ImageRef;
  points: string[];
};

export type IndustrySolutionsContent = {
  status: ContentStatus;
  hero: Hero;
  intro: { lead: string; body: string };
  challenges: Challenge[];
  areas: SolutionArea[];
  outcomes: string[];
  cases: CaseCard[];
};

/* ------------------------------------------------------------ Generic pages */

export type Section = {
  id: string;
  heading: string;
  body?: string[];
  bullets?: string[];
  image?: ImageRef;
  links?: LinkRef[];
};

export type Fact = { value: string; label: string; note?: string };

export type ContentPageContent = {
  status: ContentStatus;
  hero: Hero;
  facts?: Fact[];
  sections: Section[];
  related?: LinkRef[];
};

/* -------------------------------------------------------------- Collections */

export type Director = {
  slug: string;
  name: string;
  role: string;
  /** Unset until the Company Secretary confirms the director's category. */
  category?: "executive" | "non-executive" | "independent";
  summary: string;
  bio: string[];
  portrait?: ImageRef;
  committees: string[];
  status: ContentStatus;
};

export type Committee = {
  slug: string;
  name: string;
  mandate: string;
  responsibilities: string[];
  /** Member names resolve to directors by slug where possible. */
  members: { name: string; position: "Chairperson" | "Member"; directorSlug?: string }[];
  status: ContentStatus;
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: "mining" | "cement" | "quarry" | "thermal-power";
  equipment: string;
  region: string;
  summary: string;
  challenge: string[];
  approach: string[];
  results: string[];
  image: ImageRef;
  /** Full study PDF, served from the media CDN. */
  pdf?: string;
  publishedAt: string;
  status: ContentStatus;
};

export type Article = {
  slug: string;
  kind: "news" | "insight" | "event";
  title: string;
  summary: string;
  body: string[];
  image: ImageRef;
  publishedAt: string;
  attachments?: { label: string; href: string }[];
  status: ContentStatus;
};

export type CsrInitiative = {
  slug: string;
  title: string;
  area: "Healthcare" | "Education" | "Rural Development" | "Environment" | "Community";
  summary: string;
  body: string[];
  image: ImageRef;
  status: ContentStatus;
};

export type Job = {
  slug: string;
  title: string;
  location: string;
  function: string;
  type: "Full-time" | "Contract" | "Consultant";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;
  applyEmail: string;
  status: ContentStatus;
};

export type Faq = { question: string; answer: string; category: string };

export type MediaItem = {
  id: string;
  title: string;
  kind: "video" | "gallery";
  poster: ImageRef;
  /** Hosted video URL or media CDN path; empty until AIA supplies the file. */
  src?: string;
  durationLabel?: string;
};

/* ------------------------------------------------------- Investor documents */

export type InvestorCategory =
  | "financials"
  | "shareholding"
  | "kyc"
  | "reports-and-presentations"
  | "corporate-governance"
  | "policies"
  | "iepf"
  | "code-of-conduct"
  | "stock-exchanges"
  | "scheme-of-amalgamation"
  | "announcements"
  | "regulation-46-lodr"
  | "constitutional-documents"
  | "downloads";

/**
 * One statutory or investor file. Files live in S3 and are served through
 * CloudFront under NEXT_PUBLIC_MEDIA_URL; `file` is the key below that root.
 */
export type InvestorDocument = {
  id: string;
  category: InvestorCategory;
  title: string;
  /** Indian financial year label, e.g. "FY 2025-26". */
  financialYear?: string;
  quarter?: "Q1" | "Q2" | "Q3" | "Q4";
  /** Sub-heading inside a category, e.g. "Annual Reports", "Results". */
  group?: string;
  publishedAt: string;
  file: string;
  sizeKb?: number;
  /** Old WordPress URL, so the redirect map can send it to `file`. */
  legacyUrl?: string;
};

export type InvestorPageContent = {
  status: ContentStatus;
  hero: Hero;
  intro: string[];
  /** Document library shown on the page; omitted for pages with no files (e.g. contacts). */
  category?: InvestorCategory;
  /** Static information blocks shown above the document library. */
  sections?: Section[];
  contacts?: { title: string; lines: string[]; email?: string; phone?: string }[];
};
