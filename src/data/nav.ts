import { href } from "@/lib/routes";

export type NavLink = {
  label: string;
  href: string;
};

export type MegaGroup = {
  title: string;
  links: NavLink[];
};

export type MegaSection = {
  id: string;
  index: string;
  label: string;
  groups: MegaGroup[];
  image: {
    src: string;
    alt: string;
  };
};

export const megaSections: MegaSection[] = [
  {
    id: "solutions",
    index: "01",
    label: "Solutions",
    groups: [
      {
        title: "Mining",
        links: [
          { label: "Mining Solutions", href: href("mining") },
          { label: "Mining Products", href: href("mining-products") },
          { label: "Mining Services", href: href("mining-services") },
          { label: "NGDS (SAG & Ball)", href: href("mining-ngds") },
        ],
      },
      {
        title: "Cement & Quarry",
        links: [
          { label: "Cement Solutions", href: href("cement") },
          { label: "Cement Products", href: href("cement-products") },
          { label: "Cement Services", href: href("cement-services") },
          { label: "Quarry Products", href: href("quarry-products") },
        ],
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
    image: {
      src: "/images/service-2.png",
      alt: "AIA Engineering industrial solutions",
    },
  },
  {
    id: "company",
    index: "02",
    label: "Company",
    groups: [
      {
        title: "About AIA",
        links: [
          { label: "About Us", href: href("about") },
          { label: "Board of Directors", href: href("board-of-directors") },
          { label: "Board Committees", href: href("board-committees") },
          { label: "Technology & Infrastructure", href: href("technology-infrastructure") },
          { label: "Global Presence", href: href("global-presence") },
        ],
      },
      {
        title: "Responsibility & Careers",
        links: [
          { label: "Sustainability", href: href("sustainability") },
          { label: "CSR Initiatives", href: href("csr") },
          { label: "Memorandum of Association", href: href("memorandum-of-association") },
          { label: "Life at AIA", href: href("career-details") },
          { label: "Open Positions", href: href("open-positions") },
          { label: "Contact Us", href: href("contact") },
        ],
      },
    ],
    image: {
      src: "/images/mega-building.jpg",
      alt: "AIA Engineering corporate office",
    },
  },
  {
    id: "knowledge-hub",
    index: "03",
    label: "Knowledge Hub",
    groups: [
      {
        title: "Knowledge Hub",
        links: [
          { label: "Success Stories", href: href("case-studies") },
          { label: "News & Insights", href: href("news-insights") },
          { label: "Videos / Media", href: href("videos-media") },
          { label: "Downloads", href: href("downloads") },
          { label: "FAQs", href: href("faqs") },
        ],
      },
    ],
    image: {
      src: "/images/service-1.jpg",
      alt: "AIA Engineering knowledge and case studies",
    },
  },
  {
    id: "investors",
    index: "04",
    label: "Investors",
    groups: [
      {
        title: "Financials & Governance",
        links: [
          { label: "Financial Results", href: href("investor-financials") },
          { label: "Shareholding Pattern", href: href("investor-shareholding") },
          { label: "Reports & Presentations", href: href("investor-reports") },
          { label: "Corporate Governance", href: href("investor-governance") },
          { label: "Policies", href: href("investor-policies") },
          { label: "Code of Conduct", href: href("investor-code-of-conduct") },
          { label: "Stock Ticker", href: href("investor-stock-ticker") },
        ],
      },
      {
        title: "Shareholder Services & Statutory",
        links: [
          { label: "KYC & Service Requests", href: href("investor-kyc") },
          { label: "IEPF", href: href("investor-iepf") },
          { label: "List of Stock Exchanges", href: href("investor-stock-exchanges") },
          { label: "Scheme of Amalgamation", href: href("investor-amalgamation") },
          { label: "Announcements & Disclosures", href: href("investor-announcements") },
          { label: "Regulation 46 LODR", href: href("investor-regulation-46") },
          { label: "Investor Contact", href: href("investor-contact") },
        ],
      },
    ],
    image: {
      src: "/images/tech-research.png",
      alt: "AIA Engineering investor relations",
    },
  },
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
