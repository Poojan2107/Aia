/**
 * Page register: every public page of the finalised sitemap
 * ("AIA Sitemap and Keywords", Nov 2026) and the URL it lives at.
 *
 * This list drives routing, navigation, breadcrumbs, sitemap.xml, the HTML
 * sitemap and canonical URLs. To change a URL, change `path` here and add the
 * old path to `previousPaths` so a permanent redirect is generated.
 *
 * Detail pages (directors, case studies, jobs, articles, CSR initiatives) come
 * from their content collections; see `allRoutes()`.
 */

import { caseStudies } from "@/content/knowledge/case-studies";
import { articles } from "@/content/knowledge/articles";
import { directors } from "@/content/company/directors";
import { csrInitiatives } from "@/content/company/csr";
import { jobs } from "@/content/careers/jobs";

export type Pillar =
  | "home"
  | "company"
  | "solutions"
  | "investors"
  | "knowledge-hub"
  | "careers"
  | "contact"
  | "utility";

export type Template =
  | "home"
  | "hub"
  | "mining-landing"
  | "mill-products"
  | "industry-solutions"
  | "industry-products"
  | "industry-services"
  | "content"
  | "board"
  | "director"
  | "committees"
  | "csr-listing"
  | "csr-detail"
  | "investor"
  | "stock-ticker"
  | "case-study-listing"
  | "case-study"
  | "article-listing"
  | "article"
  | "media"
  | "downloads"
  | "faqs"
  | "careers"
  | "jobs"
  | "job"
  | "contact"
  | "thank-you"
  | "legal"
  | "html-sitemap";

export type RouteEntry = {
  id: string;
  path: string;
  title: string;
  /** Shorter label for menus and breadcrumbs. */
  navLabel?: string;
  description: string;
  template: Template;
  pillar: Pillar;
  parent?: string;
  /** False for pages that must not appear in search (thank-you, previews). */
  indexable?: boolean;
  /** Paths this page used to live at on the new site; each gets a 301. */
  previousPaths?: string[];
};

const r = (entry: RouteEntry) => entry;

