import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Leadership — 1:1 match with Figma / Presentation slide design:
 * AIA's Managing Director (Mr. Bhadresh Kantilal Shah) & Vega's CEO (Mr. Sumit Mitra),
 * each featuring high-resolution cut-out portraits, exact 1:1 architectural blue shards,
 * soft cloud/mist bottom fade, brand mark, quotation watermark, and branded attributions.
 */

type Leader = {
  id: string;
  name: string;
  role: string;
  heading: [string, string];
  quote: string;
  portrait: { src: string; width: number; height: number };
  brand: { src: string; alt: string; width: number; height: number; className: string };
  accentColor: string;
  flip: boolean;
};

const leaders: Leader[] = [
  {
    id: "aia",
    name: "MR. BHADRESH KANTILAL SHAH",
    role: "(MANAGING DIRECTOR - AIA ENGINEERING)",
    heading: ["A vision that", "continues to guide us."],
    quote:
      "Customer Excellence is our philosophy. Our focus remains on improving productivity while reducing environmental impact. We promise to deliver value through ethical, sustainable, and profitable means.",
    portrait: { src: "/images/ceo/bhadresh-shah.webp", width: 1100, height: 1380 },
    brand: { src: "/images/design/logo-aia-mark-blue.webp", alt: "AIA Engineering", width: 899, height: 764, className: "lead-brand-aia" },
    accentColor: "#006eff",
    flip: false,
  },
  {
    id: "vega",
    name: "MR. SUMIT MITRA",
    role: "(CEO - VEGA INDUSTRIES)",
    heading: ["Delivering excellence", "across borders."],
    quote:
      "At Vega Industries, we help customers worldwide maximise mill throughput, improve efficiency, and increase equipment uptime. Combining technical expertise with advanced manufacturing, we deliver tailored solutions and responsive local support that drive measurable value and long-term performance.",
    portrait: { src: "/images/ceo/sumit-mitra.webp", width: 1100, height: 1243 },
    brand: { src: "/images/design/logo-vega-color.webp", alt: "Vega Industries", width: 200, height: 145, className: "lead-brand-vega" },
    accentColor: "#006eff",
    flip: true,
  },
];

/**
 * Blue shards measured from the Figma (02Homepage frame 771:2487) against each
 * portrait, in plate units (0–100, square plate, portrait 72% wide and
 * bottom-centred). Corners that sit behind the portrait are placed inside its
 * silhouette. The long shard on each row keeps its Figma angles and runs far
 * past the plate; `.lead` clips it at the page edge, as in the design.
 */
const SHARDS: Record<string, string[]> = {
  aia: [
    "35.0,13.8 46.1,13.8 32.9,36.2",
    "88.0,20.3 62.8,40.2 79.9,47.1",
    "43.0,76.7 -160,9.3 -160,80.4",
  ],
  vega: [
    "58.8,15.2 68.7,15.2 70.8,36.1",
    "11.1,26.4 41.8,56.0 22.8,73.4",
    "53.3,75.4 260,6.5 260,79.7",
  ],
};

function LeaderRow({ leader }: { leader: Leader }) {
  const headingId = `lead-${leader.id}`;
  return (
    <ScrollReveal as="article" className={`lead-row ${leader.flip ? "is-flipped" : ""}`}>
      <div className="lead-plate" aria-hidden>
        <svg className="lead-shards" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {SHARDS[leader.id].map((points) => (
            <polygon key={points} points={points} />
          ))}
        </svg>
        <div className="lead-portrait lead-portrait-mask">
          <Image
            src={leader.portrait.src}
            alt={leader.name}
            width={leader.portrait.width}
            height={leader.portrait.height}
            sizes="(max-width: 1024px) 85vw, 40vw"
            // Already-compact WebP: serve straight from the CDN (no first-hit resize wait).
            unoptimized
            decoding="async"
          />
        </div>
      </div>

      <div className="lead-copy" aria-labelledby={headingId}>
        <Image
          src="/images/vision-quote-v2.png"
          alt=""
          aria-hidden
          width={223}
          height={163}
          className="lead-quote-mark"
        />
        <Image
          src={leader.brand.src}
          alt={leader.brand.alt}
          width={leader.brand.width}
          height={leader.brand.height}
          className={`lead-brand ${leader.brand.className}`}
        />
        <h2 id={headingId} className="lead-heading ft ft-h62">
          {leader.heading[0]}
          <br />
          {leader.heading[1]}
        </h2>
        <blockquote className="lead-quote">
          <p className="ft ft-quote28">{leader.quote}</p>
        </blockquote>
        <p
          className="lead-name ft ft-name"
          style={{ color: leader.accentColor }}
        >
          <span
            aria-hidden
            className="lead-dot"
            style={{ backgroundColor: leader.accentColor }}
          />
          {leader.name}
        </p>
        <p className="lead-role ft ft-role">{leader.role}</p>
      </div>
    </ScrollReveal>
  );
}

export function Vision() {
  return (
    <section className="lead" aria-label="Leadership">
      {leaders.map((leader) => (
        <LeaderRow key={leader.id} leader={leader} />
      ))}
    </section>
  );
}
