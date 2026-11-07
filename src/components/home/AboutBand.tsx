"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const plate = plateRef.current;
    const title = titleRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    if (!track || !stage || !plate || !title || !left || !right || !copy || !cta || reduced) return;

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
    // Phones: the copy waits above the CTA and fades in once the film covers the screen.
    const phone = window.matchMedia("(max-width: 767px)").matches;
    tween.to(plate, { scale: cover, duration: 1 }, 0);
    tween.to(left, { x: () => place().left, duration: 0.85 }, 0);
    tween.to(right, { x: () => place().right, duration: 0.85 }, 0);
    if (phone) {
      gsap.set(copy, { y: 0, autoAlpha: 0 });
      tween.to(copy, { autoAlpha: 1, duration: 0.3 }, 0.65);
    } else {
      gsap.set(copy, { y: 0, autoAlpha: 1 });
      tween.to(copy, { y: sink, duration: 1 }, 0);
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
                poster="/images/plant-aerial-clean.jpg"
                sizes="100vw"
                coverBleed
              />
              <div aria-hidden className="about2-scrim" />
            </div>
            <h2 id="about-heading" ref={titleRef} className="about2-title" data-no-split="">
              <span ref={leftRef} className="about2-word about2-word-left ft ft-h72x">About</span>
              <span ref={rightRef} className="about2-word about2-word-right ft ft-h72x">AIA Engineering</span>
            </h2>
          </div>
          <p ref={copyRef} className="about2-copy ft ft-copy18">
            Across mining, cement, quarry and thermal power, we design and manufacture wear solutions for grinding and other demanding applications. Our expertise in metallurgy, engineering and manufacturing helps extend component life, improve equipment reliability and support better operating performance.
          </p>
          <Link ref={ctaRef} href={href("about")} className="about2-cta">
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
