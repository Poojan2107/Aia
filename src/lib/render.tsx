import { notFound } from "next/navigation";
import { childrenOf, href, routeById, type RouteEntry } from "@/lib/routes";
import { PageShell } from "@/components/templates/page/chrome";
import {
  HubPage,
  ContentPage,
  LegalPage,
  ThankYouPage,
  HtmlSitemapPage,
} from "@/components/templates/page/basic";
import { MiningLanding } from "@/components/solutions/mining/MiningLanding";
import { IndustryProducts } from "@/components/templates/industry/IndustryProducts";
import { IndustryServices } from "@/components/templates/industry/IndustryServices";
import { IndustrySolutions } from "@/components/templates/industry/IndustrySolutions";
import {
  BoardPage,
  DirectorPage,
  CommitteesPage,
  CsrListingPage,
  CsrDetailPage,
} from "@/components/templates/company";
import { InvestorPage, StockTickerPage } from "@/components/templates/investors/InvestorPage";
import {
  CaseStudyListingPage,
  CaseStudyPage,
  ArticleListingPage,
  ArticlePage,
  MediaPage,
  DownloadsPage,
  FaqsPage,
} from "@/components/templates/knowledge";
import { CareersPage, JobsPage, JobPage } from "@/components/templates/careers";
import { ContactPage } from "@/components/templates/contact";

import { hubHeroes, contentPages } from "@/content/pages";
import { miningProducts, miningServices } from "@/content/industries/mining";
import { cementSolutions, cementProducts, cementServices } from "@/content/industries/cement";
import { quarryProducts } from "@/content/industries/quarry";
import { thermalSolutions, thermalProducts, thermalServices } from "@/content/industries/thermal-power";
import { investorPages } from "@/content/investors";
import { directors } from "@/content/company/directors";
import { csrInitiatives } from "@/content/company/csr";
import { caseStudies } from "@/content/knowledge/case-studies";
import { articles } from "@/content/knowledge/articles";
import { jobs } from "@/content/careers/jobs";

const productContentMap = {
  "mining-products": { content: miningProducts, label: "Mining Products", industry: "mining" },
  "cement-products": { content: cementProducts, label: "Cement Products", industry: "cement" },
  "quarry-products": { content: quarryProducts, label: "Quarry Products", industry: "quarry" },
  "thermal-power-products": { content: thermalProducts, label: "Thermal Power Products", industry: "thermal-power" },
};

const serviceContentMap = {
  "mining-services": { content: miningServices, label: "Mining Services", industry: "mining" },
  "cement-services": { content: cementServices, label: "Cement Services", industry: "cement" },
  "thermal-power-services": { content: thermalServices, label: "Thermal Power Services", industry: "thermal-power" },
};

const solutionContentMap = {
  cement: { content: cementSolutions, label: "Cement Solutions", industry: "cement" },
  "thermal-power": { content: thermalSolutions, label: "Thermal Power Solutions", industry: "thermal-power" },
};