export const staticRoutes: RouteEntry[] = [
  r({ id: "home", path: "/", title: "AIA Engineering", navLabel: "Home", template: "home", pillar: "home",
    description: "Advanced wear solutions engineered to extend component life, improve equipment availability and keep critical operations performing across mining, cement, quarry and thermal power." }),

  /* Company ---------------------------------------------------------------- */
  r({ id: "company", path: "/company", title: "Company", template: "hub", pillar: "company", parent: "home",
    description: "Who AIA Engineering is, who leads it, how it manufactures and how it serves customers worldwide." }),
  r({ id: "about", path: "/company/about", title: "About AIA", template: "content", pillar: "company", parent: "company",
    description: "AIA Engineering designs, manufactures and supplies high-chromium wear and impact-resistant castings for mining, cement, quarry and thermal power customers in over 120 countries." }),
  r({ id: "board-of-directors", path: "/company/board-of-directors", title: "Board of Directors", template: "board", pillar: "company", parent: "company",
    description: "The Board of Directors of AIA Engineering Limited: executive, non-executive and independent directors." }),
  r({ id: "board-committees", path: "/company/board-committees", title: "Board Committees", template: "committees", pillar: "company", parent: "company",
    description: "Composition and mandates of the committees of the Board of AIA Engineering Limited." }),
  r({ id: "technology-infrastructure", path: "/company/technology-and-infrastructure", title: "Technology & Infrastructure", navLabel: "Technology & Infrastructure", template: "content", pillar: "company", parent: "company",
    description: "Manufacturing clusters, metallurgy, design simulation and quality systems behind AIA Engineering's wear solutions." }),
  r({ id: "global-presence", path: "/company/global-presence", title: "Global Presence", template: "content", pillar: "company", parent: "company",
    description: "AIA Engineering and Vega Industries serve customers in over 120 countries through subsidiaries, service centres and warehouses." }),
  r({ id: "sustainability", path: "/company/sustainability", title: "Sustainability", template: "content", pillar: "company", parent: "company",
    description: "Environmental priorities, programmes and disclosures at AIA Engineering." }),
  r({ id: "csr", path: "/company/csr", title: "CSR Initiatives", template: "csr-listing", pillar: "company", parent: "company",
    description: "Community programmes supported by AIA Engineering in healthcare, education, rural development and the environment." }),
  r({ id: "memorandum-of-association", path: "/company/memorandum-of-association", title: "Memorandum of Association", template: "investor", pillar: "company", parent: "company",
    description: "Memorandum and Articles of Association of AIA Engineering Limited." }),

  /* Solutions -------------------------------------------------------------- */
  r({ id: "solutions", path: "/solutions", title: "Our Solutions", template: "hub", pillar: "solutions", parent: "home",
    description: "Wear solutions, products and services for mining, cement, quarry and thermal power operations." }),
  r({ id: "mining", path: "/solutions/mining", title: "Mining Solutions", navLabel: "Mining", template: "mining-landing", pillar: "solutions", parent: "solutions",
    description: "Advanced comminution and electrochemistry technologies enhancing reliability, throughput and recovery across mining grinding circuits." }),
  r({ id: "mining-products", path: "/solutions/mining/products", title: "Mining Products", navLabel: "Products", template: "industry-products", pillar: "solutions", parent: "mining",
    description: "SAG and ball mill lining systems, discharge assemblies, Verti mill liners, high-chrome grinding media and mill fastening systems." }),
  // One page per mill. The slug is the old aiaengineering.com slug (/sag-mill), so every old mill
  // URL maps to /solutions/mining/<same slug> (see redirects/legacy.ts).
  r({ id: "mining-sag-mill", path: "/solutions/mining/sag-mill", title: "SAG Mill Liners & Wear Components", navLabel: "SAG Mill Components", template: "mill-products", pillar: "solutions", parent: "mining-products",
    description: "SAG mill feed end and shell liners, discharge end assemblies (NGDS, radial and curved pulp lifters) and high-quality fasteners, engineered for demanding SAG grinding conditions." }),
  r({ id: "mining-ball-mill", path: "/solutions/mining/ball-mill", title: "Ball Mill Liners & Wear Components", navLabel: "Ball Mill Components", template: "mill-products", pillar: "solutions", parent: "mining-products",
    description: "Ball mill end and shell liners in rubber, composite, integrated composite, steel and white iron, the Next Gen DE System, Hi-Cr grinding media and fasteners." }),
  r({ id: "mining-verti-mill", path: "/solutions/mining/verti-mill", title: "Verti Mill Flight & Shoe Liners", navLabel: "Verti Mill Components", template: "mill-products", pillar: "solutions", parent: "mining-products",
    description: "Flight liners in Hi-Cr and shoe liners in Sintercast alloy for Verti Mills up to VTM 4,500: 3X the life of Hi-Cr, fewer replacement cycles and increased mill availability." }),
  r({ id: "mining-services", path: "/solutions/mining/services", title: "Mining Services", navLabel: "Services", template: "industry-services", pillar: "solutions", parent: "mining",
    description: "Design modelling, wear monitoring, reline supervision, circuit surveys, process modelling and grinding media testing for mining operations." }),
  r({ id: "mining-ngds", path: "/solutions/mining/ngds", title: "NGDS (SAG and Ball)", navLabel: "NGDS", template: "content", pillar: "solutions", parent: "mining",
    description: "The New Generation Discharge System for SAG and ball mills: pulp lifter and grate designs that improve slurry evacuation, throughput and energy use." }),
  r({ id: "cement", path: "/solutions/cement", title: "Cement Solutions", navLabel: "Cement", template: "industry-solutions", pillar: "solutions", parent: "solutions",
    description: "Wear solutions for cement tube mills and vertical roller mills that protect throughput and extend the time between shutdowns." }),
  r({ id: "cement-products", path: "/solutions/cement/products", title: "Cement Products", navLabel: "Products", template: "industry-products", pillar: "solutions", parent: "cement",
    description: "Tube mill liners, diaphragms, classifying liners, grinding media and vertical roller mill wear parts for cement plants." }),
  r({ id: "cement-services", path: "/solutions/cement/services", title: "Cement Services", navLabel: "Services", template: "industry-services", pillar: "solutions", parent: "cement",
    description: "Mill audits, process optimisation, installation supervision and wear monitoring for cement grinding." }),
  r({ id: "quarry-products", path: "/solutions/quarry", title: "Quarry Products", navLabel: "Quarry", template: "industry-products", pillar: "solutions", parent: "solutions",
    previousPaths: ["/solutions/quarry/products"],
    description: "Blow bars, hammers, VSI impellers, anvils, feed disks and frame liners for impact crushers in quarry and aggregate operations." }),
  r({ id: "thermal-power", path: "/solutions/thermal-power", title: "Thermal Power Solutions", navLabel: "Thermal Power", template: "industry-solutions", pillar: "solutions", parent: "solutions",
    previousPaths: ["/solutions/thermal"],
    description: "Wear solutions for coal pulverisers in thermal power plants: vertical roller mills, bowl mills and ball tube mills." }),
  r({ id: "thermal-power-products", path: "/solutions/thermal-power/products", title: "Thermal Power Products", navLabel: "Products", template: "industry-products", pillar: "solutions", parent: "thermal-power",
    description: "Grinding rolls, tyres, bull ring and table segments, tube mill liners and high-chrome media for coal pulverisers." }),
  r({ id: "thermal-power-services", path: "/solutions/thermal-power/services", title: "Thermal Power Services", navLabel: "Services", template: "industry-services", pillar: "solutions", parent: "thermal-power",
    description: "Pulveriser audits, CFD and air-flow studies, wear monitoring and installation support for thermal power plants." }),

  /* Investors -------------------------------------------------------------- */
  r({ id: "investors", path: "/investors", title: "Investors", template: "hub", pillar: "investors", parent: "home",
    description: "Financial results, shareholding, reports, governance and statutory disclosures of AIA Engineering Limited." }),
  r({ id: "investor-financials", path: "/investors/financials", title: "Financials", template: "investor", pillar: "investors", parent: "investors",
    description: "Quarterly and annual financial results of AIA Engineering Limited." }),
  r({ id: "investor-shareholding", path: "/investors/shareholding", title: "Shareholding", template: "investor", pillar: "investors", parent: "investors",
    description: "Quarterly shareholding pattern filings of AIA Engineering Limited." }),
  r({ id: "investor-kyc", path: "/investors/kyc", title: "KYC", template: "investor", pillar: "investors", parent: "investors",
    description: "KYC updates, investor service request forms and nomination forms for shareholders of AIA Engineering Limited." }),
  r({ id: "investor-reports", path: "/investors/reports-and-presentations", title: "Reports & Presentations", template: "investor", pillar: "investors", parent: "investors",
    description: "Annual reports, investor presentations, earnings call recordings and transcripts of AIA Engineering Limited." }),
  r({ id: "investor-governance", path: "/investors/corporate-governance", title: "Corporate Governance", template: "investor", pillar: "investors", parent: "investors",
    description: "Quarterly corporate governance compliance reports of AIA Engineering Limited." }),
  r({ id: "investor-policies", path: "/investors/policies", title: "Policies", template: "investor", pillar: "investors", parent: "investors",
    description: "Board-approved policies of AIA Engineering Limited." }),
  r({ id: "investor-iepf", path: "/investors/iepf", title: "IEPF", template: "investor", pillar: "investors", parent: "investors",
    description: "Unclaimed dividends, shares transferred to the Investor Education and Protection Fund, and how to claim them." }),
  r({ id: "investor-code-of-conduct", path: "/investors/code-of-conduct", title: "Code of Conduct", template: "investor", pillar: "investors", parent: "investors",
    description: "Code of conduct for directors and senior management of AIA Engineering Limited." }),
  r({ id: "investor-stock-exchanges", path: "/investors/stock-exchanges", title: "List of Stock Exchanges", navLabel: "Stock Exchanges", template: "investor", pillar: "investors", parent: "investors",
    description: "Stock exchanges where the equity shares of AIA Engineering Limited are listed, with scrip codes." }),
  r({ id: "investor-amalgamation", path: "/investors/scheme-of-amalgamation", title: "Scheme of Amalgamation", template: "investor", pillar: "investors", parent: "investors",
    description: "Schemes of amalgamation, tribunal orders and related documents of AIA Engineering Limited." }),
  r({ id: "investor-announcements", path: "/investors/announcements", title: "Corporate Announcement & Disclosure", navLabel: "Announcements & Disclosures", template: "investor", pillar: "investors", parent: "investors",
    description: "Corporate announcements and disclosures of AIA Engineering Limited under Regulation 30 of SEBI LODR." }),
  r({ id: "investor-regulation-46", path: "/investors/regulation-46-lodr", title: "Investor Regulation 46 LODR", navLabel: "Regulation 46 LODR", template: "investor", pillar: "investors", parent: "investors",
    description: "Information disseminated under Regulation 46 of the SEBI Listing Obligations and Disclosure Requirements." }),
  r({ id: "investor-contact", path: "/investors/contact", title: "Investor Contact Us", navLabel: "Investor Contact", template: "investor", pillar: "investors", parent: "investors",
    description: "Contacts for shareholders: company secretary, compliance officer and registrar and share transfer agent." }),
  r({ id: "investor-stock-ticker", path: "/investors/stock-ticker", title: "Stock Ticker", template: "stock-ticker", pillar: "investors", parent: "investors",
    description: "AIA Engineering Limited share price on BSE and NSE." }),

  /* Knowledge Hub ---------------------------------------------------------- */
  r({ id: "knowledge-hub", path: "/knowledge-hub", title: "Knowledge Hub", template: "hub", pillar: "knowledge-hub", parent: "home",
    description: "Case studies, insights, news, media and technical downloads from AIA Engineering." }),
  r({ id: "case-studies", path: "/knowledge-hub/case-studies", title: "Success Stories", navLabel: "Case Studies", template: "case-study-listing", pillar: "knowledge-hub", parent: "knowledge-hub",
    description: "How AIA Engineering wear solutions have improved liner life, throughput and reline time for mining and cement customers." }),
  r({ id: "news-insights", path: "/knowledge-hub/news-and-insights", title: "News & Insights", template: "article-listing", pillar: "knowledge-hub", parent: "knowledge-hub",
    description: "Company news, announcements and technical insights from AIA Engineering." }),
  r({ id: "videos-media", path: "/knowledge-hub/videos", title: "Videos / Media", navLabel: "Videos & Media", template: "media", pillar: "knowledge-hub", parent: "knowledge-hub",
    description: "Films and media from AIA Engineering: manufacturing, mill solutions and services." }),
  r({ id: "downloads", path: "/knowledge-hub/downloads", title: "Downloads", template: "downloads", pillar: "knowledge-hub", parent: "knowledge-hub",
    description: "Brochures, certificates and technical documents from AIA Engineering." }),
  r({ id: "faqs", path: "/knowledge-hub/faqs", title: "FAQs", template: "faqs", pillar: "knowledge-hub", parent: "knowledge-hub",
    description: "Answers to common questions about AIA Engineering, its products, services and investor matters." }),

  /* Careers ---------------------------------------------------------------- */
  r({ id: "careers", path: "/careers", title: "Careers", template: "careers", pillar: "careers", parent: "home",
    description: "Build a career in metallurgy, engineering, manufacturing and global business at AIA Engineering." }),
  r({ id: "career-details", path: "/careers/life-at-aia", title: "Life at AIA", navLabel: "Career Details", template: "content", pillar: "careers", parent: "careers",
    description: "How AIA Engineering develops engineers and professionals: training, safety culture and growth." }),
  r({ id: "open-positions", path: "/careers/open-positions", title: "Open Positions", template: "jobs", pillar: "careers", parent: "careers",
    description: "Current job openings at AIA Engineering and Vega Industries." }),

  /* Contact ---------------------------------------------------------------- */
  r({ id: "contact", path: "/contact", title: "Contact Us", template: "contact", pillar: "contact", parent: "home",
    description: "Contact AIA Engineering: corporate office, enquiries by industry and global offices." }),
  r({ id: "thank-you", path: "/contact/thank-you", title: "Thank You", template: "thank-you", pillar: "contact", parent: "contact", indexable: false,
    description: "Your enquiry has been received." }),

  /* Utility ---------------------------------------------------------------- */
  r({ id: "policies", path: "/policies", title: "Policies", template: "legal", pillar: "utility", parent: "home",
    description: "Website terms of use, cookie policy and legal notices of AIA Engineering Limited." }),
  r({ id: "privacy-policy", path: "/privacy-policy", title: "Privacy Policy", template: "legal", pillar: "utility", parent: "home",
    description: "How AIA Engineering Limited collects, uses and protects personal information on this website." }),
  r({ id: "html-sitemap", path: "/sitemap", title: "Sitemap", template: "html-sitemap", pillar: "utility", parent: "home",
    description: "Every page of the AIA Engineering website." }),
];

