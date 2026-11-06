import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Leadership — Figma 01Homepage (node 685:7): two alternating rows.
 * AIA's Managing Director, then Vega's CEO, each with a cut-out portrait over
 * blue shards (which drift with the scroll), a brand mark, a heading, the
 * quote and the attribution.
 */

type Leader = {
  id: string;
  name: string;
  role: string;
  heading: [string, string];
  quote: string;
  portrait: { src: string; width: number; height: number };
  brand: { src: string; alt: string; width: number; height: number; className: string };
  flip: boolean;
};

const leaders: Leader[] = [
  {
    id: "aia",
    name: "Mr. Bhadresh Kantilal Shah",
    role: "(Managing Director - AIA Engineering)",
    heading: ["A vision that", "continues to guide us."],
    quote:
      "Customer Excellence is our philosophy. Our focus remains on improving productivity while reducing environmental impact. We promise to deliver value through ethical, sustainable, and profitable means.",
    portrait: { src: "/images/design/leader-bhadresh-shah.webp", width: 323, height: 305 },
    brand: { src: "/images/design/logo-aia-mark-blue.webp", alt: "AIA Engineering", width: 899, height: 764, className: "lead-brand-aia" },
    flip: false,
  },
  {
    id: "vega",
    name: "Mr. Sumit Mitra",
    role: "(CEO - Vega Industries)",
    heading: ["Delivering Excellence", "Across Borders."],
    quote:
      "At Vega Industries, we help customers worldwide maximise mill throughput, improve efficiency, and increase equipment uptime. Combining technical expertise with advanced manufacturing, we deliver tailored solutions and responsive local support that drive measurable value and long-term performance.",
    portrait: { src: "/images/design/leader-sumit-mitra.webp", width: 353, height: 279 },
    brand: { src: "/images/design/logo-vega-color.webp", alt: "Vega Industries", width: 200, height: 145, className: "lead-brand-vega" },
    flip: true,
  },
];

function LeaderRow({ leader }: { leader: Leader }) {
  const headingId = `lead-${leader.id}`;
  return (
    <ScrollReveal as="article" className={`lead-row ${leader.flip ? "is-flipped" : ""}`}>
      <div className="lead-plate" aria-hidden>
        <span className="lead-shard-wrap" data-parallax="22"><span className="lead-shard lead-shard-a" /></span>
        <span className="lead-shard-wrap" data-parallax="34"><span className="lead-shard lead-shard-b" /></span>
        <span className="lead-shard-wrap" data-parallax="14"><span className="lead-shard lead-shard-c" /></span>
        <div className="lead-portrait">
          <Image src={leader.portrait.src} alt="" width={leader.portrait.width} height={leader.portrait.height} sizes="(max-width: 1024px) 80vw, 34vw" />
        </div>
      </div>

      <div className="lead-copy" aria-labelledby={headingId}>
        <Image src="/images/vision-quote-v2.png" alt="" aria-hidden width={223} height={163} className="lead-quote-mark" />
        <Image src={leader.brand.src} alt={leader.brand.alt} width={leader.brand.width} height={leader.brand.height} className={`lead-brand ${leader.brand.className}`} />
        <h2 id={headingId} className="lead-heading">
          {leader.heading[0]}
          <br />
          {leader.heading[1]}
        </h2>
        <blockquote className="lead-quote">
          <p>{leader.quote}</p>
        </blockquote>
        <p className="lead-name">
          <span aria-hidden className="lead-dot" />
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
