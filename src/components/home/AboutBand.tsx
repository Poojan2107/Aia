"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { footprint } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { media } from "@/data/media";
import { assets } from "@/data/assets";
import { prefersReducedMotion, useScrollProgress } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smooth(t: number) {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * 16:9 plate expands to the viewport. Titles stay on the film:
 * About from the left, AIA Engineering from the right.
 */
export function AboutBand() {
  const track = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useScrollProgress(track);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, []);

  const ease = reduced ? 1 : smooth(progress);
  const widthVw = 78 + ease * 22;
  const height = `calc(${78 * (9 / 16)}vw + ${ease} * (100svh - ${78 * (9 / 16)}vw))`;
  const radius = 12 * (1 - ease) * (1 - ease);

  const aboutIn = reduced ? 1 : smooth(progress / 0.4);
  const aiaIn = reduced ? 1 : smooth((progress - 0.05) / 0.42);
  const copyIn = reduced ? 1 : smooth((progress - 0.12) / 0.4);

  return (
    <section aria-labelledby="about-heading" className="bg-[var(--aia-about)]">
      <div ref={track} className="relative h-[220vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <h2 id="about-heading" className="sr-only">
            About AIA Engineering
          </h2>

          <div
            className="absolute left-1/2 top-1/2 overflow-hidden bg-[#1c2428] will-change-[width,height,border-radius]"
            style={{
              width: `${widthVw}vw`,
              height,
              transform: "translate(-50%, -50%)",
              borderRadius: `${radius}px`,
              boxShadow: `0 28px 90px rgba(4, 29, 44, ${0.28 * (1 - ease)})`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.aboutFacility}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={media.about}
              poster={assets.aboutFacility}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,20,0.22)_0%,transparent_42%,rgba(8,16,22,0.7)_100%)]"
            />
          </div>

          <p
            aria-hidden
            className="pointer-events-none absolute left-[max(1.5rem,7vw)] top-1/2 z-20 hidden display text-[clamp(2.75rem,6.4vw,6.25rem)] font-extrabold leading-none tracking-tight text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.35)] lg:block"
            style={{
              opacity: 0.2 + aboutIn * 0.8,
              filter: `blur(${(1 - aboutIn) * 14}px)`,
              transform: `translate3d(${(1 - aboutIn) * -28}vw, -50%, 0)`,
            }}
          >
            About
          </p>
          <p
            aria-hidden
            className="pointer-events-none absolute right-[max(1.5rem,7vw)] top-1/2 z-20 hidden text-right display text-[clamp(2.75rem,6.4vw,6.25rem)] font-extrabold leading-none tracking-tight text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.35)] lg:block"
            style={{
              opacity: 0.2 + aiaIn * 0.8,
              filter: `blur(${(1 - aiaIn) * 14}px)`,
              transform: `translate3d(${(1 - aiaIn) * 32}vw, -50%, 0)`,
            }}
          >
            AIA
            <br />
            Engineering
          </p>

          <p
            className="pointer-events-none absolute left-1/2 top-[11%] z-20 w-[90%] text-center display text-[clamp(2rem,8vw,2.75rem)] font-extrabold leading-none tracking-tight text-white lg:hidden"
            style={{
              opacity: 0.2 + aboutIn * 0.8,
              filter: `blur(${(1 - aboutIn) * 10}px)`,
              transform: `translate3d(-50%, ${(1 - aboutIn) * -24}px, 0)`,
            }}
          >
            About AIA Engineering
          </p>

          <div
            className="absolute inset-x-0 bottom-0 z-20 px-[max(1.5rem,8vw)] pb-[max(1.75rem,7vh)] pt-16 text-center"
            style={{
              opacity: copyIn,
              filter: `blur(${(1 - copyIn) * 8}px)`,
              transform: `translate3d(0, ${(1 - copyIn) * 24}px, 0)`,
            }}
          >
            <p className="mx-auto max-w-[50rem] font-[family-name:var(--font-haas)] text-[0.875rem] font-normal leading-[1.6] text-white sm:text-[1rem] md:text-[1.125rem]">
              Across mining, cement, quarry and thermal power, we design and
              manufacture wear solutions for grinding and other demanding
              applications. Our expertise in metallurgy, engineering and
              manufacturing helps extend component life, improve equipment
              reliability and support better operating performance.
            </p>
            <Link
              href="/company/about"
              className="ui-caps mt-6 inline-flex h-[46px] items-center gap-2.5 rounded-full border border-white/70 bg-white/10 px-7 text-[0.875rem] text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-aia-navy"
              tabIndex={copyIn < 0.45 ? -1 : 0}
            >
              <span className="size-2 rounded-full bg-white" aria-hidden />
              Discover AIA
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="page-pad page-max grid grid-cols-2 divide-x divide-aia-line border-y border-aia-line md:grid-cols-3 lg:grid-cols-6">
          {footprint.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 70}
              className="flex flex-col items-center justify-center px-3 py-10 text-center sm:py-14 lg:py-16"
            >
              <p className="display text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold text-aia-orange">
                <CountUp value={item.value} duration={1500} />
              </p>
              <p className="mt-2 max-w-[14ch] text-[0.9rem] leading-snug text-aia-navy/55 sm:text-[1rem]">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
