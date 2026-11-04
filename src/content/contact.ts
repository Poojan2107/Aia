export const ENQUIRY_TYPES = [
  "Mining",
  "Cement",
  "Quarry",
  "Thermal Power",
  "Investor Relations",
  "Careers",
  "General",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

