import type { Committee, Director } from "@/content/types";

/**
 * Board roster from the live-site inventory (Oct 2026). Roles and summaries are
 * drafts: biographies, portraits and committee memberships must come from the
 * Company Secretary (requirements REQ-07, REQ-09) before launch.
 *
 * Slugs keep the canonical WordPress slugs so redirects are one-to-one.
 */
export const directors: Director[] = [
  {
    slug: "mr-bhadresh-shah",
    name: "Mr. Bhadresh K. Shah",
    role: "Managing Director",
    category: "executive",
    summary: "Managing Director and promoter of AIA Engineering, with a background in metallurgy.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mr-yashwant-m-patel",
    name: "Mr. Yashwant M. Patel",
    role: "Whole-time Director",
    category: "executive",
    summary: "Whole-time Director of AIA Engineering.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mr-nitin-chandrashanker-shukla",
    name: "Mr. Nitin Chandrashanker Shukla",
    role: "Independent Director",
    category: "independent",
    summary: "Independent Director; former Managing Director and CEO of Shell Hazira.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mr-malay-jayendra-dalal",
    name: "Mr. Malay Jayendra Dalal",
    role: "Independent Director",
    category: "independent",
    summary: "Independent Director with experience in corporate finance.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mr-udayan-choksi",
    name: "Mr. Udayan Choksi",
    role: "Independent Director",
    category: "independent",
    summary: "Independent Director and senior Chartered Accountant.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mr-sanjay-s-majmudar",
    name: "Mr. Sanjay S. Majmudar",
    role: "Independent Director",
    category: "independent",
    summary: "Independent Director with experience in corporate law and taxation.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mrs-bhumika-s-shodhan",
    name: "Mrs. Bhumika S. Shodhan",
    role: "Independent Director",
    category: "independent",
    summary: "Independent Woman Director of AIA Engineering.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mr-piyush-b-shah",
    name: "Mr. Piyush B. Shah",
    role: "Director",
    summary: "Director of AIA Engineering.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mrs-khushali-s-solanki",
    name: "Mrs. Khushali S. Solanki",
    role: "Director",
    summary: "Director of AIA Engineering.",
    bio: [],
    committees: [],
    status: "draft",
  },
  {
    slug: "mrs-janaki-u-shah",
    name: "Mrs. Janaki U. Shah",
    role: "Director",
    summary: "Director of AIA Engineering.",
    bio: [],
    committees: [],
    status: "draft",
  },
];

/** The five committees recorded on the live site; members await the Company Secretary. */
export const committees: Committee[] = [
  {
    slug: "audit-committee",
    name: "Audit Committee",
    mandate: "Oversees financial reporting, internal controls and the relationship with statutory and internal auditors.",
    responsibilities: [
      "Review of quarterly and annual financial statements before Board approval",
      "Evaluation of internal financial controls and risk management systems",
      "Recommendation of the appointment and remuneration of auditors",
      "Review of related party transactions",
    ],
    members: [],
    status: "draft",
  },
  {
    slug: "nomination-remuneration-committee",
    name: "Nomination and Remuneration Committee",
    mandate: "Sets criteria for Board and senior management appointments and recommends remuneration policy.",
    responsibilities: [
      "Criteria for qualifications, positive attributes and independence of directors",
      "Evaluation of the performance of the Board, its committees and directors",
      "Remuneration policy for directors, key managerial personnel and senior management",
    ],
    members: [],
    status: "draft",
  },
  {
    slug: "stakeholders-relationship-committee",
    name: "Stakeholders Relationship Committee",
    mandate: "Resolves grievances of shareholders and other security holders.",
    responsibilities: [
      "Redressal of shareholder complaints on transfer of shares, dividends and annual reports",
      "Review of service standards of the registrar and share transfer agent",
      "Measures to reduce unclaimed dividends",
    ],
    members: [],
    status: "draft",
  },
  {
    slug: "corporate-social-responsibility-committee",
    name: "Corporate Social Responsibility Committee",
    mandate: "Formulates the CSR policy and monitors CSR spending and programmes.",
    responsibilities: [
      "Formulation and review of the CSR policy",
      "Recommendation of the amount of CSR expenditure",
      "Monitoring of CSR projects and the annual action plan",
    ],
    members: [],
    status: "draft",
  },
  {
    slug: "risk-management-committee",
    name: "Risk Management Committee",
    mandate: "Oversees the enterprise risk management framework.",
    responsibilities: [
      "Identification of internal and external risks, including raw material volatility",
      "Review of the risk management policy and mitigation plans",
      "Oversight of business continuity and cyber security risk",
    ],
    members: [],
    status: "draft",
  },
];
