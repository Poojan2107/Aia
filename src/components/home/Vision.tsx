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
    role: "(CEO - VEGA INDUSTRY)",
    heading: ["Delivering excellence", "across borders."],
    quote:
      "At Vega Industries, we help customers worldwide maximise mill throughput, improve efficiency, and increase equipment uptime. Combining technical expertise with advanced manufacturing, we deliver tailored solutions and responsive local support that drive measurable value and long-term performance.",
    portrait: { src: "/images/ceo/sumit-mitra.webp", width: 1100, height: 1243 },
    brand: { src: "/images/design/logo-vega-color.webp", alt: "Vega Industries", width: 200, height: 145, className: "lead-brand-vega" },
    accentColor: "#ea580c",
    flip: true,
  },
];

/**
 * Blue shards measured from the Figma (frame 710:1584), in plate units (0–100,
 * square plate, portrait 72% wide and bottom-centred). The long shard on each
 * row runs out past the plate towards the page edge, as in the design.
 */
const SHARDS: Record<string, string[]> = {
  aia: [
    "31.9,13.1 42.5,13.1 30.1,37.4",
    "89.2,20.3 65.2,39.6 80.4,46.5",
    "-20.6,60.1 30.6,78.3 -20.6,81.7",
  ],
  vega: [
    "59.9,14.5 71.0,14.5 73.0,38.0",
    "7.3,27.2 41.8,57.4 20.0,74.8",
    "81.7,72.9 113.5,61.1 113.5,81.6",
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
            priority={leader.id === "aia"}
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
        <h2 id={headingId} className="lead-heading">
          {leader.heading[0]}
          <br />
          {leader.heading[1]}
        </h2>
        <blockquote className="lead-quote">
          <p>{leader.quote}</p>
        </blockquote>
        <p
          className="lead-name"
          style={{ color: leader.accentColor }}
        >
          <span
            aria-hidden
            className="lead-dot"
            style={{ backgroundColor: leader.accentColor }}
          />
          {leader.name}
        </p>
        <p className="lead-role">{leader.role}</p>
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
