export type SiteKind = "office" | "warehouse";

export type Site = {
  id: string;
  city: string;
  country: string;
  continent: string;
  kind: SiteKind;
  /** Percent positions on the world-map plate */
  x: number;
  y: number;
  phone: string;
  email: string;
};

/** Placeholder network used for the homepage map. */
export const sites: Site[] = [
  {
    id: "usa",
    city: "Houston",
    country: "United States",
    continent: "North America",
    kind: "office",
    x: 22,
    y: 42,
    phone: "+1 713 555 0142",
    email: "americas@aiaengineering.com",
  },
  {
    id: "br",
    city: "Santos",
    country: "Brazil",
    continent: "South America",
    kind: "warehouse",
    x: 32,
    y: 68,
    phone: "+55 13 555 0198",
    email: "latam@aiaengineering.com",
  },
  {
    id: "uk",
    city: "London",
    country: "United Kingdom",
    continent: "Europe",
    kind: "office",
    x: 47,
    y: 32,
    phone: "+44 20 7946 0128",
    email: "europe@aiaengineering.com",
  },
  {
    id: "de",
    city: "Hamburg",
    country: "Germany",
    continent: "Europe",
    kind: "warehouse",
    x: 51,
    y: 36,
    phone: "+49 40 555 0176",
    email: "europe@aiaengineering.com",
  },
  {
    id: "za",
    city: "Durban",
    country: "South Africa",
    continent: "Africa",
    kind: "warehouse",
    x: 54,
    y: 72,
    phone: "+27 31 555 0104",
    email: "africa@aiaengineering.com",
  },
  {
    id: "uae",
    city: "Dubai",
    country: "United Arab Emirates",
    continent: "Asia",
    kind: "office",
    x: 61.5,
    y: 46,
    phone: "+253 998 6542 336",
    email: "global@aiaengineering.com",
  },
  {
    id: "in",
    city: "Ahmedabad",
    country: "India",
    continent: "Asia",
    kind: "office",
    x: 68,
    y: 48,
    phone: "+91 79 6604 7800",
    email: "india@aiaengineering.com",
  },
  {
    id: "inw",
    city: "Mundra",
    country: "India",
    continent: "Asia",
    kind: "warehouse",
    x: 70,
    y: 52,
    phone: "+91 79 6604 7800",
    email: "india@aiaengineering.com",
  },
  {
    id: "sg",
    city: "Singapore",
    country: "Singapore",
    continent: "Asia",
    kind: "office",
    x: 78,
    y: 56,
    phone: "+65 6555 0190",
    email: "apac@aiaengineering.com",
  },
  {
    id: "au",
    city: "Perth",
    country: "Australia",
    continent: "Oceania",
    kind: "warehouse",
    x: 86,
    y: 72,
    phone: "+61 8 5550 0144",
    email: "apac@aiaengineering.com",
  },
];
