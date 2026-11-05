"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { IndustryServicesContent, ServiceGroup, ServiceItem } from "@/content/types";
import {
  ClosingCtas,
  FeatureImage,
  IndustryHero,
  SectionHeading,
  SectionNav,
  useActiveSection,
} from "@/components/templates/industry/shared";

function ServiceCopy({ service }: { service: ServiceItem }) {
  return (
    <div>
      <h3 className="display text-[clamp(1.55rem,3.2vw,2.45rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-aia-navy">
        {service.title}
      </h3>
      <p className="mt-2 text-[1.02rem] font-semibold text-aia-navy/75">{service.subtitle}</p>
      <span aria-hidden className="mt-4 block h-[3px] w-12 bg-aia-accent" />
      <p className="mt-5 text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">{service.body}</p>
    </div>
  );
}

function SplitService({ service, flip }: { service: ServiceItem; flip?: boolean }) {
  return (
    <article id={service.id} className="scroll-mt-28">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] lg:gap-14">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <FeatureImage src={service.image.src} alt={service.image.alt} className="aspect-[16/11] w-full" />
        </Reveal>
        <Reveal delay={80} className={flip ? "lg:order-1" : ""}>
          <ServiceCopy service={service} />
        </Reveal>
      </div>
    </article>
  );
}

function OverlayCard({ service }: { service: ServiceItem }) {
  return (
    <article id={service.id} className="scroll-mt-28 h-full">
      <div className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[28px] bg-aia-navy text-white lg:min-h-[30rem]">
        <Image
          src={service.image.src}
          alt={service.image.alt}
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
          <p className="mt-2 text-[0.9rem] font-semibold text-aia-accent">{service.subtitle}</p>
          <p className="mt-3 max-w-[36rem] text-[0.9rem] leading-[1.65] text-white/75">{service.body}</p>
        </div>
      </div>
    </article>
  );
}

function HoverCard({ service }: { service: ServiceItem }) {
  return (
    <article
      id={service.id}
      className="group scroll-mt-28 flex h-full flex-col overflow-hidden rounded-[22px] border border-aia-line bg-white transition duration-500 hover:-translate-y-1 hover:border-aia-accent/40 hover:shadow-[0_22px_50px_rgba(4,29,44,0.08)]"
    >
      <FeatureImage src={service.image.src} alt={service.image.alt} className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <ServiceCopy service={service} />
      </div>
    </article>
  );
}

/** Layouts rotate per group so long service pages keep visual rhythm. */
function GroupBody({ group, index }: { group: ServiceGroup; index: number }) {
  const [lead, ...rest] = group.services;
  if (!lead) return null;
  const pattern = index % 3;

  if (pattern === 2) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {group.services.map((service) => (
          <Reveal key={service.id}>
            <OverlayCard service={service} />
          </Reveal>
        ))}
      </div>
    );
  }

  const Card = pattern === 0 ? OverlayCard : HoverCard;
  return (
    <div className="space-y-10 lg:space-y-16">
      <SplitService service={lead} flip={pattern === 1} />
      {rest.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {rest.map((service) => (
            <Reveal key={service.id}>
              <Card service={service} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type Props = {
  content: IndustryServicesContent;
  label: string;
  contactHref: string;
  back?: { href: string; label: string };
};

export function IndustryServices({ content, label, contactHref, back }: Props) {
  const { hero, groups } = content;
  const anchors = groups.map((group) => ({ id: group.id, name: group.name }));
  const active = useActiveSection(anchors.map((a) => a.id));

  return (
    <>
      <IndustryHero hero={hero} label={label} anchors={anchors} />
      <SectionNav anchors={anchors} active={active} label="Service families" />

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
              <GroupBody group={group} index={gi} />
            </div>
          </section>
        ))}

        <ClosingCtas contactHref={contactHref} back={back} />
      </div>
    </>
  );
}
