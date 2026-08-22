"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";
import { miningPage } from "@/data/mining";
import { MetricGauge } from "@/components/solutions/mining/MetricGauge";

const { uptime, efficiency } = miningPage;

type Pillar = typeof uptime | typeof efficiency;

function actFrom(progress: number) {
  return progress < 0.5 ? 0 : 1;
}

function PillarTitle({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <p className="display text-[clamp(1.85rem,4vw,3rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
      <span className="block text-aia-navy">{line1}</span>
      <span className="block text-aia-orange">{line2}</span>
      <span aria-hidden className="mt-2.5 block h-[3px] w-14 bg-aia-orange" />
    </p>
  );
}

function FadeHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[1.05rem] font-semibold text-aia-navy md:text-[1.15rem]">
        {children}
      </h3>
      <div
        aria-hidden
        className="mt-2 h-[3px] w-full max-w-[18rem] bg-[linear-gradient(90deg,var(--aia-orange)_0%,transparent_100%)]"
      />
    </div>
  );
}

function ProductsCopy({ pillar, drawn }: { pillar: Pillar; drawn: boolean }) {
  return (
    <div>
      <FadeHeading>{pillar.productsHeading}</FadeHeading>
      <p className="mt-4 text-[0.92rem] leading-[1.7] text-aia-navy/65 md:text-[0.98rem]">
        {pillar.productsBody}
      </p>
      <div className="mt-6">
        <GaugeRow pillar={pillar} drawn={drawn} />
      </div>
    </div>
  );
}

function GaugeRow({ pillar, drawn }: { pillar: Pillar; drawn: boolean }) {
  return (
    <div className="grid grid-cols-2 items-stretch gap-4">
      {pillar.metrics.map((metric) => (
        <MetricGauge
          key={metric.label}
          label={metric.label}
          value={metric.value}
          percent={metric.percent}
          drawn={drawn}
        />
      ))}
    </div>
  );
}

function ServicesCopy({ pillar }: { pillar: Pillar }) {
  return (
    <div>
      <FadeHeading>{pillar.servicesHeading}</FadeHeading>
      <ol className="mt-5 space-y-4">
        {pillar.services.map((service) => (
          <li key={service.title}>
            <h4 className="text-[1.02rem] font-semibold text-aia-orange">
              {service.title}
            </h4>
            <p className="mt-1 text-[0.9rem] leading-[1.65] text-aia-navy/65 md:text-[0.95rem]">
              {service.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ServicesCta() {
  return (
    <div className="mt-8 flex justify-center">
      <CtaButton href="/services">Explore Mining Services</CtaButton>
    </div>
  );
}

function PillarStack({ pillar }: { pillar: Pillar }) {
  return (
    <article className="space-y-8">
      <Reveal>
        <PillarTitle line1={pillar.line1} line2={pillar.line2} />
      </Reveal>
      <Reveal delay={70}>
        <ProductsCopy pillar={pillar} drawn />
      </Reveal>
      <Reveal delay={150}>
        <ServicesCopy pillar={pillar} />
      </Reveal>
    </article>
  );
}

export function PerformanceScroll() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(track);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const act = reduced ? 0 : actFrom(progress);
  const drawn = reduced || progress > 0.04;

  return (
    <section id="services" className="scroll-mt-24 bg-white" aria-labelledby="uptime">
      <h2 id="uptime" className="sr-only">
        {uptime.line1} {uptime.line2}
      </h2>
      <h2 id="efficiency" className="sr-only">
        {efficiency.line1} {efficiency.line2}
      </h2>

      <div className="page-pad mx-auto max-w-[1440px] py-14 sm:py-20 lg:hidden">
        <div className="grid gap-16">
          <PillarStack pillar={uptime} />
          <PillarStack pillar={efficiency} />
        </div>
        <Reveal>
          <ServicesCta />
        </Reveal>
      </div>

      <div
        ref={track}
        className="perf-track relative hidden h-[200vh] lg:block motion-reduce:h-auto"
      >
        <div className="perf-stick sticky top-0 flex h-[100svh] flex-col overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:overflow-visible">
          <div className="page-pad mx-auto flex h-full w-full max-w-[1440px] flex-col py-12 xl:py-16">
            <div className="grid items-end gap-16 lg:grid-cols-2">
              <PillarTitle line1={uptime.line1} line2={uptime.line2} />
              <PillarTitle line1={efficiency.line1} line2={efficiency.line2} />
            </div>

            <div className="relative mt-8 h-10 shrink-0 motion-reduce:hidden" aria-hidden>
              <span className="absolute top-1/2 right-[6%] left-[6%] h-px -translate-y-1/2 bg-aia-line" />
              <span
                className="absolute top-1/2 left-[6%] h-px origin-left -translate-y-1/2 bg-aia-orange"
                style={{
                  width: `${Math.max(0, Math.min(1, progress)) * 88}%`,
                }}
              />
              {[0, 1].map((mark) => (
                <span
                  key={mark}
                  className={`absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    progress >= mark - 0.02 ? "bg-aia-orange" : "bg-aia-line"
                  }`}
                  style={{ left: `${6 + mark * 88}%` }}
                />
              ))}
              <span
                className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aia-orange"
                style={{
                  left: `${6 + Math.max(0, Math.min(1, progress)) * 88}%`,
                }}
              />
            </div>

            <div className="relative mt-6 min-h-0 flex-1 motion-reduce:h-auto">
              {(
                [
                  {
                    key: 0,
                    left: <ProductsCopy pillar={uptime} drawn={drawn} />,
                    right: <ProductsCopy pillar={efficiency} drawn={drawn} />,
                    cta: false,
                  },
                  {
                    key: 1,
                    left: <ServicesCopy pillar={uptime} />,
                    right: <ServicesCopy pillar={efficiency} />,
                    cta: true,
                  },
                ] as const
              ).map((panel) => {
                const on = reduced || act === panel.key;
                return (
                  <div
                    key={panel.key}
                    className={`perf-act overflow-y-auto transition-[opacity,transform] duration-500 ease-[var(--ease-out)] motion-reduce:relative motion-reduce:mb-16 motion-reduce:h-auto motion-reduce:opacity-100 ${
                      reduced ? "" : "absolute inset-0"
                    }`}
                    style={
                      reduced
                        ? undefined
                        : {
                            opacity: on ? 1 : 0,
                            transform: on ? "translateY(0)" : "translateY(18px)",
                            pointerEvents: on ? "auto" : "none",
                          }
                    }
                    aria-hidden={reduced ? undefined : !on}
                  >
                    <div className="grid w-full items-start gap-16 lg:grid-cols-2">
                      {panel.left}
                      {panel.right}
                    </div>
                    {panel.cta ? <ServicesCta /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
