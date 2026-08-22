import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { miningPage } from "@/data/mining";
import { ValueFunnel } from "@/components/solutions/mining/ValueFunnel";
import { PerformanceScroll } from "@/components/solutions/mining/PerformanceScroll";

export function MiningLanding() {
  const { hero, intro, cases } = miningPage;
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
            <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {intro.pressures.map((item, i) => (
                <li key={item}>
                  <p className="group relative flex min-h-[8.5rem] flex-col justify-end overflow-hidden rounded-2xl border border-aia-line bg-aia-surface-soft px-5 py-5 transition duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:border-aia-orange hover:bg-aia-orange hover:shadow-[0_22px_50px_color-mix(in_srgb,var(--aia-orange)_28%,transparent)] sm:min-h-[10rem] sm:px-6 sm:py-6">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-3 display text-[4.5rem] font-extrabold leading-none text-aia-navy/[0.06] transition-colors duration-500 group-hover:text-white/15 sm:text-[5.5rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative font-[family-name:var(--font-ui)] text-[0.62rem] font-semibold tabular-nums tracking-[0.16em] text-aia-orange transition-colors duration-500 group-hover:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative mt-3 text-[1.05rem] font-semibold leading-snug text-aia-navy transition-colors duration-500 group-hover:text-white sm:text-[1.15rem]">
                      {item}
                    </span>
                    <span
                      aria-hidden
                      className="relative mt-4 block h-[2px] w-8 bg-aia-orange transition-all duration-500 group-hover:w-14 group-hover:bg-white"
                    />
                  </p>
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
              <CtaButton href="/solutions/mining/products">Explore Mining Products</CtaButton>
              <CtaButton href="/solutions/mining/services" variant="outline">
                Explore Mining Services
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-12 lg:mt-16">
            <ValueFunnel />
          </Reveal>
        </section>

        <PerformanceScroll />

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
