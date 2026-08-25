"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useTheme } from "@/components/theme/ThemeProvider";
import { prefersReducedMotion } from "@/lib/motion";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smooth(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function useEnterProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }

    const update = () => {
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 1.05;
      const end = window.innerHeight * 0.12;
      setProgress(clamp01((start - rect.top) / (start - end)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

export function Vision() {
  const { theme } = useTheme();
  const plate = useRef<HTMLDivElement>(null);
  const progress = useEnterProgress(plate);
  const rise = smooth(clamp01((progress - 0.08) / 0.7));
  const plateSrc =
    theme === "orange"
      ? "/images/vision-figma.png"
      : "/images/vision-plate-hq-white.webp";

  return (
    <section
      className="relative overflow-hidden bg-white py-[var(--section-y)]"
      aria-labelledby="vision-heading"
    >
      <div className="page-pad page-max grid items-center gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:gap-8 xl:gap-10">
        <div ref={plate} className="vision-plate relative w-full">
          <div className="vision-plate-stage relative aspect-[3624/2288] overflow-hidden bg-white">
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                opacity: rise,
                transform: `translate3d(0, ${(1 - rise) * 12}%, 0)`,
              }}
            >
              <Image
                key={plateSrc}
                src={plateSrc}
                alt="Mr. Bhadresh Kantilal Shah, Managing Director"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain object-left"
                quality={95}
                priority
              />
            </div>
          </div>
        </div>

        <Reveal delay={120} className="vision-copy relative lg:max-w-[34rem] lg:pl-1">
          <QuoteMark />
          <h2 id="vision-heading" className="vision-heading">
            A vision that
            <br />
            <span className="vision-heading-line">continues to guide us.</span>
          </h2>
          <p className="vision-body">
            Customer Excellence is our philosophy. Our focus remains on
            improving productivity while reducing environmental impact. We
            promise to deliver value through ethical, sustainable, and
            profitable means.
          </p>
          <div className="vision-attr">
            <div className="vision-attr-name">
              <span aria-hidden className="vision-attr-dot" />
              <p>MR. BHADRESH KANTILAL SHAH</p>
            </div>
            <p className="vision-attr-role">
              (MANAGING DIRECTOR - AIA ENGINEERING)
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <Image
      src="/images/vision-quote-v2.png"
      alt=""
      aria-hidden
      width={223}
      height={163}
      className="vision-quote"
      priority={false}
    />
  );
}
