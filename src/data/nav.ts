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
        title: "By industry",
        links: [
          { label: "Mining", href: "/solutions/mining" },
          { label: "Mining Products", href: "/solutions/mining/products" },
          { label: "Mining Services", href: "/solutions/mining/services" },
          { label: "Cement", href: "/solutions/cement" },
          { label: "Quarry", href: "/solutions/quarry" },
          { label: "Thermal Power", href: "/solutions/thermal" },
        ],
      },
      {
        title: "Services",
        links: [{ label: "Services & Optimisation", href: "/services" }],
      },
    ],
    image: {
      src: "/images/mining-mill.png",
      alt: "AIA grinding mill wear solution",
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
          { label: "Board of Directors", href: "/company/board" },
          { label: "Memorandum of Association", href: "/company/moa" },
          { label: "Technology & Manufacturing", href: "/company/technology" },
          { label: "Global Presence", href: "/company/global-presence" },
          { label: "Sustainability", href: "/company/sustainability" },
          { label: "CSR Initiatives", href: "/company/csr" },
          { label: "Careers", href: "/company/careers" },
          { label: "Contact Us", href: "/company/contact" },
        ],
      },
    ],
    image: {
      src: "/images/mega-building.jpg",
      alt: "AIA corporate building",
    },
  },
  {
    id: "resources",
    index: "03",
    label: "Resource hub",
    groups: [
      {
        title: "Resource hub",
        links: [
          { label: "Case Studies", href: "/resources/case-studies" },
          { label: "Resource Center", href: "/resources" },
          { label: "Blogs & Insights", href: "/resources/insights" },
          { label: "News & Events", href: "/resources/news" },
          { label: "Videos / Media", href: "/resources/media" },
          { label: "Downloads", href: "/resources/downloads" },
        ],
      },
    ],
    image: {
      src: "/images/hero-dusk.png",
      alt: "AIA engineering in the field",
    },
  },
  {
    id: "investors",
    index: "04",
    label: "Investors & Connect",
    groups: [
      {
        title: "Investors",
        links: [
          { label: "Financials", href: "/investors/financials" },
          { label: "Shareholding", href: "/investors/shareholding" },
          { label: "Reports & Presentations", href: "/investors/reports" },
          { label: "Corporate Governance", href: "/investors/governance" },
          { label: "Investor Contact", href: "/investors/contact" },
        ],
      },
    ],
    image: {
      src: "/images/thermal-mill.png",
      alt: "AIA Engineering thermal grinding solutions",
    },
  },
];

export const footerNav = {
  solutions: [
    { label: "Mining", href: "/solutions/mining" },
    { label: "Mining Products", href: "/solutions/mining/products" },
    { label: "Mining Services", href: "/solutions/mining/services" },
    { label: "Cement", href: "/solutions/cement" },
    { label: "Quarry", href: "/solutions/quarry" },
    { label: "Thermal Power", href: "/solutions/thermal" },
    { label: "Services & Optimisation", href: "/services" },
  ],
  company: [
    { label: "About AIA", href: "/company/about" },
    { label: "Board of Directors", href: "/company/board" },
    { label: "Memorandum of Association", href: "/company/moa" },
    { label: "Technology & Manufacturing", href: "/company/technology" },
    { label: "Global Presence", href: "/company/global-presence" },
    { label: "Sustainability", href: "/company/sustainability" },
    { label: "CSR Initiatives", href: "/company/csr" },
    { label: "Careers", href: "/company/careers" },
    { label: "Contact Us", href: "/company/contact" },
  ],
  resources: [
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: "Resource Center", href: "/resources" },
    { label: "Blogs & Insights", href: "/resources/insights" },
    { label: "News & Events", href: "/resources/news" },
    { label: "Videos / Media", href: "/resources/media" },
    { label: "Downloads", href: "/resources/downloads" },
  ],
  investorsLeft: [
    { label: "Financials", href: "/investors/financials" },
    { label: "Shareholding", href: "/investors/shareholding" },
    { label: "KYC", href: "/investors/kyc" },
    { label: "Reports & Presentations", href: "/investors/reports" },
    { label: "Corporate Governance", href: "/investors/governance" },
    { label: "Policy", href: "/investors/policy" },
    { label: "IEPF", href: "/investors/iepf" },
    { label: "Code of Conduct", href: "/investors/code-of-conduct" },
  ],
  investorsRight: [
    { label: "List of Stock Exchanges", href: "/investors/exchanges" },
    { label: "Scheme of Amalgamation", href: "/investors/amalgamation" },
    { label: "Corporate Announcement & Disclosure", href: "/investors/disclosures" },
    { label: "Investor Regulation 46 LODR", href: "/investors/regulation-46" },
    { label: "Investor Contact Us", href: "/investors/contact" },
  ],
} as const;
