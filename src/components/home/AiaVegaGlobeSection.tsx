"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { GlobeInstance } from "globe.gl";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * "One vision. Two strengths. Beyond borders." — Figma 01Homepage (node 685:7),
 * with a real 3D Earth (globe.gl, blue-marble texture, bump map and a drifting
 * cloud layer) as the centrepiece.
 *
 * Desktop: a pinned, scroll-sequenced stage —
 *   1. the heading arrives, 2. the globe rises into place,
 *   3. the AIA and Vega columns come up, 4. arcs launch from Ahmedabad to every
 *   Vega hub with pulsing rings and labelled chips, then the camera pulls back.
 * Phones and reduced motion get the same beats without the pin.
 */

type Site = { id: string; city: string; country: string; lat: number; lng: number; company: "AIA" | "Vega"; chip?: boolean };

const AHMEDABAD: Site = { id: "ahmedabad", city: "Ahmedabad", country: "India", lat: 23.0225, lng: 72.5714, company: "AIA", chip: true };

const SITES: Site[] = [
  AHMEDABAD,
  { id: "bengaluru", city: "Bengaluru", country: "India", lat: 12.9716, lng: 77.5946, company: "AIA" },
  { id: "brentwood", city: "Nashville", country: "USA", lat: 36.0331, lng: -86.7828, company: "Vega", chip: true },
  { id: "brampton", city: "Toronto", country: "Canada", lat: 43.7315, lng: -79.7624, company: "Vega" },
  { id: "london", city: "London", country: "UK", lat: 51.5806, lng: -0.3417, company: "Vega", chip: true },
  { id: "dubai", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, company: "Vega" },
  { id: "johannesburg", city: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473, company: "Vega", chip: true },
  { id: "accra", city: "Accra", country: "Ghana", lat: 5.6037, lng: -0.187, company: "Vega" },
  { id: "santiago", city: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693, company: "Vega", chip: true },
  { id: "lima", city: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, company: "Vega" },
  { id: "perth", city: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605, company: "Vega", chip: true },
  { id: "wuxi", city: "Wuxi", country: "China", lat: 31.4912, lng: 120.3119, company: "Vega" },
  { id: "jakarta", city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, company: "Vega" },
];

type Arc = { startLat: number; startLng: number; endLat: number; endLng: number; order: number };
const ARCS: Arc[] = SITES.filter((s) => s.id !== "ahmedabad").map((s, i) => ({
  startLat: AHMEDABAD.lat,
  startLng: AHMEDABAD.lng,
  endLat: s.lat,
  endLng: s.lng,
  order: i,
}));

const VIEW_INDIA = { lat: 18, lng: 74, altitude: 1.9 };
const VIEW_NETWORK = { lat: 14, lng: 52, altitude: 2.25 };

/** 0 = waiting, 1 = heading, 2 = globe up, 3 = columns, 4 = network. */
type Stage = 0 | 1 | 2 | 3 | 4;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function chipElement(site: Site) {
  const el = document.createElement("div");
  el.className = `gsq-chip is-${site.company.toLowerCase()}`;
  const label = `${site.country === "India" ? site.city : site.country} / ${site.company === "AIA" ? "AIA" : "Vega"}`;
  const dot = document.createElement("span");
  dot.className = "gsq-chip-dot";
  const text = document.createElement("span");
  text.textContent = label;
  el.append(dot, text);
  return el;
}

