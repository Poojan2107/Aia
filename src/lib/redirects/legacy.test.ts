import { describe, it, expect } from "vitest";
import { legacyRedirects } from "./legacy";
import { allRoutes } from "@/lib/routes";
import { committees } from "@/content/company/directors";

const WORDPRESS_74_URLS = [
  // 36 pages from page-sitemap.xml
  "/",
  "/about-us/",
  "/bod/",
  "/sustainability-csr/",
  "/contact-us/",
  "/thank-you/",
  "/careers/",
  "/news-updates/",
  "/404-not-found/",
  "/sample-page/",
  "/mining/",
  "/cement/",
  "/quarry/",
  "/thermal/",
  "/sag-mill/",
  "/ball-mill/",
  "/ball-mill-next-gen/",
  "/verti-mill/",
  "/tube-mill/",
  "/vrm/",
  "/tube-mill-thermal/",
  "/vrm-thermal/",
  "/investor-financials/",
  "/investor-shareholding/",
  "/investor-kyc/",
  "/investor-reports-and-presentations/",
  "/investor-corporate-governance/",
  "/investor-policy/",
  "/investor-iepf/",
  "/investor-code-of-conduct/",
  "/investor-list-of-stock-exchanges/",
  "/investor-scheme-of-amalgamation/",
  "/investor-corporate-announcement-disclosure/",
  "/investor-regulation-46-lodr/",
  "/investor-contact-us/",
  "/invertor-stock-ticker/",
  // 1 post from post-sitemap.xml
  "/hello-world/",
  // 19 directors from board_of_director-sitemap.xml
  "/board_of_director/mr-bhadresh-shah/",
  "/board_of_director/mr-nitin-chandrashanker-shukla/",
  "/board_of_director/mr-malay-jayendra-dalal/",
  "/board_of_director/mr-udayan-choksi/",
  "/board_of_director/mr-piyush-b-shah/",
  "/board_of_director/mr-piysuh-b-shah/",
  "/board_of_director/mr-piysuh-b-shah-2/",
  "/board_of_director/mrs-bhumika-s-shodhan/",
  "/board_of_director/mrs-bhumika-s-shodhan-2/",
  "/board_of_director/mrs-khushali-s-solanki/",
  "/board_of_director/mrs-khushali-samip-solanki/",
  "/board_of_director/mrs-janaki-u-shah/",
  "/board_of_director/mr-janaki-u-shah/",
  "/board_of_director/mr-yashwant-m-patel/",
  "/board_of_director/mr-yashwant-m-patel-2/",
  "/board_of_director/mr-sanjay-s-majmudar/",
  "/board_of_director/mr-sanjay-s-majmudar-2/",
  "/board_of_director/mr-bhadresh-k-shah/",
  "/board_of_director/mr-bhadresh-k-shah-2/",
  // 5 committees from commitee_of_board-sitemap.xml
  "/commitee_of_board/corporate-social-responsibility-committee/",
  "/commitee_of_board/nomination-remuneration-committee/",
  "/commitee_of_board/audit-committee/",
  "/commitee_of_board/stakeholders-relationship-committee/",
  "/commitee_of_board/risk-management-committee/",
  // 2 news from news-sitemap.xml
  "/news/annual-report-2025-2026/",
  "/news/annual-report-2024/",
  // 3 careers from career-sitemap.xml
  "/career/senior-personnel-business-development-australasia/",
  "/career/managerial-position-mineral-processing-hydro-cyclone-optimization/",
  "/career/forging-consultant/",
  // 5 case studies from case_study-sitemap.xml
  "/case_study/40ft-sag-mill-in-latin-america/",
  "/case_study/34ft-sag-mill-in-west-africa/",
  "/case_study/28ft-sag-mill-in-asia/",
  "/case_study/27ft-sag-mill-in-west-africa/",
  "/case_study/15-ft-ball-mill-in-india/",
  // 3 categories from category-sitemap.xml
  "/category/uncategorized/",
  "/category/annual-report/",
  "/category/mining/",
];

describe("Legacy Redirects", () => {
  const registeredPaths = new Set(allRoutes().map((r) => r.path));
  const redirectMap = new Map<string, (typeof legacyRedirects)[number]>();
  for (const rule of legacyRedirects) {
    const normalised = rule.from.toLowerCase().replace(/\/+$/, "") || "/";
    redirectMap.set(normalised, rule);
  }

  it("every redirect target exists in allRoutes() (ignoring fragments)", () => {
    for (const rule of legacyRedirects) {
      if (rule.status === 410) {
        continue;
      }
      const targetPath = rule.to.split("#")[0];
      expect(
        registeredPaths.has(targetPath),
        `Redirect target '${rule.to}' (from '${rule.from}') must exist in registered routes`,
      ).toBe(true);
    }
  });

  it("no redirect target is itself a redirect source (no chains)", () => {
    const froms = new Set(
      legacyRedirects.map((r) => r.from.toLowerCase().replace(/\/+$/, "")),
    );
    for (const rule of legacyRedirects) {
      if (rule.status === 410) continue;
      const targetPath = rule.to.split("#")[0].toLowerCase().replace(/\/+$/, "");
      expect(
        froms.has(targetPath),
        `Redirect target '${rule.to}' is chained as a source '${targetPath}'`,
      ).toBe(false);
    }
  });

  it("nothing redirects to '/' except explicit home redirects", () => {
    for (const rule of legacyRedirects) {
      if (rule.status === 410) continue;
      if (rule.to === "/") {
        expect(rule.from).toBe("/");
      }
    }
  });

  it("covers all 74 WordPress inventory URLs without gaps or unanchored hashes", () => {
    expect(WORDPRESS_74_URLS.length).toBe(74);

    const validCommitteeSlugs = new Set(committees.map((c) => c.slug));

    for (const rawUrl of WORDPRESS_74_URLS) {
      const normalised = rawUrl.toLowerCase().replace(/\/+$/, "") || "/";
      if (normalised === "/" || registeredPaths.has(normalised)) {
        // Direct route hit (e.g. "/" or "/careers")
        continue;
      }

      const match = redirectMap.get(normalised);
      expect(
        match,
        `Inventory URL '${rawUrl}' must have a redirect rule or match a registered route`,
      ).toBeDefined();

      if (match && match.to.includes("#")) {
        const [targetPath, hash] = match.to.split("#");
        if (targetPath === "/company/board-committees") {
          expect(
            validCommitteeSlugs.has(hash),
            `Anchor '#${hash}' in redirect for '${rawUrl}' must be a valid committee slug`,
          ).toBe(true);
        }
      }
    }
  });
});

