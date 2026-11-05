"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseCard, Hero } from "@/content/types";

type Anchor = { id: string; name: string };

/** Tracks which section is in view, for the sticky section nav. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const nodes = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-24% 0px -52% 0px", threshold: [0.12, 0.3, 0.55] },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);

  return active;
}

export function IndustryHero({ hero, label, anchors }: { hero: Hero; label: string; anchors: Anchor[] }) {
  return (
    <section
      className="relative h-[100svh] min-h-[40rem] w-full overflow-hidden bg-[#0a0a0a] text-white"
      aria-label={label}
    >
      <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover object-center" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.32)_0%,rgba(4,29,44,0.08)_34%,rgba(4,29,44,0.22)_62%,rgba(4,29,44,0.72)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(58%,42rem)] bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.18)_58%,transparent_100%)]"
      />
      <div className="page-pad relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pt-28 pb-14 sm:pb-16 lg:pb-20">
        <div className="animate-fade-up max-w-[58rem]">
          <span aria-hidden className="mb-6 block h-[3px] w-16 bg-aia-accent sm:mb-8" />
          <h1 className="display text-[clamp(2.1rem,5.4vw,4.35rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white">
            <span className="block text-aia-accent">{hero.line1}</span>
            {hero.line2 ? <span className="mt-1 block">{hero.line2}</span> : null}
          </h1>
          {anchors.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {anchors.map((anchor) => (
                <li key={anchor.id}>
                  <a
                    href={`#${anchor.id}`}
                    className="inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[0.78rem] font-semibold text-white/85 backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white hover:text-aia-navy"
                  >
                    {anchor.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SectionNav({ anchors, active, label }: { anchors: Anchor[]; active: string; label: string }) {
  return (
    <nav className="sticky top-[var(--site-header-h)] z-30 border-b border-aia-line bg-white/90 backdrop-blur-md" aria-label={label}>
      <div className="page-pad mx-auto flex max-w-[1440px] gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {anchors.map((anchor) => {
          const on = active === anchor.id;
          return (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              aria-current={on ? "true" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-[0.78rem] font-semibold tracking-wide transition duration-300 ${
                on
                  ? "border-aia-accent bg-aia-accent text-white"
                  : "border-aia-line bg-white text-aia-navy/70 hover:border-aia-accent hover:bg-aia-accent hover:text-white"
              }`}
            >
              {anchor.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function FeatureImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group/img relative overflow-hidden rounded-[22px] bg-[#e8eaec] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover object-center transition duration-700 ease-[var(--ease-out)] group-hover/img:scale-[1.06]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] transition duration-700 group-hover/img:translate-x-full"
      />
    </div>
  );
}

export function SectionHeading({ id, index, note, title }: { id: string; index: number; note: string; title: string }) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-accent">
        {String(index + 1).padStart(2, "0")} · {note}
      </p>
      <h2
        id={`${id}-heading`}
        className="display mt-2 text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-aia-navy"
      >
        {title}
      </h2>
    </Reveal>
  );
}

export function CaseCards({ cases, headingId }: { cases: CaseCard[]; headingId: string }) {
  if (!cases.length) return null;
  return (
    <section className="bg-aia-surface-soft py-14 sm:py-20 lg:py-28" aria-labelledby={headingId}>
      <div className="page-pad mx-auto max-w-[1440px]">
        <Reveal>
          <h2 id={headingId} className="display mb-10 text-center text-[clamp(1.85rem,4.8vw,3.5rem)] text-aia-navy sm:mb-14">
            Case Studies
          </h2>
        </Reveal>
        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {cases.map((item, i) => (
            <Reveal key={item.href} className="h-full" delay={80 + i * 120}>
              <Link href={item.href} className="group flex h-full flex-col">
                <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#e8eaec]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-black/0 text-[0.78rem] uppercase tracking-[0.16em] text-white opacity-0 transition duration-300 group-hover:bg-black/35 group-hover:opacity-100"
                  >
                    Know more
                  </span>
                </div>
                <h3 className="mb-2 text-[1.12rem] font-bold leading-snug text-aia-navy transition-colors group-hover:text-aia-accent md:text-[1.2rem]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-aia-muted md:text-[0.95rem]">{item.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCtas({ contactHref, back }: { contactHref: string; back?: { href: string; label: string } }) {
  return (
    <section className="page-pad mx-auto max-w-[1440px] py-16 sm:py-20">
      <Reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CtaButton href={contactHref}>Contact us to know more</CtaButton>
        {back ? (
          <CtaButton href={back.href} variant="outline">
            {back.label}
          </CtaButton>
        ) : null}
      </Reveal>
    </section>
  );
}
