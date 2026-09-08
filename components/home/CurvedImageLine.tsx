"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";

export type CurvedImage = {
  src: string;
  alt?: string;
};

type CurvedImageLineProps = {
  images: CurvedImage[];
  speed?: number;
  direction?: "left" | "right";
  curvature?: number;
  perspective?: number;
  cardWidth?: number;
  cardHeight?: number;
  spacing?: number;
  cornerRadius?: number;
  edgeFade?: boolean;
  backgroundColor?: string;
  className?: string;
};

/**
 * Port Next.js du composant Framer CurvedImageLine
 * https://framer.com/m/CurvedImageLine-Y2pHTM.js@5ory8Fs3esr2v2GWciTF
 */
export function CurvedImageLine({
  images,
  speed = 60,
  direction = "left",
  curvature = 280,
  perspective = 1200,
  cardWidth = 220,
  cardHeight = 300,
  spacing = 28,
  cornerRadius = 20,
  edgeFade = true,
  backgroundColor = "rgba(0,0,0,0)",
  className,
}: CurvedImageLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);

  const [isInView, setIsInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const preparedImages = useMemo(() => {
    const valid = (images || []).filter((img) => Boolean(img?.src));
    /* Dupliquer si peu d'images pour un loop plus dense (comme Framer) */
    if (valid.length > 0 && valid.length < 6) {
      return [...valid, ...valid];
    }
    return valid;
  }, [images]);

  const step = useMemo(
    () => Math.max(1, cardWidth + spacing),
    [cardWidth, spacing],
  );

  const cycleLength = useMemo(
    () => Math.max(step, preparedImages.length * step),
    [preparedImages.length, step],
  );

  const paintCards = (activeOffset: number) => {
    const halfSpan = cycleLength / 2;

    preparedImages.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      let x = i * step - activeOffset;
      x = ((x % cycleLength) + cycleLength) % cycleLength;
      if (x > halfSpan) x -= cycleLength;

      const distance = Math.min(1, Math.abs(x) / Math.max(1, halfSpan));
      const side = x < 0 ? 1 : -1;
      const rotateY = side * distance * 56;
      const z = -curvature * distance * distance;
      const scale = 1 - distance * 0.13;
      const opacity = edgeFade ? 1 - distance * 0.45 : 1;

      el.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.opacity = String(opacity);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    startTransition(() => setReducedMotion(media.matches));

    const handler = (event: MediaQueryListEvent) => {
      startTransition(() => setReducedMotion(event.matches));
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        startTransition(() => setIsInView(Boolean(entry?.isIntersecting)));
      },
      { threshold: 0.01 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* Position initiale / reset reduced-motion */
  useEffect(() => {
    paintCards(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- paint from current layout props
  }, [preparedImages, step, cycleLength, curvature, edgeFade, reducedMotion]);

  useEffect(() => {
    const canAnimate = !reducedMotion && isInView;

    if (typeof window === "undefined" || !canAnimate || preparedImages.length === 0) {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastTimeRef.current = null;
      paintCards(0);
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const dir = direction === "left" ? -1 : 1;
      offsetRef.current += dir * speed * dt;
      offsetRef.current =
        ((offsetRef.current % cycleLength) + cycleLength) % cycleLength;

      paintCards(offsetRef.current);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastTimeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animation closed over latest paintCards/layout
  }, [
    cycleLength,
    direction,
    isInView,
    preparedImages.length,
    reducedMotion,
    speed,
  ]);

  if (preparedImages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: backgroundColor,
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        {preparedImages.map((image, i) => (
          <div
            key={`${i}-${image.src}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              borderRadius: `${cornerRadius}px`,
              overflow: "hidden",
              transformStyle: "preserve-3d",
              transform: "translate3d(-50%, -50%, 0) rotateY(0deg) scale(1)",
              opacity: 1,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- curved carousel needs plain img for 3D transforms */}
            <img
              src={image.src}
              alt={image.alt || ""}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
