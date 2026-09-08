"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type ProofStory = {
  image: string;
  metric: string;
  quote: string;
  name: string;
  role: string;
};

type ProofChainShowcaseProps = {
  stories: ProofStory[];
  className?: string;
};

/* Cadres 1:1 — les bannières matériel sont carrées */
const PANEL_W = 720;
const PANEL_H = 720;
const SIDE_W = 128;
const SIDE_H_RATIO = 128 / 720;
const TAPER = 0.62;
const GAP = 14;
const SIDE_COUNT = 1;
const INTERVAL = 5;
const GLIDE = 0.72;

const TINTS = [
  "linear-gradient(145deg, #E8EEF6 0%, #C5D0E0 100%)",
  "linear-gradient(145deg, #F3EDE6 0%, #DCCFC0 100%)",
  "linear-gradient(145deg, #EEF2F7 0%, #B8C6D6 100%)",
  "linear-gradient(145deg, #F7F0E4 0%, #E0D0B0 100%)",
  "linear-gradient(145deg, #E8EDF4 0%, #A8B8CC 100%)",
];

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function ringOffset(index: number, active: number, size: number) {
  if (size < 1) return 0;
  let raw = (index - active) % size;
  if (raw > size / 2) raw -= size;
  if (raw < -size / 2) raw += size;
  return raw;
}

function floatOffset(index: number, position: number, size: number) {
  if (size < 1) return 0;
  let raw = (index - position) % size;
  if (raw > size / 2) raw -= size;
  if (raw < -size / 2) raw += size;
  return raw;
}

function buildSeats(
  panelW: number,
  panelH: number,
  rings: number,
  firstW: number,
  firstRatio: number,
  taper: number,
  gap: number
) {
  const seats: { w: number; h: number; centre: number }[] = [];
  let edge = panelW / 2;
  for (let step = 1; step <= rings + 1; step++) {
    const shrink = Math.pow(taper, step - 1);
    const w = Math.max(14, firstW * shrink);
    const h = Math.max(28, panelH * firstRatio * shrink);
    edge = edge + gap + w;
    seats.push({ w, h, centre: edge - w / 2 });
  }
  return seats;
}

/**
 * Port animé proche de ProofChainPro (Framer) :
 * anneau de cartes, glide RAF, autoplay, drag — cadres 1:1.
 */
