export type InteriorContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
  related: { label: string; href: string }[];
};

const mill = (src: string) => src;

export const interiorPages: Record<string, InteriorContent> = {
  "solutions/mining": {
    eyebrow: "Solutions",
    title: "Mining wear solutions",
    description:
      "SAG, ball and Verti mill liners engineered for critical grinding duty — designed around ore, mill geometry and the operating hours you cannot afford to lose.",
    image: mill("/images/mining-mill.png"),
    highlights: [
      "SAG mill lining systems for high-impact feed",
      "Ball mill liners and high-integrity fasteners",
      "Verti mill wear parts for fine grinding circuits",
      "Reline supervision and wear monitoring in the field",
    ],
    related: [
      { label: "Cement solutions", href: "/solutions/cement" },
      { label: "Services & optimisation", href: "/services" },
      { label: "Case studies", href: "/resources/case-studies" },
    ],
  },
  "solutions/cement": {
    eyebrow: "Solutions",
    title: "Cement wear solutions",
    description:
      "Tube mill and VRM wear parts developed for cement grinding — lining systems, diaphragms and media support that protect throughput through planned shutdown windows.",
    image: mill("/images/cement-mill.png"),
    highlights: [
      "Tube mill lining systems and mill internals",
      "Vertical roller mill rollers, tables and liners",
      "Grinding media selection and charge support",
      "Shutdown planning and reline supervision",
    ],
    related: [
      { label: "Mining solutions", href: "/solutions/mining" },
      { label: "Thermal power", href: "/solutions/thermal" },
      { label: "Talk to an expert", href: "/company/contact" },
    ],
  },
  "solutions/quarry": {
    eyebrow: "Solutions",
    title: "Quarry wear protection",
    description:
      "Blow bars, hammers and crusher components for high-throughput crushing — wear protection that holds geometry longer in abrasive quarry duty.",
    image: mill("/images/quarry-mill.png"),
    highlights: [
      "Blow bars for impact crushers",
      "Hammers and impeller protection",
      "Frame liners and anvil systems",
      "Discharge and feed-end wear parts",
    ],
    related: [
      { label: "Mining solutions", href: "/solutions/mining" },
      { label: "Case studies", href: "/resources/case-studies" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  "solutions/thermal": {
    eyebrow: "Solutions",
    title: "Thermal power wear solutions",
    description:
      "Tube mill and VRM wear parts for coal grinding — classifier, roller and table components engineered for the duty cycle of thermal power plants.",
    image: mill("/images/thermal-mill.png"),
    highlights: [
      "VRM classifiers, rollers and roller tables",
      "Liner plates for coal grinding chambers",
      "Tube mill internals for pulverising circuits",
      "Field support for planned outages",
    ],
    related: [
      { label: "Cement solutions", href: "/solutions/cement" },
      { label: "Technology", href: "/company/technology" },
      { label: "Global presence", href: "/company/global-presence" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Services & optimisation",
    description:
      "Design modelling, reline supervision, wear monitoring and circuit surveys — technical support that sits with the mill, not only with the part.",
    image: "/images/tech-research.png",
    highlights: [
      "Design modelling around mill and duty",
      "On-site reline supervision",
      "Wear monitoring and mill audits",
      "Process modelling and ball-size optimisation",
    ],
    related: [
      { label: "Mining solutions", href: "/solutions/mining" },
      { label: "Technology", href: "/company/technology" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  "company/about": {
    eyebrow: "Company",
    title: "About AIA Engineering",
    description:
      "AIA designs, develops and manufactures wear-, corrosion- and abrasion-resistant components for grinding and crushing. Six manufacturing clusters and a global service network support operations in 120+ countries.",
    image: "/images/about-facility.png",
    highlights: [
      "120+ countries served",
      "6+ manufacturing clusters",
      "50+ basic alloys in production",
      "10+ global service centres",
    ],
    related: [
      { label: "Board of directors", href: "/company/board" },
      { label: "Technology", href: "/company/technology" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  "company/board": {
    eyebrow: "Company",
    title: "Board of Directors",
    description:
      "AIA is led by a board with deep operating and governance experience across manufacturing, materials and global markets.",
    image: "/images/vision-figma.png",
    highlights: [
      "Independent and executive directors",
      "Governance aligned to listed-company standards",
      "Committees for audit, nomination and CSR",
    ],
    related: [
      { label: "About AIA", href: "/company/about" },
      { label: "Corporate governance", href: "/investors/governance" },
      { label: "Investor contact", href: "/investors/contact" },
    ],
  },
  "company/technology": {
    eyebrow: "Company",
    title: "Technology & manufacturing",
    description:
      "Alloys, lining geometry and grinding research are developed around the wear itself — then proven on the mill, not only in the lab.",
    image: "/images/tech-material.png",
    highlights: [
      "Material engineering around application wear",
      "Pilot-scale mill testing and grindability studies",
      "Wear-profile scanning and mill audits",
      "Feedback into the next lining cycle",
    ],
    related: [
      { label: "Services", href: "/services" },
      { label: "Sustainability", href: "/company/sustainability" },
      { label: "Manufacturing footprint", href: "/company/global-presence" },
    ],
  },
  "company/global-presence": {
    eyebrow: "Company",
    title: "Global presence",
    description:
      "Offices, warehouses and service centres are positioned to support mill operations close to the plant — from Ahmedabad to Dubai, Houston, Perth and beyond.",
    image: "/images/world-map.jpg",
    highlights: [
      "India manufacturing and corporate base",
      "Regional offices across Americas, EMEA and APAC",
      "Warehouses for faster liner and media supply",
      "On-site technical support at the mill",
    ],
    related: [
      { label: "Contact", href: "/company/contact" },
      { label: "Careers", href: "/company/careers" },
      { label: "Case studies", href: "/resources/case-studies" },
    ],
  },
  "company/sustainability": {
    eyebrow: "Company",
    title: "Sustainability",
    description:
      "Heavy industry can think lighter. AIA works to use resources more efficiently, reduce waste, and grow renewable energy in our own operations.",
    image: "/images/sustainability.png",
    highlights: [
      "1,00,000+ trees planted during the year",
      "30% energy from renewable sources",
      "Reuse and recycling in manufacturing",
      "Longer wear life that reduces material intensity at the mill",
    ],
    related: [
      { label: "CSR initiatives", href: "/company/csr" },
      { label: "About AIA", href: "/company/about" },
      { label: "Technology", href: "/company/technology" },
    ],
  },
  "company/csr": {
    eyebrow: "Company",
    title: "CSR initiatives",
    description:
      "Social responsibility programmes sit alongside manufacturing — education, community and environmental work in the regions where AIA operates.",
    image: "/images/sustainability.png",
    highlights: [
      "Community programmes near manufacturing clusters",
      "Education and skill-building initiatives",
      "Environmental stewardship alongside plant operations",
    ],
    related: [
      { label: "Sustainability", href: "/company/sustainability" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  "company/careers": {
    eyebrow: "Company",
    title: "Careers",
    description:
      "Metallurgists, engineers, plant teams and commercial specialists — AIA hires people who want to engineer longer life into the parts that keep industry moving.",
    image: "/images/plant-aerial.png",
    highlights: [
      "Engineering and metallurgy roles",
      "Manufacturing and quality",
      "Field technical service",
      "Commercial and global operations",
    ],
    related: [
      { label: "About AIA", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
      { label: "Technology", href: "/company/technology" },
    ],
  },
  "company/contact": {
    eyebrow: "Company",
    title: "Contact us",
    description:
      "Speak with a specialist about mill type, duty, metallurgy and the next lining cycle. Corporate office: 11–12 Sigma Corporates, Sindhubhavan Road, Ahmedabad.",
    image: "/images/about-facility.png",
    highlights: [
      "M: +91 79 6604 7800",
      "E: info@aiaengineering.com",
      "India corporate office, Ahmedabad",
      "Regional offices worldwide",
    ],
    related: [
      { label: "Global presence", href: "/company/global-presence" },
      { label: "Services", href: "/services" },
      { label: "Investor contact", href: "/investors/contact" },
    ],
  },
  "company/moa": {
    eyebrow: "Company",
    title: "Memorandum of Association",
    description:
      "Statutory documents for AIA Engineering Limited, including the memorandum and articles that govern the company.",
    image: "/images/plant-aerial.png",
    highlights: [
      "Listed-company statutory records",
      "Available through the investor centre",
    ],
    related: [
      { label: "Corporate governance", href: "/investors/governance" },
      { label: "Reports", href: "/investors/reports" },
    ],
  },
  "resources/case-studies": {
    eyebrow: "Resources",
    title: "Case studies",
    description:
      "Proven performance on operating mills — life, throughput and power outcomes from SAG and ball mill applications in Latin America, India and West Africa.",
    image: "/images/case-1.png",
    highlights: [
      "40ft SAG mill in Latin America",
      "15ft ball mill in India",
      "34ft SAG mill in West Africa",
    ],
    related: [
      { label: "Insights", href: "/resources/insights" },
      { label: "Mining solutions", href: "/solutions/mining" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  resources: {
    eyebrow: "Resources",
    title: "Resource centre",
    description:
      "Case studies, insights, news, media and downloads for plant teams, engineers and partners evaluating wear solutions.",
    image: "/images/gallery-1.png",
    highlights: [
      "Application case studies",
      "Blogs and technical insights",
      "News, events and media",
      "Technical downloads",
    ],
    related: [
      { label: "Case studies", href: "/resources/case-studies" },
      { label: "Insights", href: "/resources/insights" },
      { label: "Downloads", href: "/resources/downloads" },
    ],
  },
  "resources/insights": {
    eyebrow: "Resources",
    title: "Blogs & insights",
    description:
      "Practical writing for plant teams — grinding media selection, mill life, material design and operating conditions.",
    image: "/images/insight-1.jpg",
    highlights: [
      "Selecting grinding media and wear parts",
      "Material, design and operating conditions",
      "News and press from AIA",
    ],
    related: [
      { label: "News & events", href: "/resources/news" },
      { label: "Case studies", href: "/resources/case-studies" },
      { label: "Downloads", href: "/resources/downloads" },
    ],
  },
  "resources/news": {
    eyebrow: "Resources",
    title: "News & events",
    description:
      "Company news, service-coverage updates and announcements from AIA Engineering.",
    image: "/images/insight-2.jpg",
    highlights: [
      "Global service coverage updates",
      "Plant and technology announcements",
    ],
    related: [
      { label: "Insights", href: "/resources/insights" },
      { label: "Press", href: "/resources/media" },
    ],
  },
  "resources/media": {
    eyebrow: "Resources",
    title: "Videos / media",
    description:
      "Corporate film, mill lining sequences and application footage that show how AIA products are designed to perform.",
    image: "/images/gallery-center.jpg",
    highlights: [
      "Corporate film",
      "Ball mill lining sequences",
      "Wear component systems",
    ],
    related: [
      { label: "Gallery on homepage", href: "/#gallery" },
      { label: "Case studies", href: "/resources/case-studies" },
    ],
  },
  "resources/downloads": {
    eyebrow: "Resources",
    title: "Downloads",
    description:
      "Technical notes, application briefs and product information for mill and plant teams.",
    image: "/images/tech-performance.png",
    highlights: [
      "Application briefs",
      "Product information",
      "Request a technical pack from the team",
    ],
    related: [
      { label: "Contact", href: "/company/contact" },
      { label: "Insights", href: "/resources/insights" },
    ],
  },
  "investors/financials": {
    eyebrow: "Investors",
    title: "Financials",
    description:
      "Financial results and statements for AIA Engineering Limited, published for shareholders and the market.",
    image: "/images/plant-aerial.png",
    highlights: ["Results", "Statements", "Listed-company disclosures"],
    related: [
      { label: "Reports", href: "/investors/reports" },
      { label: "Shareholding", href: "/investors/shareholding" },
    ],
  },
  "investors/shareholding": {
    eyebrow: "Investors",
    title: "Shareholding",
    description:
      "Shareholding pattern and related disclosures for AIA Engineering Limited.",
    image: "/images/plant-aerial.png",
    highlights: ["Shareholding pattern", "Regulatory filings"],
    related: [
      { label: "Financials", href: "/investors/financials" },
      { label: "Governance", href: "/investors/governance" },
    ],
  },
  "investors/reports": {
    eyebrow: "Investors",
    title: "Reports & presentations",
    description:
      "Annual reports, investor presentations and related materials for AIA Engineering Limited.",
    image: "/images/plant-aerial.png",
    highlights: ["Annual reports", "Investor presentations"],
    related: [
      { label: "Financials", href: "/investors/financials" },
      { label: "Disclosures", href: "/investors/disclosures" },
    ],
  },
  "investors/governance": {
    eyebrow: "Investors",
    title: "Corporate governance",
    description:
      "Governance framework, policies and board committees for AIA Engineering Limited.",
    image: "/images/plant-aerial.png",
    highlights: ["Board committees", "Policies", "Code of conduct"],
    related: [
      { label: "Board", href: "/company/board" },
      { label: "Code of conduct", href: "/investors/code-of-conduct" },
    ],
  },
  "investors/contact": {
    eyebrow: "Investors",
    title: "Investor contact",
    description:
      "Investor relations contact for AIA Engineering Limited — results, reports and shareholder queries.",
    image: "/images/about-facility.png",
    highlights: [
      "E: info@aiaengineering.com",
      "Corporate office, Ahmedabad",
    ],
    related: [
      { label: "Financials", href: "/investors/financials" },
      { label: "Company contact", href: "/company/contact" },
    ],
  },
};

export function pageFromSlug(slug: string[]): InteriorContent | null {
  const key = slug.join("/");
  return interiorPages[key] ?? null;
}
