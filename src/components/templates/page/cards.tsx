import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { LinkRef } from "@/content/types";

/* Presentational pieces safe to use from both server and client templates. */

export function EmptyState({ title, body, action }: { title: string; body: string; action?: LinkRef }) {
  return (
    <div className="rounded-2xl border border-dashed border-aia-line bg-aia-surface-soft px-8 py-14 text-center">
      <p className="text-[1.15rem] font-bold text-aia-navy">{title}</p>
      <p className="mx-auto mt-3 max-w-[36rem] text-[0.95rem] leading-[1.7] text-aia-navy/65">{body}</p>
      {action ? (
        <Link href={action.href} className="mt-6 inline-flex text-[0.9rem] font-semibold text-aia-orange underline-offset-4 hover:underline">
          {action.label}
        </Link>
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
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-aia-line bg-white transition duration-300 hover:-translate-y-1 hover:border-aia-orange/50 hover:shadow-[0_22px_50px_rgba(4,29,44,0.08)]"
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
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                {item.meta ? (
                  <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
                    {item.meta}
                  </p>
                ) : null}
                <h3 className="mt-2 text-[1.15rem] font-bold leading-snug text-aia-navy group-hover:text-aia-orange">{item.title}</h3>
                {item.body ? <p className="mt-3 text-[0.92rem] leading-[1.7] text-aia-navy/65">{item.body}</p> : null}
                <span aria-hidden className="mt-auto pt-6 text-aia-orange">→</span>
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
