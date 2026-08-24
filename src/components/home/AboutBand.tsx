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

  const aboutIn = reduced ? 1 : smooth(progress / 0.48);
  const aiaIn = reduced ? 1 : smooth((progress - 0.06) / 0.48);
  const copyIn = reduced ? 1 : smooth((progress - 0.18) / 0.42);

  return (
    <section aria-labelledby="about-heading" className="bg-white">
      <div ref={track} className="relative h-[220vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#BBC6CE]">
          <h2 id="about-heading" className="sr-only">
            About AIA Engineering
          </h2>

          <div
            className="absolute left-1/2 top-1/2 overflow-hidden bg-[#BBC6CE] will-change-[width,height,border-radius]"
            style={{
              width: `${widthVw}vw`,
              height,
              transform: "translate(-50%, -50%)",
              borderRadius: `${radius}px`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.aboutFacility}
              alt=""
              className="absolute inset-0 h-full w-full scale-[1.22] object-cover"
            />
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full scale-[1.22] object-cover"
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
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,20,0.28)_0%,transparent_42%,rgba(8,16,22,0.72)_100%)]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            aria-hidden
          >
            <div className="absolute left-1/2 top-[46%] flex -translate-x-1/2 -translate-y-1/2 items-baseline justify-center whitespace-nowrap">
              <span
                className="display text-[clamp(1.55rem,5.2vw,5.25rem)] font-extrabold leading-none tracking-normal text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
                style={{
                  opacity: aboutIn,
                  transform: `translate3d(${(1 - aboutIn) * -80}vw, 0, 0)`,
                }}
              >
                About
              </span>
              <span
                className="display text-[clamp(1.55rem,5.2vw,5.25rem)] font-extrabold leading-none tracking-normal text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
                style={{
                  opacity: aiaIn,
                  transform: `translate3d(${(1 - aiaIn) * 80}vw, 0, 0)`,
                  paddingLeft: "0.35em",
                }}
              >
                AIA Engineering
              </span>
            </div>
          </div>

          <div
            className="about-outro absolute inset-x-0 bottom-0 z-20 px-[max(1.5rem,8vw)] pb-[max(1.75rem,7vh)] pt-16 text-center"
            style={{
              opacity: copyIn,
              filter: `blur(${(1 - copyIn) * 8}px)`,
              transform: `translate3d(0, ${(1 - copyIn) * 24}px, 0)`,
            }}
          >
            <p className="about-copy">
              <span>
                Across mining, cement, quarry and thermal power, we design and
                manufacture wear solutions for grinding and other
              </span>
              <span>
                demanding applications. Our expertise in metallurgy, engineering
                and manufacturing helps extend component life, improve
              </span>
              <span>
                equipment reliability and support better operating performance.
              </span>
            </p>
            <Link
              href="/company/about"
              className="about-cta"
              tabIndex={copyIn < 0.45 ? -1 : 0}
            >
              <span className="about-cta-dot" aria-hidden />
              Discover AIA
            </Link>
          </div>
        </div>
      </div>

      <div className="about-footprint-band">
        <div className="page-pad page-max">
          <div className="about-footprint">
            {footprint.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 70}
                className="about-footprint-item"
              >
                <p className="about-footprint-value">
                  <CountUp value={item.value} duration={1500} />
                </p>
                <p className="about-footprint-label">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