const SCRUB_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
function subscribeScrub(cb: () => void) {
  const mq = window.matchMedia(SCRUB_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getScrub = () => window.matchMedia(SCRUB_QUERY).matches;

export function AiaVegaGlobeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const globeHostRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<GlobeInstance | null>(null);
  const [stage, setStage] = useState<Stage>(0);
  const [ready, setReady] = useState(false);
  const scrubbed = useSyncExternalStore(subscribeScrub, getScrub, () => false);

  /* ---------- globe setup (client only) ---------- */
  useEffect(() => {
    const host = globeHostRef.current;
    if (!host) return;
    let disposed = false;
    let raf = 0;
    let visible = true;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    (async () => {
      const [{ default: Globe }, THREE] = await Promise.all([import("globe.gl"), import("three")]);
      if (disposed) return;

      const world = new Globe(host, { animateIn: false, rendererConfig: { antialias: true, alpha: true } })
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl("/textures/globe/earth-blue-marble.webp")
        .bumpImageUrl("/textures/globe/earth-topology.webp")
        .showAtmosphere(true)
        .atmosphereColor("#7ab8ff")
        .atmosphereAltitude(0.2)
        .width(host.clientWidth)
        .height(host.clientHeight)
        .pointOfView({ lat: VIEW_INDIA.lat, lng: VIEW_INDIA.lng + 40, altitude: 2.4 }, 0);
      worldRef.current = world;

      const controls = world.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = finePointer;
      controls.autoRotate = !reduced;
      controls.autoRotateSpeed = 0.35;
      const canvas = host.querySelector("canvas");
      if (canvas && !finePointer) canvas.style.touchAction = "pan-y";

      // Drifting cloud shell, as in the globe.gl clouds example.
      const radius = world.getGlobeRadius();
      const cloudMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0.9, depthWrite: false });
      const clouds = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.006, 75, 75), cloudMaterial);
      new THREE.TextureLoader().load("/textures/globe/clouds.webp", (tex) => {
        if (disposed) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        cloudMaterial.map = tex;
        cloudMaterial.needsUpdate = true;
        world.scene().add(clouds);
      });
      const spin = () => {
        raf = requestAnimationFrame(spin);
        if (visible && !reduced) clouds.rotation.y -= 0.00012;
      };
      raf = requestAnimationFrame(spin);

      // Layer styling; the data itself is fed in per stage.
      world
        .ringColor(() => (t: number) => `rgba(255, 196, 92, ${1 - t})`)
        .ringMaxRadius(6)
        .ringPropagationSpeed(2.4)
        .ringRepeatPeriod(1100)
        .pointColor((d) => ((d as Site).company === "AIA" ? "#ffc65c" : "#4da3ff"))
        .pointAltitude(0.012)
        .pointRadius((d) => ((d as Site).company === "AIA" ? 0.55 : 0.4))
        .arcColor(() => ["rgba(255, 190, 70, 1)", "rgba(40, 140, 255, 1)"])
        .arcStroke(1.05)
        .arcAltitudeAutoScale(0.42)
        .arcDashLength(0.62)
        .arcDashGap(0.55)
        .arcDashInitialGap((d) => 1 + (d as Arc).order * 0.12)
        .arcDashAnimateTime(reduced ? 0 : 2600)
        .htmlElement((d) => chipElement(d as Site))
        .htmlAltitude(0.03)
        .htmlElementVisibilityModifier((el, isVisible) => {
          el.style.opacity = isVisible ? "" : "0";
        });

      io = new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) world.resumeAnimation();
        else world.pauseAnimation();
      });
      io.observe(host);
      ro = new ResizeObserver(() => world.width(host.clientWidth).height(host.clientHeight));
      ro.observe(host);
      setReady(true);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      const world = worldRef.current;
      worldRef.current = null;
      if (world) {
        world.pauseAnimation();
        world._destructor();
      }
      host.replaceChildren();
    };
  }, []);

  /* ---------- feed the globe per stage ---------- */
  useEffect(() => {
    const world = worldRef.current;
    if (!world || !ready) return;
    if (stage >= 2) world.pointOfView(VIEW_INDIA, 1600);
    if (stage >= 4) {
      world.pointsData(SITES).ringsData([AHMEDABAD]).arcsData(ARCS).htmlElementsData(SITES.filter((s) => s.chip));
      const t = window.setTimeout(() => world.pointOfView(VIEW_NETWORK, 2400), 900);
      return () => window.clearTimeout(t);
    }
    world
      .pointsData(stage >= 3 ? SITES.filter((s) => s.company === "AIA") : [])
      .ringsData(stage >= 3 ? [AHMEDABAD] : [])
      .arcsData([])
      .htmlElementsData(stage >= 3 ? [AHMEDABAD] : []);
  }, [stage, ready]);

  /* ---------- scroll choreography ---------- */
  useEffect(() => {
    const track = trackRef.current;
    const stageEl = stageRef.current;
    if (!track || !stageEl) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!desktop || reduced) {
      // No pin: play the beats in order once the section is on screen.
      const timers: number[] = [];
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          const beats: Array<[Stage, number]> = reduced ? [[4, 0]] : [[1, 0], [2, 300], [3, 900], [4, 1500]];
          for (const [s, ms] of beats) timers.push(window.setTimeout(() => setStage(s), ms));
        },
        { threshold: 0.2 },
      );
      io.observe(stageEl);
      return () => {
        io.disconnect();
        timers.forEach((t) => window.clearTimeout(t));
      };
    }

    let raf = 0;
    let last: Stage = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      // Start a little before the pin so the heading is already arriving.
      const lead = window.innerHeight * 0.35;
      const p = clamp01((-r.top + lead) / (range + lead));
      stageEl.style.setProperty("--g-head", easeOut(clamp01(p / 0.14)).toFixed(3));
      stageEl.style.setProperty("--g-globe", easeOut(clamp01((p - 0.1) / 0.3)).toFixed(3));
      stageEl.style.setProperty("--g-cols", easeOut(clamp01((p - 0.38) / 0.2)).toFixed(3));
      stageEl.style.setProperty("--g-net", clamp01((p - 0.58) / 0.2).toFixed(3));
      const next: Stage = p > 0.58 ? 4 : p > 0.38 ? 3 : p > 0.12 ? 2 : p > 0.01 ? 1 : 0;
      if (next !== last) {
        last = next;
        setStage(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="collaboration" className="gsq" aria-labelledby="gsq-heading">
      <div ref={trackRef} className="gsq-track">
        <div ref={stageRef} className={`gsq-stage is-s${stage} ${scrubbed ? "is-scrubbed" : ""}`}>
          <span aria-hidden className="gsq-light gsq-light-a" />
          <span aria-hidden className="gsq-light gsq-light-b" />

          <header className="gsq-head">
            <SectionLabel>AIA Engineering • Vega Industry</SectionLabel>
            <h2 id="gsq-heading" className="gsq-heading" data-no-split="">
              One vision. Two strengths.
              <br />
              Beyond borders.
            </h2>
          </header>

          <div className="gsq-globe">
            <span aria-hidden className="gsq-globe-glow" />
            <div
              ref={globeHostRef}
              className="gsq-globe-canvas"
              role="img"
              aria-label="Interactive globe: routes from AIA Engineering in Ahmedabad, India, to Vega Industries hubs worldwide"
            />
          </div>

          <article className="gsq-col gsq-col-aia">
            <Image src="/images/design/logo-aia-blue.webp" alt="AIA Engineering Limited" width={1552} height={1015} className="gsq-logo gsq-logo-aia" />
            <h3 className="gsq-kicker">Four decades of creating advanced comminution technologies across industries</h3>
            <p className="gsq-body">
              AIA Engineering Limited is a global leader in manufacturing engineered grinding solutions to improve reliability, efficiency and overall mill performance. With a legacy of over 45 years, AIA Engineering combines engineering expertise with manufacturing capability to deliver application specific solutions across the Mining, Cement, Thermal and Quarry industries.
            </p>
          </article>

          <article className="gsq-col gsq-col-vega">
            <Image src="/images/design/logo-vega-color.webp" alt="Vega Industries" width={200} height={145} className="gsq-logo gsq-logo-vega" />
            <h3 className="gsq-kicker">Delivering engineering expertise worldwide across 120+ countries</h3>
            <p className="gsq-body">
              Vega Industries is a wholly owned subsidiary of AIA Engineering Limited. As its international marketing arm, Vega extends AIA&apos;s application expertise to the international markets. Through its 10+ service centers and an established global supply chain network, Vega acts as an end-to-end technical partner in helping customers across 120+ countries improve their grinding operations.
            </p>
          </article>

          <p className="gsq-foot">
            <span className="section-label">[Engineered in India. Connected worldwide.]</span>
          </p>
        </div>
      </div>
    </section>
  );
}
