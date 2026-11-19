"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/data/content";

const COPIES = 4;

/** Homepage case studies carousel; other pages reuse it with their own heading (two lines). */
export function CaseStudies({
  heading = ["When the challenge is real,", "performance has to be proven."],
  tone = "bg-white",
}: { heading?: [string, string]; tone?: string } = {}) {
  const count = caseStudies.length;
  const strip = Array.from({ length: COPIES }, () => [...caseStudies]).flat();
  const [index, setIndex] = useState(count + (count - 1));
  const [x, setX] = useState(0);
  const [motion, setMotion] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  const offset = (index + 1) % count;
  const ordered = [...caseStudies.slice(offset), ...caseStudies.slice(0, offset)];

  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const isDraggingRef = useRef(false);

  const place = (value: number) => {
    const row = rowRef.current;
    const card = row?.querySelector<HTMLElement>(".cases-card");
    const stage = row?.parentElement;
    if (!row || !card || !stage) return 0;
    const gap = Number.parseFloat(getComputedStyle(row).gap) || 0;
    const width = card.offsetWidth;
    const group = width * 3 + gap * 2;
    const firstLeft = (stage.clientWidth - group) / 2;
    return firstLeft - (value + 1) * (width + gap);
  };

  useLayoutEffect(() => {
    setX(place(index));
  }, [index]);

  useEffect(() => {
    if (motion) return;
    const id = requestAnimationFrame(() => setMotion(true));
    return () => cancelAnimationFrame(id);
  }, [motion, index]);

  useEffect(() => {
    const onResize = () => setX(place(indexRef.current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const shift = (dir: number) => {
    setMotion(true);
    setIndex((value) => value + dir);
  };

  const settle = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    const value = indexRef.current;
    if (value >= count * 2 || value < count) {
      setMotion(false);
      setIndex(value >= count * 2 ? value - count : value + count);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    isDraggingRef.current = false;
    setDragDelta(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    const dy = dragStartY.current !== null ? e.clientY - dragStartY.current : 0;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      isDraggingRef.current = true;
      setDragDelta(dx * 0.7);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      const dx = e.clientX - dragStartX.current;
      dragStartX.current = null;
      dragStartY.current = null;
      setDragDelta(0);
      if (Math.abs(dx) > 40) {
        shift(dx > 0 ? -1 : 1);
      }
    }
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const onPointerCancel = () => {
    dragStartX.current = null;
    dragStartY.current = null;
    setDragDelta(0);
    isDraggingRef.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
  };

  const activeNum = ((index % count) + count) % count + 1;

  return (
    <section
      className={`${tone} py-[var(--section-y)]`}
      aria-labelledby="cases-heading"
    >
      <div className="page-pad page-max mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
        <Reveal>
          <h2
            id="cases-heading"
            className="display ft ft-h62t text-aia-navy"
          >
            <span className="block lg:whitespace-nowrap">{heading[0]}</span>
            <span className="block lg:whitespace-nowrap">{heading[1]}</span>
          </h2>
        </Reveal>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <CtaButton
            href="/knowledge-hub/case-studies"
            variant="solid"
            className="!h-9 !gap-2 !px-5 !text-[11px] !leading-none [&>span:first-child]:!size-1.5"
          >
            Explore case study
          </CtaButton>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-wider text-aia-muted/70 select-none">
              0{activeNum} / 0{count}
            </span>
            <div className="flex gap-2">
              <NavArrow
                label="Previous case studies"
                reverse
                onClick={() => shift(-1)}
              />
              <NavArrow
                label="Next case studies"
                onClick={() => shift(1)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cases-grid page-pad page-max grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {ordered.map((item) => (
          <CaseCard key={item.href} item={item} onCardClick={handleCardClick} />
        ))}
      </div>

      <div
        className="cases-stage select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          ref={rowRef}
          className={`cases-row${motion && dragDelta === 0 ? "" : " is-instant"}`}
          style={{ transform: `translate3d(${x + dragDelta}px, 0, 0)` }}
          onTransitionEnd={settle}
        >
          {strip.map((item, position) => (
            <CaseCard
              key={`${item.href}-${position}`}
              item={item}
              featured={position === index + 2}
              peek={position === index ? "left" : position === index + 4 ? "right" : undefined}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({
  item,
  featured = false,
  peek,
  onCardClick,
}: {
  item: (typeof caseStudies)[number];
  featured?: boolean;
  peek?: "left" | "right";
  onCardClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={item.href}
      onClick={onCardClick}
      className={`cases-card group block min-w-0 transition-transform duration-500 hover:-translate-y-1.5${featured ? " is-focus" : ""}${peek ? ` is-peek is-peek-${peek}` : ""}`}
      aria-hidden={peek ? true : undefined}
      tabIndex={peek ? -1 : undefined}
    >
      <div className="cases-media relative mb-5 aspect-[532/395] w-full overflow-hidden rounded-[1.25rem] bg-[#e8eaec] shadow-sm transition-all duration-500 group-hover:shadow-md">
        <Image
          src={item.image}
          alt={peek ? "" : item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 532px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="cases-more absolute inset-0 flex items-center justify-center gap-3 bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
          <span className="ft ft-read22 underline underline-offset-4">Read Case Study</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-aia-accent text-base text-white transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
      <h3 className="ft ft-h30 mb-2 text-aia-navy transition-colors duration-200 group-hover:text-aia-accent">
        {item.title}
      </h3>
      <p className="ft ft-meta22 text-aia-muted">{item.meta}</p>
    </a>
  );
}

function NavArrow({
  label,
  onClick,
  reverse = false,
}: {
  label: string;
  onClick: () => void;
  reverse?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="group size-8 text-[#c5c8cc] transition-all duration-300 hover:scale-110 active:scale-95 hover:text-[var(--aia-accent)]"
    >
      <svg
        className={`size-8 transition-transform duration-300 ${reverse ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="20"
          cy="20"
          r="19.4"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M17.5459 15.5459C17.5999 15.4919 17.7034 15.4764 17.7881 15.5518L22.4473 20.2109C22.5236 20.2958 22.5083 20.3999 22.4541 20.4541V20.4551L17.793 25.1318C17.7076 25.2121 17.601 25.1974 17.5459 25.1426C17.5189 25.1156 17.5001 25.0741 17.5 25.0244C17.5 24.9745 17.5189 24.9323 17.5459 24.9053L22.1074 20.3438L17.5518 15.7881C17.4764 15.7034 17.4919 15.5999 17.5459 15.5459Z"
          stroke="currentColor"
          strokeWidth="1.4"
          transform="translate(20 20) scale(1.45) translate(-20 -20)"
        />
      </svg>
    </button>
  );
}
