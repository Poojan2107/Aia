"use client";

import { useMemo, useState } from "react";
import type { InvestorDocument } from "@/content/types";

type Props = {
  documents: InvestorDocument[];
  /** Resolved file URLs, keyed by document id (computed on the server from the media CDN root). */
  hrefs: Record<string, string>;
  emptyMessage: string;
};

const ALL = "All";

function formatSize(kb?: number) {
  if (!kb) return null;
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

/** Filterable list of statutory documents: by financial year, section and title search. */
export function DocumentLibrary({ documents, hrefs, emptyMessage }: Props) {
  const years = useMemo(
    () => [ALL, ...Array.from(new Set(documents.map((d) => d.financialYear).filter(Boolean) as string[])).sort().reverse()],
    [documents],
  );
  const groups = useMemo(() => [ALL, ...Array.from(new Set(documents.map((d) => d.group).filter(Boolean) as string[]))], [documents]);
  const [year, setYear] = useState(ALL);
  const [group, setGroup] = useState(ALL);
  const [query, setQuery] = useState("");

  const visible = documents.filter(
    (doc) =>
      (year === ALL || doc.financialYear === year) &&
      (group === ALL || doc.group === group) &&
      (!query || doc.title.toLowerCase().includes(query.toLowerCase())),
  );

  if (!documents.length) {
    return (
      <div className="rounded-2xl border border-dashed border-aia-line bg-aia-surface-soft px-8 py-14 text-center">
        <p className="text-[1.1rem] font-bold text-aia-navy">Documents are being migrated</p>
        <p className="mx-auto mt-3 max-w-[36rem] text-[0.95rem] leading-[1.7] text-aia-navy/65">{emptyMessage}</p>
      </div>
    );
  }

  const selectClass =
    "h-11 rounded-full border border-aia-line bg-white px-4 text-[0.9rem] text-aia-navy focus:border-aia-orange focus:outline-none";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-3" role="search" aria-label="Filter documents">
        {years.length > 2 ? (
          <label className="flex flex-col gap-1 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aia-navy/55">
            Financial year
            <select className={selectClass} value={year} onChange={(e) => setYear(e.target.value)}>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </label>
        ) : null}
        {groups.length > 2 ? (
          <label className="flex flex-col gap-1 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aia-navy/55">
            Section
            <select className={selectClass} value={group} onChange={(e) => setGroup(e.target.value)}>
              {groups.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="flex min-w-[14rem] flex-1 flex-col gap-1 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-aia-navy/55">
          Search
          <input
            type="search"
            className={selectClass}
            placeholder="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} documents shown
      </p>

      <ul className="divide-y divide-aia-line border-y border-aia-line">
        {visible.map((doc) => (
          <li key={doc.id}>
            <a
              href={hrefs[doc.id]}
              target="_blank"
              rel="noopener"
              className="group flex flex-wrap items-center justify-between gap-4 py-5 transition hover:bg-aia-surface-soft sm:px-4"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[1rem] font-semibold text-aia-navy group-hover:text-aia-orange">{doc.title}</span>
                <span className="mt-1 block text-[0.82rem] text-aia-navy/55">
                  {[doc.financialYear, doc.quarter, doc.group, formatDate(doc.publishedAt)].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="flex items-center gap-3 text-[0.8rem] font-semibold text-aia-navy/60">
                {formatSize(doc.sizeKb) ? <span>PDF · {formatSize(doc.sizeKb)}</span> : <span>PDF</span>}
                <span aria-hidden className="text-aia-orange">↓</span>
              </span>
            </a>
          </li>
        ))}
        {!visible.length ? <li className="py-10 text-center text-[0.95rem] text-aia-navy/60">No documents match these filters.</li> : null}
      </ul>
    </div>
  );
}
