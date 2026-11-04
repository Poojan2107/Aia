"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { IndustryProductsContent, ProductGroup, ProductItem } from "@/content/types";
import {
  CaseCards,
  ClosingCtas,
  FeatureImage,
  IndustryHero,
  SectionHeading,
  SectionNav,
  useActiveSection,
} from "@/components/templates/industry/shared";

function VariantChips({ variants }: { variants: string[] }) {
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

function ProductCopy({ product }: { product: ProductItem }) {
  return (
    <div>
      <h3 className="display text-[clamp(1.55rem,3.2vw,2.45rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-aia-navy">
        {product.title}
      </h3>
      <p className="mt-2 text-[1.02rem] font-semibold text-aia-navy/75">{product.subtitle}</p>
      <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-orange" />
      <p className="mt-5 text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">{product.body}</p>
      <VariantChips variants={product.variants} />
    </div>
  );
}

function SplitProduct({ product, flip }: { product: ProductItem; flip?: boolean }) {
  return (
    <article id={product.id} className="scroll-mt-28">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-14">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <FeatureImage src={product.image.src} alt={product.image.alt} className="aspect-[16/11] w-full" />
        </Reveal>
        <Reveal delay={80} className={flip ? "lg:order-1" : ""}>
          <ProductCopy product={product} />
        </Reveal>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: ProductItem }) {
  return (
    <article
      id={product.id}
      className="group scroll-mt-28 h-full overflow-hidden rounded-[22px] border border-aia-line bg-white transition duration-500 hover:-translate-y-1 hover:border-aia-orange/40 hover:shadow-[0_22px_50px_rgba(4,29,44,0.08)]"
    >
      <FeatureImage src={product.image.src} alt={product.image.alt} className="aspect-[16/10] w-full rounded-none" />
      <div className="p-6 sm:p-8">
        <ProductCopy product={product} />
      </div>
    </article>
  );
}

function OverlayCard({ product }: { product: ProductItem }) {
  return (
    <article id={product.id} className="scroll-mt-28 h-full">
      <div className="group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[28px] bg-aia-navy text-white lg:min-h-[34rem]">
        <Image
          src={product.image.src}
          alt={product.image.alt}
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
          <p className="mt-2 text-[0.95rem] font-semibold text-aia-orange">{product.subtitle}</p>
          <p className="mt-4 max-w-[36rem] text-[0.92rem] leading-[1.7] text-white/75">{product.body}</p>
        </div>
      </div>
    </article>
  );
}

function VariantBoard({ product }: { product: ProductItem }) {
  return (
    <article id={product.id} className="scroll-mt-28">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
        <Reveal>
          <h3 className="display text-[clamp(1.55rem,3.2vw,2.45rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-aia-navy">
            {product.title}
          </h3>
          <p className="mt-2 text-[1.02rem] font-semibold text-aia-navy/75">{product.subtitle}</p>
          <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-orange" />
          <p className="mt-5 text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">{product.body}</p>
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

function GroupBody({ group }: { group: ProductGroup }) {
  const [first, ...rest] = group.products;
  if (!first) return null;

  switch (group.layout) {
    case "split":
      return (
        <div className="space-y-16 lg:space-y-24">
          {group.products.map((product, i) => (
            <SplitProduct key={product.id} product={product} flip={i % 2 === 1} />
          ))}
        </div>
      );
    case "feature-grid":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <SplitProduct product={first} />
          </div>
          {rest.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      );
    case "overlay":
      return (
        <div className="grid gap-6 lg:grid-cols-2">
          {group.products.map((product) => (
            <Reveal key={product.id}>
              <OverlayCard product={product} />
            </Reveal>
          ))}
        </div>
      );
    case "board":
      return (
        <div className="space-y-16">
          {group.products.map((product) => (
            <VariantBoard key={product.id} product={product} />
          ))}
        </div>
      );
  }
}

type Props = {
  content: IndustryProductsContent;
  label: string;
  contactHref: string;
  back?: { href: string; label: string };
};

export function IndustryProducts({ content, label, contactHref, back }: Props) {
  const { hero, groups, cases } = content;
  const anchors = groups.map((group) => ({ id: group.id, name: group.name }));
  const active = useActiveSection(anchors.map((a) => a.id));

  return (
    <>
      <IndustryHero hero={hero} label={label} anchors={anchors} />
      <SectionNav anchors={anchors} active={active} label="Product families" />

      <div className="bg-white text-aia-navy">
        {groups.map((group, gi) => (
          <section
            key={group.id}
            id={group.id}
            className={`scroll-mt-24 py-16 sm:py-20 lg:py-28 ${gi % 2 === 1 ? "bg-aia-surface-soft" : "bg-white"}`}
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="page-pad mx-auto max-w-[1440px]">
              <SectionHeading id={group.id} index={gi} note={group.note} title={group.name} />
              <GroupBody group={group} />
            </div>
          </section>
        ))}

        <CaseCards cases={cases} headingId="product-cases" />
        <ClosingCtas contactHref={contactHref} back={back} />
      </div>
    </>
  );
}
