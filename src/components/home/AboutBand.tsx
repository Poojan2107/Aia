"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { footprint } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";
import { media } from "@/data/media";

/**
 * About band — Figma "AIA Signature Blue" / 01Homepage: a 16:9 plant plate
 * centred on the grey-blue field, "About" and "AIA Engineering" set across
 * it with an ambient facility video, the intro copy, Discover AIA CTA,
 * and the six-figure footprint row.
 */
export function AboutBand() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.muted = true;
      void video.play().then(() => setReady(true)).catch(() => undefined);
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <section aria-labelledby="about-heading" className="bg-white">
      <div className="about2">
        <div className="about2-plate relative overflow-hidden">
          <Image
            src="/images/plant-aerial-clean.jpg"
            alt="AIA manufacturing and operations facility from above"
            fill
            sizes="(max-width: 1024px) 92vw, 63vw"
            className={`object-cover transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            src={media.about}
            poster="/images/plant-aerial-clean.jpg"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
            onPlaying={() => setReady(true)}
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="about2-scrim relative z-[1]" />
          <p className="about2-copy relative z-[2]">
            Across mining, cement, quarry and thermal power, we design and manufacture wear solutions for grinding and other demanding applications. Our expertise in metallurgy, engineering and manufacturing helps extend component life, improve equipment reliability and support better operating performance.
          </p>
        </div>
        <h2 id="about-heading" className="about2-title z-[3]">
          <span className="about2-word-left">About</span>
          <span className="about2-word-right">AIA Engineering</span>
        </h2>
        <Link href={href("about")} className="about2-cta z-[3]">
          <span aria-hidden className="about2-cta-dot" />
          Discover AIA
        </Link>
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
