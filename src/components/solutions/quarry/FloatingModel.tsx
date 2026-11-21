"use client";

import { useEffect, useRef, useState } from "react";
import { loadModelViewer } from "@/components/home/MaterialViewer3D";
import { useAccentRgb } from "@/lib/use-accent-rgb";

/** A finish to blend the whole model into (scripts/cad/materials.mjs values: linear colour). */
export type Finish = { color: [number, number, number]; metallic: number; roughness: number };

type Props = {
  src: string;
  alt: string;
  orbit?: string;
  highlight?: string[];
  finish?: Finish;
  /** Optional still of the model, shown softly while the 3D loads (the mill product pages). */
  poster?: string;
};

type Mat = {
  name: string;
  emissiveFactor: number[];
  setEmissiveFactor: (c: number[]) => void;
  pbrMetallicRoughness: {
    baseColorFactor: number[];
    metallicFactor: number;
    roughnessFactor: number;
    setBaseColorFactor: (c: number[]) => void;
    setMetallicFactor: (v: number) => void;
    setRoughnessFactor: (v: number) => void;
  };
};

/** A highlighted part group turns AIA blue with a soft glow; the rest keeps its own finish and
 * steps back (lightened towards the page), so the mill still reads as steel around the part. */
const PALE = [0.86, 0.88, 0.9];
const recede = (c: number[]) => [...c.slice(0, 3).map((v, i) => v * 0.45 + PALE[i] * 0.55), 1];

/**
 * A bare AIA model floating on the page: no card, no border, no still image. It fades in directly
 * as 3D when it nears the screen, turns slowly on its own, and can be dragged to rotate (zoom is
 * off so the page keeps scrolling normally).
 */
export function FloatingModel({ src, alt, orbit = "30deg 70deg 105%", highlight, finish, poster }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        setNear(true);
        loadModelViewer().then(() => setReady(true)).catch(() => undefined);
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const done = () => setShown(true);
    el.addEventListener("load", done);
    const poll = window.setInterval(() => (el as unknown as { loaded?: boolean }).loaded && done(), 300);
    return () => {
      el.removeEventListener("load", done);
      window.clearInterval(poll);
    };
  }, [ready]);

  // Highlight: materials are named "finish:group" by the CAD pipeline (scripts/cad/convert.mjs);
  // the groups listed are painted AIA blue and the rest recede. No groups: the model's own finish.
  const originals = useRef(new Map<string, { base: number[]; glow: number[] }>());
  // The lit group takes the page's accent (it follows the colour palette), with a soft glow.
  const accent = useAccentRgb();
  const lin = (c: number) => Math.pow(c / 255, 2.2);
  const isDefault = accent.join(",") === "0,110,255"; // the site's own palette keeps its tuned blue
  const HIGHLIGHT = isDefault ? [0.05, 0.42, 1, 1] : [lin(accent[0]), lin(accent[1]), lin(accent[2]), 1];
  const GLOW = isDefault ? [0, 0.1, 0.32] : HIGHLIGHT.slice(0, 3).map((v) => v * 0.3);
  const accentKey = accent.join(",");
  const groups = (highlight ?? []).join("|");
  useEffect(() => {
    const el = viewerRef.current as unknown as {
      model?: { materials: Mat[] };
      autoRotate: boolean;
      cameraOrbit: string;
      resetTurntableRotation?: (theta?: number) => void;
    } | null;
    if (!shown || !el?.model) return;
    const want = groups ? groups.split("|") : [];
    // While a group is lit, stop turning and swing back to the front view, so a cut-away
    // (e.g. the Verti Mill chamber) faces the reader.
    el.autoRotate = !want.length;
    if (want.length) {
      el.resetTurntableRotation?.(0);
      el.cameraOrbit = orbit;
    }
    for (const m of el.model.materials) {
      const pbr = m.pbrMetallicRoughness;
      if (!originals.current.has(m.name)) originals.current.set(m.name, { base: [...pbr.baseColorFactor], glow: [...m.emissiveFactor] });
      const own = originals.current.get(m.name)!;
      // A group ("shell-liners") lights every finish in it; a full name ("sinterHicr:liners") just one.
      const lit = want.includes(m.name.split(":")[1] ?? "") || want.includes(m.name);
      pbr.setBaseColorFactor(!want.length ? own.base : lit ? HIGHLIGHT : recede(own.base));
      m.setEmissiveFactor(want.length && lit ? GLOW : own.glow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- HIGHLIGHT/GLOW derive from accentKey
  }, [shown, groups, orbit, accentKey]);

  // Finish: the whole model blends (about 0.7s) from its current look into the given finish, or
  // back to its own when none is given. Used by the quarry MOC switcher (Mono Metal / Sintercast).
  const own = useRef<{ base: number[]; metallic: number; roughness: number }[] | null>(null);
  const finishKey = finish ? `${finish.color.join(",")}|${finish.metallic}|${finish.roughness}` : "";
  useEffect(() => {
    const el = viewerRef.current as unknown as { model?: { materials: Mat[] } } | null;
    if (!shown || !el?.model) return;
    const mats = el.model.materials;
    const read = (m: Mat) => ({
      base: [...m.pbrMetallicRoughness.baseColorFactor],
      metallic: m.pbrMetallicRoughness.metallicFactor,
      roughness: m.pbrMetallicRoughness.roughnessFactor,
    });
    if (!own.current) own.current = mats.map(read);
    const from = mats.map(read);
    const to = mats.map((_, i) =>
      finish ? { base: [...finish.color, 1], metallic: finish.metallic, roughness: finish.roughness } : own.current![i],
    );
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
    const t0 = performance.now();
    let raf = 0;
    const mix = (a: number, b: number, k: number) => a + (b - a) * k;
    const step = (now: number) => {
      const p = dur ? Math.min(1, (now - t0) / dur) : 1;
      const k = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      mats.forEach((m, i) => {
        const pbr = m.pbrMetallicRoughness;
        pbr.setBaseColorFactor(from[i].base.map((v, c) => mix(v, to[i].base[c] ?? 1, k)));
        pbr.setMetallicFactor(mix(from[i].metallic, to[i].metallic, k));
        pbr.setRoughnessFactor(mix(from[i].roughness, to[i].roughness, k));
      });
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- finishKey stands for finish
  }, [shown, finishKey]);

  return (
    <>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- a local still, swapped for the 3D once it loads
        <img src={poster} alt="" aria-hidden className={`qfloat-poster ${shown ? "is-hidden" : ""}`} decoding="async" loading="lazy" />
      ) : null}
      <div ref={hostRef} className={`qfloat ${shown ? "is-shown" : ""}`}>
        {near && ready ? (
          <model-viewer
            ref={viewerRef}
            src={src}
            alt={alt}
            bounds="tight"
            environment-image="/models/env/studio.hdr"
            camera-orbit={orbit}
            field-of-view="28deg"
            camera-controls
            disable-zoom
            disable-pan
            auto-rotate
            auto-rotate-delay={0}
            rotation-per-second="14deg"
            interaction-prompt="none"
            touch-action="pan-y"
            shadow-intensity="1.1"
            shadow-softness="0.9"
            exposure="0.95"
            tone-mapping="neutral"
            loading="eager"
            className="qfloat-viewer"
          >
            {/* No loading bar: the model fades in once loaded instead. */}
            <div slot="progress-bar" />
          </model-viewer>
        ) : null}
      </div>
    </>
  );
}
