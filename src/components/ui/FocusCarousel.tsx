"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";

export type FocusCarouselSlide = {
  id: string;
  kind?: "image" | "video";
  title: string;
  caption?: string;
  src?: string; // video URL (.mp4)
  image?: string; // poster or image URL
  link?: string;
  badge?: string;
};

export type FocusCarouselProps = {
  slides: readonly FocusCarouselSlide[];
  cardWidth?: number;
  cardRatio?: number;
  sideSize?: number;
  sideTaper?: number;
  slotGap?: number;
  sideSlots?: number;
  cornerRadius?: number;
  cueStyle?: "none" | "caret" | "corners" | "outline" | "rails";
  cueTint?: string;
  cueSize?: number;
  cueOffset?: number;
  cueWeight?: number;
  dragOn?: boolean;
  wheelMode?: "off" | "vertical" | "any";
  cycleOn?: boolean;
  cycleWait?: number;
  snapRate?: number;
  showControls?: boolean;
  className?: string;
  onActiveChange?: (index: number, slide: FocusCarouselSlide) => void;
};

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function modulo(n: number, m: number): number {
  return ((n % m) + m) % m;
}

interface ProjectionParams {
  w: number;
  h: number;
  gap: number;
  near: number;
  taper: number;
  fade: number;
  fadeStep: number;
  blurStep: number;
  blurMax: number;
  grey: number;
  dim: number;
  reach: number;
}

function createProjector(params: ProjectionParams) {
  const taper = Math.min(1, Math.max(0.5, params.taper));
  const isUniform = taper > 0.999;
  const logTaper = Math.log(taper);
  const baseStep = (params.w * (1 + params.near)) / 2 + params.gap;
  const sideStep = params.w * params.near + params.gap;

  return function project(offset: number) {
    const s = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;
    let scale: number;
    let dist: number;

    if (s <= 1) {
      scale = 1 + (params.near - 1) * s;
      dist = baseStep * s;
    } else {
      const rest = s - 1;
      if (isUniform) {
        scale = params.near;
        dist = baseStep + sideStep * rest;
      } else {
        const factor = taper ** rest;
        scale = params.near * factor;
        dist = baseStep + params.gap * rest + (params.w * params.near * (factor - 1)) / logTaper;
      }
    }

    const reachFade = clamp01(params.reach + 0.5 - s);
    const opacityFalloff =
      s <= 1 ? 1 + (params.fade - 1) * s : params.fade * (params.fadeStep ** (s - 1));
    const normalized = Math.min(1, s);

    return {
      w: params.w * scale,
      h: params.h * scale,
      x: (Number.isFinite(dist) ? dist : baseStep * s) * sign,
      alpha: clamp01(opacityFalloff * reachFade),
      grey: params.grey * normalized,
      dim: 1 - (1 - params.dim) * normalized,
      haze: Math.min(params.blurMax, params.blurStep * Math.max(0, s - 1)),
      depth: 400 - Math.round(s * 12),
    };
  };
}

function applyStyles(
  el: HTMLElement,
  data: ReturnType<ReturnType<typeof createProjector>>
) {
  const filters: string[] = [];
  if (data.grey > 0.005) filters.push(`grayscale(${data.grey.toFixed(3)})`);
  if (data.dim < 0.995) filters.push(`brightness(${data.dim.toFixed(3)})`);
  if (data.haze > 0.05) filters.push(`blur(${data.haze.toFixed(2)}px)`);

  el.style.width = `${data.w}px`;
  el.style.height = `${data.h}px`;
  el.style.opacity = String(data.alpha);
  el.style.zIndex = String(data.depth);
  el.style.filter = filters.length ? filters.join(" ") : "none";
  el.style.transform = `translate3d(${data.x.toFixed(2)}px, 0, 0) translate(-50%, -50%)`;
  el.style.visibility = data.alpha <= 0.001 ? "hidden" : "visible";
}

