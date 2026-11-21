import { allRoutes } from "@/lib/routes";

export type RedirectRule = {
  from: string;
  to: string;
  status: 301 | 302 | 410;
};

export const explicitLegacyRedirects: RedirectRule[] = [
  // 410 Gone (old dummy/sample pages)
  { from: "/sample-page", to: "", status: 410 },
  { from: "/hello-world", to: "", status: 410 },
  { from: "/404-not-found", to: "", status: 410 },
  { from: "/feed", to: "", status: 410 },

  // Company
  { from: "/about-us", to: "/company/about", status: 301 },
  { from: "/bod", to: "/company/board-of-directors", status: 301 },
  { from: "/board_of_director", to: "/company/board-of-directors", status: 301 },
  { from: "/board-committees", to: "/company/board-committees", status: 301 },
  { from: "/commitee_of_board", to: "/company/board-committees", status: 301 },
  { from: "/sustainability-csr", to: "/company/sustainability", status: 301 },

  // Committee slugs
  { from: "/commitee_of_board/audit-committee", to: "/company/board-committees#audit-committee", status: 301 },
  { from: "/commitee_of_board/nomination-remuneration-committee", to: "/company/board-committees#nomination-remuneration-committee", status: 301 },
  { from: "/commitee_of_board/stakeholders-relationship-committee", to: "/company/board-committees#stakeholders-relationship-committee", status: 301 },
  { from: "/commitee_of_board/corporate-social-responsibility-committee", to: "/company/board-committees#corporate-social-responsibility-committee", status: 301 },
  { from: "/commitee_of_board/csr-committee", to: "/company/board-committees#corporate-social-responsibility-committee", status: 301 },
  { from: "/commitee_of_board/risk-management-committee", to: "/company/board-committees#risk-management-committee", status: 301 },

  // Directors (canonical and duplicates from WordPress inventory)
  { from: "/board_of_director/mr-bhadresh-shah", to: "/company/board-of-directors/mr-bhadresh-shah", status: 301 },
  { from: "/board_of_director/mr-bhadresh-k-shah", to: "/company/board-of-directors/mr-bhadresh-shah", status: 301 },
  { from: "/board_of_director/mr-bhadresh-k-shah-2", to: "/company/board-of-directors/mr-bhadresh-shah", status: 301 },
  { from: "/mr-bhadresh-shah", to: "/company/board-of-directors/mr-bhadresh-shah", status: 301 },
  { from: "/mr-bhadresh-k-shah", to: "/company/board-of-directors/mr-bhadresh-shah", status: 301 },
  { from: "/mr-bhadresh-k-shah-2", to: "/company/board-of-directors/mr-bhadresh-shah", status: 301 },

  { from: "/board_of_director/mr-yashwant-m-patel", to: "/company/board-of-directors/mr-yashwant-m-patel", status: 301 },
  { from: "/board_of_director/mr-yashwant-m-patel-2", to: "/company/board-of-directors/mr-yashwant-m-patel", status: 301 },
  { from: "/mr-yashwant-m-patel", to: "/company/board-of-directors/mr-yashwant-m-patel", status: 301 },
  { from: "/mr-yashwant-m-patel-2", to: "/company/board-of-directors/mr-yashwant-m-patel", status: 301 },

  { from: "/board_of_director/mr-nitin-chandrashanker-shukla", to: "/company/board-of-directors/mr-nitin-chandrashanker-shukla", status: 301 },
  { from: "/mr-nitin-chandrashanker-shukla", to: "/company/board-of-directors/mr-nitin-chandrashanker-shukla", status: 301 },

  { from: "/board_of_director/mr-malay-jayendra-dalal", to: "/company/board-of-directors/mr-malay-jayendra-dalal", status: 301 },
  { from: "/mr-malay-jayendra-dalal", to: "/company/board-of-directors/mr-malay-jayendra-dalal", status: 301 },

  { from: "/board_of_director/mr-udayan-choksi", to: "/company/board-of-directors/mr-udayan-choksi", status: 301 },
  { from: "/mr-udayan-choksi", to: "/company/board-of-directors/mr-udayan-choksi", status: 301 },

  { from: "/board_of_director/mr-sanjay-s-majmudar", to: "/company/board-of-directors/mr-sanjay-s-majmudar", status: 301 },
  { from: "/board_of_director/mr-sanjay-s-majmudar-2", to: "/company/board-of-directors/mr-sanjay-s-majmudar", status: 301 },
  { from: "/mr-sanjay-s-majmudar", to: "/company/board-of-directors/mr-sanjay-s-majmudar", status: 301 },
  { from: "/mr-sanjay-s-majmudar-2", to: "/company/board-of-directors/mr-sanjay-s-majmudar", status: 301 },

  { from: "/board_of_director/mrs-bhumika-s-shodhan", to: "/company/board-of-directors/mrs-bhumika-s-shodhan", status: 301 },
  { from: "/board_of_director/mrs-bhumika-s-shodhan-2", to: "/company/board-of-directors/mrs-bhumika-s-shodhan", status: 301 },
  { from: "/mrs-bhumika-s-shodhan", to: "/company/board-of-directors/mrs-bhumika-s-shodhan", status: 301 },
  { from: "/mrs-bhumika-s-shodhan-2", to: "/company/board-of-directors/mrs-bhumika-s-shodhan", status: 301 },

  { from: "/board_of_director/mr-piyush-b-shah", to: "/company/board-of-directors/mr-piyush-b-shah", status: 301 },
  { from: "/board_of_director/mr-piysuh-b-shah", to: "/company/board-of-directors/mr-piyush-b-shah", status: 301 },
  { from: "/board_of_director/mr-piysuh-b-shah-2", to: "/company/board-of-directors/mr-piyush-b-shah", status: 301 },
  { from: "/mr-piyush-b-shah", to: "/company/board-of-directors/mr-piyush-b-shah", status: 301 },
  { from: "/mr-piysuh-b-shah", to: "/company/board-of-directors/mr-piyush-b-shah", status: 301 },
  { from: "/mr-piysuh-b-shah-2", to: "/company/board-of-directors/mr-piyush-b-shah", status: 301 },

  { from: "/board_of_director/mrs-khushali-s-solanki", to: "/company/board-of-directors/mrs-khushali-s-solanki", status: 301 },
  { from: "/board_of_director/mrs-khushali-samip-solanki", to: "/company/board-of-directors/mrs-khushali-s-solanki", status: 301 },
  { from: "/mrs-khushali-s-solanki", to: "/company/board-of-directors/mrs-khushali-s-solanki", status: 301 },
  { from: "/mrs-khushali-samip-solanki", to: "/company/board-of-directors/mrs-khushali-s-solanki", status: 301 },

  { from: "/board_of_director/mrs-janaki-u-shah", to: "/company/board-of-directors/mrs-janaki-u-shah", status: 301 },
  { from: "/board_of_director/mr-janaki-u-shah", to: "/company/board-of-directors/mrs-janaki-u-shah", status: 301 },
  { from: "/mrs-janaki-u-shah", to: "/company/board-of-directors/mrs-janaki-u-shah", status: 301 },
  { from: "/mr-janaki-u-shah", to: "/company/board-of-directors/mrs-janaki-u-shah", status: 301 },

  // Solutions
  { from: "/mining", to: "/solutions/mining", status: 301 },
  { from: "/sag-mill", to: "/solutions/mining/sag-mill", status: 301 },
  { from: "/ball-mill", to: "/solutions/mining/ball-mill", status: 301 },
  { from: "/ball-mill-next-gen", to: "/solutions/mining/ngds", status: 301 },
  { from: "/verti-mill", to: "/solutions/mining/verti-mill", status: 301 },

  { from: "/cement", to: "/solutions/cement", status: 301 },
  { from: "/tube-mill", to: "/solutions/cement/products#tube-mill", status: 301 },
  { from: "/vrm", to: "/solutions/cement/products#vrm", status: 301 },

  { from: "/quarry", to: "/solutions/quarry", status: 301 },

  { from: "/thermal", to: "/solutions/thermal-power", status: 301 },
  { from: "/tube-mill-thermal", to: "/solutions/thermal-power/products#tube", status: 301 },
  { from: "/vrm-thermal", to: "/solutions/thermal-power/products#vertical", status: 301 },

  // Investors
  { from: "/investor-financials", to: "/investors/financials", status: 301 },
  { from: "/investor-shareholding", to: "/investors/shareholding", status: 301 },
  { from: "/investor-kyc", to: "/investors/kyc", status: 301 },
  { from: "/investor-reports-and-presentations", to: "/investors/reports-and-presentations", status: 301 },
  { from: "/investor-corporate-governance", to: "/investors/corporate-governance", status: 301 },
  { from: "/investor-policy", to: "/investors/policies", status: 301 },
  { from: "/investor-iepf", to: "/investors/iepf", status: 301 },
  { from: "/investor-code-of-conduct", to: "/investors/code-of-conduct", status: 301 },
  { from: "/investor-list-of-stock-exchanges", to: "/investors/stock-exchanges", status: 301 },
  { from: "/investor-scheme-of-amalgamation", to: "/investors/scheme-of-amalgamation", status: 301 },
  { from: "/investor-corporate-announcement-disclosure", to: "/investors/announcements", status: 301 },
  { from: "/investor-regulation-46-lodr", to: "/investors/regulation-46-lodr", status: 301 },
  { from: "/investor-contact-us", to: "/investors/contact", status: 301 },
  { from: "/investor-stock-ticker", to: "/investors/stock-ticker", status: 301 },
  { from: "/invertor-stock-ticker", to: "/investors/stock-ticker", status: 301 },
  { from: "/category/annual-report", to: "/investors/reports-and-presentations", status: 301 },

  // Knowledge Hub / News / Case Studies
  { from: "/news-updates", to: "/knowledge-hub/news-and-insights", status: 301 },
  { from: "/news", to: "/knowledge-hub/news-and-insights", status: 301 },
  { from: "/news/annual-report-2025-2026", to: "/knowledge-hub/news-and-insights/annual-report-2025-2026", status: 301 },
  { from: "/news/annual-report-2024", to: "/knowledge-hub/news-and-insights/annual-report-2024", status: 301 },
  { from: "/category/uncategorized", to: "/knowledge-hub/news-and-insights", status: 301 },
  { from: "/category/mining", to: "/knowledge-hub/case-studies", status: 301 },
  { from: "/case_study", to: "/knowledge-hub/case-studies", status: 301 },
  { from: "/case_study/40ft-sag-mill-in-latin-america", to: "/knowledge-hub/case-studies/40ft-sag-mill-in-latin-america", status: 301 },
  { from: "/case_study/40ft-sag", to: "/knowledge-hub/case-studies/40ft-sag-mill-in-latin-america", status: 301 },
  { from: "/case_study/34ft-sag-mill-in-west-africa", to: "/knowledge-hub/case-studies/34ft-sag-mill-in-west-africa", status: 301 },
  { from: "/case_study/34ft-sag", to: "/knowledge-hub/case-studies/34ft-sag-mill-in-west-africa", status: 301 },
  { from: "/case_study/28ft-sag-mill-in-asia", to: "/knowledge-hub/case-studies/28ft-sag-mill-in-asia", status: 301 },
  { from: "/case_study/28ft-sag", to: "/knowledge-hub/case-studies/28ft-sag-mill-in-asia", status: 301 },
  { from: "/case_study/27ft-sag-mill-in-west-africa", to: "/knowledge-hub/case-studies/27ft-sag-mill-in-west-africa", status: 301 },
  { from: "/case_study/27ft-sag", to: "/knowledge-hub/case-studies/27ft-sag-mill-in-west-africa", status: 301 },
  { from: "/case_study/15ft-ball-mill-in-india", to: "/knowledge-hub/case-studies/15-ft-ball-mill-in-india", status: 301 },
  { from: "/case_study/15-ft-ball-mill-in-india", to: "/knowledge-hub/case-studies/15-ft-ball-mill-in-india", status: 301 },
  { from: "/case_study/15-ft-ball", to: "/knowledge-hub/case-studies/15-ft-ball-mill-in-india", status: 301 },
  { from: "/case_study/15ft-ball", to: "/knowledge-hub/case-studies/15-ft-ball-mill-in-india", status: 301 },

  // Careers
  { from: "/career", to: "/careers", status: 301 },
  { from: "/career/senior-personnel-business-development-australasia", to: "/careers/open-positions/senior-personnel-business-development-australasia", status: 301 },
  { from: "/career/managerial-position-mineral-processing-hydro-cyclone-optimization", to: "/careers/open-positions/managerial-position-mineral-processing-hydro-cyclone-optimization", status: 301 },
  { from: "/career/forging-consultant", to: "/careers/open-positions/forging-consultant", status: 301 },

  // Contact
  { from: "/contact-us", to: "/contact", status: 301 },
  { from: "/thank-you", to: "/contact/thank-you", status: 301 },

  // Prototype paths
  { from: "/company/board", to: "/company/board-of-directors", status: 301 },
  { from: "/company/contact", to: "/contact", status: 301 },
  { from: "/company/technology", to: "/company/technology-and-infrastructure", status: 301 },
  { from: "/company/moa", to: "/company/memorandum-of-association", status: 301 },
  { from: "/company/careers", to: "/careers", status: 301 },
  { from: "/resources", to: "/knowledge-hub", status: 301 },
  { from: "/resources/case-studies", to: "/knowledge-hub/case-studies", status: 301 },
  { from: "/resources/insights", to: "/knowledge-hub/news-and-insights", status: 301 },
  { from: "/resources/news", to: "/knowledge-hub/news-and-insights", status: 301 },
  { from: "/resources/media", to: "/knowledge-hub/videos", status: 301 },
  { from: "/resources/downloads", to: "/knowledge-hub/downloads", status: 301 },
  { from: "/services", to: "/solutions", status: 301 },
  { from: "/solutions/thermal", to: "/solutions/thermal-power", status: 301 },
  { from: "/solutions/quarry/products", to: "/solutions/quarry", status: 301 },
  { from: "/investors/reports", to: "/investors/reports-and-presentations", status: 301 },
  { from: "/investors/governance", to: "/investors/corporate-governance", status: 301 },
  { from: "/investors/policy", to: "/investors/policies", status: 301 },
  { from: "/investors/exchanges", to: "/investors/stock-exchanges", status: 301 },
  { from: "/investors/disclosures", to: "/investors/announcements", status: 301 },
  { from: "/investors/regulation-46", to: "/investors/regulation-46-lodr", status: 301 },
  { from: "/privacy", to: "/privacy-policy", status: 301 },
];

export const legacyRedirects: RedirectRule[] = [
  ...explicitLegacyRedirects,
  ...allRoutes().flatMap((route) =>
    (route.previousPaths ?? []).map((prev) => ({
      from: prev,
      to: route.path,
      status: 301 as const,
    })),
  ),
];

export function getLegacyRedirects(): RedirectRule[] {
  return legacyRedirects;
}

