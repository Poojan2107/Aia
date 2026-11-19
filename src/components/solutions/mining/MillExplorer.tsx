"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Take-apart viewer for AIA's mills (three.js). A model built by scripts/cad/convert.mjs with
 * `explode` carries, per vertex, the direction its part travels when the assembly opens
 * (_EXPLODE). Each material is a component group ("finish:group"); a state gives every group a
 * travel distance (metres along its own direction) and says which groups are in focus. Focused
 * groups take the accent colour with a soft glow; the rest fade back as context. Values move on
 * critically damped springs, so parts ease out and settle without overshoot.
 */

export type MillState = {
  /** Travel per group, metres along each part's own direction (0 = assembled). */
  amounts?: Record<string, number>;
  /** Groups (or full material names) shown in focus; empty or absent = nothing dimmed. */
  focus?: string[];
  /** Camera distance relative to the assembled framing (1 = assembled); default: fitted to the
   * chosen component as it ends up once opened. */
  zoom?: number;
  /** Opacity of the other components while this one is in focus (default 0.26). */
  ghost?: number;
  /** Show one of the separate product models (e.g. "media", "fastener") on its own: the mill steps aside. */
  product?: string;
};

type Props = {
  src: string;
  alt: string;
  /** Default view: azimuth and polar angle in degrees (as model-viewer's camera-orbit). */
  view: { theta: number; phi: number; distance?: number };
  states: Record<string, MillState>;
  state: string;
  /** Separate products shown on their own (e.g. Hi-Cr grinding media, a fastener set), by key. */
  products?: Record<string, { src: string; scale: number }>;
  accent: [number, number, number];
};

/** How far faded groups recede: structure (shell, heads) almost vanishes, other components stay as context. */
const GHOST_STRUCTURE = 0.08;
const GHOST_PART = 0.26;
const isStructure = (name: string) => /^mill(Shell|Head|Body)/.test(name);

