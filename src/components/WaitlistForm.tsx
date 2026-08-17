"use client";

import { FormEvent, useState } from "react";

export function WaitlistForm({
  id,
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p
        className={`rounded-full border border-line bg-white/5 px-5 py-3 text-sm text-foreground ${
          compact ? "" : "max-w-md"
        }`}
      >
        You&apos;re on the list. We&apos;ll reach out at{" "}
        <span className="text-accent">{email}</span>.
      </p>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={`flex w-full gap-2 ${compact ? "max-w-md" : "max-w-lg flex-col sm:flex-row"}`}
    >
      <label className="sr-only" htmlFor={`${id ?? "waitlist"}-email`}>
        Email
      </label>
      <input
        id={`${id ?? "waitlist"}-email`}
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@studio.com"
        className="h-12 flex-1 rounded-full border border-line bg-white/5 px-5 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
      />
      <button
        type="submit"
        className="h-12 shrink-0 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-accent hover:text-background"
      >
        Get early access
      </button>
    </form>
  );
}
