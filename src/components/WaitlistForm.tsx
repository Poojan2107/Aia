"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "aia-waitlist-email";

function subscribe() {
  return () => {};
}

function getSavedEmail() {
  return sessionStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function WaitlistForm({
  id,
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const savedEmail = useSyncExternalStore(
    subscribe,
    getSavedEmail,
    getServerSnapshot,
  );
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const shownEmail = submittedEmail ?? savedEmail;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail) return;
    sessionStorage.setItem(STORAGE_KEY, nextEmail);
    setSubmittedEmail(nextEmail);
  }

  if (shownEmail) {
    return (
      <p
        className={`rounded-full border border-line bg-white/5 px-5 py-3 text-sm text-foreground ${
          compact ? "" : "max-w-md"
        }`}
      >
        You&apos;re on the list. We&apos;ll reach out at{" "}
        <span className="text-accent">{shownEmail}</span>.
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
