import type { Metadata } from "next";
import { isProduction, siteUrl } from "@/lib/env";
import type { RouteEntry } from "@/lib/routes";
import { site } from "@/data/site";

const defaultImage = { url: "/images/hero-plate.jpg", width: 2560, height: 1707, alt: "AIA Engineering industrial operations" };

/** Title, description, canonical, social cards and robots for one page. */
export function metadataFor(route: RouteEntry, image?: { src: string; alt: string }): Metadata {
  const indexable = isProduction && route.indexable !== false;
  const og = image?.src ? { url: image.src, alt: image.alt || route.title } : defaultImage;
  const title = route.id === "home" ? { absolute: `${site.name} | Wear Solutions for Critical Operations` } : route.title;

  return {
    title,
    description: route.description,
    alternates: { canonical: route.path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: route.path,
      title: route.id === "home" ? `${site.name} | ${site.tagline}` : `${route.title} | ${site.name}`,
      description: route.description,
      images: [og],
    },
    twitter: { card: "summary_large_image", title: route.title, description: route.description, images: [og.url] },
    robots: indexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: route.indexable !== false },
  };
}

export function absolute(path: string) {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function breadcrumbJsonLd(trail: RouteEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.navLabel ?? entry.title,
      item: absolute(entry.path),
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  publishedAt,
  image,
  url,
  type = "Article",
}: {
  title: string;
  description: string;
  publishedAt: string;
  image?: string;
  url: string;
  type?: "Article" | "NewsArticle";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    datePublished: publishedAt,
    ...(image ? { image: image.startsWith("http") ? image : `${siteUrl}${image}` } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo-aia.png`,
      },
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function jobPostingJsonLd(
  job: {
    title: string;
    summary: string;
    postedAt: string;
    type: string;
    location: string;
  },
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType:
      job.type === "Full-time" ? "FULL_TIME" : job.type === "Contract" ? "CONTRACTOR" : "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: site.legalName,
      sameAs: siteUrl,
      logo: `${siteUrl}/images/logo-aia.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    url,
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: site.legalName,
  alternateName: ["AIA Engineering", "AIA", "Vega Industries"],
  url: siteUrl,
  logo: `${siteUrl}/images/logo-aia.png`,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "11–12, Sigma Corporates, Sindhubhavan Road, Bodakdev",
    addressLocality: "Ahmedabad",
    postalCode: "380054",
    addressCountry: "IN",
  },
  identifier: [
    { "@type": "PropertyValue", propertyID: "CIN", value: "L29259GJ1972PLC001191" },
    { "@type": "PropertyValue", propertyID: "NSE", value: "AIAENG" },
    { "@type": "PropertyValue", propertyID: "BSE", value: "532683" },
    { "@type": "PropertyValue", propertyID: "ISIN", value: "INE212H01026" },
  ],
};

/** ItemList of products on an industry Products page (names and descriptions only, never prices). */
export function productListJsonLd(
  name: string,
  url: string,
  products: { id: string; title: string; body: string; image: { src: string } }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: product.title,
        description: product.body,
        url: `${url}#${product.id}`,
        image: product.image.src.startsWith("http") ? product.image.src : `${siteUrl}${product.image.src}`,
        brand: { "@type": "Brand", name: site.name },
        manufacturer: { "@id": `${siteUrl}/#organization` },
      },
    })),
  };
}
