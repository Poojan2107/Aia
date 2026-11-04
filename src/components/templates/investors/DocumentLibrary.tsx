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
      <div className="relative overflow-hidden rounded-2xl border border-aia-line/80 bg-gradient-to-b from-white to-aia-surface-soft p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(4,29,44,0.03)]">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-aia-line/60 bg-white text-aia-navy/50 shadow-sm">
          <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
        <p className="text-[1.18rem] font-bold text-aia-navy">Statutory Documents Transition</p>
        <p className="mx-auto mt-2.5 max-w-[34rem] text-[0.95rem] leading-[1.7] text-aia-navy/70">{emptyMessage}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.bseindia.com/corporates/ann.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-aia-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-aia-navy shadow-sm transition hover:border-aia-orange hover:text-aia-orange"
          >
            <span>BSE Corporate Announcements</span>
            <span aria-hidden>↗</span>
          </a>
          <a
            href="https://www.nseindia.com/companies-listing/corporate-filings-announcements"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-aia-line bg-white px-4 py-2 text-[0.82rem] font-semibold text-aia-navy shadow-sm transition hover:border-aia-orange hover:text-aia-orange"
          >
            <span>NSE Corporate Filings</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
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

      <ul className="divide-y divide-aia-line/70 rounded-2xl border border-aia-line/80 bg-white overflow-hidden shadow-xs">
        {visible.map((doc) => (
          <li key={doc.id}>
            <a
              href={hrefs[doc.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-center justify-between gap-4 p-5 transition-colors duration-200 hover:bg-aia-surface-soft/60 sm:px-6"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-aia-line/60 bg-aia-surface-soft text-[0.7rem] font-bold text-aia-orange transition-colors group-hover:border-aia-orange/40 group-hover:bg-aia-orange/10">
                  PDF
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[1.02rem] font-semibold text-aia-navy transition-colors group-hover:text-aia-orange">
                    {doc.title}
                  </span>
                  <span className="mt-1 block text-[0.82rem] text-aia-navy/55">
                    {[doc.financialYear, doc.quarter, doc.group, formatDate(doc.publishedAt)].filter(Boolean).join(" · ")}
                    {doc.sizeKb ? ` · ${formatSize(doc.sizeKb)}` : ""}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-aia-line/80 bg-white px-3.5 py-1.5 text-[0.8rem] font-semibold text-aia-navy shadow-xs transition-all duration-200 group-hover:border-aia-orange group-hover:bg-aia-orange group-hover:text-white">
                <span>Download</span>
                <span aria-hidden className="text-[0.88rem]">↓</span>
              </span>
            </a>
          </li>
        ))}
        {!visible.length ? (
          <li className="py-12 text-center text-[0.95rem] text-aia-navy/60">
            No documents match these filters.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