export function ProofChainShowcase({
  stories,
  className,
}: ProofChainShowcaseProps) {
  const count = stories.length;
  const hostRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameEls = useRef<(HTMLDivElement | null)[]>([]);
  const photoEls = useRef<(HTMLDivElement | null)[]>([]);

  const posRef = useRef(0);
  const targetRef = useRef(0);
  const spentRef = useRef(0);
  const rafRef = useRef(0);
  const clockRef = useRef(0);
  const leadRef = useRef(0);
  const dragRef = useRef({
    active: false,
    from: 0,
    moved: 0,
    origin: 0,
    lastX: 0,
    lastAt: 0,
    speed: 0,
  });
  const detachRef = useRef<(() => void) | null>(null);
  const autoRef = useRef(true);
  const calmRef = useRef(false);
  const gateRef = useRef(true);
  const paintRef = useRef<(() => void) | null>(null);

  const [lead, setLead] = useState(0);
  const [held, setHeld] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [onScreen, setOnScreen] = useState(true);

  const depth = Math.min(SIDE_COUNT, Math.max(0, Math.floor((count - 1) / 2)));
  const ring = useMemo(() => {
    const safe = Math.max(1, count);
    return safe * Math.max(1, Math.ceil((2 * depth + 3) / safe));
  }, [count, depth]);

  const seats = useMemo(
    () => buildSeats(PANEL_W, PANEL_H, depth, SIDE_W, SIDE_H_RATIO, TAPER, GAP),
    [depth]
  );

  /* Measure host */
  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const measure = () => {
      const r = node.getBoundingClientRect();
      setBox((prev) =>
        Math.abs(prev.w - r.width) < 1 && Math.abs(prev.h - r.height) < 1
          ? prev
          : { w: r.width, h: r.height }
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  /* Intersection + reduced motion */
  useEffect(() => {
    const node = hostRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setOnScreen(e.isIntersecting);
      },
      { rootMargin: "120px", threshold: 0.01 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      calmRef.current = mq.matches;
    };
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const layout = useMemo(() => {
    const boxW = box.w || PANEL_W + 220;
    const stacked = boxW < 720;
    const availW = Math.max(260, boxW - 8);

    if (stacked) {
      const dW = Math.min(availW * 0.78, 420);
      const dH = dW;
      return { stacked: true, k: 1, depth: 0, dW, dH, seats };
    }

    let d = depth;
    if (boxW < 1100) d = Math.min(d, 1);

    /* Carte centrale — -50 % vs taille précédente sur PC */
    const centerShare = d > 0 ? 0.84 : 0.94;
    const targetCenterW = availW * centerShare * 0.35;
    const k = clamp(targetCenterW / PANEL_W, 0.28, 0.7);

    return {
      stacked: false,
      k,
      depth: d,
      dW: PANEL_W,
      dH: PANEL_H,
      seats,
    };
  }, [box.w, depth, seats]);

  const k = layout.k;
  const panelH = layout.dH * k;
  const seatStep = (layout.seats[0]?.centre ?? layout.dW * 0.6) * k;
  const stride = Math.max(60, seatStep * 0.8);

  const perchAt = useCallback(
    (offset: number) => {
      const distance = Math.abs(offset);
      if (distance === 0) {
        return {
          x: 0,
          w: layout.dW * k,
          h: layout.dH * k,
          r: 28 * k,
          pad: 0,
          op: 1,
        };
      }
      const seat =
        layout.seats[Math.min(distance, layout.depth + 1) - 1] ||
        layout.seats[layout.seats.length - 1] || {
          w: 24,
          h: 24,
          centre: layout.dW * 0.7,
        };
      const sign = offset > 0 ? 1 : -1;
      return {
        x: sign * seat.centre * k,
        w: seat.w * k,
        h: seat.h * k,
        r: Math.max(8, 28 * Math.pow(TAPER, distance) * k),
        pad: 0,
        op: distance <= layout.depth ? 1 : 0,
      };
    },
    [layout, k]
  );

  const paint = useCallback(() => {
    const pos = posRef.current;
    const base = Math.floor(pos);
    const fraction = pos - base;
    const from = ((base % ring) + ring) % ring;
    const to = (from + 1) % ring;

    for (let slot = 0; slot < ring; slot++) {
      const node = frameEls.current[slot];
      if (!node) continue;
      const offsetFrom = ringOffset(slot, from, ring);
      const offsetTo = ringOffset(slot, to, ring);
      const a = perchAt(offsetFrom);
      const recycled = Math.abs(offsetFrom - offsetTo) > 1.5;
      let x = a.x;
      let w = a.w;
      let h = a.h;
      let r = a.r;
      let pad = a.pad;
      let op = a.op;

      if (recycled) {
        op = 0;
      } else if (fraction > 0) {
        const b = perchAt(offsetTo);
        x = a.x + (b.x - a.x) * fraction;
        w = a.w + (b.w - a.w) * fraction;
        h = a.h + (b.h - a.h) * fraction;
        r = a.r + (b.r - a.r) * fraction;
        pad = a.pad + (b.pad - a.pad) * fraction;
        op = a.op + (b.op - a.op) * fraction;
      }

      const near = Math.abs(floatOffset(slot, pos, ring));
      node.style.width = `${w}px`;
      node.style.height = `${h}px`;
      node.style.transform = `translate3d(${x - w / 2}px, ${-h / 2}px, 0)`;
      node.style.opacity = `${op}`;
      node.style.borderRadius = `${r}px`;
      node.style.padding = `${pad}px`;
      node.style.zIndex = `${Math.max(1, 24 - Math.round(near * 3))}`;
      node.style.pointerEvents = op > 0.55 ? "auto" : "none";
      node.style.boxShadow =
        near < 0.5
          ? "0px 26px 70px 0px rgba(11,42,74,0.28)"
          : "0 10px 28px rgba(11,42,74,0.12)";

      const photo = photoEls.current[slot];
      if (photo) photo.style.borderRadius = `${Math.max(3, r - pad)}px`;
    }

    if (panelRef.current) {
      const drift = Math.abs(floatOffset(leadRef.current, pos, ring));
      panelRef.current.style.opacity = `${clamp(1 - drift * 2, 0, 1)}`;
    }

    const nearest = (((Math.round(pos) % ring) + ring) % ring);
    if (nearest !== leadRef.current) {
      leadRef.current = nearest;
      setLead(nearest);
    }
  }, [ring, perchAt]);

  paintRef.current = paint;

  useEffect(() => {
    paint();
  }, [paint, stories, layout]);

  const autoPlay = count > 1 && !held && !hovered && !calmRef.current;
  autoRef.current = autoPlay;
  gateRef.current = onScreen;

  const wake = useCallback(() => {
    if (rafRef.current || !gateRef.current || typeof window === "undefined")
      return;
    clockRef.current = 0;

    const tick = (now: number) => {
      if (!gateRef.current) {
        rafRef.current = 0;
        clockRef.current = 0;
        return;
      }
      if (!clockRef.current) clockRef.current = now;
      const delta = Math.min(0.064, (now - clockRef.current) / 1000);
      clockRef.current = now;

      const drag = dragRef.current;
      if (!drag.active) {
        const gap = targetRef.current - posRef.current;
        if (Math.abs(gap) < 8e-4 || calmRef.current) {
          posRef.current = targetRef.current;
        } else {
          posRef.current +=
            gap * (1 - Math.pow(0.0016, delta / GLIDE));
        }
      }

      if (autoRef.current && !drag.active) {
        spentRef.current += delta;
        if (spentRef.current >= INTERVAL) {
          spentRef.current = 0;
          targetRef.current = Math.round(targetRef.current) + 1;
        }
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleX(${clamp(
            spentRef.current / INTERVAL,
            0,
            1
          )})`;
        }
      }

      paintRef.current?.();

      const settled =
        !drag.active && Math.abs(targetRef.current - posRef.current) < 8e-4;
      if (settled && !autoRef.current) {
        const size = ring;
        const resting =
          ((Math.round(posRef.current) % size) + size) % size;
        posRef.current = resting;
        targetRef.current = resting;
        paintRef.current?.();
        rafRef.current = 0;
        clockRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [ring]);

  useEffect(() => {
    if (!onScreen) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      return;
    }
    wake();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      detachRef.current?.();
      detachRef.current = null;
    };
  }, [onScreen, autoPlay, wake]);

  const nudge = useCallback(
    (direction: number) => {
      if (count < 2) return;
      spentRef.current = 0;
      if (fillRef.current) fillRef.current.style.transform = "scaleX(0)";
      targetRef.current = Math.round(targetRef.current) + direction;
      wake();
    },
    [count, wake]
  );

  const settleOn = useCallback(
    (slot: number) => {
      if (count < 1) return;
      spentRef.current = 0;
      if (fillRef.current) fillRef.current.style.transform = "scaleX(0)";
      const here = posRef.current;
      const shift = floatOffset(slot, here, ring);
      targetRef.current = Math.round(here + shift);
      wake();
    },
    [count, ring, wake]
  );

  const settleOnStory = useCallback(
    (storyIndex: number) => {
      if (count < 1) return;
      let best = storyIndex;
      let bestGap = Infinity;
      for (let c = storyIndex; c < ring; c += count) {
        const gap = Math.abs(floatOffset(c, posRef.current, ring));
        if (gap < bestGap) {
          bestGap = gap;
          best = c;
        }
      }
      settleOn(best);
    },
    [count, ring, settleOn]
  );

  const beginDrag = (clientX: number) => {
    if (count < 2 || typeof window === "undefined") return;
    detachRef.current?.();
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    dragRef.current = {
      active: true,
      from: clientX,
      moved: 0,
      origin: posRef.current,
      lastX: clientX,
      lastAt: now,
      speed: 0,
    };
    setHeld(true);
    spentRef.current = 0;
    if (fillRef.current) fillRef.current.style.transform = "scaleX(0)";
    wake();

    const follow = (x: number) => {
      const drag = dragRef.current;
      if (!drag.active) return;
      const stamp =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const elapsed = Math.max(8, stamp - drag.lastAt) / 1000;
      drag.moved = x - drag.from;
      let reach = -drag.moved / stride;
      if (Math.abs(reach) > 1) {
        reach =
          Math.sign(reach) *
          Math.min(1.16, 1 + (Math.abs(reach) - 1) * 0.14);
      }
      const next = drag.origin + reach;
      const rate = (next - posRef.current) / elapsed;
      drag.speed = drag.speed * 0.72 + rate * 0.28;
      drag.lastX = x;
      drag.lastAt = stamp;
      posRef.current = next;
      targetRef.current = next;
      paintRef.current?.();
    };

    const finish = () => {
      const drag = dragRef.current;
      if (!drag.active) return;
      drag.active = false;
      setHeld(false);
      detachRef.current?.();
      detachRef.current = null;
      const flick = clamp(drag.speed * 0.2, -1, 1);
      const hop = clamp(
        Math.round(posRef.current - drag.origin + flick),
        -1,
        1
      );
      targetRef.current = Math.round(drag.origin) + hop;
      wake();
    };

    const onPointerMove = (e: PointerEvent) => follow(e.clientX);
    const onPointerEnd = () => finish();
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches?.length) follow(e.touches[0].clientX);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onPointerEnd);
    window.addEventListener("touchcancel", onPointerEnd);

    detachRef.current = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onPointerEnd);
      window.removeEventListener("touchcancel", onPointerEnd);
    };
  };

  if (!count) return null;

  const liveStory = lead % count;
  const front = stories[liveStory] ?? stories[0];

  const frames = [];
  for (let slot = 0; slot < ring; slot++) {
    const storyIndex = slot % count;
    const entry = stories[storyIndex];
    const isFront = slot === lead;
    frames.push(
      <div
        key={`slot-${slot}`}
        ref={(node) => {
          frameEls.current[slot] = node;
        }}
        onClick={() => {
          if (Math.abs(dragRef.current.moved) > 6) return;
          if (!isFront) settleOn(slot);
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          opacity: 0,
          background: "#FFFFFF",
          boxSizing: "border-box",
          overflow: "hidden",
          cursor: isFront ? "inherit" : "pointer",
        }}
      >
        <div
          ref={(node) => {
            photoEls.current[slot] = node;
          }}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            background: TINTS[storyIndex % TINTS.length],
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.image}
            alt={entry.name}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />
        </div>

        {isFront ? (
          <div
            ref={panelRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              background: TINTS[liveStory % TINTS.length],
              overflow: "hidden",
              opacity: 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={front.image}
              alt={front.metric || front.name}
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section
      className={cn(
        "section-light section-grain section-mesh section-y relative",
        className
      )}
      aria-label="Matériel LEAGB"
    >
      <div
        className="ambient-orb ambient-orb-amber pointer-events-none absolute -right-16 top-8 h-64 w-64 opacity-40"
        aria-hidden
      />
      <div
        className="ambient-orb ambient-orb-navy pointer-events-none absolute -left-20 bottom-0 h-72 w-72 opacity-50"
        aria-hidden
        style={{ animationDelay: "-3s" }}
      />

      <div className="container relative z-10 mb-6 sm:mb-8">
        <div className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
            Notre matériel
          </p>
          <h2 className="mt-3 text-balance text-2xl text-navy sm:text-3xl lg:text-4xl">
            Équipements en vitrine
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-text sm:text-base">
            Carrousel animé — chaque équipement présenté à taille réelle.
          </p>
        </div>
      </div>

      <div
        ref={hostRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer stories"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nudge(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudge(-1);
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-col items-center justify-center px-2 outline-none sm:px-4"
        style={{
          minHeight: Math.max(
            panelH + (layout.stacked ? 72 : 100),
            layout.stacked ? 360 : 280
          ),
        }}
      >
        <div
          ref={railRef}
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            beginDrag(e.clientX);
          }}
          onTouchStart={(e) => {
            if (dragRef.current.active) return;
            if (e.touches.length === 1) beginDrag(e.touches[0].clientX);
          }}
          onDragStart={(e) => e.preventDefault()}
          style={{
            position: "relative",
            width: "100%",
            height: Math.max(panelH, layout.stacked ? 240 : 200),
            flex: "0 0 auto",
            touchAction: "pan-y",
            userSelect: "none",
            cursor: count > 1 ? (held ? "grabbing" : "grab") : "default",
          }}
        >
          {frames}
        </div>

        <div className="mt-7 flex items-center justify-center gap-3.5">
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => nudge(-1)}
            className="nav-chip h-[38px] w-[38px]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {stories.map((_, i) => {
              const on = i === liveStory;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Story ${i + 1}`}
                  onClick={() => settleOnStory(i)}
                  className="overflow-hidden rounded-full"
                  style={{
                    width: on ? 56 : 8,
                    height: 8,
                    background: on
                      ? "rgba(11,42,74,0.14)"
                      : "rgba(11,42,74,0.2)",
                    transition: "width 320ms cubic-bezier(0.22,0.61,0.36,1)",
                  }}
                >
                  {on ? (
                    <div
                      ref={fillRef}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 999,
                        background: "#D42A2A",
                        transformOrigin: "left center",
                        transform: "scaleX(0)",
                      }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Suivant"
            onClick={() => nudge(1)}
            className="nav-chip h-[38px] w-[38px]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
