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
  short?: string;
};

/**
 * Homepage map markers — positions match the global-presence reference.
 * Blue = warehouse (left in pairs), orange = office (right in pairs).
 */
export const sites: Site[] = [
  // North America — west coast pair
  {
    id: "usa-wh",
    city: "Los Angeles",
    country: "United States",
    continent: "North America",
    kind: "warehouse",
    x: 17.2,
    y: 40.2,
    phone: "+1 713 555 0142",
    email: "americas@aiaengineering.com",
  },
  {
    id: "usa",
    city: "Los Angeles",
    country: "United States",
    continent: "North America",
    kind: "office",
    x: 18.4,
    y: 40.8,
    phone: "+1 713 555 0142",
    email: "americas@aiaengineering.com",
  },
  // South America — northwest office only
  {
    id: "pe",
    city: "Lima",
    country: "Peru",
    continent: "South America",
    kind: "office",
    x: 27.2,
    y: 61.5,
    phone: "+51 1 555 0198",
    email: "latam@aiaengineering.com",
  },
  // South America — southern pair (blue SW / orange NE — match reference frame)
  {
    id: "cl-wh",
    city: "Santiago",
    country: "Chile",
    continent: "South America",
    kind: "warehouse",
    x: 28.9,
    y: 73.9,
    phone: "+56 2 555 0198",
    email: "latam@aiaengineering.com",
  },
  {
    id: "cl",
    city: "Santiago",
    country: "Chile",
    continent: "South America",
    kind: "office",
    x: 30.3,
    y: 72.5,
    phone: "+56 2 555 0198",
    email: "latam@aiaengineering.com",
  },
  // Europe — UK / western warehouse only
  {
    id: "eu-wh",
    city: "London",
    country: "United Kingdom",
    continent: "Europe",
    kind: "warehouse",
    x: 47.6,
    y: 32.8,
    phone: "+44 20 7946 0128",
    email: "europe@aiaengineering.com",
  },
  // West Africa — pair
  {
    id: "ng-wh",
    city: "Lagos",
    country: "Nigeria",
    continent: "Africa",
    kind: "warehouse",
    x: 48.8,
    y: 52.2,
    phone: "+234 1 555 0104",
    email: "africa@aiaengineering.com",
  },
  {
    id: "ng",
    city: "Lagos",
    country: "Nigeria",
    continent: "Africa",
    kind: "office",
    x: 50.0,
    y: 52.8,
    phone: "+234 1 555 0104",
    email: "africa@aiaengineering.com",
  },
  // UAE — office
  {
    id: "uae",
    city: "Dubai",
    country: "United Arab Emirates",
    short: "UAE",
    continent: "Asia",
    kind: "office",
    x: 62.2,
    y: 45.5,
    phone: "+253 998 6542 336",
    email: "global@aiaengineering.com",
  },
  // Southern Africa — pair
  {
    id: "za-wh",
    city: "Durban",
    country: "South Africa",
    continent: "Africa",
    kind: "warehouse",
    x: 55.2,
    y: 72.0,
    phone: "+27 31 555 0104",
    email: "africa@aiaengineering.com",
  },
  {
    id: "za",
    city: "Johannesburg",
    country: "South Africa",
    continent: "Africa",
    kind: "office",
    x: 56.4,
    y: 72.6,
    phone: "+27 11 555 0104",
    email: "africa@aiaengineering.com",
  },
  // Southeast Asia — pair
  {
    id: "id-wh",
    city: "Jakarta",
    country: "Indonesia",
    continent: "Asia",
    kind: "warehouse",
    x: 78.8,
    y: 57.0,
    phone: "+62 21 555 0190",
    email: "apac@aiaengineering.com",
  },
  {
    id: "id",
    city: "Jakarta",
    country: "Indonesia",
    continent: "Asia",
    kind: "office",
    x: 80.0,
    y: 57.6,
    phone: "+62 21 555 0190",
    email: "apac@aiaengineering.com",
  },
];
