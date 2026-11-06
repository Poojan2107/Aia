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

type Site = { id: string; city: string; country: string; lat: number; lng: number; company: "AIA" | "Vega"; chip?: boolean; below?: boolean };

const AHMEDABAD: Site = { id: "ahmedabad", city: "Ahmedabad", country: "India", lat: 23.0225, lng: 72.5714, company: "AIA", chip: true };

const SITES: Site[] = [
  AHMEDABAD,
  { id: "bengaluru", city: "Bengaluru", country: "India", lat: 12.9716, lng: 77.5946, company: "AIA" },
  { id: "brentwood", city: "Nashville", country: "USA", lat: 36.0331, lng: -86.7828, company: "Vega", chip: true },
  { id: "brampton", city: "Toronto", country: "Canada", lat: 43.7315, lng: -79.7624, company: "Vega" },
  { id: "london", city: "London", country: "UK", lat: 51.5806, lng: -0.3417, company: "Vega", chip: true, below: true },
  { id: "dubai", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, company: "Vega" },
  { id: "johannesburg", city: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473, company: "Vega", chip: true },
  { id: "accra", city: "Accra", country: "Ghana", lat: 5.6037, lng: -0.187, company: "Vega" },
  { id: "santiago", city: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693, company: "Vega", chip: true },
  { id: "lima", city: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, company: "Vega" },
  { id: "perth", city: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605, company: "Vega", chip: true },
  { id: "wuxi", city: "Wuxi", country: "China", lat: 31.4912, lng: 120.3119, company: "Vega" },
  { id: "jakarta", city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, company: "Vega" },
];

/** Each route is drawn twice: a faint trail that grows in, and a bright pulse that travels it. */
type Arc = { startLat: number; startLng: number; endLat: number; endLng: number; order: number; kind: "trail" | "pulse" };
const ROUTES = SITES.filter((s) => s.id !== "ahmedabad");
const arcFor = (s: Site, i: number, kind: Arc["kind"]): Arc => ({
  startLat: AHMEDABAD.lat,
  startLng: AHMEDABAD.lng,
  endLat: s.lat,
  endLng: s.lng,
  order: i,
  kind,
});
type Ring = { lat: number; lng: number; hq: boolean };

const VIEW_INDIA = { lat: 20, lng: 78, altitude: 1.72 };
const VIEW_NETWORK = { lat: 16, lng: 56, altitude: 2.0 };

