import type { ContentSource } from "@/lib/cms/types";
import { contentPages, hubHeroes } from "@/content/pages";
import { miningProducts, miningServices } from "@/content/industries/mining";
import { cementProducts, cementServices, cementSolutions } from "@/content/industries/cement";
import { quarryProducts } from "@/content/industries/quarry";
import { thermalProducts, thermalServices, thermalSolutions } from "@/content/industries/thermal-power";
import { documentsFor, investorPages } from "@/content/investors";
import { committees, directors } from "@/content/company/directors";
import { csrFocusAreas, csrInitiatives } from "@/content/company/csr";
import { caseStudies } from "@/content/knowledge/case-studies";
import { articles } from "@/content/knowledge/articles";
import { downloads, faqs, mediaItems } from "@/content/knowledge/resources";
import { jobs } from "@/content/careers/jobs";

const products = {
  "mining-products": miningProducts,
  "cement-products": cementProducts,
  "quarry-products": quarryProducts,
  "thermal-power-products": thermalProducts,
} as const;

const services = {
  "mining-services": miningServices,
  "cement-services": cementServices,
  "thermal-power-services": thermalServices,
} as const;

const solutions = {
  cement: cementSolutions,
  "thermal-power": thermalSolutions,
} as const;

const pick = <T,>(map: Record<string, T>, key: string) => (Object.hasOwn(map, key) ? map[key] : undefined);

/** Content from the typed files in `src/content`. Used until the CMS is chosen, and as the fixture source in tests. */
export const localSource: ContentSource = {
  name: "local",
  hubHero: async (id) => pick(hubHeroes, id),
  contentPage: async (id) => pick(contentPages, id),
  industryProducts: async (id) => pick<(typeof products)[keyof typeof products]>(products, id),
  industryServices: async (id) => pick<(typeof services)[keyof typeof services]>(services, id),
  industrySolutions: async (id) => pick<(typeof solutions)[keyof typeof solutions]>(solutions, id),
  investorPage: async (id) => pick(investorPages, id),
  investorDocuments: async (category) => documentsFor(category),
  directors: async () => directors,
  committees: async () => committees,
  csrInitiatives: async () => csrInitiatives,
  csrFocusAreas: async () => csrFocusAreas,
  caseStudies: async () => caseStudies,
  articles: async () => articles,
  jobs: async () => jobs,
  faqs: async () => faqs,
  mediaItems: async () => mediaItems,
  downloads: async () => downloads,
};
