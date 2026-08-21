/**
 * Canonical site URL for metadata / sitemap.
 * Prefer NEXT_PUBLIC_SITE_URL in production; fall back to Vercel preview URL.
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "https://www.aiaengineering.com";
}

export const site = {
  name: "AIA Engineering",
  legalName: "AIA Engineering Limited",
  url: "https://www.aiaengineering.com",
  description:
    "Advanced wear solutions engineered to extend component life, improve equipment availability and keep critical operations performing across mining, cement, quarry and thermal power.",
  tagline: "We engineer for the hours you can't afford to lose.",
  email: "info@aiaengineering.com",
  phone: "+91 79 6604 7800",
  fax: "+91 79 6604 7848",
  address: {
    label: "India · Corporate Office",
    lines: [
      "11–12, Sigma Corporates,",
      "B/h. HOF Showroom, Sindhubhavan Road,",
      "Bodakdev, Ahmedabad – 380054, India.",
    ],
  },
} as const;

export const stats = [
  { value: "+32 %", label: "Longer Wear Life*" },
  { value: "-24 %", label: "Unplanned Downtime*" },
  { value: "+5 X", label: "Improved Throughput*" },
] as const;

export const footprint = [
  { value: "120+", label: "Countries" },
  { value: "6+", label: "Manufacturing\nClusters" },
  { value: "50+", label: "Basic Alloys" },
  { value: "2000+", label: "Employees" },
  { value: "10+", label: "Global\nService Centers" },
  { value: "4000+", label: "Customers" },
] as const;