function FocusCue({
  style,
  size,
  offset,
  weight,
  tint,
}: {
  style: "none" | "caret" | "corners" | "outline" | "rails";
  size: number;
  offset: number;
  weight: number;
  tint: string;
}) {
  if (style === "none") return null;

  if (style === "outline") {
    return (
      <div
        className="pointer-events-none absolute"
        style={{
          inset: -offset,
          border: `${weight}px solid ${tint}`,
          borderRadius: size,
        }}
      />
    );
  }

  if (style === "caret") {
    return (
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -offset - size,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${size}px solid transparent`,
          borderRight: `${size}px solid transparent`,
          borderBottom: `${size * 1.2}px solid ${tint}`,
        }}
      />
    );
  }

  if (style === "rails") {
    return (
      <div className="pointer-events-none absolute inset-0">
        <div
          style={{
            position: "absolute",
            top: -offset,
            left: -size,
            right: -size,
            height: weight,
            background: tint,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -offset,
            left: -size,
            right: -size,
            height: weight,
            background: tint,
          }}
        />
      </div>
    );
  }

  if (style === "corners") {
    const corners = [
      { id: "tl", top: -offset, left: -offset },
      { id: "tr", top: -offset, right: -offset },
      { id: "bl", bottom: -offset, left: -offset },
      { id: "br", bottom: -offset, right: -offset },
    ];
    return (
      <div className="pointer-events-none absolute inset-0">
        {corners.map((c) => (
          <div
            key={c.id}
            style={{
              position: "absolute",
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right,
              width: size,
              height: size,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: weight,
                background: tint,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: weight,
                background: tint,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export function FocusCarousel({
  slides,
  cardWidth = 560,
  cardRatio = 16 / 10,
  sideSize = 0.64,
  sideTaper = 0.92,
  slotGap = 24,
  sideSlots = 4,
  cornerRadius = 16,
  cueStyle = "caret",
  cueTint = "#006eff",
  cueSize = 10,
  cueOffset = 16,
  cueWeight = 1.5,
  dragOn = true,
  wheelMode = "vertical",
  cycleOn = false,
  cycleWait = 4.5,
  snapRate = 6,
  showControls = true,
  className = "",
  onActiveChange,
}: FocusCarouselProps) {
  const reactId = useId();
  const scopeClass = `fpc-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const total = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [muted, setMuted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const cardElements = useRef<Map<number, HTMLDivElement>>(new Map());
  const videoElements = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Physics animation state
  const physics = useRef({
    pos: 0,
    vel: 0,
    aim: 0 as number | null,
    stiff: 220,
    held: false,
    moved: false,
    grabX: 0,
    grabPos: 0,
    trail: [] as { x: number; t: number }[],
    clock: 0,
    hover: false,
  });

  const activeIndexRef = useRef(0);
  const scaleRef = useRef(1);
  const rafId = useRef<number | null>(null);

  // Projection generator
  const getProjector = useCallback(() => {
    const s = scaleRef.current;
    const w = cardWidth * s;
    const h = w / Math.max(0.2, cardRatio);
    return createProjector({
      w,
      h,
      gap: slotGap * s,
      near: sideSize,
      taper: sideTaper,
      fade: 0.96,
      fadeStep: 0.82,
      blurStep: 3,
      blurMax: 12,
      grey: 0.65,
      dim: 0.92,
      reach: sideSlots,
    });
  }, [cardWidth, cardRatio, sideSize, sideTaper, slotGap, sideSlots]);

  // Synchronous visual update (direct DOM)
  const updateVisuals = useCallback(() => {
    const project = getProjector();
    const pos = physics.current.pos;

    cardElements.current.forEach((el, slotIndex) => {
      const data = project(slotIndex - pos);
      applyStyles(el, data);
    });

    const distFromInteger = Math.abs(pos - Math.round(pos));

    // Cue indicator reaction
    if (cueRef.current) {
      const cueScale = 1 - distFromInteger * 0.35;
      cueRef.current.style.transform = `translate(-50%, -50%) scale(${cueScale.toFixed(3)})`;
      cueRef.current.style.opacity = String(Math.max(0, 1 - distFromInteger * 0.9));
    }

    // Label reaction
    if (labelRef.current) {
      labelRef.current.style.opacity = String(Math.max(0, 1 - distFromInteger * 2.2));
    }
  }, [getProjector]);

  // Video playback management
  const updateVideos = useCallback(() => {
    const pos = physics.current.pos;
    const centerSlot = Math.round(pos);

    videoElements.current.forEach((video, slotIndex) => {
      const isFocused = slotIndex === centerSlot;
      if (isFocused) {
        if (video.paused) {
          video.play().catch(() => undefined);
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, []);

  // Set target slide index with spring physics
  const setAim = useCallback(
    (target: number, isSnap = false) => {
      const p = physics.current;
      p.aim = target;
      p.stiff = isSnap ? snapRate * 40 + 200 : 160;
      scheduleStep();
    },
    [snapRate]
  );

  // Main physics animation loop
  const stepPhysics = useCallback(
    (time: number) => {
      const p = physics.current;
      const dt = p.clock ? Math.min(0.05, (time - p.clock) / 1000) : 1 / 60;
      p.clock = time;

      if (!p.held) {
        if (p.aim === null) {
          // Inertia deceleration
          p.vel *= 0.955 ** (dt * 60);
          p.pos += p.vel * dt;

          if (Math.abs(p.vel) < 0.75) {
            p.aim = Math.round(p.pos + p.vel * 0.2);
            p.stiff = snapRate * 24 + 80;
          }
        } else {
          // Critically damped spring
          const damping = 2 * Math.sqrt(p.stiff);
          const accel = -p.stiff * (p.pos - p.aim) - damping * p.vel;
          p.vel += accel * dt;
          p.pos += p.vel * dt;
        }
      }

      // Detect rounded slide index change
      const roundedIndex = Math.round(p.pos);
      if (roundedIndex !== activeIndexRef.current) {
        activeIndexRef.current = roundedIndex;
        const normalized = modulo(roundedIndex, total);
        setActiveIndex(normalized);
        if (slides[normalized]) {
          onActiveChange?.(normalized, slides[normalized]);
        }
        updateVideos();
      }

      // Check if settled
      if (
        !p.held &&
        p.aim !== null &&
        Math.abs(p.vel) < 0.02 &&
        Math.abs(p.pos - p.aim) < 0.0015
      ) {
        p.pos = p.aim;
        p.vel = 0;
        p.clock = 0;
        updateVisuals();
        updateVideos();
        rafId.current = null;
        return;
      }

      updateVisuals();
      rafId.current = requestAnimationFrame(stepPhysics);
    },
    [snapRate, total, slides, onActiveChange, updateVideos, updateVisuals]
  );

  const scheduleStep = useCallback(() => {
    if (rafId.current === null) {
      physics.current.clock = 0;
      rafId.current = requestAnimationFrame(stepPhysics);
    }
  }, [stepPhysics]);

  // ResizeObserver to adapt smoothly across all screen sizes
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onResize = () => {
      const cw = stage.clientWidth;
      const ch = stage.clientHeight || 520;
      if (!cw || !ch) return;

      const baseH = cardWidth / Math.max(0.2, cardRatio);
      const labelSpace = 90;
      const availableH = Math.max(100, ch - labelSpace);

      // Fit card nicely within container with safety padding
      const s = Math.max(0.38, Math.min(1, (cw * 0.82) / cardWidth, availableH / baseH));
      if (Math.abs(s - scaleRef.current) > 0.002) {
        scaleRef.current = s;
        setScale(s);
        updateVisuals();
      }
    };

    onResize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [cardWidth, cardRatio, updateVisuals]);

  // Pointer drag events
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (total < 2 || !dragOn) return;

      const p = physics.current;
      p.held = true;
      p.moved = false;
      p.grabX = e.clientX;
      p.grabPos = p.pos;
      p.vel = 0;
      p.aim = null;
      p.trail = [{ x: e.clientX, t: e.timeStamp }];

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}

      scheduleStep();
    },
    [total, dragOn, scheduleStep]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const p = physics.current;
      if (!p.held || !dragOn) return;

      const dx = e.clientX - p.grabX;
      if (!p.moved && Math.abs(dx) > 4) {
        p.moved = true;
      }

      const dragSpan = Math.max(40, 240 * scaleRef.current);
      p.pos = p.grabPos - dx / dragSpan;
      p.trail.push({ x: e.clientX, t: e.timeStamp });

      while (p.trail.length > 2 && e.timeStamp - p.trail[0].t > 110) {
        p.trail.shift();
      }

      scheduleStep();
    },
    [dragOn, scheduleStep]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const p = physics.current;
      if (!p.held) return;
      p.held = false;

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}

      // Click on side card navigation
      if (!p.moved) {
        const stage = stageRef.current;
        if (stage) {
          const rect = stage.getBoundingClientRect();
          const clickX = e.clientX - (rect.left + rect.width / 2);
          const project = getProjector();
          const currentCenter = Math.round(p.pos);

          let bestSlot: number | null = null;
          let bestDist = Infinity;

          for (let s = currentCenter - sideSlots; s <= currentCenter + sideSlots; s++) {
            const data = project(s - p.pos);
            if (data.alpha <= 0.05) continue;
            const dist = Math.abs(clickX - data.x);
            if (dist <= data.w / 2 + 10 && dist < bestDist) {
              bestDist = dist;
              bestSlot = s;
            }
          }

          if (bestSlot !== null && bestSlot !== currentCenter) {
            setAim(bestSlot, true);
            return;
          }
        }

        p.aim = Math.round(p.pos);
        p.stiff = snapRate * 40 + 200;
        scheduleStep();
        return;
      }

      // Fling velocity calculation
      const trail = p.trail;
      let velocity = 0;
      if (trail.length >= 2) {
        const first = trail[0];
        const last = trail[trail.length - 1];
        const dt = last.t - first.t;
        if (dt > 0) {
          const dragSpan = Math.max(40, 240 * scaleRef.current);
          velocity = (-(last.x - first.x) / dragSpan) * (1000 / dt);
        }
      }

      p.trail = [];
      p.vel = Math.max(-24, Math.min(24, velocity));
      p.aim = Math.abs(p.vel) < 0.75 ? Math.round(p.pos) : null;
      if (p.aim !== null) {
        p.stiff = snapRate * 40 + 200;
      }

      scheduleStep();
    },
    [dragOn, getProjector, sideSlots, snapRate, setAim, scheduleStep]
  );

  // Wheel interaction
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || wheelMode === "off" || total < 2) return;

    let accumulated = 0;
    let timer: number | null = null;

    const onWheel = (e: WheelEvent) => {
      const mode = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
      const dx = e.deltaX * mode;
      const dy = e.deltaY * mode;
      const delta = wheelMode === "vertical" ? dy : Math.abs(dx) > Math.abs(dy) ? dx : dy;

      if (Math.abs(delta) < 4) return;
      e.preventDefault();

      accumulated += delta;
      if (Math.abs(accumulated) >= 90) {
        const dir = accumulated > 0 ? 1 : -1;
        accumulated = 0;
        const p = physics.current;
        const target = p.aim === null ? Math.round(p.pos) + dir : p.aim + dir;
        setAim(target, true);
      }

      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        accumulated = 0;
      }, 200);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      if (timer) window.clearTimeout(timer);
    };
  }, [wheelMode, total, setAim]);

  // Keyboard navigation
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (total < 2) return;
      const p = physics.current;
      const current = p.aim === null ? Math.round(p.pos) : p.aim;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setAim(current + 1, true);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setAim(current - 1, true);
      }
    },
    [total, setAim]
  );

  // Autoplay cycle
  useEffect(() => {
    if (!cycleOn || total < 2) return;
    const interval = window.setInterval(() => {
      const p = physics.current;
      if (p.held || p.hover) return;
      const target = p.aim === null ? Math.round(p.pos) + 1 : p.aim + 1;
      setAim(target, true);
    }, Math.max(1200, cycleWait * 1000));

    return () => window.clearInterval(interval);
  }, [cycleOn, cycleWait, total, setAim]);

  // Initial visual pass
  useEffect(() => {
    updateVisuals();
    updateVideos();
  }, [updateVisuals, updateVideos]);

  // Active slide details
  const activeSlide = slides[activeIndex];
  const centerW = cardWidth * scale;
  const centerH = centerW / Math.max(0.2, cardRatio);

  // Visible slots calculation
  const visibleCenter = activeIndexRef.current;
  const slotIndices: number[] = [];
  for (let s = visibleCenter - sideSlots; s <= visibleCenter + sideSlots; s++) {
    slotIndices.push(s);
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Interactive Showcase"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => {
        physics.current.hover = true;
      }}
      onMouseLeave={() => {
        physics.current.hover = false;
      }}
      style={{ outline: "none" }}
    >
      <style>{`
        .${scopeClass}-rise {
          animation: ${scopeClass}-up 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes ${scopeClass}-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Main stage where cards float and drift */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative flex min-h-[380px] w-full items-center justify-center overflow-hidden py-6 sm:min-h-[460px] md:min-h-[540px] lg:min-h-[600px]"
        style={{
          touchAction: "pan-y",
          cursor: dragOn && total > 1 ? "grab" : "default",
        }}
      >
        {/* Render visible carousel cards */}
        {slotIndices.map((slotIndex) => {
          const slide = slides[modulo(slotIndex, total)];
          const isCenter = slotIndex === visibleCenter;
          const isVideo = slide.kind === "video" || Boolean(slide.src);

          return (
            <div
              key={slotIndex}
              ref={(node) => {
                if (node) {
                  cardElements.current.set(slotIndex, node);
                } else {
                  cardElements.current.delete(slotIndex);
                }
              }}
              className="absolute left-1/2 top-1/2 overflow-hidden bg-[#041d2c]/10 shadow-[0_20px_60px_rgba(4,29,44,0.18)] will-change-[transform,opacity,filter]"
              style={{
                borderRadius: `${cornerRadius}px`,
                transformOrigin: "50% 50%",
              }}
            >
              {/* Media surface: Video or Image */}
              {isVideo && slide.src ? (
                <div className="relative h-full w-full">
                  <video
                    ref={(node) => {
                      if (node) {
                        videoElements.current.set(slotIndex, node);
                        node.muted = muted;
                        node.defaultMuted = muted;
                      } else {
                        videoElements.current.delete(slotIndex);
                      }
                    }}
                    src={slide.src}
                    poster={slide.image}
                    muted={muted}
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                  />
                  {/* Subtle vignette scrim */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                </div>
              ) : slide.image ? (
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 600px"
                    className="pointer-events-none object-cover"
                    priority={isCenter}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              ) : null}

              {/* Sound toggle on focused video */}
              {isVideo && isCenter && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = !muted;
                    setMuted(next);
                    videoElements.current.forEach((v) => {
                      v.muted = next;
                    });
                  }}
                  className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
                  aria-label={muted ? "Unmute audio" : "Mute audio"}
                >
                  {muted ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              )}

              {/* Badge if present */}
              {slide.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {slide.badge}
                </span>
              )}
            </div>
          );
        })}

        {/* Framing cue around the center focused card */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute left-1/2 top-1/2 will-change-[transform,opacity]"
          style={{
            width: centerW,
            height: centerH,
            transform: "translate(-50%, -50%)",
            zIndex: 500,
          }}
        >
          <FocusCue
            style={cueStyle}
            size={cueSize}
            offset={cueOffset}
            weight={cueWeight}
            tint={cueTint}
          />
        </div>

        {/* Animated metadata label directly below the active card */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute left-1/2 z-[600] will-change-opacity"
          style={{
            top: `calc(50% + ${centerH / 2}px + 24px)`,
            transform: "translateX(-50%)",
            width: `min(90vw, ${centerW}px)`,
          }}
        >
          {activeSlide && (
            <div
              key={`label-${activeIndex}`}
              className={`${scopeClass}-rise flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between`}
            >
              <div>
                <h3 className="m-0 font-[family-name:var(--font-haas)] text-[1.15rem] font-bold tracking-tight text-aia-navy sm:text-[1.35rem]">
                  {activeSlide.title}
                </h3>
              </div>
              {activeSlide.caption && (
                <p className="m-0 font-[family-name:var(--font-haas)] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-aia-accent sm:text-[0.92rem]">
                  {activeSlide.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls: Prev / Next Arrows and Bullet Pagination */}
      {showControls && (
        <div className="mt-8 flex items-center justify-center gap-5 sm:mt-10">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setAim(physics.current.aim === null ? Math.round(physics.current.pos) - 1 : physics.current.aim - 1, true)}
            className="flex size-11 items-center justify-center rounded-full border border-aia-navy/15 bg-white text-aia-navy shadow-sm transition hover:border-aia-accent hover:bg-aia-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aia-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Indicator dots */}
          <div className="flex items-center gap-2">
            {slides.map((slide, i) => {
              const isCurrent = i === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Jump to ${slide.title}`}
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={() => {
                    const currentPos = physics.current.pos;
                    const normalizedCurrent = modulo(Math.round(currentPos), total);
                    let diff = i - normalizedCurrent;
                    if (diff > total / 2) diff -= total;
                    if (diff < -total / 2) diff += total;
                    setAim(Math.round(currentPos) + diff, true);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCurrent ? "w-8 bg-aia-accent" : "w-2 bg-aia-navy/20 hover:bg-aia-navy/40"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setAim(physics.current.aim === null ? Math.round(physics.current.pos) + 1 : physics.current.aim + 1, true)}
            className="flex size-11 items-center justify-center rounded-full border border-aia-navy/15 bg-white text-aia-navy shadow-sm transition hover:border-aia-accent hover:bg-aia-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aia-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

