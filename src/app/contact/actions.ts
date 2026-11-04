"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";

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

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().min(2, "Please enter your company or organization name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  country: z.string().trim().min(2, "Please provide your country."),
  enquiryType: z.enum(ENQUIRY_TYPES, {
    message: "Please select an enquiry type.",
  }),
  message: z.string().trim().min(10, "Please provide enquiry details (minimum 10 characters)."),
  consent: z.literal("on", {
    message: "Please accept the data processing terms.",
  }),
  bot_trap: z.string().max(0, "Submission rejected.").optional().or(z.literal("")),
});

export type ActionState = {
  success?: boolean;
  errors?: Record<string, string>;
  message?: string;
};

// In-memory rate limiting: max 5 requests per 10 minutes per IP
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_SUBMISSIONS) {
    return true;
  }
  times.push(now);
  submissions.set(ip, times);
  return false;
}

export async function submitContactForm(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    return {
      success: false,
      message: "Too many submissions received. Please wait a few minutes before trying again.",
    };
  }

  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    country: formData.get("country"),
    enquiryType: formData.get("enquiryType"),
    message: formData.get("message"),
    consent: formData.get("consent"),
    bot_trap: formData.get("bot_trap") || "",
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key && typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return {
      success: false,
      errors,
      message: "Please correct the errors in the form.",
    };
  }

  const data = parsed.data;

  // Bot trap triggered silently
  if (data.bot_trap) {
    redirect("/contact/thank-you");
  }

  // Route by enquiry type using env CONTACT_ROUTE_<TYPE> mailboxes (REQ-59)
  const envKey = `CONTACT_ROUTE_${data.enquiryType.toUpperCase().replace(/\s+/g, "_")}`;
  const routeMailbox =
    process.env[envKey] || process.env.CONTACT_DEFAULT_EMAIL || "info@aiaengineering.com";

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          routeMailbox,
          submittedAt: new Date().toISOString(),
          ip,
        }),
      });
    } catch (err) {
      console.error("Failed to forward contact submission to webhook:", err);
    }
  } else {
    console.log("[Contact Submission Received]", {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      enquiryType: data.enquiryType,
      message: data.message,
      routeMailbox,
    });
  }

  redirect("/contact/thank-you");
}
