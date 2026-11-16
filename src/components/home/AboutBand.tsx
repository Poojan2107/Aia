"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { homeOnly } from "@/lib/env";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footprint } from "@/data/site";
import { media } from "@/data/media";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientFilm } from "@/components/ui/AmbientFilm";
import { href } from "@/lib/routes";
import { useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * About band. The film starts large and centred. Scroll zooms it until it
 * fills the screen, while "About" and "AIA Engineering" meet in the centre.
 * The description and About AIA Engineering stay visible.
 */
export function AboutBand() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const plate = plateRef.current;
    const title = titleRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const shade = shadeRef.current;
    if (!track || !stage || !plate || !title || !left || !right || !copy || !cta || !shade || reduced) return;

    // One normal space, measured from the heading's own font.
    const space = () => {
      const probe = document.createElement("span");
      const style = getComputedStyle(title);
      probe.textContent = " ";
      probe.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${style.font};letter-spacing:${style.letterSpacing}`;
      document.body.appendChild(probe);
      const width = probe.offsetWidth;
      probe.remove();
      return Math.max(width, 1);
    };
    // Centre the whole phrase, so both sides of the screen keep the same space.
    const place = () => {
      const gap = space();
      const start = (title.offsetWidth - (left.offsetWidth + gap + right.offsetWidth)) / 2;
      return {
        left: start - left.offsetLeft,
        right: start + left.offsetWidth + gap - right.offsetLeft,
      };
    };
    const cover = () => {
      const width = plate.offsetWidth;
      const height = plate.offsetHeight;
      if (width < 8 || height < 8) return 1;
      return Math.max(stage.offsetWidth / width, stage.offsetHeight / height) * 1.03;
    };
    const sink = () => cta.offsetTop - 16 - copy.offsetHeight - copy.offsetTop;

    const tween = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
    });

    gsap.set(plate, { scale: 1, transformOrigin: "center center", force3D: true });
    gsap.set([left, right], { x: 0, autoAlpha: 1, force3D: true });
    // Phones and short screens (e.g. a phone held sideways): the copy waits above the CTA and
    // fades in once the film covers the screen. Keep in sync with the CSS (.about2-copy, .about2-shade).
    const phone = window.matchMedia("(max-width: 767px), (max-height: 560px)").matches;
    tween.to(plate, { scale: cover, duration: 1 }, 0);
    tween.to(left, { x: () => place().left, duration: 0.85 }, 0);
    tween.to(right, { x: () => place().right, duration: 0.85 }, 0);
    if (phone) {
      // The copy grows upward from above the CTA; on narrow or short phones it would reach the
      // title, so the title rises to sit clear above it (never above the header, never down).
      const HEADER = 72;
      const words = () => {
        const r = left.getBoundingClientRect();
        const y = gsap.getProperty(title, "y") as number;
        return { top: r.top - y, bottom: r.bottom - y };
      };
      // Show the copy only where it fits between the header and the CTA with the title above it.
      copy.style.display = "";
      const fits = () => copy.getBoundingClientRect().top - 20 - (words().bottom - words().top) >= HEADER;
      if (!fits()) copy.style.display = "none";
      const lift = () => {
        if (copy.style.display === "none") return 0;
        const w = words();
        return Math.max(HEADER - w.top, Math.min(0, copy.getBoundingClientRect().top - 20 - w.bottom));
      };
      gsap.set(copy, { y: 0, autoAlpha: 0 });
      gsap.set(title, { y: 0 });
      gsap.set(shade, { autoAlpha: 0 });
      tween.to(title, { y: lift, duration: 0.3 }, 0.55);
      // The film is scaled ~3x to cover a phone, so its own scrim falls off-screen: a screen-fixed
      // shade keeps white copy readable over the bright pour.
      tween.to(shade, { autoAlpha: 1, duration: 0.3 }, 0.6);
      tween.to(copy, { autoAlpha: 1, duration: 0.3 }, 0.65);
    } else {
      gsap.set(copy, { y: 0, autoAlpha: 1 });
      gsap.set(shade, { autoAlpha: 0 });
      tween.to(copy, { y: sink, duration: 1 }, 0);
      // Light shade at the bottom as the film fills the screen, so the copy stays readable over
      // the bright pour.
      tween.to(shade, { autoAlpha: 1, duration: 0.4 }, 0.5);
    }

    // Keep video scaled up and text in center on reverse scroll (never shrink or reverse)
    let maxProgress = 0;

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Forward scroll: advance the zoom and text convergence smoothly with user scroll
        if (self.direction === 1 && self.progress > maxProgress) {
          maxProgress = self.progress;
          gsap.to(tween, {
            progress: maxProgress,
            duration: 0.1,
            ease: "none",
            overwrite: "auto",
          });
        } else if (self.direction === -1) {
          // Reverse scroll: do not apply any reverse effect!
          // Keep the video scaled up and the text centered
          if (maxProgress > 0.3) {
            maxProgress = 1;
            tween.progress(1);
          } else {
            tween.progress(maxProgress);
          }
        }
      },
    });

    ScrollTrigger.refresh();
    return () => {
      st.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section aria-labelledby="about-heading" className="bg-white">
      <div ref={trackRef} className="about2-track">
        <div ref={stageRef} className="about2">
          <div className="about2-frame">
            <div ref={plateRef} className="about2-plate">
              <AmbientFilm
                src={media.about}
                poster="/images/what-we-solve-poster.webp"
                // Grows to full screen on scroll, so it needs the full-width image (same as "100vw";
                // this form avoids Next's dev check, which measures it before it has grown).
                sizes="(min-width: 1px) 100vw"
                coverBleed
              />
              <div aria-hidden className="about2-scrim" />
            </div>
            <h2 id="about-heading" ref={titleRef} className="about2-title" data-no-split="">
              <span ref={leftRef} className="about2-word about2-word-left ft ft-h72x">About</span>
              <span ref={rightRef} className="about2-word about2-word-right ft ft-h72x">AIA Engineering</span>
            </h2>
          </div>
          <div ref={shadeRef} aria-hidden className="about2-shade" />
          <p ref={copyRef} className="about2-copy ft ft-copy18">
            AIA Engineering Limited develops and manufactures engineered wear-resistant solutions for mining, cement, quarry and thermal power industries. With expertise in advanced metallurgy, grinding media, mill liners and precision manufacturing, we help industrial customers address demanding wear conditions and support long-term equipment performance.
          </p>
          <Link prefetch={homeOnly ? false : undefined} ref={ctaRef} href={href("about")} className="about2-cta">
            <span aria-hidden className="about2-cta-dot" />
            <span className="ft ft-cta">About AIA Engineering</span>
          </Link>
        </div>
      </div>

      <div className="about-footprint-band">
        <div className="w-full">
          <div className="about-footprint">
            {footprint.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 70}
                className="about-footprint-item"
              >
                <p className="about-footprint-value ft ft-stat">
                  <CountUp value={item.value} duration={1500} />
                </p>
                <p className="about-footprint-label ft ft-label32">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