export function MillExplorer({ src, alt, view, states, state, products, accent }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ setState: (s: MillState) => void; setAccent: (rgb: [number, number, number]) => void } | null>(null);
  const [near, setNear] = useState(false);
  const [shown, setShown] = useState(false);

  // Load only when the section is close to the screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "50% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near || !hostRef.current) return;
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { HDRLoader } = await import("three/examples/jsm/loaders/HDRLoader.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
      if (disposed || !hostRef.current) return;
      const host = hostRef.current;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 0.95;
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 500);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.6;
      controls.autoRotateSpeed = 0.35;

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);
      const [hdr, gltf] = await Promise.all([new HDRLoader().loadAsync("/models/env/studio.hdr"), loader.loadAsync(src)]);
      if (disposed) return;
      scene.environment = pmrem.fromEquirectangular(hdr).texture;
      hdr.dispose();

      // Centre the mill and frame it.
      const root = gltf.scene;
      const box = new THREE.Box3().setFromObject(root);
      const centre = box.getCenter(new THREE.Vector3());
      root.position.sub(centre);
      scene.add(root);
      const size = box.getSize(new THREE.Vector3());
      const radius = size.length() / 2;

      // Soft contact shadow under the mill (a blurred ellipse), fading as the mill opens.
      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = shadowCanvas.height = 256;
      const sc = shadowCanvas.getContext("2d")!;
      const grd = sc.createRadialGradient(128, 128, 0, 128, 128, 128);
      grd.addColorStop(0, "rgba(10,20,30,0.42)");
      grd.addColorStop(1, "rgba(10,20,30,0)");
      sc.fillStyle = grd;
      sc.fillRect(0, 0, 256, 256);
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(size.x * 1.25, size.z * 1.6),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -size.y / 2 - radius * 0.02;
      scene.add(shadow);

      // One controller per component group: its own explode uniform, colour and opacity springs.
      type Group = {
        name: string;
        group: string;
        mats: InstanceType<typeof THREE.MeshStandardMaterial>[];
        base: InstanceType<typeof THREE.Color>[];
        u: { value: number };
        amount: Spring;
        lit: Spring;
        alpha: Spring;
        /** Assembled centre (world) and mean travel direction, to frame the group once opened. */
        centre: InstanceType<typeof THREE.Vector3>;
        dir: InstanceType<typeof THREE.Vector3>;
        weight: number;
        box: InstanceType<typeof THREE.Box3>;
        rim: { value: InstanceType<typeof THREE.Color> };
      };
      const groups = new Map<string, Group>();
      root.traverse((o) => {
        const mesh = o as InstanceType<typeof THREE.Mesh>;
        if (!mesh.isMesh) return;
        mesh.frustumCulled = false;
        const src = mesh.material as InstanceType<typeof THREE.MeshStandardMaterial>;
        const name = src.name || "part";
        let g = groups.get(name);
        if (!g) {
          g = { name, group: name.split(":")[1] ?? name, mats: [], base: [], u: { value: 0 }, amount: spring(0), lit: spring(0), alpha: spring(1), centre: new THREE.Vector3(), dir: new THREE.Vector3(), weight: 0, box: new THREE.Box3(), rim: { value: new THREE.Color(0, 0, 0) } };
          groups.set(name, g);
        }
        const mat = src.clone();
        const ex = mesh.geometry.getAttribute("_explode");
        const hasExplode = Boolean(ex);
        // Centre and mean travel direction of this group (sampled), for framing.
        mesh.updateWorldMatrix(true, false);
        mesh.geometry.computeBoundingBox();
        const gb = mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
        const count = mesh.geometry.getAttribute("position").count;
        g.centre.addScaledVector(gb.getCenter(new THREE.Vector3()), count);
        g.box.union(gb);
        g.weight += count;
        if (ex) {
          const step = Math.max(1, Math.floor(ex.count / 2000));
          const sum = new THREE.Vector3();
          for (let k = 0; k < ex.count; k += step) sum.add(new THREE.Vector3(ex.getX(k), ex.getY(k), ex.getZ(k)));
          g.dir.add(sum.multiplyScalar(step));
        }
        const u = g.u;
        // Every finish gets a soft rim light (fresnel), lit only on the chosen component so its
        // silhouette reads crisply against the pale ghosts; take-apart models also move per part.
        const rim = g.rim;
        // Compressed models de-quantise positions with the mesh's own scale; travel is applied in
        // that local space, so divide it back out to move parts in true metres.
        const ws = mesh.getWorldScale(new THREE.Vector3());
        const invScale = { value: new THREE.Vector3(1 / ws.x, 1 / ws.y, 1 / ws.z) };
        mat.onBeforeCompile = (shader) => {
          shader.uniforms.uRim = rim;
          shader.fragmentShader = shader.fragmentShader
            .replace("#include <common>", "#include <common>\nuniform vec3 uRim;")
            .replace(
              "#include <emissivemap_fragment>",
              "#include <emissivemap_fragment>\nfloat rimF = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);\ntotalEmissiveRadiance += uRim * rimF;",
            );
          if (hasExplode) {
            shader.uniforms.uExplode = u;
            shader.uniforms.uInvScale = invScale;
            shader.vertexShader = shader.vertexShader
              .replace("#include <common>", "#include <common>\nattribute vec3 _explode;\nuniform float uExplode;\nuniform vec3 uInvScale;")
              .replace("#include <begin_vertex>", "#include <begin_vertex>\ntransformed += _explode * uExplode * uInvScale;");
          }
        };
        mat.customProgramCacheKey = () => (hasExplode ? "explode-rim" : "rim");
        mesh.material = mat;
        g.mats.push(mat);
        g.base.push(mat.color.clone());
      });

      for (const g of groups.values()) {
        if (g.weight) g.centre.divideScalar(g.weight);
        // Mean direction: radial groups cancel out (they open around the axis); axial ones keep theirs.
        const n = g.dir.length() / Math.max(1, g.weight);
        g.dir.normalize().multiplyScalar(Math.min(1, n));
      }

      // Separate products (grinding media, a fastener set), each shown on its own, centred and
      // filling the frame, when a state asks for it. Each sits in a pivot so it can be centred.
      type Product = { root: InstanceType<typeof THREE.Object3D>; show: Spring; scale: number };
      const productMap = new Map<string, Product>();
      for (const [key, def] of Object.entries(products ?? {})) {
        const entry: Product = { root: new THREE.Group(), show: spring(0), scale: 1 };
        productMap.set(key, entry);
        loader.loadAsync(def.src).then((p) => {
          if (disposed) return;
          const model = p.scene;
          const pb = new THREE.Box3().setFromObject(model);
          model.position.sub(pb.getCenter(new THREE.Vector3()));
          entry.root.add(model);
          entry.scale = (radius * def.scale) / (pb.getSize(new THREE.Vector3()).length() / 2);
          entry.root.scale.setScalar(0.0001);
          model.traverse((o) => {
            const m = (o as InstanceType<typeof THREE.Mesh>).material as InstanceType<typeof THREE.MeshStandardMaterial> | undefined;
            if (m) m.transparent = true;
          });
          scene.add(entry.root);
          wake();
        });
      }
      const productShow = { get x() { let m = 0; for (const p of productMap.values()) m = Math.max(m, p.show.x); return m; }, to: 0 };

      // Camera: default orbit, eased distance for open states.
      const fov = (camera.fov * Math.PI) / 180;
      const fit = (radius / Math.sin(fov / 2)) * (view.distance ?? 1);
      const zoom = spring(1);
      const sph = new THREE.Spherical(fit, (view.phi * Math.PI) / 180, (view.theta * Math.PI) / 180);
      camera.position.setFromSpherical(sph);
      controls.target.set(0, 0, 0);
      controls.update();

      const accentCol = new THREE.Color();
      const setAccent = (rgb: [number, number, number]) => accentCol.setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, THREE.SRGBColorSpace);
      setAccent(accent);

      let raf = 0, last = performance.now(), visible = true, frames = 0;
      const goal = new THREE.Vector3();
      let target: MillState = {};
      let homing = false;
      const setState = (s: MillState) => {
        target = s;
        const focus = s.focus ?? [];
        for (const g of groups.values()) {
          g.amount.to = s.amounts?.[g.group] ?? s.amounts?.[g.name] ?? 0;
          const inFocus = focus.includes(g.group) || focus.includes(g.name);
          g.lit.to = inFocus ? 1 : 0;
          const ghost = isStructure(g.name) ? Math.min(GHOST_STRUCTURE, (s.ghost ?? GHOST_PART) * 0.5) : (s.ghost ?? GHOST_PART);
          g.alpha.to = s.product ? 0 : focus.length && !inFocus ? ghost : 1;
        }
        for (const [key, p] of productMap) p.show.to = s.product === key ? 1 : 0;
        // Present the chosen component at the centre of the frame, sized to it: the box it fills
        // once opened (moved along its mean direction, grown by radial travel).
        goal.set(0, 0, 0);
        const fitBox = new THREE.Box3();
        for (const g of groups.values()) {
          if (!(focus.includes(g.group) || focus.includes(g.name))) continue;
          const moved = g.box.clone().translate(g.dir.clone().multiplyScalar(g.amount.to));
          const radial = g.amount.to * Math.max(0, 1 - g.dir.length());
          fitBox.union(moved.expandByVector(new THREE.Vector3(0, radial, radial)));
        }
        let fitted = 1;
        if (!fitBox.isEmpty()) {
          fitBox.getCenter(goal);
          const r = fitBox.getSize(new THREE.Vector3()).length() / 2;
          fitted = Math.min(1.6, Math.max(0.55, (r / radius) * 1.32));
        }
        zoom.to = s.zoom ?? (s.product ? 0.9 : fitted);
        const resting = !focus.length && !s.product;
        controls.autoRotate = resting;
        homing = !resting; // swing back to the default view so the opened parts face the reader
        wake();
      };
      apiRef.current = { setState, setAccent: (rgb) => (setAccent(rgb), wake()) };

      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        wake();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      resize();

      // Render only while something moves (or the turntable runs) and the mill is on screen.
      const tmp = new THREE.Color();
      const glow = new THREE.Color();
      const pale = new THREE.Color(0.86, 0.88, 0.91);
      const white = new THREE.Color(1, 1, 1);
      function frame() {
        raf = 0;
        frames++;
        // Own monotonic clock, never a negative step (a wake from inside the frame must not rewind it).
        const now = performance.now();
        const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
        last = now;
        let moving = false;
        for (const g of groups.values()) {
          moving = g.amount.step(dt, 34) || moving;
          moving = g.lit.step(dt, 60) || moving;
          moving = g.alpha.step(dt, 60) || moving;
          g.u.value = g.amount.x;
          const a = Math.max(0, Math.min(1, g.alpha.x));
          // Faded groups turn pale and see-through but keep writing depth, so each reads as one
          // clean ghosted solid rather than a tangle of overlapping inner faces.
          const fade = 1 - a;
          g.rim.value.copy(accentCol).multiplyScalar(1.1 * g.lit.x).lerp(white, 0.35 * g.lit.x);
          g.mats.forEach((m, i) => {
            tmp.copy(g.base[i]).lerp(pale, Math.min(1, fade * 1.1)).lerp(accentCol, g.lit.x * 0.7);
            m.color.copy(tmp);
            // Small parts (bolts) glow more so the lit pattern still reads at whole-mill scale.
            glow.copy(accentCol).multiplyScalar((g.group === "fasteners" ? 0.45 : 0.14) * g.lit.x);
            m.emissive.copy(glow);
            const fading = a < 0.995;
            if (m.transparent !== fading) { m.transparent = fading; m.needsUpdate = true; }
            m.opacity = a;
            m.depthWrite = true;
            m.visible = a > 0.01;
          });
        }
        for (const prod of productMap.values()) {
          moving = prod.show.step(dt, 50) || moving;
          const p = Math.max(0, prod.show.x);
          prod.root.visible = p > 0.002;
          prod.root.scale.setScalar(prod.scale * (0.82 + 0.18 * p));
          prod.root.position.y = (1 - p) * -radius * 0.15;
          prod.root.rotation.y += dt * 0.25 * p; // a slow turn while presented on its own
          if (p > 0.002) moving = true;
          prod.root.traverse((o) => {
            const m = (o as InstanceType<typeof THREE.Mesh>).material as InstanceType<typeof THREE.MeshStandardMaterial> | undefined;
            if (m) { m.opacity = p; m.depthWrite = p > 0.99; }
          });
        }
        moving = zoom.step(dt, 30) || moving;
        // The contact shadow follows what stands on the floor: the mill (fading as it opens), or a
        // smaller pool under a product shown on its own.
        const ps = Math.max(0, Math.min(1, productShow.x));
        (shadow.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = Math.max(0.15, 1 - Math.abs(zoom.x - 1) * 1.6) * (1 - 0.55 * ps);
        shadow.scale.setScalar(1 - 0.55 * ps);
        // Distance follows the zoom spring; direction stays where the reader dragged it, unless
        // a component was just chosen, then it eases back to the default view.
        const offset = camera.position.clone().sub(controls.target);
        const cur = new THREE.Spherical().setFromVector3(offset);
        cur.radius = fit * zoom.x;
        if (homing) {
          const dTheta = Math.atan2(Math.sin(sph.theta - cur.theta), Math.cos(sph.theta - cur.theta));
          const dPhi = sph.phi - cur.phi;
          cur.theta += dTheta * Math.min(1, dt * 4);
          cur.phi += dPhi * Math.min(1, dt * 4);
          if (Math.abs(dTheta) + Math.abs(dPhi) < 0.002) homing = false;
          else moving = true;
        }
        // View centre eases to the goal; the camera keeps its angle around it.
        const k = 1 - Math.exp(-dt * 3.2);
        const before = controls.target.clone();
        controls.target.lerp(goal, k);
        if (before.distanceToSquared(controls.target) > 1e-8) moving = true;
        camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(cur));
        moving = controls.update() || moving || controls.autoRotate;
        renderer.render(scene, camera);
        // controls.update() may already have queued the next frame (its "change" event wakes us):
        // never queue two, or callbacks would double every frame.
        if (moving && visible && !raf) raf = requestAnimationFrame(frame);
      }
      function wake() {
        if (!raf && visible) {
          // Coming back from idle: start the clock now so the first step is not a long jump.
          if (performance.now() - last > 100) last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      }
      controls.addEventListener("start", () => { homing = false; wake(); });
      controls.addEventListener("change", wake);
      const vis = new IntersectionObserver(([e]) => { visible = Boolean(e?.isIntersecting); if (visible) wake(); });
      vis.observe(host);

      setState(states[state] ?? {});
      if (process.env.NODE_ENV !== "production") {
        const w = window as unknown as { __mexp?: Record<string, unknown> };
        w.__mexp = { ...(w.__mexp ?? {}), [src]: { renderer, scene, camera, groups, productShow, get target() { return target; }, get raf() { return raf; }, get visible() { return visible; }, get frames() { return frames; }, goal, controls, zoom } };
      }
      renderer.render(scene, camera);
      setShown(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        vis.disconnect();
        controls.dispose();
        renderer.dispose();
        pmrem.dispose();
        scene.traverse((o) => {
          const m = o as InstanceType<typeof THREE.Mesh>;
          if (m.isMesh) {
            m.geometry.dispose();
            const mats = Array.isArray(m.material) ? m.material : [m.material];
            mats.forEach((x) => x.dispose());
          }
        });
        renderer.domElement.remove();
      };
    })().catch(() => undefined);
    return () => {
      disposed = true;
      apiRef.current = null;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the scene is built once per model
  }, [near, src]);

  useEffect(() => {
    apiRef.current?.setState(states[state] ?? {});
  }, [state, states, shown]);

  useEffect(() => {
    apiRef.current?.setAccent(accent);
  }, [accent, shown]);

  return <div ref={hostRef} className={`mexp ${shown ? "is-shown" : ""}`} role="img" aria-label={alt} />;
}

/** Critically damped spring towards `to` (no overshoot). Returns true while still moving. */
type Spring = { x: number; v: number; to: number; step: (dt: number, k: number) => boolean };
function spring(x: number): Spring {
  return {
    x,
    v: 0,
    to: x,
    step(dt, k) {
      const c = 2 * Math.sqrt(k);
      const a = k * (this.to - this.x) - c * this.v;
      this.v += a * dt;
      this.x += this.v * dt;
      const moving = Math.abs(this.to - this.x) > 1e-4 || Math.abs(this.v) > 1e-4;
      if (!moving) { this.x = this.to; this.v = 0; }
      return moving;
    },
  };
}
