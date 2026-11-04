import type { Job } from "@/content/types";

/**
 * Openings listed on the live site (Sep 2026). HR will maintain these in the
 * CMS or an applicant tracking system (REQ-57); the apply address is a
 * placeholder until HR confirms the intake mailbox.
 */
const applyEmail = "careers@aiaengineering.com";

export const jobs: Job[] = [
  {
    slug: "senior-personnel-business-development-australasia",
    title: "Senior Personnel, Business Development (Australasia)",
    location: "Perth, Australia",
    function: "Business Development",
    type: "Full-time",
    summary: "Grow AIA's mining business across Australia and the wider Australasian market.",
    responsibilities: [
      "Develop relationships with mining operations and engineering decision makers",
      "Identify opportunities for mill liners, grinding media and services",
      "Work with application engineering on proposals and trials",
    ],
    requirements: [
      "Experience in mining equipment or wear-parts sales",
      "Understanding of grinding circuits and mill operations",
    ],
    postedAt: "2026-09-25",
    applyEmail,
    status: "draft",
  },
  {
    slug: "managerial-position-mineral-processing-hydro-cyclone-optimization",
    title: "Manager, Mineral Processing (Hydrocyclone Optimisation)",
    location: "To be confirmed",
    function: "Technical Services",
    type: "Full-time",
    summary: "Lead classification and grinding-circuit optimisation work with customer sites.",
    responsibilities: [
      "Survey and model classification and grinding circuits",
      "Recommend hydrocyclone and circuit changes to improve performance",
      "Support customers through implementation",
    ],
    requirements: [
      "Degree in mineral processing, metallurgy or chemical engineering",
      "Experience with hydrocyclones and grinding-circuit modelling",
    ],
    postedAt: "2026-09-25",
    applyEmail,
    status: "draft",
  },
  {
    slug: "forging-consultant",
    title: "Forging Consultant",
    location: "To be confirmed",
    function: "Research & Development",
    type: "Consultant",
    summary: "Consultancy assignment supporting forging research and development.",
    responsibilities: ["Advise on forging processes and equipment", "Support development trials"],
    requirements: ["Extensive experience in industrial forging"],
    postedAt: "2026-09-25",
    applyEmail,
    status: "draft",
  },
];
