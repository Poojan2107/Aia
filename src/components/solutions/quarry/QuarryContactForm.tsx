"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitContactForm, type ActionState } from "@/app/contact/actions";

/** Products in the select, as listed on the page. */
const PRODUCTS = ["Blow Bars", "Hammers", "Impellers", "Anvil", "Feed Disk", "Frame Liners", "Not sure yet"];

/**
 * Compact enquiry form in the solutions-page style: pill fields with placeholders (no labels
 * shown), sitting directly on the section. Posts to the site's real contact action with the
 * enquiry type fixed to Quarry; the chosen product is added to the message.
 */
export function QuarryContactForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(async (prev, form) => {
    const product = String(form.get("product") || "");
    if (product) form.set("message", `[${product}] ${String(form.get("message") || "")}`);
    return submitContactForm(prev, form);
  }, {});
  const err = state?.errors ?? {};

  return (
    <form action={action} noValidate className="qf">
      <div className="qf-hidden" aria-hidden>
        <input name="bot_trap" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="enquiryType" value="Quarry" />

      <div className="qf-grid">
        <Field name="name" label="Name" placeholder="Name" error={err.name} autoComplete="name" />
        <Field name="email" type="email" label="Business email" placeholder="Enter your business email" error={err.email} autoComplete="email" />
        <Field name="company" label="Company" placeholder="Company" error={err.company} autoComplete="organization" />
        <Field name="country" label="Country" placeholder="Country" error={err.country} autoComplete="country-name" />
        <label className="qf-field">
          <span className="sr-only">Product</span>
          <select name="product" defaultValue="" required className="qf-input qf-select">
            <option value="" disabled>
              Select a product
            </option>
            {PRODUCTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <Field name="phone" type="tel" label="Mobile number" placeholder="Enter your mobile number" autoComplete="tel" />
        <label className="qf-field qf-wide">
          <span className="sr-only">Message</span>
          <textarea name="message" rows={4} placeholder="Tell us about your crusher and wear part requirements…" className="qf-input qf-area" aria-invalid={Boolean(err.message)} />
          {err.message ? <span className="qf-err">{err.message}</span> : null}
        </label>
      </div>

      <label className="qf-check">
        <input type="checkbox" name="consent" />
        <span>I agree to being contacted regarding my enquiry.</span>
      </label>
      <label className="qf-check">
        <input type="checkbox" name="privacy" required />
        <span>
          I agree with the{" "}
          <Link href="/privacy-policy" suppressHydrationWarning>
            privacy policy
          </Link>
          *
        </span>
      </label>
      {err.consent ? <p className="qf-err">{err.consent}</p> : null}
      {state?.message && !state.success ? (
        <p role="alert" className="qf-err">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="qf-submit">
        <span aria-hidden className="qf-submit-dot" />
        {pending ? "Sending…" : "Request quarry support"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  error,
  autoComplete,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="qf-field">
      <span className="sr-only">{label}</span>
      <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} className="qf-input" aria-invalid={Boolean(error)} />
      {error ? <span className="qf-err">{error}</span> : null}
    </label>
  );
}
