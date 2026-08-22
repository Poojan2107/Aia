import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { miningPage } from "@/data/mining";
import { MetricGauge } from "@/components/solutions/mining/MetricGauge";
import { ValueFunnel } from "@/components/solutions/mining/ValueFunnel";

function PillarTitle({
  id,
  line1,
  line2,
  accentClass,
  accentVar,
}: {
  id: string;
  line1: string;
  line2: string;
  accentClass: string;
  accentVar: string;
}) {
  return (
    <h2
      id={id}
      className="display scroll-mt-24 text-[clamp(1.85rem,4vw,3rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]"
    >
      <span className="block text-aia-navy">{line1}</span>
      <span className={`block ${accentClass}`}>{line2}</span>
      <span
        aria-hidden
        className="mt-2.5 block h-[3px] w-14"
        style={{ background: accentVar }}
      />
    </h2>
  );
}

function FadeHeading({
  children,
  accentVar,
}: {
  children: React.ReactNode;
  accentVar: string;
}) {
  return (
    <div>
      <h3 className="text-[1.05rem] font-semibold text-aia-navy md:text-[1.15rem]">
        {children}
      </h3>
      <div
        aria-hidden
        className="mt-2 h-[3px] w-full max-w-[18rem]"
        style={{
          background: `linear-gradient(90deg, ${accentVar} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

export function MiningLanding() {
  const { hero, intro, uptime, efficiency, cases } = miningPage;
  const primary = "var(--aia-orange)";
  const metrics = hero.metrics.split("|").map((item) => item.trim());

  return (
    <>
      <section
        className="relative h-[100svh] min-h-[40rem] w-full overflow-hidden bg-[#0a0a0a] text-white"
        aria-label="Mining"
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
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,44,0.32)_0%,rgba(4,29,44,0.08)_34%,rgba(4,29,44,0.22)_62%,rgba(4,29,44,0.62)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[min(58%,42rem)] bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.18)_58%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--aia-orange)_18%,transparent)_100%)]"
        />

        <div className="page-pad relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pt-28 pb-14 sm:pb-16 lg:pb-20">
          <div className="animate-fade-up max-w-[58rem]">
            <span
              aria-hidden
              className="mb-6 block h-[3px] w-16 bg-aia-orange sm:mb-8"
            />
            <h1 className="display text-[clamp(2.1rem,5.4vw,4.35rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white">
              <span className="block text-aia-orange">{hero.line1}</span>
              <span className="mt-1 block">{hero.line2}</span>
            </h1>
            <ul className="mt-8 flex flex-wrap items-center gap-x-0 gap-y-3 sm:mt-10">
              {metrics.map((metric, i) => (
                <li key={metric} className="flex items-center">
                  {i > 0 ? (
                    <span
                      aria-hidden
                      className="mx-4 h-5 w-px bg-white/30 sm:mx-6 sm:h-6"
                    />
                  ) : null}
                  <span className="text-[clamp(1.05rem,2.1vw,1.55rem)] font-extrabold tracking-[-0.02em] text-white">
                    {metric}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-white text-aia-navy">
        <section className="page-pad mx-auto max-w-[1440px] py-14 sm:py-20 lg:py-24" aria-labelledby="mining-approach">
          <h2 id="mining-approach" className="sr-only">
            Mining approach
          </h2>

          <Reveal>
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {intro.pressures.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-aia-line bg-aia-surface-soft px-4 py-2 text-[0.8rem] text-aia-navy/70 transition duration-300 hover:border-aia-orange/50 hover:text-aia-navy sm:text-[0.88rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="border-l-[3px] border-aia-orange pl-5 text-[0.98rem] leading-[1.8] text-aia-navy/75 md:pl-6 md:text-[1.05rem]">
                {intro.lead}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="border-l-[3px] border-aia-orange/25 pl-5 text-[0.95rem] leading-[1.8] text-aia-navy/65 md:pl-6 md:text-[1.02rem]">
                {intro.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="outcome-timeline">
            <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-5">
              <span
                aria-hidden
                className="outcome-track pointer-events-none absolute top-[1.15rem] right-[8%] left-[8%] hidden h-px bg-aia-line lg:block"
              />
              <span
                aria-hidden
                className="outcome-track-fill pointer-events-none absolute top-[1.15rem] right-[8%] left-[8%] hidden h-px origin-left bg-aia-orange lg:block"
              />
              <span
                aria-hidden
                className="outcome-bead pointer-events-none absolute top-[1.15rem] left-[8%] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aia-orange lg:block"
              />
              {intro.outcomes.map((item, i) => (
                <li
                  key={item}
                  className="outcome-step group relative text-center"
                  style={{ ["--step" as string]: i }}
                >
                  <span className="outcome-node relative z-[1] mx-auto flex size-[2.35rem] items-center justify-center rounded-full border border-aia-line bg-white font-[family-name:var(--font-ui)] text-[0.72rem] font-semibold tabular-nums text-aia-orange shadow-[0_0_0_6px_white] transition duration-300 group-hover:border-aia-orange group-hover:bg-aia-orange group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="outcome-copy mt-4 text-[0.98rem] font-semibold leading-snug text-aia-navy transition-colors duration-300 group-hover:text-aia-orange">
                    {item}
                  </p>
                  <span
                    aria-hidden
                    className="mx-auto mt-3 block h-[2px] w-8 origin-center scale-x-0 bg-aia-orange transition duration-300 group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaButton href="#products">Explore Mining Products</CtaButton>
              <CtaButton href="#services" variant="outline">
                Explore Mining Services
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-12 lg:mt-16">
            <ValueFunnel />
          </Reveal>
        </section>

        <section className="page-pad mx-auto max-w-[1440px] pb-14 sm:pb-20 lg:pb-24" aria-labelledby="uptime">
          <div className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto_auto_1fr_auto] lg:gap-x-16 lg:gap-y-8">
            <article className="grid grid-rows-[auto_auto_auto_auto_auto_auto_auto] gap-8 lg:row-span-7 lg:grid-rows-subgrid">
              <Reveal>
                <PillarTitle
                  id="uptime"
                  line1={uptime.line1}
                  line2={uptime.line2}
                  accentClass="text-aia-orange"
                  accentVar={primary}
                />
              </Reveal>
              <Reveal delay={70}>
                <FadeHeading accentVar={primary}>{uptime.productsHeading}</FadeHeading>
              </Reveal>
              <Reveal delay={110}>
                <p className="text-[0.92rem] leading-[1.75] text-aia-navy/65 md:text-[0.98rem]">
                  {uptime.productsBody}
                </p>
              </Reveal>
              <div className="grid grid-cols-2 items-stretch gap-4">
                {uptime.metrics.map((metric, i) => (
                  <Reveal key={metric.label} className="h-full" delay={140 + i * 90}>
                    <MetricGauge
                      label={metric.label}
                      value={metric.value}
                      percent={metric.percent}
                      tone="primary"
                    />
                  </Reveal>
                ))}
              </div>
              <Reveal delay={180}>
                <div id="services" className="scroll-mt-24">
                  <FadeHeading accentVar={primary}>{uptime.servicesHeading}</FadeHeading>
                </div>
              </Reveal>
              <ul className="space-y-6">
                {uptime.services.map((service, i) => (
                  <Reveal key={service.title} as="li" delay={200 + i * 90}>
                    <h4 className="text-[1.02rem] font-semibold text-aia-orange">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-[0.92rem] leading-[1.7] text-aia-navy/65 md:text-[0.98rem]">
                      {service.description}
                    </p>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={280}>
                <div className="flex items-start">
                  <CtaButton href="/services">Explore Mining Services</CtaButton>
                </div>
              </Reveal>
            </article>

            <article className="grid grid-rows-[auto_auto_auto_auto_auto_auto_auto] gap-8 lg:row-span-7 lg:grid-rows-subgrid">
              <Reveal delay={40}>
                <PillarTitle
                  id="efficiency"
                  line1={efficiency.line1}
                  line2={efficiency.line2}
                  accentClass="text-aia-orange"
                  accentVar={primary}
                />
              </Reveal>
              <Reveal delay={110}>
                <FadeHeading accentVar={primary}>{efficiency.productsHeading}</FadeHeading>
              </Reveal>
              <Reveal delay={150}>
                <p className="text-[0.92rem] leading-[1.75] text-aia-navy/65 md:text-[0.98rem]">
                  {efficiency.productsBody}
                </p>
              </Reveal>
              <div className="grid grid-cols-2 items-stretch gap-4">
                {efficiency.metrics.map((metric, i) => (
                  <Reveal key={metric.label} className="h-full" delay={180 + i * 90}>
                    <MetricGauge
                      label={metric.label}
                      value={metric.value}
                      percent={metric.percent}
                      tone="primary"
                    />
                  </Reveal>
                ))}
              </div>
              <Reveal delay={220}>
                <FadeHeading accentVar={primary}>{efficiency.servicesHeading}</FadeHeading>
              </Reveal>
              <ul className="space-y-6">
                {efficiency.services.map((service, i) => (
                  <Reveal key={service.title} as="li" delay={240 + i * 90}>
                    <h4 className="text-[1.02rem] font-semibold text-aia-orange">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-[0.92rem] leading-[1.7] text-aia-navy/65 md:text-[0.98rem]">
                      {service.description}
                    </p>
                  </Reveal>
                ))}
              </ul>
              <div aria-hidden className="hidden lg:block" />
            </article>
          </div>
        </section>

        <section
          className="bg-aia-surface-soft py-14 sm:py-20 lg:py-28"
          aria-labelledby="mining-cases"
        >
          <div className="page-pad mx-auto max-w-[1440px]">
            <Reveal>
              <h2
                id="mining-cases"
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
                    </div>
                    <h3 className="mb-2 min-h-[3rem] text-[1.12rem] font-bold leading-snug text-aia-navy group-hover:text-aia-orange md:text-[1.2rem]">
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
      </div>
    </>
  );
}
