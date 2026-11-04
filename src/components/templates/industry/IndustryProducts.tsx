"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { miningProductsPage } from "@/data/mining-products";

const { hero, groups, cases } = miningProductsPage;

type GroupId = (typeof groups)[number]["id"];
type Product = (typeof groups)[number]["products"][number];

function VariantChips({ variants }: { variants: readonly string[] }) {
  if (!variants.length) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {variants.map((name) => (
        <li key={name}>
          <span className="inline-flex rounded-full border border-aia-line bg-white px-3.5 py-1.5 text-[0.78rem] font-semibold text-aia-navy/70 transition duration-300 hover:border-aia-orange hover:bg-aia-orange hover:text-white">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FeatureImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
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

function ProductCopy({ product }: { product: Product }) {
  return (
    <div>
      <h3 className="display text-[clamp(1.55rem,3.2vw,2.45rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-aia-navy">
        {product.title}
      </h3>
      <p className="mt-2 text-[1.02rem] font-semibold text-aia-navy/75">
        {product.subtitle}
      </p>
      <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-orange" />
      <p className="mt-5 text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">
        {product.body}
      </p>
      <VariantChips variants={product.variants} />
    </div>
  );
}

function SplitProduct({
  product,
  flip,
}: {
  product: Product;
  flip?: boolean;
}) {
  return (
    <article id={product.id} className="scroll-mt-28">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-14">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <FeatureImage
            src={product.image}
            alt={product.imageAlt}
            className="aspect-[16/11] w-full"
          />
        </Reveal>
        <Reveal delay={80} className={flip ? "lg:order-1" : ""}>
          <ProductCopy product={product} />
        </Reveal>
      </div>
    </article>
  );
}

function OverlayCard({ product }: { product: Product }) {
  return (
    <article id={product.id} className="scroll-mt-28 h-full">
      <div className="group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[28px] bg-aia-navy text-white lg:min-h-[34rem]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.15)_0%,rgba(4,29,44,0.82)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(4,29,44,0.08)_0%,rgba(4,29,44,0.9)_100%)]"
        />
        <div className="relative z-10 mt-auto p-7 sm:p-9">
          <h3 className="display text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            {product.title}
          </h3>
          <p className="mt-2 text-[0.95rem] font-semibold text-aia-orange">
            {product.subtitle}
          </p>
          <p className="mt-4 max-w-[36rem] text-[0.92rem] leading-[1.7] text-white/75">
            {product.body}
          </p>
        </div>
      </div>
    </article>
  );
}

function FasteningBoard({ product }: { product: Product }) {
  return (
    <article id={product.id} className="scroll-mt-28">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
        <Reveal>
          <h3 className="display text-[clamp(1.55rem,3.2vw,2.45rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-aia-navy">
            {product.title}
          </h3>
          <p className="mt-2 text-[1.02rem] font-semibold text-aia-navy/75">
            {product.subtitle}
          </p>
          <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-orange" />
          <p className="mt-5 text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">
            {product.body}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.variants.map((name, i) => (
              <li key={name}>
                <p className="group flex min-h-[9.5rem] flex-col justify-end overflow-hidden rounded-2xl border border-aia-line bg-white px-5 py-5 transition duration-500 hover:-translate-y-1 hover:border-aia-orange hover:bg-aia-orange hover:shadow-[0_22px_50px_color-mix(in_srgb,var(--aia-orange)_28%,transparent)]">
                  <span className="font-[family-name:var(--font-ui)] text-[0.62rem] font-semibold tabular-nums tracking-[0.16em] text-aia-orange transition-colors duration-500 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 text-[1.05rem] font-semibold leading-snug text-aia-navy transition-colors duration-500 group-hover:text-white">
                    {name}
                  </span>
                  <span
                    aria-hidden
                    className="mt-4 block h-[2px] w-8 bg-aia-orange transition-all duration-500 group-hover:w-12 group-hover:bg-white"
                  />
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}

function MillNav({ active }: { active: GroupId }) {
  return (
    <nav
      className="sticky top-0 z-30 border-b border-aia-line bg-white/90 backdrop-blur-md"
      aria-label="Product families"
    >
      <div className="page-pad mx-auto flex max-w-[1440px] gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((group) => {
          const on = active === group.id;
          return (
            <a
              key={group.id}
              href={`#${group.id}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-[0.78rem] font-semibold tracking-wide transition duration-300 ${
                on
                  ? "border-aia-orange bg-aia-orange text-white"
                  : "border-aia-line bg-white text-aia-navy/70 hover:border-aia-orange hover:bg-aia-orange hover:text-white"
              }`}
            >
              {group.mill}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function MiningProducts() {
  const [active, setActive] = useState<GroupId>(groups[0].id);

  useEffect(() => {
    const nodes = groups
      .map((group) => document.getElementById(group.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id as GroupId | undefined;
        if (id) setActive(id);
      },
      { rootMargin: "-24% 0px -52% 0px", threshold: [0.12, 0.3, 0.55] },
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section
        className="relative h-[100svh] min-h-[40rem] w-full overflow-hidden bg-[#0a0a0a] text-white"
        aria-label="Mining products"
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
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
            <span aria-hidden className="mb-6 block h-[3px] w-16 bg-aia-orange sm:mb-8" />
            <h1 className="display text-[clamp(2.1rem,5.4vw,4.35rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white">
              <span className="block text-aia-orange">{hero.line1}</span>
              <span className="mt-1 block">{hero.line2}</span>
            </h1>
            <ul className="mt-8 flex flex-wrap gap-2">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[0.78rem] font-semibold text-white/85 backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white hover:text-aia-navy"
                  >
                    {group.mill}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MillNav active={active} />

      <div className="bg-white text-aia-navy">
        {groups.map((group, gi) => {
          const sag = group.id === "sag";
          const ball = group.id === "ball";
          const overlay = group.id === "verti-media";
          const fastening = group.id === "fastening";

          return (
            <section
              key={group.id}
              id={group.id}
              className={`scroll-mt-24 py-16 sm:py-20 lg:py-28 ${
                gi % 2 === 1 ? "bg-aia-surface-soft" : "bg-white"
              }`}
              aria-labelledby={`${group.id}-heading`}
            >
              <div className="page-pad mx-auto max-w-[1440px]">
                <Reveal className="mb-12 flex flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
                      {String(gi + 1).padStart(2, "0")} · {group.note}
                    </p>
                    <h2
                      id={`${group.id}-heading`}
                      className="display mt-2 text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-aia-navy"
                    >
                      {group.mill}
                    </h2>
                  </div>
                </Reveal>

                {sag ? (
                  <div className="space-y-16 lg:space-y-24">
                    {group.products.map((product, i) => (
                      <SplitProduct key={product.id} product={product} flip={i % 2 === 1} />
                    ))}
                  </div>
                ) : null}

                {ball ? (
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="lg:col-span-2">
                      <SplitProduct product={group.products[0]} />
                    </div>
                    {group.products.slice(1).map((product) => (
                      <Reveal key={product.id}>
                        <article
                          id={product.id}
                          className="group scroll-mt-28 h-full overflow-hidden rounded-[22px] border border-aia-line bg-white transition duration-500 hover:-translate-y-1 hover:border-aia-orange/40 hover:shadow-[0_22px_50px_rgba(4,29,44,0.08)]"
                        >
                          <FeatureImage
                            src={product.image}
                            alt={product.imageAlt}
                            className="aspect-[16/10] w-full rounded-none"
                          />
                          <div className="p-6 sm:p-8">
                            <ProductCopy product={product} />
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                ) : null}

                {overlay ? (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {group.products.map((product) => (
                      <Reveal key={product.id}>
                        <OverlayCard product={product} />
                      </Reveal>
                    ))}
                  </div>
                ) : null}

                {fastening ? <FasteningBoard product={group.products[0]} /> : null}
              </div>
            </section>
          );
        })}

        <section
          className="bg-aia-surface-soft py-14 sm:py-20 lg:py-28"
          aria-labelledby="product-cases"
        >
          <div className="page-pad mx-auto max-w-[1440px]">
            <Reveal>
              <h2
                id="product-cases"
                className="display mb-10 text-center text-[clamp(1.85rem,4.8vw,3.5rem)] text-aia-navy sm:mb-14"
              >
                Case Studies
              </h2>
            </Reveal>
            <div className="grid items-stretch gap-8 md:grid-cols-3">
              {cases.map((item, i) => (
                <Reveal key={item.href} className="h-full" delay={80 + i * 120}>
                  <Link href={item.href} className="group flex h-full flex-col">
                    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#e8eaec]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-[0.78rem] uppercase tracking-[0.16em] text-white opacity-0 transition duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                        Know more
                      </span>
                    </div>
                    <h3 className="mb-2 text-[1.12rem] font-bold leading-snug text-aia-navy transition-colors group-hover:text-aia-orange md:text-[1.2rem]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-aia-muted md:text-[0.95rem]">
                      {item.body}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-pad mx-auto max-w-[1440px] py-16 sm:py-20">
          <Reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton href="/company/contact">Contact us to know more</CtaButton>
            <CtaButton href="/solutions/mining" variant="outline">
              Back to mining
            </CtaButton>
          </Reveal>
        </section>
      </div>
    </>
  );
}
