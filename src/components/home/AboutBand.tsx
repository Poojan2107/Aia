import Image from "next/image";
import Link from "next/link";
import { footprint } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { href } from "@/lib/routes";

/**
 * About band — Figma "AIA Signature Blue" / 01Homepage: a 16:9 plant plate
 * centred on the grey-blue field, "About" and "AIA Engineering" set across
 * it, the intro copy and Discover AIA, then the six-figure footprint row.
 */
export function AboutBand() {
  return (
    <section aria-labelledby="about-heading" className="bg-white">
      <div className="about2">
        <div className="about2-plate">
          <Image src="/images/plant-aerial-clean.jpg" alt="AIA manufacturing and operations facility from above" fill sizes="(max-width: 1024px) 92vw, 63vw" className="object-cover" data-parallax="12" />
          <div aria-hidden className="about2-scrim" />
          <p className="about2-copy">
            Across mining, cement, quarry and thermal power, we design and manufacture wear solutions for grinding and other demanding applications. Our expertise in metallurgy, engineering and manufacturing helps extend component life, improve equipment reliability and support better operating performance.
          </p>
        </div>
        <h2 id="about-heading" className="about2-title">
          <span className="about2-word-left">About</span>
          <span className="about2-word-right">AIA Engineering</span>
        </h2>
        <Link href={href("about")} className="about2-cta">
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
