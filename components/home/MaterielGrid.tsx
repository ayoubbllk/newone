"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PublicImage } from "@/lib/getImages";
import { getMaterielMeta } from "@/lib/materielMeta";

type MaterielGridProps = {
  images: PublicImage[];
};

const AUTOPLAY_S = 4.5;
const SPRING = { type: "spring" as const, stiffness: 95, damping: 16, mass: 0.8 };

/** Subtle navy shifts per slide — industrial, not rainbow */
const SLIDE_BG = ["#0A1624", "#0C1A2E", "#091320", "#0E1F33", "#0B1828", "#0D1C30"];

type Slide = {
  image: PublicImage;
  title: string;
  description: string;
  backgroundColor: string;
};

function LetterTitle({
  text,
  direction,
  reduceMotion,
}: {
  text: string;
  direction: 1 | -1;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return (
      <h3 className="flex flex-wrap justify-center font-display text-[clamp(1.75rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:justify-start sm:text-[clamp(2.4rem,6vw,4.5rem)]">
        {text}
      </h3>
    );
  }

  return (
    <motion.h3
      className="flex flex-wrap justify-center font-display text-[clamp(1.75rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:justify-start sm:text-[clamp(2.4rem,6vw,4.5rem)]"
      custom={direction}
      variants={{
        enter: (dir: number) => ({
          transition: { staggerChildren: 0.025, staggerDirection: dir },
        }),
        center: {
          transition: { staggerChildren: 0.025, staggerDirection: 1 },
        },
        exit: (dir: number) => ({
          transition: { staggerChildren: 0.02, staggerDirection: -dir },
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${text}-${i}-${char}`}
          custom={direction}
          variants={{
            enter: (dir: number) => ({
              opacity: 0,
              y: dir > 0 ? 28 : -28,
              filter: "blur(8px)",
            }),
            center: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
            },
            exit: (dir: number) => ({
              opacity: 0,
              y: dir > 0 ? -28 : 28,
              filter: "blur(8px)",
            }),
          }}
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h3>
  );
}

export function MaterielGrid({ images }: MaterielGridProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<() => void>(() => {});

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<Slide | null>(null);

  const slides: Slide[] = images.map((image, i) => {
    const meta = getMaterielMeta(image);
    return {
      image,
      title: meta.title,
      description: meta.description,
      backgroundColor: SLIDE_BG[i % SLIDE_BG.length],
    };
  });

  const total = slides.length;
  const centerIdx = total ? ((index % total) + total) % total : 0;
  const prevIdx = total ? (centerIdx - 1 + total) % total : 0;
  const nextIdx = total ? (centerIdx + 1) % total : 0;
  const current = slides[centerIdx];

  const goNext = useCallback(() => {
    if (total < 2) return;
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (total < 2) return;
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  nextRef.current = goNext;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay en boucle infinie (revient au 1er après le dernier)
  useEffect(() => {
    if (reduceMotion || paused || !inView || total < 2) return;
    const id = window.setInterval(() => nextRef.current(), AUTOPLAY_S * 1000);
    return () => clearInterval(id);
  }, [reduceMotion, paused, inView, total, index]);

  if (!current || total === 0) return null;

  const lightboxMeta = lightbox;

  return (
    <section className="section-darker section-grain relative">
      <div className="container relative z-10 pt-12 sm:pt-16 lg:pt-20">
        <Reveal className="section-header">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-amber-tech">
            Notre matériel
          </p>
          <h2 className="mt-3 text-balance text-2xl text-white sm:text-3xl lg:text-4xl">
            Un parc d’équipements pour des essais fiables
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            Instruments de chantier et de laboratoire — navigation automatique
            ou manuelle.
          </p>
        </Reveal>
      </div>

      <motion.div
        ref={containerRef}
        className="relative z-10 mt-8 overflow-hidden sm:mt-10"
        style={{ minHeight: isMobile ? 480 : 620 }}
        animate={{ backgroundColor: current.backgroundColor }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Parc d’équipements LEAGB"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_70%_50%,rgba(232,162,39,0.1),transparent_60%)]" />

        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:gap-0 sm:px-12 sm:py-14">
          {/* Title — letter wave */}
          <div className="z-10 flex w-full flex-col items-center justify-center text-center sm:w-1/2 sm:items-start sm:pr-8 sm:text-left">
            <p className="mb-3 font-display text-xs tabular-nums tracking-[0.28em] text-amber-tech/80">
              {String(centerIdx + 1).padStart(2, "0")}
              <span className="mx-2 text-white/25">/</span>
              {String(total).padStart(2, "0")}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center sm:justify-start"
              >
                <LetterTitle
                  text={current.title}
                  direction={direction}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={current.description}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:mx-0 sm:text-base"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Image stack / fan */}
          <div className="relative flex h-[300px] w-full items-center justify-center sm:h-[420px] sm:w-1/2">
            <AnimatePresence initial={false} custom={direction}>
              {/* Previous (desktop) — top-left tilted */}
              {!isMobile && slides[prevIdx] && (
                <motion.button
                  key={`prev-${prevIdx}-${index}`}
                  type="button"
                  onClick={goPrev}
                  aria-label="Équipement précédent"
                  className="absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                  style={{ width: "min(280px, 70%)", height: 260, zIndex: 2 }}
                  initial={
                    reduceMotion
                      ? false
                      : direction === 1
                        ? {
                            transform:
                              "translateX(0px) translateY(0%) scale(1) rotate(0deg)",
                            opacity: 1,
                            filter: "blur(0px)",
                          }
                        : {
                            transform:
                              "translateX(-190px) translateY(-180%) scale(0.7) rotate(-32deg)",
                            opacity: 0,
                            filter: "blur(8px)",
                          }
                  }
                  animate={{
                    transform:
                      "translateX(-95px) translateY(-90%) scale(1.05) rotate(-16deg)",
                    opacity: 0.4,
                    filter: "blur(4px)",
                  }}
                  transition={reduceMotion ? { duration: 0 } : SPRING}
                >
                  <Image
                    src={slides[prevIdx].image.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="280px"
                    draggable={false}
                  />
                </motion.button>
              )}

              {/* Center main */}
              <motion.button
                key={`center-${centerIdx}`}
                type="button"
                onClick={() => setLightbox(current)}
                aria-label={`${current.title} — agrandir`}
                className="absolute z-[4] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.5)] outline-none ring-amber-tech/0 transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-amber-tech"
                style={{
                  width: isMobile ? "min(100%, 340px)" : "min(380px, 88%)",
                  height: isMobile ? 280 : 320,
                }}
                initial={
                  reduceMotion
                    ? false
                    : isMobile
                      ? { opacity: 0, scale: 0.95 }
                      : direction === 1
                        ? {
                            y: "92%",
                            x: -30,
                            rotate: 12,
                            scale: 0.85,
                            opacity: 0.25,
                            filter: "blur(5px)",
                          }
                        : {
                            transform:
                              "translateX(-95px) translateY(-90%) scale(1.05) rotate(-16deg)",
                            opacity: 0.4,
                            filter: "blur(4px)",
                          }
                }
                animate={{
                  transform: "translateX(0px) translateY(0%) scale(1) rotate(0deg)",
                  opacity: 1,
                  x: 0,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  rotate: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.92,
                        filter: "blur(4px)",
                      }
                }
                transition={reduceMotion ? { duration: 0.2 } : SPRING}
              >
                <Image
                  src={current.image.src}
                  alt={current.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 380px"
                  priority={centerIdx === 0}
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111c]/50 via-transparent to-transparent" />
              </motion.button>

              {/* Next (desktop) — bottom tilted */}
              {!isMobile && slides[nextIdx] && (
                <motion.button
                  key={`next-${nextIdx}-${index}`}
                  type="button"
                  onClick={goNext}
                  aria-label="Équipement suivant"
                  className="absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                  style={{ width: "min(280px, 70%)", height: 260, zIndex: 1 }}
                  initial={
                    reduceMotion
                      ? false
                      : direction === 1
                        ? {
                            y: "184%",
                            x: -60,
                            rotate: 24,
                            scale: 0.7,
                            opacity: 0,
                            filter: "blur(5px)",
                          }
                        : {
                            y: 0,
                            x: 0,
                            rotate: 0,
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                          }
                  }
                  animate={{
                    y: "92%",
                    x: -30,
                    rotate: 12,
                    scale: 0.85,
                    opacity: 0.4,
                    filter: "blur(4px)",
                  }}
                  transition={reduceMotion ? { duration: 0 } : SPRING}
                >
                  <Image
                    src={slides[nextIdx].image.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="280px"
                    draggable={false}
                  />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Flèches au milieu, aux extrémités des photos */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Précédent"
                  className="nav-chip-dark absolute left-0 top-1/2 z-20 -translate-y-1/2 sm:left-1"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Suivant"
                  className="nav-chip-dark absolute right-0 top-1/2 z-20 -translate-y-1/2 sm:right-1"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog
        open={!!lightbox}
        onOpenChange={(open) => !open && setLightbox(null)}
      >
        <DialogContent className="max-w-4xl overflow-hidden rounded-none border border-white/10 bg-[#07111c] p-0 text-navy-foreground sm:rounded-none">
          {lightboxMeta && (
            <>
              <div className="relative aspect-[16/10] w-full bg-black/50">
                <Image
                  src={lightboxMeta.image.src}
                  alt={lightboxMeta.title}
                  fill
                  sizes="90vw"
                  className="object-contain p-6"
                />
              </div>
              <DialogHeader className="space-y-2 border-t border-white/10 px-6 py-5 text-left">
                <DialogTitle className="font-display text-navy-foreground">
                  {lightboxMeta.title}
                </DialogTitle>
                <DialogDescription className="text-white/65">
                  {lightboxMeta.description}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
