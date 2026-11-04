"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { MediaItem } from "@/content/types";
import { CardGrid, EmptyState } from "@/components/templates/page/cards";

type Option = { id: string; label: string };

function FilterButtons({ label, options, value, onChange }: { label: string; options: Option[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`rounded-full px-5 py-2 text-[0.85rem] font-semibold transition ${
              active
                ? "bg-aia-navy text-white shadow-sm"
                : "border border-aia-line bg-white text-aia-navy/70 hover:border-aia-orange hover:text-aia-navy"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

type Card = Parameters<typeof CardGrid>[0]["items"][number] & { tag: string };

/** Card grid with one row of filter buttons; "all" shows every card. */
export function FilteredCardGrid({
  label,
  options,
  cards,
  empty,
}: {
  label: string;
  options: Option[];
  cards: Card[];
  empty: { title: string; body: string };
}) {
  const [value, setValue] = useState("all");
  const visible = value === "all" ? cards : cards.filter((card) => card.tag === value);
  return (
    <>
      <FilterButtons label={label} options={options} value={value} onChange={setValue} />
      <p className="sr-only" aria-live="polite">
        {visible.length} results
      </p>
      {visible.length ? <CardGrid items={visible} columns={3} /> : <EmptyState title={empty.title} body={empty.body} />}
    </>
  );
}

type JobRow = { slug: string; href: string; title: string; summary: string; function: string; type: string; location: string };

export function FilteredJobList({ jobs }: { jobs: JobRow[] }) {
  const options = [{ id: "all", label: "All" }, ...Array.from(new Set(jobs.map((j) => j.function))).sort().map((fn) => ({ id: fn, label: fn }))];
  const [value, setValue] = useState("all");
  const visible = value === "all" ? jobs : jobs.filter((job) => job.function === value);

  return (
    <>
      <FilterButtons label="Filter vacancies by function" options={options} value={value} onChange={setValue} />
      {visible.length ? (
        <ul className="divide-y divide-aia-line border-y border-aia-line">
          {visible.map((job) => (
            <li key={job.slug}>
              <Link
                href={job.href}
                className="group flex flex-col justify-between gap-6 py-8 transition duration-200 hover:bg-aia-surface-soft/60 sm:flex-row sm:items-center sm:px-6"
              >
                <div className="max-w-[48rem]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-aia-orange/10 px-3 py-1 font-[family-name:var(--font-ui)] text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-aia-orange">
                      {job.function}
                    </span>
                    <span className="text-[0.8rem] text-aia-navy/55">{job.type}</span>
                    <span aria-hidden className="text-[0.8rem] text-aia-navy/35">
                      •
                    </span>
                    <span className="text-[0.8rem] text-aia-navy/55">{job.location}</span>
                  </div>
                  <h3 className="mt-3 text-[1.25rem] font-bold text-aia-navy group-hover:text-aia-orange">{job.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.7] text-aia-navy/65">{job.summary}</p>
                </div>
                <span className="shrink-0 text-[0.9rem] font-semibold text-aia-orange transition duration-200 group-hover:translate-x-1">
                  View role →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No vacancies currently in this function"
          body="Check back soon or send a general enquiry to our careers team."
          action={{ label: "Contact us", href: "/contact" }}
        />
      )}
    </>
  );
}

/** Poster first; the video or embed loads only after the visitor presses play. */
export function VideoCard({ item }: { item: MediaItem }) {
  const [playing, setPlaying] = useState(false);
  const embed = item.src && /youtube\.com|youtube-nocookie\.com|vimeo\.com/.test(item.src);

  return (
    <article className="overflow-hidden rounded-2xl border border-aia-line bg-white">
      <div className="relative aspect-[16/9] w-full bg-[#111]">
        {playing && item.src ? (
          embed ? (
            <iframe
              src={item.src}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="size-full border-0"
            />
          ) : (
            <video src={item.src} controls autoPlay preload="none" className="size-full object-cover" />
          )
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            disabled={!item.src}
            className="group relative size-full text-left disabled:cursor-default"
            aria-label={item.src ? `Play ${item.title}` : `${item.title} (coming soon)`}
          >
            <Image
              src={item.poster.src}
              alt={item.poster.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />
            <span aria-hidden className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-aia-orange text-white shadow-lg transition group-hover:scale-110">
                ▶
              </span>
            </span>
            {item.durationLabel ? (
              <span className="absolute bottom-3 right-3 rounded bg-black/75 px-2 py-0.5 text-xs font-semibold text-white">
                {item.durationLabel}
              </span>
            ) : null}
          </button>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-[1.1rem] font-bold text-aia-navy">{item.title}</h3>
      </div>
    </article>
  );
}
