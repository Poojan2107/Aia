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

type Site = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  company: "AIA" | "Vega";
  /** Contact page legend: gold pin = manufacturing unit, grey pin = service center. */
  unit: "manufacturing" | "service";
  /** Second line of the hub tag. */
  org: string;
  chip?: boolean;
  /** Key Vega hubs: tagged on every globe size and from the columns beat onwards. */
  key?: boolean;
  below?: boolean;
};

/**
 * Exactly the 12 locations on aiaengineering.com/contact-us (Manufacturing Units + Service
 * Centers), placed at each office's street address.
 */
const AHMEDABAD: Site = { id: "ahmedabad", city: "Ahmedabad", country: "India", lat: 23.0402, lng: 72.5054, company: "AIA", unit: "manufacturing", org: "AIA Engineering · HQ", chip: true };

const SITES: Site[] = [
  AHMEDABAD, // 11-12 Sigma Corporates, Sindhubhavan Road, Bodakdev
  { id: "accra", city: "Accra", country: "Ghana", lat: 5.6045, lng: -0.1832, company: "AIA", unit: "manufacturing", org: "AIA Ghana · Manufacturing", chip: true, below: true }, // Christman House, Kofi Annan Street
  { id: "wuxi", city: "Wuxi", country: "China", lat: 31.5402, lng: 120.2968, company: "Vega", unit: "manufacturing", org: "Vega Industries · Manufacturing", chip: true }, // Times Building, 655 Hubin Road
  { id: "brampton", city: "Brampton", country: "Canada", lat: 43.6855, lng: -79.7598, company: "Vega", unit: "service", org: "Vega Industries" }, // 10 Gillingham Drive
  { id: "brentwood", city: "Brentwood", country: "USA", lat: 36.0236, lng: -86.7869, company: "Vega", unit: "service", org: "Vega Industries", chip: true }, // 330 Franklin Road, TN
  { id: "lima", city: "Lima", country: "Peru", lat: -12.0966, lng: -77.0294, company: "Vega", unit: "service", org: "Vega Industries" }, // Las Camelias 256, San Isidro
  { id: "santiago", city: "Santiago", country: "Chile", lat: -33.4087, lng: -70.5715, company: "Vega", unit: "service", org: "Vega Industries", chip: true }, // Av. Apoquindo 5950, Las Condes
  { id: "harrow", city: "Harrow", country: "UK", lat: 51.5786, lng: -0.3346, company: "Vega", unit: "service", org: "Vega Industries", chip: true, key: true, below: true }, // Congress House, 14 Lyon Road
  { id: "randburg", city: "Randburg", country: "South Africa", lat: -26.0936, lng: 28.0064, company: "Vega", unit: "service", org: "Vega Industries", chip: true, key: true }, // Stabilitas House, Kent Avenue
  { id: "ajman", city: "Ajman", country: "UAE", lat: 25.418, lng: 55.447, company: "Vega", unit: "service", org: "Vega Industries" }, // Ajman Free Zone
  { id: "jakarta", city: "Jakarta", country: "Indonesia", lat: -6.2238, lng: 106.8226, company: "Vega", unit: "service", org: "Vega Industries" }, // DBS Bank Tower, Jl. Prof. Dr. Satrio
  { id: "perth", city: "Perth", country: "Australia", lat: -31.9541, lng: 115.853, company: "Vega", unit: "service", org: "Vega Industries", chip: true, key: true }, // 267 St Georges Terrace
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

/** Kept as constants so the globe keeps the same ring/tag across stages instead of restarting them. */
const HQ_RING: Ring = { lat: AHMEDABAD.lat, lng: AHMEDABAD.lng, hq: true };
const AIA_SITES = SITES.filter((s) => s.company === "AIA");
const CHIP_SITES = SITES.filter((s) => s.chip);
/** HQ plus the key Vega hubs, tagged as soon as the columns arrive. */
const KEY_SITES = SITES.filter((s) => s.id === "ahmedabad" || s.key);

const VIEW_INDIA = { lat: 20, lng: 78, altitude: 1.72 };
const VIEW_NETWORK = { lat: 16, lng: 56, altitude: 2.0 };

/** 0 = waiting, 1 = heading, 2 = globe up, 3 = columns, 4 = network. */
type Stage = 0 | 1 | 2 | 3 | 4;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
type Box = { cx: number; cy: number; w: number };

/** Hub tag: a stem from the location up to a card with the company badge. */
function chipElement(site: Site) {
  const isAia = site.company === "AIA";
  const root = document.createElement("div");
  root.className = `gsq-tag ${isAia ? "is-aia" : "is-vega"} is-${site.unit}${site.id === "ahmedabad" ? " is-hq" : ""}${site.key ? " is-key" : ""}${site.below ? " is-below" : ""}`;
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
  city.textContent = `${site.city}, ${site.country}`;
  const org = document.createElement("small");
  org.textContent = site.org;
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
  const viewRef = useRef<{ key: string; timer: number }>({ key: "", timer: 0 });
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
        // Gold = manufacturing unit, blue = service center (the contact page's legend).
        .pointColor((d) => ((d as Site).unit === "manufacturing" ? "#ffc65c" : "#4da3ff"))
        .pointAltitude(0.012)
        .pointRadius((d) => ((d as Site).unit === "manufacturing" ? 0.55 : 0.4))
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
      // Only touch the renderer when the box really changes size; a no-op setSize still clears the canvas.
      let size = `${host.clientWidth}x${host.clientHeight}`;
      ro = new ResizeObserver(() => {
        const next = `${host.clientWidth}x${host.clientHeight}`;
        if (next === size || !host.clientWidth || !host.clientHeight) return;
        size = next;
        world.width(host.clientWidth).height(host.clientHeight);
      });
      ro.observe(host);
      setReady(true);
    })();


    const view = viewRef.current;
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(view.timer);
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
    // Camera: one tween per view change, with auto-rotate paused so the two never fight.
    const flyTo = (key: string, pov: typeof VIEW_INDIA, ms: number) => {
      const view = viewRef.current;
      if (view.key === key) return;
      view.key = key;
      const controls = world.controls();
      const rotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      controls.autoRotate = false;
      world.pointOfView(pov, ms);
      window.clearTimeout(view.timer);
      view.timer = window.setTimeout(() => {
        controls.autoRotate = rotate;
      }, ms + 120);
    };
    if (stage >= 4) flyTo("network", VIEW_NETWORK, 2200);
    else if (stage >= 2) flyTo("india", VIEW_INDIA, 1600);

    indiaRef.current.lift = stage >= 3 ? 0.028 : stage >= 2 ? 0.008 : 0.002;
    world.polygonsData(indiaRef.current.features).polygonAltitude(indiaRef.current.lift);
    if (stage >= 4) {
      // Routes launch one by one: trail grows in, pulse starts, a ring blooms on arrival.
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const arcs: Arc[] = [];
      const rings: Ring[] = [HQ_RING];
      const timers: number[] = [];
      world.pointsData(SITES).ringsData(rings).htmlElementsData(CHIP_SITES);
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
      return () => timers.forEach((t) => window.clearTimeout(t));
    }
    world
      .pointsData(stage >= 3 ? AIA_SITES : [])
      .ringsData(stage >= 3 ? [HQ_RING] : [])
      .arcsData([])
      .htmlElementsData(stage >= 3 ? KEY_SITES : []);
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

    // Logo choreography: the AIA and Vega logos meet in the centre of the light, part to
    // make room for the tagline, then fly to their exact places in the two columns.
    const logoA = stageEl.querySelector<HTMLElement>(".gsq-logo-aia");
    const logoV = stageEl.querySelector<HTMLElement>(".gsq-logo-vega");
    const headEl = stageEl.querySelector<HTMLElement>(".gsq-head");
    const headingEl = stageEl.querySelector<HTMLElement>(".gsq-heading");
    let nat: { a: Box; v: Box; head: Box; headW: number; W: number; H: number } | null = null;
    const measure = () => {
      if (!logoA || !logoV || !headEl || !headingEl) return;
      const els = [logoA, logoV, headEl];
      const prev = els.map((e) => e.style.transform);
      els.forEach((e) => (e.style.transform = "none"));
      const s = stageEl.getBoundingClientRect();
      const box = (el: HTMLElement): Box => {
        const b = el.getBoundingClientRect();
        return { cx: b.left - s.left + b.width / 2, cy: b.top - s.top + b.height / 2, w: b.width };
      };
      const range = document.createRange();
      range.selectNodeContents(headingEl);
      nat = { a: box(logoA), v: box(logoV), head: box(headEl), headW: range.getBoundingClientRect().width, W: s.width, H: s.height };
      els.forEach((e, i) => (e.style.transform = prev[i]));
    };

    let raf = 0;
    let last: Stage = 0;
    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      // The section slides up over the pinned hero (progress starts the moment it enters),
      // carrying the sky's soft navy edge with it. Once it pins (pinP), the curved dome
      // rises through the screen; the heading arrives as it turns light, then the globe,
      // the columns and the network.
      const lead = window.innerHeight;
      const p = clamp01((-r.top + lead) / (range + lead));
      const pinP = lead / (range + lead);
      const after = (start: number, span: number) => clamp01((p - pinP - start) / span);
      // Beats after the pin: sky 0-.17, logos meet .085-.135, part .135-.185, tagline .165-.215,
      // logos fly to their columns while the tagline rises to its place .25-.34,
      // globe .29-.42, column copy .33-.43, network .45-.60.
      const sLogo = easeOut(after(0.085, 0.05));
      const sPart = easeInOut(after(0.135, 0.05));
      const sPlace = easeInOut(after(0.25, 0.09));
      stageEl.style.setProperty("--g-sky", after(0, 0.17).toFixed(4));
      stageEl.style.setProperty("--g-logo", sLogo.toFixed(3));
      stageEl.style.setProperty("--g-head", easeOut(after(0.165, 0.05)).toFixed(3));
      stageEl.style.setProperty("--g-globe", easeOut(after(0.29, 0.13)).toFixed(3));
      stageEl.style.setProperty("--g-cols", easeOut(after(0.33, 0.1)).toFixed(3));
      stageEl.style.setProperty("--g-net", after(0.45, 0.15).toFixed(3));

      const sr = stageEl.getBoundingClientRect();
      if (!nat || Math.abs(nat.W - sr.width) > 1 || Math.abs(nat.H - sr.height) > 1) measure();
      if (nat && logoA && logoV && headEl) {
        const { a, v, head, headW, W, H } = nat;
        const cx = W / 2;
        const cy = H * 0.5;
        const big = 1.8;
        const scale = lerp(big, 1, sPlace);
        const gap = 48;
        // Together (centre) -> parted (room for the tagline) -> their own places.
        const aTogether = cx - gap / 2 - (a.w * big) / 2;
        const vTogether = cx + gap / 2 + (v.w * big) / 2;
        const aParted = cx - headW / 2 - 72 - (a.w * big) / 2;
        const vParted = cx + headW / 2 + 72 + (v.w * big) / 2;
        const ax = lerp(lerp(aTogether, aParted, sPart), a.cx, sPlace);
        const vx = lerp(lerp(vTogether, vParted, sPart), v.cx, sPlace);
        const ay = lerp(cy, a.cy, sPlace);
        const vy = lerp(cy, v.cy, sPlace);
        logoA.style.transform = "translate3d(" + (ax - a.cx).toFixed(1) + "px, " + (ay - a.cy).toFixed(1) + "px, 0) scale(" + scale.toFixed(3) + ")";
        logoV.style.transform = "translate3d(" + (vx - v.cx).toFixed(1) + "px, " + (vy - v.cy).toFixed(1) + "px, 0) scale(" + scale.toFixed(3) + ")";
        // The tagline first sits between the logos, then rises to its place as they leave.
        headEl.style.transform = "translate3d(0, " + lerp(cy - head.cy, 0, sPlace).toFixed(1) + "px, 0)";
      }
      // Hysteresis: a stage only drops back once the scroll is clearly below its threshold,
      // so tiny wheel/trackpad jitter at a boundary can't replay the globe's transitions.
      const q0 = pinP;
      const at = (q: number) => (q > q0 + 0.45 ? 4 : q > q0 + 0.33 ? 3 : q > q0 + 0.29 ? 2 : q > q0 + 0.01 ? 1 : 0) as Stage;
      const forward = at(p);
      const next: Stage = forward >= last ? forward : Math.max(forward, at(p + 0.03)) as Stage;
      if (next !== last) {
        last = next;
        setStage(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Logo sizes change once the images load: measure again.
    const onLogoLoad = () => {
      nat = null;
      onScroll();
    };
    [logoA, logoV].forEach((img) => img?.addEventListener("load", onLogoLoad));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      [logoA, logoV].forEach((img) => img?.removeEventListener("load", onLogoLoad));
      [logoA, logoV, headEl].forEach((el) => {
        if (el) el.style.transform = "";
      });
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="collaboration" className="gsq" aria-labelledby="gsq-heading">
      <div ref={trackRef} className="gsq-track">
        <div ref={stageRef} className={`gsq-stage is-s${stage} ${scrubbed ? "is-scrubbed" : ""}`}>
          {/* Curved atmosphere: rises over the pinned hero and resolves into the section's grey. */}
          <span aria-hidden className="gsq-sky" />
          <span aria-hidden className="gsq-light gsq-light-a" />
          <span aria-hidden className="gsq-light gsq-light-b" />

          <header className="gsq-head">
            <SectionLabel>AIA Engineering • Vega Industries</SectionLabel>
            <h2 id="gsq-heading" className="gsq-heading ft ft-h56" data-no-split="">
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
            <h3 className="gsq-kicker ft ft-kicker20">Four decades of creating advanced comminution technologies across industries</h3>
            <p className="gsq-body ft ft-body22">
              AIA Engineering Limited is a global leader in manufacturing engineered grinding solutions to improve reliability, efficiency and overall mill performance. With a legacy of over 45 years, AIA Engineering combines engineering expertise with manufacturing capability to deliver application specific solutions across the Mining, Cement, Thermal and Quarry industries.
            </p>
          </article>

          <article className="gsq-col gsq-col-vega">
            <Image src="/images/design/logo-vega-color.webp" alt="Vega Industries" width={200} height={145} className="gsq-logo gsq-logo-vega" />
            <h3 className="gsq-kicker ft ft-kicker20">Delivering engineering expertise worldwide across 120+ countries</h3>
            <p className="gsq-body ft ft-body22">
              Vega Industries is a wholly owned subsidiary of AIA Engineering Limited. As its international marketing arm, Vega extends AIA&apos;s application expertise to the international markets. Through its 10+ service centers and an established global supply chain network, Vega acts as an end-to-end technical partner in helping customers across 120+ countries improve their grinding operations.
            </p>
          </article>
          </div>

          <p className="gsq-foot">
            <span className="section-label ft ft-label">[Engineered in India. Connected worldwide.]</span>
          </p>
        </div>
      </div>
    </section>
  );
}
