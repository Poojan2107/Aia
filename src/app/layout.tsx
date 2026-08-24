import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans, Instrument_Serif, Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getSiteUrl, site } from "@/data/site";

const themeBootScript = `(function(){try{var k="aia-theme";var q=new URLSearchParams(location.search).get("theme");var t=(q==="blue"||q==="orange")?q:localStorage.getItem(k);if(t==="blue"||t==="orange")document.documentElement.dataset.theme=t;else document.documentElement.dataset.theme="orange";}catch(e){document.documentElement.dataset.theme="orange";}})();`;

const display = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const ui = Inter({
  variable: "--font-inter-ui",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const siteUrl = getSiteUrl();

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
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
  };

  return (
    <html
      lang="en"
      data-theme="orange"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${ui.variable} ${serif.variable} ${onest.variable} h-full`}
    >
      <body
        className="min-h-full bg-aia-surface text-aia-navy antialiased"
        suppressHydrationWarning
      >
        <Script
          id="aia-theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
