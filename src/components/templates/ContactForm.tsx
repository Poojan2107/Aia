"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { submitContactForm, type ActionState } from "@/app/contact/actions";
import { ENQUIRY_TYPES, type EnquiryType } from "@/content/contact";

const industryMap: Record<string, EnquiryType> = {
  mining: "Mining",
  cement: "Cement",
  quarry: "Quarry",
  "thermal-power": "Thermal Power",
  thermal: "Thermal Power",
  investors: "Investor Relations",
  investor: "Investor Relations",
  careers: "Careers",
};

function ContactFormFields({ initialIndustry }: { initialIndustry?: string }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("industry") || undefined;
  const effectiveIndustry = queryParam ?? initialIndustry;
  const defaultType = effectiveIndustry
    ? industryMap[effectiveIndustry.toLowerCase()] || "General"
    : "General";

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    submitContactForm,
    {},
  );

  const errors = state?.errors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-6">
      {/* Hidden Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bot_trap">Do not fill this out</label>
        <input id="bot_trap" name="bot_trap" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Global error message */}
      <div aria-live="polite">
        {state?.message ? (
          <div
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 text-[0.92rem] font-semibold text-red-800"
          >
            {state.message}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
            Full Name <span className="text-aia-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-aia-navy transition placeholder:text-aia-navy/35 focus:outline-none ${
              errors.name ? "border-red-500 focus:border-red-600" : "border-aia-line focus:border-aia-accent"
            }`}
            placeholder="Jane Doe"
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
            Company / Organization <span className="text-aia-accent">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-aia-navy transition placeholder:text-aia-navy/35 focus:outline-none ${
              errors.company ? "border-red-500 focus:border-red-600" : "border-aia-line focus:border-aia-accent"
            }`}
            placeholder="Mining / Processing Ltd."
          />
          {errors.company ? (
            <p id="company-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
              {errors.company}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
            Work Email <span className="text-aia-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-aia-navy transition placeholder:text-aia-navy/35 focus:outline-none ${
              errors.email ? "border-red-500 focus:border-red-600" : "border-aia-line focus:border-aia-accent"
            }`}
            placeholder="jdoe@company.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
            Phone Number <span className="text-aia-navy/40 font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-2 h-12 w-full rounded-xl border border-aia-line bg-white px-4 text-[0.95rem] text-aia-navy transition placeholder:text-aia-navy/35 focus:border-aia-accent focus:outline-none"
            placeholder="+1 (555) 012-3456"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
            Country / Region <span className="text-aia-accent">*</span>
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-aia-navy transition placeholder:text-aia-navy/35 focus:outline-none ${
              errors.country ? "border-red-500 focus:border-red-600" : "border-aia-line focus:border-aia-accent"
            }`}
            placeholder="e.g. Australia, Chile, India"
          />
          {errors.country ? (
            <p id="country-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
              {errors.country}
            </p>
          ) : null}
        </div>

        {/* Enquiry Type */}
        <div>
          <label htmlFor="enquiryType" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
            Enquiry Type <span className="text-aia-accent">*</span>
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            defaultValue={defaultType}
            required
            aria-required="true"
            aria-invalid={!!errors.enquiryType}
            aria-describedby={errors.enquiryType ? "enquiry-type-error" : undefined}
            className={`mt-2 h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-aia-navy transition focus:outline-none ${
              errors.enquiryType ? "border-red-500 focus:border-red-600" : "border-aia-line focus:border-aia-accent"
            }`}
          >
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.enquiryType ? (
            <p id="enquiry-type-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
              {errors.enquiryType}
            </p>
          ) : null}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-[0.82rem] font-bold uppercase tracking-[0.1em] text-aia-navy">
          How can we help? <span className="text-aia-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`mt-2 w-full rounded-xl border bg-white p-4 text-[0.95rem] text-aia-navy transition placeholder:text-aia-navy/35 focus:outline-none ${
            errors.message ? "border-red-500 focus:border-red-600" : "border-aia-line focus:border-aia-accent"
          }`}
          placeholder="Please describe your operational requirements, equipment types, mill specs or specific questions..."
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 rounded border-aia-line text-aia-accent focus:ring-aia-accent"
          />
          <span className="text-[0.85rem] leading-relaxed text-aia-navy/70">
            I consent to AIA Engineering and Vega Industries storing and processing my details to respond to this enquiry in accordance with the{" "}
            {/* HomeOnlyGuard may mark this link before the (Suspense) form hydrates. */}
            <Link href="/privacy-policy" className="font-semibold text-aia-accent hover:underline" suppressHydrationWarning>
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-1.5 text-[0.82rem] font-medium text-red-600">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 items-center justify-center rounded-full bg-aia-accent px-8 font-[family-name:var(--font-ui)] text-[0.88rem] font-semibold tracking-wide text-white transition duration-300 hover:bg-aia-accent-deep disabled:opacity-50"
        >
          {isPending ? "Sending enquiry..." : "Submit Enquiry →"}
        </button>
      </div>
    </form>
  );
}

function ContactFormFallback() {
  return (
    <div className="space-y-6 animate-pulse" aria-hidden="true">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-12 rounded-xl bg-aia-navy/5" />
        <div className="h-12 rounded-xl bg-aia-navy/5" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-12 rounded-xl bg-aia-navy/5" />
        <div className="h-12 rounded-xl bg-aia-navy/5" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-12 rounded-xl bg-aia-navy/5" />
        <div className="h-12 rounded-xl bg-aia-navy/5" />
      </div>
      <div className="h-28 rounded-xl bg-aia-navy/5" />
      <div className="h-12 w-48 rounded-full bg-aia-navy/10" />
    </div>
  );
}

export function ContactForm({ initialIndustry }: { initialIndustry?: string }) {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactFormFields initialIndustry={initialIndustry} />
    </Suspense>
  );
}

