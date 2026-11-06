import { href } from "@/lib/routes";

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  /** Column heading inside the dropdown; omit for a single plain list. */
  title?: string;
  links: NavLink[];
};

/** One top-level item of the main navigation (a sitemap pillar). */
export type NavItem = {
  id: string;
  label: string;
  /** Pillar landing page; shown as the first "overview" link in the dropdown. */
  href: string;
  /** No groups = plain link with no dropdown. */
  groups?: NavGroup[];
};

/** Main navigation: the six pillars of the finalised sitemap, in sitemap order. */
export const mainNav: NavItem[] = [
  {
    id: "company",
    label: "Company",
    href: href("company"),
    groups: [
      {
        links: [
          { label: "About AIA", href: href("about") },
          { label: "Board of Directors", href: href("board-of-directors") },
          { label: "Board Committees", href: href("board-committees") },
          { label: "Technology & Infrastructure", href: href("technology-infrastructure") },
          { label: "Global Presence", href: href("global-presence") },
          { label: "Sustainability", href: href("sustainability") },
          { label: "CSR Initiatives", href: href("csr") },
          { label: "Memorandum of Association", href: href("memorandum-of-association") },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Our Solutions",
    href: href("solutions"),
    groups: [
      {
        title: "Mining",
        links: [
          { label: "Mining Solutions", href: href("mining") },
          { label: "Mining Products", href: href("mining-products") },
          { label: "Mining Services", href: href("mining-services") },
          { label: "NGDS (SAG and Ball)", href: href("mining-ngds") },
        ],
      },
      {
        title: "Cement",
        links: [
          { label: "Cement Solutions", href: href("cement") },
          { label: "Cement Products", href: href("cement-products") },
          { label: "Cement Services", href: href("cement-services") },
        ],
      },
      {
        title: "Quarry",
        links: [{ label: "Quarry Products", href: href("quarry-products") }],
      },
      {
        title: "Thermal Power",
        links: [
          { label: "Thermal Power Solutions", href: href("thermal-power") },
          { label: "Thermal Power Products", href: href("thermal-power-products") },
          { label: "Thermal Power Services", href: href("thermal-power-services") },
        ],
      },
    ],
  },
  {
    id: "investors",
    label: "Investors",
    href: href("investors"),
    groups: [
      {
        title: "Financials & Governance",
        links: [
          { label: "Financials", href: href("investor-financials") },
          { label: "Shareholding", href: href("investor-shareholding") },
          { label: "Reports & Presentations", href: href("investor-reports") },
          { label: "Corporate Governance", href: href("investor-governance") },
          { label: "Policy", href: href("investor-policies") },
          { label: "Code of Conduct", href: href("investor-code-of-conduct") },
          { label: "Stock Ticker", href: href("investor-stock-ticker") },
        ],
      },
      {
        title: "Shareholder Services & Disclosures",
        links: [
          { label: "KYC", href: href("investor-kyc") },
          { label: "IEPF", href: href("investor-iepf") },
          { label: "List of Stock Exchanges", href: href("investor-stock-exchanges") },
          { label: "Scheme of Amalgamation", href: href("investor-amalgamation") },
          { label: "Corporate Announcement & Disclosure", href: href("investor-announcements") },
          { label: "Investor Regulation 46 LODR", href: href("investor-regulation-46") },
          { label: "Investor Contact Us", href: href("investor-contact") },
        ],
      },
    ],
  },
  {
    id: "knowledge-hub",
    label: "Knowledge Hub",
    href: href("knowledge-hub"),
    groups: [
      {
        links: [
          { label: "Success Stories", href: href("case-studies") },
          { label: "News & Insights", href: href("news-insights") },
          { label: "Videos / Media", href: href("videos-media") },
          { label: "Downloads", href: href("downloads") },
          { label: "FAQs", href: href("faqs") },
        ],
      },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    href: href("careers"),
    groups: [
      {
        links: [
          { label: "Careers Overview", href: href("careers") },
          { label: "Career Details Page", href: href("career-details") },
          { label: "Open Positions", href: href("open-positions") },
        ],
      },
    ],
  },
  { id: "contact", label: "Contact Us", href: href("contact") },
];

export const footerNav = {
  solutions: [
    { label: "Mining Solutions", href: href("mining") },
    { label: "Mining Products", href: href("mining-products") },
    { label: "Mining Services", href: href("mining-services") },
    { label: "Cement Solutions", href: href("cement") },
    { label: "Quarry Products", href: href("quarry-products") },
    { label: "Thermal Power Solutions", href: href("thermal-power") },
  ],
  company: [
    { label: "About AIA", href: href("about") },
    { label: "Board of Directors", href: href("board-of-directors") },
    { label: "Board Committees", href: href("board-committees") },
    { label: "Technology & Infrastructure", href: href("technology-infrastructure") },
    { label: "Global Presence", href: href("global-presence") },
    { label: "Sustainability", href: href("sustainability") },
    { label: "CSR Initiatives", href: href("csr") },
    { label: "Memorandum of Association", href: href("memorandum-of-association") },
    { label: "Careers", href: href("careers") },
    { label: "Contact Us", href: href("contact") },
  ],
  resources: [
    { label: "Success Stories", href: href("case-studies") },
    { label: "News & Insights", href: href("news-insights") },
    { label: "Videos / Media", href: href("videos-media") },
    { label: "Downloads", href: href("downloads") },
    { label: "FAQs", href: href("faqs") },
  ],
  investorsLeft: [
    { label: "Financials", href: href("investor-financials") },
    { label: "Shareholding", href: href("investor-shareholding") },
    { label: "KYC", href: href("investor-kyc") },
    { label: "Reports & Presentations", href: href("investor-reports") },
    { label: "Corporate Governance", href: href("investor-governance") },
    { label: "Policies", href: href("investor-policies") },
    { label: "IEPF", href: href("investor-iepf") },
    { label: "Code of Conduct", href: href("investor-code-of-conduct") },
  ],
  investorsRight: [
    { label: "Stock Ticker", href: href("investor-stock-ticker") },
    { label: "List of Stock Exchanges", href: href("investor-stock-exchanges") },
    { label: "Scheme of Amalgamation", href: href("investor-amalgamation") },
    { label: "Corporate Announcements", href: href("investor-announcements") },
    { label: "Regulation 46 LODR", href: href("investor-regulation-46") },
    { label: "Investor Contact", href: href("investor-contact") },
  ],
};

/** Every href used by the main navigation and footer (checked against the page register in tests). */
export function navTargets(): string[] {
  const footer = Object.values(footerNav).flatMap((links) => links.map((link) => link.href));
  const main = mainNav.flatMap((item) => [item.href, ...(item.groups ?? []).flatMap((group) => group.links.map((link) => link.href))]);
  return Array.from(new Set([...main, ...footer]));
}
