"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { useReducedMotion } from "@/lib/motion";

type IndustryPanel = {
  id: string;
  index: string;
  name: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  alt: string;
  thumbs: readonly { src: string; alt: string }[];
};

const panels: IndustryPanel[] = [
  {
    id: "mining",
    index: "01",
    name: "Mining",
    description: "Wear solutions engineered for critical grinding applications.",
    href: "/solutions/mining",
    cta: "Explore Mining",
    image: "/images/MINING.jpg",
    alt: "Excavator loading a haul truck at a mining site",
    thumbs: [
      { src: "/images/CEMENT.jpg", alt: "Cement plant" },
      { src: "/images/QUARRY.jpg", alt: "Quarry conveyor" },
      { src: "/images/Thermal.jpg", alt: "Thermal power plant" },
    ],
  },
  {
    id: "cement",
    index: "02",
    name: "Cement",
    description: "Wear solutions for demanding grinding applications.",
    href: "/solutions/cement",
    cta: "Explore Cement",
    image: "/images/CEMENT.jpg",
    alt: "Aerial view of a cement manufacturing plant",
    thumbs: [
      { src: "/images/QUARRY.jpg", alt: "Quarry conveyor" },
      { src: "/images/Thermal.jpg", alt: "Thermal power plant" },
      { src: "/images/MINING.jpg", alt: "Mining site" },
    ],
  },
  {
    id: "quarry",
    index: "03",
    name: "Quarry",
    description: "Wear protection for crushing applications.",
    href: "/solutions/quarry",
    cta: "Explore Quarry",
    image: "/images/QUARRY.jpg",
    alt: "Conveyor depositing crushed rock at a quarry",
    thumbs: [
      { src: "/images/CEMENT.jpg", alt: "Cement plant" },
      { src: "/images/MINING.jpg", alt: "Mining site" },
      { src: "/images/Thermal.jpg", alt: "Thermal power plant" },
    ],
  },
  {
    id: "thermal",
    index: "04",
    name: "Thermal",
    description: "Wear solutions for demanding coal grinding applications.",
    href: "/solutions/thermal-power",
    cta: "Explore Thermal",
    image: "/images/Thermal.jpg",
    alt: "Thermal power plant with cooling towers and chimney",
    thumbs: [
      { src: "/images/MINING.jpg", alt: "Mining site" },
      { src: "/images/CEMENT.jpg", alt: "Cement plant" },
      { src: "/images/QUARRY.jpg", alt: "Quarry conveyor" },
    ],
  },
];

const COUNT = panels.length;
const SEGMENTS = Math.max(1, COUNT - 1);

type PinMode = "before" | "fixed" | "after";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function imageOffsetY(index: number, progress: number) {
  if (index === 0) return 0;
  const start = (index - 1) / SEGMENTS;
  const end = index / SEGMENTS;
  if (progress <= start) return 100;
  if (progress >= end) return 0;
  return 100 * (1 - (progress - start) / (end - start));
}

function activeFromProgress(progress: number) {
  return Math.min(COUNT - 1, Math.max(0, Math.round(progress * SEGMENTS)));
}

function IndustryCopy({
  panel,
  active,
}: {
  panel: IndustryPanel;
  active: boolean;
}) {
  return (
    <div
      className={`industry-band-copy-layer${active ? " is-active" : ""}`}
      aria-hidden={!active}
    >
      {/* Above the shared line: index left, description right */}
      <div className="industry-band-above">
        <p className="industry-band-index">{panel.index}</p>
        <p className="industry-band-copy">{panel.description}</p>
      </div>

      {/* Below the shared line: title left, CTA right */}
      <div className="industry-band-below">
        <h2 className="industry-band-title">{panel.name}</h2>
        <div className="industry-band-aside">
          <CtaButton
            href={panel.href}
            variant="solid"
            className="industry-band-cta"
          >
            {panel.cta}
          </CtaButton>
        </div>
      </div>

      <ul className="industry-band-thumbs">
        {panel.thumbs.map((thumb) => (
          <li key={thumb.src} className="industry-band-thumb">
            <Image
              src={thumb.src}
              alt=""
              fill
              sizes="180px"
              className="object-cover object-center"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndustryBandFrame({
  children,
  media,
}: {
  children: ReactNode;
  media: ReactNode;
}) {
  return (
    <>
      {media}
      <div className="industry-band-inner">
        <div className="industry-band-frame">
          <div className="industry-band-rule" aria-hidden />
          {children}
        </div>
      </div>
    </>
  );
}

function IndustryBandStatic() {
  return (
    <section
      id="solutions"
      className="industry-bands is-static"
      aria-label="Solutions by industry"
    >
      {panels.map((panel, i) => (
        <article key={panel.id} className="industry-band-static" id={panel.id}>
          <IndustryBandFrame
            media={
              <div className="industry-band-media" aria-hidden>
                <Image
                  src={panel.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                  quality={90}
                />
                <div className="industry-band-scrim" />
              </div>
            }
          >
            <div className="industry-band-copy-stack">
              <IndustryCopy panel={panel} active />
            </div>
          </IndustryBandFrame>
        </article>
      ))}
    </section>
  );
}

function IndustryBandPinned() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinMode, setPinMode] = useState<PinMode>("before");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = track.offsetHeight - vh;

      if (rect.top > 0) {
        setPinMode("before");
        setProgress(0);
        return;
      }
      if (rect.bottom <= vh) {
        setPinMode("after");
        setProgress(1);
        return;
      }

      setPinMode("fixed");
      setProgress(range <= 0 ? 0 : clamp01(-rect.top / range));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const activeIndex = activeFromProgress(progress);
  const active = panels[activeIndex] ?? panels[0];
  const stageClass =
    pinMode === "fixed"
      ? "industry-band-stage is-fixed"
      : pinMode === "after"
        ? "industry-band-stage is-after"
        : "industry-band-stage is-before";

  return (
    <section
      ref={trackRef}
      id="solutions"
      className="industry-bands is-pinned"
      aria-label="Solutions by industry"
      style={{ height: `${COUNT * 100}vh` }}
    >
      {panels.map((panel, i) => (
        <span
          key={`anchor-${panel.id}`}
          id={panel.id}
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `${(i / COUNT) * 100}%` }}
        />
      ))}

      <div className={stageClass}>
        <IndustryBandFrame
          media={
            <div className="industry-band-media-stack" aria-hidden>
              {panels.map((panel, i) => {
                const y = imageOffsetY(i, progress);
                return (
                  <div
                    key={panel.id}
                    className="industry-band-slide"
                    style={{
                      zIndex: i + 1,
                      transform: `translate3d(0, ${y}%, 0)`,
                    }}
                  >
                    <Image
                      src={panel.image}
                      alt=""
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="object-cover object-center"
                      quality={90}
                    />
                    <div className="industry-band-scrim" />
                  </div>
                );
              })}
            </div>
          }
        >
          <div className="industry-band-copy-stack" aria-live="polite">
            {panels.map((panel, i) => (
              <IndustryCopy
                key={panel.id}
                panel={panel}
                active={i === activeIndex}
              />
            ))}
          </div>
        </IndustryBandFrame>

        <p className="sr-only">
          Viewing {active.name}: {active.description}
        </p>
      </div>
    </section>
  );
}

export function Industries() {
  const reduced = useReducedMotion();
  if (reduced) return <IndustryBandStatic />;
  return <IndustryBandPinned />;
}