function collectionRoutes(): RouteEntry[] {
  return [
    ...directors.map((d) =>
      r({ id: `director:${d.slug}`, path: `/company/board-of-directors/${d.slug}`, title: d.name, template: "director",
        pillar: "company", parent: "board-of-directors", description: `${d.name}, ${d.role}, AIA Engineering Limited.` }),
    ),
    ...csrInitiatives.map((c) =>
      r({ id: `csr:${c.slug}`, path: `/company/csr/${c.slug}`, title: c.title, template: "csr-detail",
        pillar: "company", parent: "csr", description: c.summary }),
    ),
    ...caseStudies.map((c) =>
      r({ id: `case:${c.slug}`, path: `/knowledge-hub/case-studies/${c.slug}`, title: c.title, template: "case-study",
        pillar: "knowledge-hub", parent: "case-studies", description: c.summary }),
    ),
    ...articles.map((a) =>
      r({ id: `article:${a.slug}`, path: `/knowledge-hub/news-and-insights/${a.slug}`, title: a.title, template: "article",
        pillar: "knowledge-hub", parent: "news-insights", description: a.summary }),
    ),
    ...jobs.map((j) =>
      r({ id: `job:${j.slug}`, path: `/careers/open-positions/${j.slug}`, title: j.title, template: "job",
        pillar: "careers", parent: "open-positions", description: j.summary }),
    ),
  ];
}

let cache: RouteEntry[] | undefined;

export function allRoutes(): RouteEntry[] {
  cache ??= [...staticRoutes, ...collectionRoutes()];
  return cache;
}

export function routeById(id: string): RouteEntry {
  const route = allRoutes().find((entry) => entry.id === id);
  if (!route) throw new Error(`Unknown route id: ${id}`);
  return route;
}

export function routeByPath(path: string): RouteEntry | undefined {
  const normalised = path === "/" ? "/" : path.replace(/\/+$/, "");
  return allRoutes().find((entry) => entry.path === normalised);
}

export function href(id: string): string {
  return routeById(id).path;
}

export function childrenOf(id: string): RouteEntry[] {
  return allRoutes().filter((entry) => entry.parent === id && entry.indexable !== false);
}

/** Home → … → page, for breadcrumbs and BreadcrumbList JSON-LD. */
export function trail(id: string): RouteEntry[] {
  const chain: RouteEntry[] = [];
  let current: RouteEntry | undefined = routeById(id);
  while (current) {
    chain.unshift(current);
    current = current.parent ? routeById(current.parent) : undefined;
  }
  return chain;
}