/** 0 = waiting, 1 = heading, 2 = globe up, 3 = columns, 4 = network. */
type Stage = 0 | 1 | 2 | 3 | 4;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Hub tag: a stem from the location up to a card with the company badge. */
function chipElement(site: Site) {
  const isAia = site.company === "AIA";
  const root = document.createElement("div");
  root.className = `gsq-tag ${isAia ? "is-aia" : "is-vega"}${site.below ? " is-below" : ""}`;
  const stem = document.createElement("span");
  stem.className = "gsq-tag-stem";
  const card = document.createElement("span");
  card.className = "gsq-tag-card";
  const badge = document.createElement("img");
  badge.className = "gsq-tag-badge";
  badge.alt = "";
  badge.src = isAia ? "/images/design/logo-aia-mark-blue.webp" : "/images/design/logo-vega-color.webp";
  const text = document.createElement("span");
  text.className = "gsq-tag-text";
  const city = document.createElement("strong");
  city.textContent = isAia ? `${site.city}, India` : `${site.city}, ${site.country}`;
  const org = document.createElement("small");
  org.textContent = isAia ? "AIA Engineering · HQ" : "Vega Industries";
  text.append(city, org);
  card.append(badge, text);
  root.append(stem, card);
  return root;
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
  const indiaRef = useRef<{ features: object[]; lift: number }>({ features: [], lift: 0 });
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
    let indiaFeatures: object[] = [];
    const applyIndia = () => {
      indiaRef.current.features = indiaFeatures;
      worldRef.current?.polygonsData(indiaFeatures).polygonAltitude(indiaRef.current.lift);
    };
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

      // India, lit in gold (official boundary, simplified).
      const indiaMaterial = new THREE.MeshLambertMaterial({
        color: "#ffb43a",
        emissive: "#ff8a00",
        emissiveIntensity: 0.55,
        transparent: true,
        opacity: 0.82,
      });
      world
        .polygonCapMaterial(() => indiaMaterial)
        .polygonSideColor(() => "rgba(255, 170, 40, 0.35)")
        .polygonStrokeColor(() => "#ffe2a3")
        .polygonsTransitionDuration(1400);
      fetch("/geo/india.json")
        .then((r) => r.json())
        .then((geo: { features: object[] }) => {
          if (disposed) return;
          indiaFeatures = geo.features;
          applyIndia();
        })
        .catch(() => undefined);

      // Layer styling; the data itself is fed in per stage.
      world
        .ringColor((d: object) => ((d as Ring).hq ? (t: number) => `rgba(255, 186, 70, ${1 - t})` : (t: number) => `rgba(60, 150, 255, ${0.9 * (1 - t)})`))
        .ringMaxRadius((d) => ((d as Ring).hq ? 7 : 3.2))
        .ringPropagationSpeed((d) => ((d as Ring).hq ? 2.6 : 1.6))
        .ringRepeatPeriod((d) => ((d as Ring).hq ? 1000 : 2200))
        .pointColor((d) => ((d as Site).company === "AIA" ? "#ffc65c" : "#4da3ff"))
        .pointAltitude(0.012)
        .pointRadius((d) => ((d as Site).company === "AIA" ? 0.55 : 0.4))
        .arcColor((d: object) =>
          (d as Arc).kind === "trail"
            ? ["rgba(255, 186, 70, 0.55)", "rgba(40, 140, 255, 0.45)"]
            : ["rgba(255, 236, 190, 1)", "rgba(255, 176, 50, 1)", "rgba(60, 160, 255, 1)"],
        )
        .arcStroke((d) => ((d as Arc).kind === "trail" ? 0.42 : 1.15))
        .arcAltitudeAutoScale(0.45)
        .arcDashLength((d) => ((d as Arc).kind === "trail" ? 1 : 0.22))
        .arcDashGap((d) => ((d as Arc).kind === "trail" ? 0 : 1.4))
        .arcDashInitialGap((d) => ((d as Arc).kind === "trail" ? 0 : ((d as Arc).order % 4) * 0.35))
        .arcDashAnimateTime((d) => ((d as Arc).kind === "trail" || reduced ? 0 : 2400 + ((d as Arc).order % 3) * 300))
        .arcsTransitionDuration(reduced ? 0 : 1100)
        .htmlElement((d) => chipElement(d as Site))
        .htmlAltitude(0.015)
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
    indiaRef.current.lift = stage >= 3 ? 0.028 : stage >= 2 ? 0.008 : 0.002;
    world.polygonsData(indiaRef.current.features).polygonAltitude(indiaRef.current.lift);
    if (stage >= 4) {
      // Routes launch one by one: trail grows in, pulse starts, a ring blooms on arrival.
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hq: Ring = { lat: AHMEDABAD.lat, lng: AHMEDABAD.lng, hq: true };
      const arcs: Arc[] = [];
      const rings: Ring[] = [hq];
      const timers: number[] = [];
      world.pointsData(SITES).ringsData(rings).htmlElementsData(SITES.filter((s) => s.chip));
      const step = reducedMotion ? 0 : 170;
      ROUTES.forEach((site, i) => {
        timers.push(
          window.setTimeout(() => {
            arcs.push(arcFor(site, i, "trail"), arcFor(site, i, "pulse"));
            world.arcsData([...arcs]);
          }, i * step),
        );
        timers.push(
          window.setTimeout(() => {
            rings.push({ lat: site.lat, lng: site.lng, hq: false });
            world.ringsData([...rings]);
          }, i * step + (reducedMotion ? 0 : 1000)),
        );
      });
      timers.push(window.setTimeout(() => world.pointOfView(VIEW_NETWORK, 2400), 700));
      return () => timers.forEach((t) => window.clearTimeout(t));
    }
    world
      .pointsData(stage >= 3 ? SITES.filter((s) => s.company === "AIA") : [])
      .ringsData(stage >= 3 ? [{ lat: AHMEDABAD.lat, lng: AHMEDABAD.lng, hq: true }] : [])
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

          <div className="gsq-main">
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
          </div>

          <p className="gsq-foot">
            <span className="section-label">[Engineered in India. Connected worldwide.]</span>
          </p>
        </div>
      </div>
    </section>
  );
}
