import Image from "next/image";

/** Clean portrait + CSS shards that follow the orange/blue accent token. */
export function Vision() {
  const shard = "bg-aia-orange";
  const quote = "text-aia-orange";
  const name = "text-aia-orange";

  return (
    <section
      className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-28"
      aria-labelledby="vision-heading"
    >
      <div className="page-pad mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 xl:gap-20">
        <div className="relative mx-auto w-full max-w-xl">
          <span
            aria-hidden
            className={`pointer-events-none absolute left-[-6%] top-[18%] h-[38%] w-[46%] ${shard}`}
            style={{ clipPath: "polygon(0 22%, 100% 0, 100% 78%, 0 100%)" }}
          />
          <span
            aria-hidden
            className={`pointer-events-none absolute right-[8%] top-[-4%] h-[34%] w-[22%] ${shard}`}
            style={{ clipPath: "polygon(20% 0, 100% 18%, 80% 100%, 0 70%)" }}
          />
          <span
            aria-hidden
            className={`pointer-events-none absolute right-[-4%] top-[36%] h-[28%] w-[24%] ${shard}`}
            style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 12% 86%)" }}
          />

          <div className="relative z-10 aspect-[5/4] overflow-hidden">
            <Image
              src="/images/vision-portrait-clean.png"
              alt="Mr. Bhadresh Kantilal Shah, Managing Director"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-contain object-[center_12%]"
              quality={92}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-white via-white/80 to-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <span
            aria-hidden
            className={`pointer-events-none absolute -right-1 -top-8 select-none font-[family-name:var(--font-serif)] text-[5.5rem] leading-none sm:-top-12 sm:text-[8rem] ${quote}`}
          >
            ”
          </span>
          <h2
            id="vision-heading"
            className="display relative mb-8 max-w-[12ch] text-[clamp(1.85rem,4.8vw,3.875rem)] text-aia-navy"
          >
            A vision that continues to guide us.
          </h2>
          <p className="mb-8 max-w-xl text-base italic leading-relaxed text-aia-navy/60 sm:text-lg md:text-[1.2rem] md:leading-[1.7]">
            Customer Excellence is our philosophy. Our focus remains on
            improving productivity while reducing environmental impact. We promise
            to deliver value through ethical, sustainable, and profitable means.
          </p>
          <p
            className={`text-sm font-semibold uppercase tracking-[0.08em] sm:text-base ${name}`}
          >
            · Mr. Bhadresh Kantilal Shah
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.08em] text-aia-muted sm:text-sm">
            (Managing Director – AIA Engineering)
          </p>
        </div>
      </div>
    </section>
  );
}
