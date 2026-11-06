import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Instrument_Serif, Onest } from "next/font/google";
import "./globals.css";
import { ViewTransition } from "react";
import { HomeOnlyGuard } from "@/components/navigation/HomeOnlyGuard";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/env";
import { site } from "@/data/site";

// Inter and Plus Jakarta Sans are variable fonts: one file covers every weight.
const display = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Decorative faces used in single sections: not preloaded, so they never compete with LCP.
const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Wear Solutions for Critical Operations`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AIA Engineering",
    "wear solutions",
    "grinding media",
    "mill liners",
    "mining",
    "cement",
    "quarry",
    "thermal power",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/hero-plate.jpg",
        width: 2560,
        height: 1707,
        alt: "AIA Engineering industrial operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/hero-plate.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#041d2c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${serif.variable} ${onest.variable} h-full`}
    >
      <body
        className="min-h-full bg-aia-surface text-aia-navy antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-aia-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd} />
        <HomeOnlyGuard />
        <MotionProvider />
        <ViewTransition default="aia-page">{children}</ViewTransition>
      </body>
    </html>
  );
}
