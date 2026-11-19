"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FloatingModel } from "@/components/solutions/quarry/FloatingModel";
import type { IndustryProductsContent } from "@/content/types";

/** AIA's own Quarry CAD (3D PDFs decoded locally, scripts/cad/manifest.mjs), per product id. */
const MODELS: Record<string, { src: string; orbit?: string }> = {
  "blow-bars": { src: "/models/catalog/quarry-metal-blow-bar.glb", orbit: "35deg 62deg 100%" },
  hammers: { src: "/models/catalog/quarry-hammer.glb", orbit: "30deg 72deg 110%" },
  impellers: { src: "/models/catalog/quarry-impeller.glb" },
  anvil: { src: "/models/catalog/quarry-anvil.glb" },
  "feed-disk": { src: "/models/catalog/quarry-feed-disk.glb", orbit: "20deg 58deg 105%" },
  "frame-liners": { src: "/models/catalog/quarry-frame-liner.glb", orbit: "30deg 55deg 105%" },
};

type Props = { content: IndustryProductsContent };

/**
 * The six quarry crusher wear parts as alternating rows: a floating AIA 3D model on one side and
 * its description on the other, swapping sides each row. Descriptions sit on flat panels that
 * alternate white (01, 03, 05) and AIA blue (02, 04, 06). The models float free: each sits on
 * a soft light with its index number set large behind it. An index strip under the heading jumps
 * to any part.
 */
export function QuarryShowcase({ content }: Props) {
  const group = content.groups[0];
  const products = group.products;

  return (
    <section id={group.id} className="qx" aria-labelledby="qx-heading">
      <header className="qx-head">
        <p className="qx-eyebrow">
          <span className="qx-dot" aria-hidden /> Quarry · {products.length} crusher wear parts
        </p>
        <h2 id="qx-heading" className="qx-title">
          {group.name}
        </h2>
        <nav className="qx-index" aria-label="Quarry products">
          {products.map((p, i) => (
            <a key={p.id} href={`#${p.id}`} className="qx-index-link">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {p.title}
            </a>
          ))}
        </nav>
      </header>

      {products.map((p, i) => {
        const model = MODELS[p.id];
        const num = String(i + 1).padStart(2, "0");
        return (
          <ScrollReveal as="article" key={p.id} className={`qx-row ${i % 2 ? "is-flipped is-blue" : ""}`}>
            <span id={p.id} className="qx-anchor" aria-hidden />
            <div className="qx-media">
              <span className="qx-num" aria-hidden>
                {num}
              </span>
              <span className="qx-glow" aria-hidden />
              {model ? <FloatingModel src={model.src} orbit={model.orbit} alt={`${p.title}, 3D model from AIA's CAD`} /> : null}
            </div>
            <div className="qx-copy">
              <p className="qx-kicker">
                <span className="qx-kicker-num">{num}</span>
                <span className="qx-kicker-line" aria-hidden />
                {p.subtitle}
              </p>
              <h3 className="qx-name">{p.title}</h3>
              <p className="qx-text">{p.body}</p>
              {p.variants.length > 0 && (
                <ul className="qx-chips" aria-label={`${p.title} variants`}>
                  {p.variants.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </section>
  );
}
