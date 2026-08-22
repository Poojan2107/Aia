"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { miningServicesPage } from "@/data/mining-services";

const { hero, groups } = miningServicesPage;

type GroupId = (typeof groups)[number]["id"];
type Service = (typeof groups)[number]["services"][number];

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
    <div
      className={`group/img relative overflow-hidden rounded-[22px] bg-[#e8eaec] ${className}`}
    >
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

function ServiceCopy({ service }: { service: Service }) {
  return (
    <div>
      <h3 className="display text-[clamp(1.55rem,3.2vw,2.45rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-aia-navy">
        {service.title}
      </h3>
      <p className="mt-2 text-[1.02rem] font-semibold text-aia-navy/75">
        {service.subtitle}
      </p>
      <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-orange" />
      <p className="mt-5 text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">
        {service.body}
      </p>
    </div>
  );
}

function SplitService({ service, flip }: { service: Service; flip?: boolean }) {
  return (
    <article id={service.id} className="scroll-mt-28">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-14">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <FeatureImage
            src={service.image}
            alt={service.imageAlt}
            className="aspect-[16/11] w-full"
          />
        </Reveal>
        <Reveal delay={80} className={flip ? "lg:order-1" : ""}>
          <ServiceCopy service={service} />
        </Reveal>
      </div>
    </article>
  );
}

function OverlayCard({ service }: { service: Service }) {
  return (
    <article id={service.id} className="scroll-mt-28 h-full">
      <div className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[28px] bg-aia-navy text-white lg:min-h-[30rem]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.12)_0%,rgba(4,29,44,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(4,29,44,0.06)_0%,rgba(4,29,44,0.92)_100%)]"
        />
        <div className="relative z-10 mt-auto p-7 sm:p-8">
          <h3 className="display text-[clamp(1.45rem,2.6vw,2.1rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {service.title}
          </h3>
          <p className="mt-2 text-[0.9rem] font-semibold text-aia-orange">
            {service.subtitle}
          </p>
          <p className="mt-3 max-w-[36rem] text-[0.9rem] leading-[1.65] text-white/75">
            {service.body}
          </p>
        </div>
      </div>
    </article>
  );
}

function HoverCard({ service }: { service: Service }) {
  return (
    <article
      id={service.id}
      className="group scroll-mt-28 flex h-full flex-col overflow-hidden rounded-[22px] border border-aia-line bg-white transition duration-500 hover:-translate-y-1 hover:border-aia-orange/40 hover:shadow-[0_22px_50px_rgba(4,29,44,0.08)]"
    >
      <FeatureImage
        src={service.image}
        alt={service.imageAlt}
        className="aspect-[16/10] w-full rounded-none"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <ServiceCopy service={service} />
      </div>
    </article>
  );
}

function ServiceNav({ active }: { active: GroupId }) {
  return (
    <nav
      className="sticky top-0 z-30 border-b border-aia-line bg-white/90 backdrop-blur-md"
      aria-label="Service families"
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
              {group.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function MiningServices() {
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
        aria-label="Mining services"
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
                    {group.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ServiceNav active={active} />

      <div className="bg-white text-aia-navy">
        {groups.map((group, gi) => {
          const lead = group.services[0];
          const rest = group.services.slice(1);

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
                <Reveal className="mb-12 sm:mb-16">
                  <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
                    {String(gi + 1).padStart(2, "0")} · {group.note}
                  </p>
                  <h2
                    id={`${group.id}-heading`}
                    className="display mt-2 text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-aia-navy"
                  >
                    {group.label}
                  </h2>
                </Reveal>

                {gi === 0 ? (
                  <div className="space-y-10 lg:space-y-16">
                    <SplitService service={lead} />
                    <div className="grid gap-6 lg:grid-cols-2">
                      {rest.map((service) => (
                        <Reveal key={service.id}>
                          <OverlayCard service={service} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : null}

                {gi === 1 ? (
                  <div className="space-y-10 lg:space-y-16">
                    <SplitService service={lead} flip />
                    <div className="grid gap-6 lg:grid-cols-2">
                      {rest.map((service) => (
                        <Reveal key={service.id}>
                          <HoverCard service={service} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : null}

                {gi === 2 ? (
                  <div className="grid gap-6 lg:grid-cols-3">
                    {group.services.map((service) => (
                      <Reveal key={service.id}>
                        <OverlayCard service={service} />
                      </Reveal>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          );
        })}

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
