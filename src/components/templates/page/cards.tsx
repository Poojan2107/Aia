import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { LinkRef } from "@/content/types";

/* Presentational pieces safe to use from both server and client templates. */

export function EmptyState({ title, body, action }: { title: string; body: string; action?: LinkRef }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-aia-line/80 bg-gradient-to-b from-white to-aia-surface-soft p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(4,29,44,0.03)]">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-aia-line/60 bg-white text-aia-navy/40 shadow-sm">
        <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      </div>
      <p className="text-[1.18rem] font-bold tracking-tight text-aia-navy">{title}</p>
      <p className="mx-auto mt-2.5 max-w-[34rem] text-[0.94rem] leading-[1.7] text-aia-navy/70">{body}</p>
      {action ? (
        <div className="mt-6">
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 rounded-full border border-aia-accent bg-aia-accent px-5 py-2 text-[0.85rem] font-semibold text-white shadow-sm transition hover:bg-aia-accent-deep hover:shadow"
          >
            <span>{action.label}</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function CardGrid({
  items,
  columns = 3,
}: {
  items: { href: string; title: string; body?: string; meta?: string; image?: { src: string; alt: string } }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid gap-6 ${cols}`}>
      {items.map((item, i) => (
        <li key={item.href}>
          <Reveal delay={(i % 3) * 80} className="h-full">
            <Link
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-aia-line/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-aia-accent/40 hover:shadow-[0_20px_45px_rgba(4,29,44,0.08)]"
            >
              {item.image ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8eaec]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ) : (
                <div
                  aria-hidden
                  className="h-1.5 w-full bg-gradient-to-r from-aia-navy/30 via-aia-accent to-aia-navy/30 transition-all duration-300 group-hover:from-aia-accent group-hover:via-[#ff7a3d] group-hover:to-aia-accent"
                />
              )}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {item.meta ? (
                  <p className="font-[family-name:var(--font-ui)] text-[0.68rem] font-bold uppercase tracking-[0.16em] text-aia-accent">
                    {item.meta}
                  </p>
                ) : null}
                <h3 className="mt-2 text-[1.18rem] font-bold leading-snug text-aia-navy transition-colors duration-200 group-hover:text-aia-accent">
                  {item.title}
                </h3>
                {item.body ? (
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-aia-navy/70">
                    {item.body}
                  </p>
                ) : null}
                <div className="mt-auto flex items-center justify-between border-t border-aia-line/60 pt-5">
                  <span className="text-[0.82rem] font-semibold text-aia-navy/70 transition-colors duration-200 group-hover:text-aia-accent">
                    Explore details
                  </span>
                  <span
                    aria-hidden
                    className="flex size-7 items-center justify-center rounded-full bg-aia-surface-soft text-[0.85rem] font-bold text-aia-accent transition-all duration-300 group-hover:bg-aia-accent group-hover:text-white group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" });
}
