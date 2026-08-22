"use client";

import { CtaButton } from "@/components/ui/CtaButton";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { miningPage } from "@/data/mining";

const { uptime, efficiency } = miningPage;

type Pillar = typeof uptime | typeof efficiency;
type Metric = Pillar["metrics"][number];

function metricParts(value: string) {
  const match = value.match(/^(.*?)(\d+%?)(.*)$/);
  if (!match) return { prefix: "", num: value, rest: "" };
  return { prefix: match[1].trim(), num: match[2], rest: match[3] };
}

function MetricHero({ metric, delay }: { metric: Metric; delay: number }) {
  const r = 58;
  const length = Math.PI * r;
  const filled = (Math.min(100, Math.max(0, metric.percent)) / 100) * length;
  const d = `M 14 72 A ${r} ${r} 0 0 1 130 72`;
  const { prefix, num } = metricParts(metric.value);

  return (
    <Reveal delay={delay} className="text-center">
      <div
        className="relative mx-auto max-w-[16rem]"
        style={
          {
            ["--metric-len" as string]: length.toFixed(2),
            ["--metric-off" as string]: (length - filled).toFixed(2),
          }
        }
      >
        <svg viewBox="0 0 144 92" className="w-full" aria-hidden>
          <path
            d={d}
            fill="none"
            stroke="var(--aia-line)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            className="metric-arc"
            d={d}
            fill="none"
            stroke="var(--aia-orange)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={length.toFixed(2)}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-[0.35rem]">
          {prefix ? (
            <p className="font-[family-name:var(--font-ui)] text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-aia-navy/40">
              {prefix}
            </p>
          ) : null}
          <p className="display text-[clamp(2.6rem,5.4vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] text-aia-navy">
            <CountUp value={num} duration={1200} />
          </p>
        </div>
      </div>
      <p className="mt-3 text-[0.88rem] font-semibold leading-snug text-aia-navy/70 sm:text-[0.95rem]">
        {metric.label}
      </p>
    </Reveal>
  );
}

function Chapter({
  pillar,
  index,
  total,
}: {
  pillar: Pillar;
  index: number;
  total: number;
}) {
  const step = String(index + 1).padStart(2, "0");
  const ghost = metricParts(pillar.metrics[0].value).num.replace("%", "");

  return (
    <article
      className="chapter-sheet relative overflow-hidden bg-white lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:min-h-[42rem] lg:items-center motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-0"
      style={{ zIndex: index + 1 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-10 hidden select-none display text-[clamp(8rem,22vw,18rem)] font-extrabold leading-none text-aia-navy/[0.035] lg:block"
      >
        {ghost}
      </span>

      <div className="page-pad relative mx-auto w-full max-w-[1440px] py-16 sm:py-20 lg:py-0">
        <header className="flex items-end justify-between gap-6">
          <h2
            id={index === 0 ? "uptime" : "efficiency"}
            className="display scroll-mt-24 text-[clamp(2rem,5vw,3.75rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.035em]"
          >
            <span className="block text-aia-navy">{pillar.line1}</span>
            <span className="block text-aia-orange">{pillar.line2}</span>
          </h2>
          <p className="font-[family-name:var(--font-ui)] text-[0.72rem] font-semibold tabular-nums tracking-[0.16em] text-aia-navy/35">
            <span className="text-aia-orange">{step}</span>
            <span className="mx-1.5 text-aia-line">/</span>
            {String(total).padStart(2, "0")}
          </p>
        </header>

        <div className="mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16">
          <Reveal>
            <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
              {pillar.productsHeading}
            </p>
            <p className="mt-4 max-w-[36rem] text-[0.95rem] leading-[1.75] text-aia-navy/65 md:text-[1.02rem]">
              {pillar.productsBody}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            {pillar.metrics.map((metric, i) => (
              <MetricHero key={metric.label} metric={metric} delay={80 + i * 120} />
            ))}
          </div>
        </div>

        <Reveal delay={160} className="mt-12 lg:mt-14">
          <p className="font-[family-name:var(--font-ui)] text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-aia-orange">
            {pillar.servicesHeading}
          </p>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-aia-line sm:grid-cols-3">
            {pillar.services.map((service) => (
              <li
                key={service.title}
                className="group bg-white px-5 py-5 transition duration-300 hover:bg-aia-surface-soft sm:px-6 sm:py-6"
              >
                <h3 className="text-[1rem] font-semibold text-aia-navy group-hover:text-aia-orange">
                  {service.title}
                </h3>
                <p className="mt-2 text-[0.86rem] leading-[1.6] text-aia-navy/55">
                  {service.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </article>
  );
}

export function PerformanceScroll() {
  return (
    <section id="services" className="scroll-mt-24 bg-white" aria-labelledby="uptime">
      <Chapter pillar={uptime} index={0} total={2} />
      <Chapter pillar={efficiency} index={1} total={2} />

      <div className="relative z-10 flex justify-center bg-white px-6 pb-16 pt-4 sm:pb-20">
            <CtaButton href="/solutions/mining/services">Explore Mining Services</CtaButton>
      </div>
    </section>
  );
}
