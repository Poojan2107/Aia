import { notFound } from "next/navigation";
import { childrenOf, href, routeById, type RouteEntry } from "@/lib/routes";
import { cms } from "@/lib/cms";
import { PageShell } from "@/components/templates/page/chrome";
import { HubPage, ContentPage, LegalPage, ThankYouPage, HtmlSitemapPage } from "@/components/templates/page/basic";
import { MiningLanding } from "@/components/solutions/mining/MiningLanding";
import { IndustryProducts } from "@/components/templates/industry/IndustryProducts";
import { IndustryServices } from "@/components/templates/industry/IndustryServices";
import { IndustrySolutions } from "@/components/templates/industry/IndustrySolutions";
import { QuarryLanding } from "@/components/solutions/quarry/QuarryLanding";
import { MiningShowroom } from "@/components/solutions/mining/MiningShowroom";
import { BoardPage, DirectorPage, CommitteesPage, CsrListingPage, CsrDetailPage } from "@/components/templates/company";
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
import { JsonLd } from "@/components/seo/JsonLd";
import { absolute, productListJsonLd } from "@/lib/seo";

/** Industry key used for `/contact?industry=` pre-selection, from the industry root route. */
const industryOf: Record<string, string> = {
  mining: "mining",
  cement: "cement",
  "quarry-products": "quarry",
  "thermal-power": "thermal-power",
};

function industryContext(route: RouteEntry) {
  const root = industryOf[route.id] ? route : route.parent ? routeById(route.parent) : undefined;
  const industry = root ? industryOf[root.id] : undefined;
  const label = (root ?? route).navLabel ?? (root ?? route).title;
  return {
    contactHref: industry ? `${href("contact")}?industry=${industry}` : href("contact"),
    label,
  };
}

function backLink(route: RouteEntry) {
  const parent = route.parent ? routeById(route.parent) : undefined;
  return parent && parent.pillar === "solutions" && parent.id !== "solutions"
    ? { href: parent.path, label: `Back to ${parent.navLabel ?? parent.title}` }
    : undefined;
}

const slugOf = (route: RouteEntry) => route.id.split(":")[1] ?? "";

function required<T>(value: T | undefined): T {
  if (value === undefined) notFound();
  return value;
}

async function body(route: RouteEntry): Promise<React.ReactNode> {
  switch (route.template) {
    case "hub":
      return <HubPage route={route} hero={required(await cms.hubHero(route.id))} />;

    case "mining-landing":
      return <MiningLanding />;

    case "industry-products": {
      const { contactHref, label } = industryContext(route);
      const content = required(await cms.industryProducts(route.id));
      const products = content.groups.flatMap((group) => group.products);
      const Products =
        route.id === "mining-products" ? (
          <MiningShowroom />
        ) : route.id === "quarry-products" ? (
          <QuarryLanding content={content} label={`${label} products`} contactHref={contactHref} back={backLink(route)} />
        ) : (
          <IndustryProducts content={content} label={`${label} products`} contactHref={contactHref} back={backLink(route)} />
        );
      return (
        <>
          <JsonLd data={productListJsonLd(route.title, absolute(route.path), products)} />
          {Products}
        </>
      );
    }

    case "industry-services": {
      const { contactHref, label } = industryContext(route);
      return (
        <IndustryServices
          content={required(await cms.industryServices(route.id))}
          label={`${label} services`}
          contactHref={contactHref}
          back={backLink(route)}
        />
      );
    }

    case "industry-solutions": {
      const { contactHref, label } = industryContext(route);
      const explore = childrenOf(route.id).map((child) => ({
        label: child.title,
        href: child.path,
        description: child.description,
      }));
      return (
        <IndustrySolutions
          content={required(await cms.industrySolutions(route.id))}
          label={label}
          contactHref={contactHref}
          explore={explore}
        />
      );
    }

    case "content":
      return <ContentPage route={route} content={required(await cms.contentPage(route.id))} />;

    case "legal":
      return <LegalPage route={route} content={required(await cms.contentPage(route.id))} />;

    case "board":
      return <BoardPage route={route} directors={await cms.directors()} />;

    case "director": {
      const director = (await cms.directors()).find((d) => d.slug === slugOf(route));
      return <DirectorPage route={route} director={required(director)} />;
    }

    case "committees":
      return <CommitteesPage route={route} committees={await cms.committees()} />;

    case "csr-listing":
      return <CsrListingPage route={route} initiatives={await cms.csrInitiatives()} focusAreas={await cms.csrFocusAreas()} />;

    case "csr-detail": {
      const initiative = (await cms.csrInitiatives()).find((c) => c.slug === slugOf(route));
      return <CsrDetailPage route={route} initiative={required(initiative)} />;
    }

    case "investor": {
      const content = required(await cms.investorPage(route.id));
      const documents = content.category ? await cms.investorDocuments(content.category) : [];
      return <InvestorPage route={route} content={content} documents={documents} />;
    }

    case "stock-ticker":
      return <StockTickerPage route={route} />;

    case "case-study-listing":
      return <CaseStudyListingPage route={route} caseStudies={await cms.caseStudies()} />;

    case "case-study": {
      const caseStudy = (await cms.caseStudies()).find((c) => c.slug === slugOf(route));
      return <CaseStudyPage route={route} caseStudy={required(caseStudy)} />;
    }

    case "article-listing":
      return <ArticleListingPage route={route} articles={await cms.articles()} />;

    case "article": {
      const article = (await cms.articles()).find((a) => a.slug === slugOf(route));
      return <ArticlePage route={route} article={required(article)} />;
    }

    case "media":
      return <MediaPage route={route} items={await cms.mediaItems()} />;

    case "downloads":
      return <DownloadsPage route={route} documents={await cms.downloads()} />;

    case "faqs":
      return <FaqsPage route={route} faqs={await cms.faqs()} />;

    case "careers":
      return <CareersPage route={route} jobs={await cms.jobs()} />;

    case "jobs":
      return <JobsPage route={route} jobs={await cms.jobs()} />;

    case "job": {
      const job = (await cms.jobs()).find((j) => j.slug === slugOf(route));
      return <JobPage route={route} job={required(job)} />;
    }

    case "contact":
      return <ContactPage route={route} />;

    case "thank-you":
      return <ThankYouPage route={route} />;

    case "html-sitemap":
      return <HtmlSitemapPage route={route} />;

    case "home":
      return null;
  }
}

/** Renders any register route inside the shared page shell. */
export async function renderRoute(route: RouteEntry) {
  return <PageShell route={route}>{await body(route)}</PageShell>;
}

/** Hero image of a route, for social cards in `generateMetadata`. */
export async function heroImageFor(route: RouteEntry) {
  switch (route.template) {
    case "content":
    case "legal":
      return (await cms.contentPage(route.id))?.hero.image;
    case "industry-products":
      return (await cms.industryProducts(route.id))?.hero.image;
    case "industry-services":
      return (await cms.industryServices(route.id))?.hero.image;
    case "industry-solutions":
      return (await cms.industrySolutions(route.id))?.hero.image;
    case "hub":
      return (await cms.hubHero(route.id))?.image;
    case "case-study":
      return (await cms.caseStudies()).find((c) => c.slug === slugOf(route))?.image;
    case "article":
      return (await cms.articles()).find((a) => a.slug === slugOf(route))?.image;
    default:
      return undefined;
  }
}