export function renderRoute(route: RouteEntry, searchParams?: { industry?: string }) {
  let content: React.ReactNode;

  switch (route.template) {
    case "home":
      // Handled directly by app/page.tsx
      return null;

    case "hub": {
      const hero = hubHeroes[route.id];
      if (!hero) notFound();
      content = <HubPage route={route} hero={hero} />;
      break;
    }

    case "mining-landing": {
      content = <MiningLanding />;
      break;
    }

    case "industry-products": {
      const entry = productContentMap[route.id as keyof typeof productContentMap];
      if (!entry) notFound();
      const parentRoute = route.parent ? routeById(route.parent) : undefined;
      const back = parentRoute
        ? { href: parentRoute.path, label: `Back to ${parentRoute.navLabel ?? parentRoute.title}` }
        : undefined;
      const contactHref = `${href("contact")}?industry=${entry.industry}`;
      content = (
        <IndustryProducts
          content={entry.content}
          label={entry.label}
          contactHref={contactHref}
          back={back}
        />
      );
      break;
    }

    case "industry-services": {
      const entry = serviceContentMap[route.id as keyof typeof serviceContentMap];
      if (!entry) notFound();
      const parentRoute = route.parent ? routeById(route.parent) : undefined;
      const back = parentRoute
        ? { href: parentRoute.path, label: `Back to ${parentRoute.navLabel ?? parentRoute.title}` }
        : undefined;
      const contactHref = `${href("contact")}?industry=${entry.industry}`;
      content = (
        <IndustryServices
          content={entry.content}
          label={entry.label}
          contactHref={contactHref}
          back={back}
        />
      );
      break;
    }

    case "industry-solutions": {
      const entry = solutionContentMap[route.id as keyof typeof solutionContentMap];
      if (!entry) notFound();
      const contactHref = `${href("contact")}?industry=${entry.industry}`;
      const explore = childrenOf(route.id).map((child) => ({
        label: child.navLabel ?? child.title,
        href: child.path,
        description: child.description,
      }));
      content = (
        <IndustrySolutions
          content={entry.content}
          label={entry.label}
          contactHref={contactHref}
          explore={explore}
        />
      );
      break;
    }

    case "content": {
      const page = contentPages[route.id];
      if (!page) notFound();
      content = <ContentPage route={route} content={page} />;
      break;
    }

    case "legal": {
      const page = contentPages[route.id];
      if (!page) notFound();
      content = <LegalPage route={route} content={page} />;
      break;
    }

    case "board": {
      content = <BoardPage route={route} />;
      break;
    }

    case "director": {
      const slug = route.id.split(":")[1];
      const director = directors.find((d) => d.slug === slug);
      if (!director) notFound();
      content = <DirectorPage route={route} director={director} />;
      break;
    }

    case "committees": {
      content = <CommitteesPage route={route} />;
      break;
    }

    case "csr-listing": {
      content = <CsrListingPage route={route} />;
      break;
    }

    case "csr-detail": {
      const slug = route.id.split(":")[1];
      const initiative = csrInitiatives.find((c) => c.slug === slug);
      if (!initiative) notFound();
      content = <CsrDetailPage route={route} initiative={initiative} />;
      break;
    }

    case "investor": {
      const page = investorPages[route.id];
      if (!page) notFound();
      content = <InvestorPage route={route} content={page} />;
      break;
    }

    case "stock-ticker": {
      content = <StockTickerPage route={route} />;
      break;
    }

    case "case-study-listing": {
      content = <CaseStudyListingPage route={route} />;
      break;
    }

    case "case-study": {
      const slug = route.id.split(":")[1];
      const caseStudy = caseStudies.find((c) => c.slug === slug);
      if (!caseStudy) notFound();
      content = <CaseStudyPage route={route} caseStudy={caseStudy} />;
      break;
    }

    case "article-listing": {
      content = <ArticleListingPage route={route} />;
      break;
    }

    case "article": {
      const slug = route.id.split(":")[1];
      const article = articles.find((a) => a.slug === slug);
      if (!article) notFound();
      content = <ArticlePage route={route} article={article} />;
      break;
    }

    case "media": {
      content = <MediaPage route={route} />;
      break;
    }

    case "downloads": {
      content = <DownloadsPage route={route} />;
      break;
    }

    case "faqs": {
      content = <FaqsPage route={route} />;
      break;
    }

    case "careers": {
      content = <CareersPage route={route} />;
      break;
    }

    case "jobs": {
      content = <JobsPage route={route} />;
      break;
    }

    case "job": {
      const slug = route.id.split(":")[1];
      const job = jobs.find((j) => j.slug === slug);
      if (!job) notFound();
      content = <JobPage route={route} job={job} />;
      break;
    }

    case "contact": {
      content = <ContactPage route={route} initialIndustry={searchParams?.industry} />;
      break;
    }

    case "thank-you": {
      content = <ThankYouPage route={route} />;
      break;
    }

    case "html-sitemap": {
      content = <HtmlSitemapPage route={route} />;
      break;
    }

    default:
      notFound();
  }

  return <PageShell route={route}>{content}</PageShell>;
}

