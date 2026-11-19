import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * Leadership — 1:1 match with Figma / Presentation slide design:
 * AIA's Managing Director (Mr. Bhadresh Shah) & Vega's CEO (Mr. Sumit Mitra),
 * shown as two quote cards (brand mark, heading, quote, attribution). Portraits are kept in the data
 * for the leadership redesign.
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
    name: "MR. BHADRESH SHAH",
    role: "(MANAGING DIRECTOR - AIA ENGINEERING)",
    heading: ["A vision that", "continues to guide us."],
    quote:
      "Customer Excellence is our philosophy. Our focus remains on improving productivity while reducing environmental impact. We promise to deliver value through ethical, sustainable, and profitable means.",
    portrait: { src: "/images/ceo/bhadresh-shah.webp", width: 1100, height: 1380 },
    brand: { src: "/images/design/logo-aia-mark-blue.webp", alt: "AIA Engineering", width: 899, height: 764, className: "lead-brand-aia" },
    accentColor: "var(--aia-accent)",
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
    brand: { src: "/images/design/logo-vega-color.webp", alt: "Vega Industries", width: 1200, height: 871, className: "lead-brand-vega" },
    accentColor: "var(--aia-accent)",
    flip: true,
  },
];


function LeaderRow({ leader }: { leader: Leader }) {
  const headingId = `lead-${leader.id}`;
  // Quotes only (AIA feedback 2026-11-17): portraits are kept in the data above for the redesign.
  return (
    <ScrollReveal as="article" className="lead-card">
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
          sizes="(max-width: 1024px) 120px, 180px"
          quality={100}
        />
        <h2 id={headingId} className="lead-heading ft ft-h40">
          {leader.heading[0]} {leader.heading[1]}
        </h2>
        <blockquote className="lead-quote">
          <p className="ft ft-quote28">{leader.quote}</p>
        </blockquote>
        <div className="lead-sign">
          <p className="lead-name ft ft-name" style={{ color: leader.accentColor }}>
            <span aria-hidden className="lead-dot" style={{ backgroundColor: leader.accentColor }} />
            {leader.name}
          </p>
          <p className="lead-role ft ft-role">{leader.role}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Vision() {
  return (
    <section className="lead lead--quotes" aria-label="Leadership">
      <div className="lead-grid">
        {leaders.map((leader) => (
          <LeaderRow key={leader.id} leader={leader} />
        ))}
      </div>
    </section>
  );
}
