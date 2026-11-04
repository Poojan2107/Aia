import type {
  Article,
  CaseStudy,
  Committee,
  ContentPageContent,
  CsrInitiative,
  Director,
  Faq,
  Hero,
  IndustryProductsContent,
  IndustryServicesContent,
  IndustrySolutionsContent,
  InvestorCategory,
  InvestorDocument,
  InvestorPageContent,
  Job,
  MediaItem,
} from "@/content/types";

/**
 * The only way templates get content. A headless CMS is added by writing one
 * more implementation of this interface (see `docs/engineering/content-model.md`);
 * routes, templates and visuals do not change.
 *
 * Every method is async so a remote CMS can fetch. Implementations that fetch
 * must tag requests with `cmsTags` so `/api/revalidate` can refresh them.
 */
export interface ContentSource {
  readonly name: string;

  hubHero(routeId: string): Promise<Hero | undefined>;
  contentPage(routeId: string): Promise<ContentPageContent | undefined>;
  industryProducts(routeId: string): Promise<IndustryProductsContent | undefined>;
  industryServices(routeId: string): Promise<IndustryServicesContent | undefined>;
  industrySolutions(routeId: string): Promise<IndustrySolutionsContent | undefined>;
  investorPage(routeId: string): Promise<InvestorPageContent | undefined>;
  investorDocuments(category: InvestorCategory): Promise<InvestorDocument[]>;

  directors(): Promise<Director[]>;
  committees(): Promise<Committee[]>;
  csrInitiatives(): Promise<CsrInitiative[]>;
  csrFocusAreas(): Promise<{ area: CsrInitiative["area"]; body: string }[]>;
  caseStudies(): Promise<CaseStudy[]>;
  articles(): Promise<Article[]>;
  jobs(): Promise<Job[]>;
  faqs(): Promise<Faq[]>;
  mediaItems(): Promise<MediaItem[]>;
  downloads(): Promise<InvestorDocument[]>;
}

/** Cache tags shared by adapters and the revalidation webhook. */
export const cmsTags = {
  all: "cms",
  page: (routeId: string) => `cms:page:${routeId}`,
  collection: (name: string) => `cms:collection:${name}`,
  investor: (category: string) => `cms:investor:${category}`,
} as const;
