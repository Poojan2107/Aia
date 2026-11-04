import type { Faq, InvestorDocument, MediaItem } from "@/content/types";
import { faqs as homeFaqs } from "@/data/content";

export const faqs: Faq[] = [
  ...homeFaqs.map((item) => ({ question: item.question, answer: item.answer, category: "Products & services" })),
  {
    category: "Investors",
    question: "Where are AIA Engineering's shares listed?",
    answer: "The equity shares are listed on the National Stock Exchange of India (symbol AIAENG) and BSE (scrip code 532683).",
  },
  {
    category: "Investors",
    question: "How do I claim an unclaimed dividend?",
    answer: "Unclaimed dividends not yet transferred can be claimed through the Registrar and Share Transfer Agent. Dividends transferred to the IEPF can be claimed from the IEPF Authority using Form IEPF-5. See the IEPF page for details.",
  },
  {
    category: "Careers",
    question: "How do I apply for a job at AIA?",
    answer: "Current openings are listed under Careers, Open Positions. Each listing explains how to apply.",
  },
];

/** Films and galleries; filled once AIA supplies hosted video URLs (REQ-20). */
export const mediaItems: MediaItem[] = [];

/** Brochures, certificates and datasheets (REQ-27, REQ-34); files live on the media CDN. */
export const downloads: InvestorDocument[] = [];
