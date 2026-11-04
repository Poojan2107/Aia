import type { InvestorDocument, InvestorPageContent } from "@/content/types";

/**
 * Investor Relations pages. Static text is drafted from the live-site
 * inventory and the requirements spec (sections 8 and 9); exact legal labels
 * and archive depth need Investor Relations / Company Secretary approval.
 *
 * Documents come from `investorDocuments` (later: the CMS "investor document"
 * type). Each file lives in S3 behind CloudFront; see `mediaHref`.
 */

const hero = (line1: string, line2?: string) => ({
  eyebrow: "Investors",
  line1,
  line2,
  image: { src: "/images/tech-research.jpg", alt: "" },
});

export const scrip = {
  nse: "AIAENG",
  bse: "532683",
  isin: "INE212H01026",
  cin: "L29259GJ1972PLC001191",
} as const;

const rta = {
  title: "Registrar and Share Transfer Agent",
  lines: ["Link Intime India Private Limited", "Address and investor grievance contacts to be confirmed by the Company Secretary"],
};

export const investorPages: Record<string, InvestorPageContent> = {
  "investor-financials": {
    status: "draft",
    category: "financials",
    hero: hero("Financials", "Quarterly and annual results"),
    intro: ["Audited and unaudited financial results of AIA Engineering Limited, with the auditor's limited review report for each quarter."],
  },
  "investor-shareholding": {
    status: "draft",
    category: "shareholding",
    hero: hero("Shareholding", "Shareholding pattern filings"),
    intro: ["Quarterly shareholding patterns filed with the stock exchanges under Regulation 31 of the SEBI LODR Regulations."],
  },
  "investor-kyc": {
    status: "draft",
    category: "kyc",
    hero: hero("KYC", "Investor service requests and nomination"),
    intro: [
      "Shareholders holding shares in physical form must keep their PAN, KYC details, bank details and nomination up to date with the Registrar and Share Transfer Agent.",
      "Download the standard forms below and send them, completed and signed, to the Registrar.",
    ],
    contacts: [rta],
  },
  "investor-reports": {
    status: "draft",
    category: "reports-and-presentations",
    hero: hero("Reports & Presentations", "Annual reports, presentations and earnings calls"),
    intro: ["Annual Reports (including the Business Responsibility and Sustainability Report), investor presentations, and earnings call recordings and transcripts."],
  },
  "investor-governance": {
    status: "draft",
    category: "corporate-governance",
    hero: hero("Corporate Governance", "Compliance reports"),
    intro: ["Quarterly compliance reports on corporate governance submitted to BSE and NSE under Regulation 27(2) of the SEBI LODR Regulations."],
  },
  "investor-policies": {
    status: "draft",
    category: "policies",
    hero: hero("Policies", "Board-approved policies"),
    intro: ["Policies adopted by the Board of Directors of AIA Engineering Limited, including the vigil mechanism, related party transactions, materiality, dividend distribution and CSR policies."],
  },
  "investor-iepf": {
    status: "draft",
    category: "iepf",
    hero: hero("IEPF", "Investor Education and Protection Fund"),
    intro: [
      "Dividends unpaid or unclaimed for seven consecutive years, and the underlying shares, are transferred to the Investor Education and Protection Fund (IEPF) as required by the Companies Act, 2013.",
      "Shareholders can claim transferred dividends and shares from the IEPF Authority by filing Form IEPF-5. Statements of unclaimed dividends and the nodal officer's details are listed below.",
    ],
    contacts: [rta],
  },
  "investor-code-of-conduct": {
    status: "draft",
    category: "code-of-conduct",
    hero: hero("Code of Conduct", "Directors and senior management"),
    intro: ["The Code of Business Conduct and Ethics applicable to the Board of Directors and senior management of AIA Engineering Limited."],
  },
  "investor-stock-exchanges": {
    status: "draft",
    category: "stock-exchanges",
    hero: hero("List of Stock Exchanges"),
    intro: ["The equity shares of AIA Engineering Limited are listed on the following stock exchanges."],
    sections: [
      {
        id: "listings",
        heading: "Listings",
        bullets: [
          `National Stock Exchange of India Limited (NSE): symbol ${scrip.nse}`,
          `BSE Limited: scrip code ${scrip.bse}`,
          `ISIN: ${scrip.isin}`,
        ],
      },
    ],
  },
  "investor-amalgamation": {
    status: "draft",
    category: "scheme-of-amalgamation",
    hero: hero("Scheme of Amalgamation"),
    intro: ["Schemes of amalgamation, valuation reports, fairness opinions, notices of court- and tribunal-convened meetings and orders of the National Company Law Tribunal."],
  },
  "investor-announcements": {
    status: "draft",
    category: "announcements",
    hero: hero("Corporate Announcement & Disclosure", "Regulation 30 disclosures"),
    intro: ["Announcements and disclosures of events and information made to the stock exchanges under Regulation 30 of the SEBI LODR Regulations."],
  },
  "investor-regulation-46": {
    status: "draft",
    category: "regulation-46-lodr",
    hero: hero("Investor Regulation 46 LODR"),
    intro: ["Information required to be disseminated on the company's website under Regulation 46 of the SEBI Listing Obligations and Disclosure Requirements Regulations, 2015."],
  },
  "investor-contact": {
    status: "draft",
    hero: hero("Investor Contact Us"),
    intro: ["For shareholder queries, contact the Company Secretary or the Registrar and Share Transfer Agent."],
    contacts: [
      {
        title: "Company Secretary & Compliance Officer",
        lines: ["AIA Engineering Limited", "11–12, Sigma Corporates, Sindhubhavan Road, Bodakdev", "Ahmedabad 380054, India", `CIN: ${scrip.cin}`],
      },
      rta,
    ],
  },
  "memorandum-of-association": {
    status: "draft",
    category: "constitutional-documents",
    hero: { eyebrow: "Company", line1: "Memorandum of Association", image: { src: "/images/mega-building.jpg", alt: "" } },
    intro: ["The Memorandum and Articles of Association of AIA Engineering Limited."],
  },
};

/**
 * Investor document register. Populated from the live-site PDF inventory in
 * the migration step; each entry keeps `legacyUrl` so the old WordPress PDF
 * URL redirects to the new file.
 */
export const investorDocuments: InvestorDocument[] = [];

export function documentsFor(category: InvestorDocument["category"]) {
  return investorDocuments
    .filter((doc) => doc.category === category)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
