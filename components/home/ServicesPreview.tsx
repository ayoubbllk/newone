"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type ServiceSlide = {
  id: string;
  title: string;
  short: string;
  href: string;
  image: string;
  imageAlt: string;
};

type ServicesPreviewProps = {
  slides: ServiceSlide[];
};

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServicesPreview({ slides }: ServicesPreviewProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [run, setRun] = useState(0);

  const current = slides[active] ?? slides[0];
  if (!current) return null;

  const select = (index: number) => {
    if (index === active) return;
    setPrevious(active);
    setRun((n) => n + 1);
    setActive(index);
  };

  return (
    <section
      className="section-dark section-grain relative overflow-hidden text-white"
      aria-labelledby="services-hover-heading"
    >
      <div
        className="ambient-orb ambient-orb-amber pointer-events-none absolute -right-10 top-10 h-80 w-80 opacity-30"
        aria-hidden
      />
      <div
        className="ambient-orb ambient-orb-red pointer-events-none absolute -left-16 bottom-20 h-72 w-72 opacity-25"
        aria-hidden
        style={{ animationDelay: "-5s" }}
      />

      <div className="container relative z-10 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-header mb-8 flex flex-col items-center gap-3 sm:mb-12"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-amber-tech">
            Nos services
          </p>
          <h2
            id="services-hover-heading"
            className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-5xl"
          >
            Cinq expertises pour sécuriser vos ouvrages
          </h2>
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="mx-auto h-px w-24 origin-center bg-white/25 sm:w-40"
            aria-hidden
          />
        </motion.header>

        {/* Intro */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="section-header mb-10 text-base font-medium leading-snug tracking-tight text-white/70 sm:mb-14 sm:text-xl lg:text-2xl"
        >
          Du contrôle béton à l’étude de sol et à l’injection fissure béton,
          LEAGB intervient en Algérie pour promoteurs, BE génie civil,
          architectes et entreprises TP / bâtiment.
        </motion.p>

        {/* Columns: preview card + list */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 xl:gap-20">
          {/* Sticky preview card */}
          <div className="mx-auto w-full max-w-md shrink-0 lg:sticky lg:top-28 lg:mx-0 lg:w-[min(100%,380px)] lg:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={
                  reduceMotion ? false : { opacity: 0.7, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-4">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={current.image}
                      alt={current.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 380px"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      priority={active === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {current.short}
                  </p>
                </div>

                <Link
                  href={current.href}
                  className="group relative flex h-[52px] w-full items-center justify-between overflow-hidden rounded-full border border-white/80 bg-transparent px-5 text-sm font-semibold text-white transition-all duration-300 hover:border-amber-tech hover:bg-amber-tech hover:text-navy"
                >
                  <span>Voir le service</span>
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Oversized service list */}
          <div className="min-w-0 flex-1">
            <ul className="flex flex-col gap-7 sm:gap-8" aria-label="Expertises LEAGB">
              {slides.map((slide, index) => {
                const isActive = index === active;
                const isLeaving =
                  previous === index && previous !== active;

                return (
                  <li key={slide.id} className="flex flex-col gap-3">
                    <button
                      type="button"
                      onMouseEnter={() => select(index)}
                      onFocus={() => select(index)}
                      onClick={() => select(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "group flex w-full items-center justify-center gap-3 text-center font-display tracking-tight transition-opacity duration-350 sm:gap-5 lg:justify-start lg:text-left",
                        "text-[clamp(1.35rem,5.5vw,3.25rem)] leading-[1.05]",
                        isActive
                          ? "font-semibold text-white opacity-100"
                          : "font-medium text-white opacity-35 hover:opacity-65"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          key={`sparkle-${index}-${run}`}
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, scale: 0.5, rotate: -45 }
                          }
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="text-amber-tech"
                        >
                          <Sparkle className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
                        </motion.span>
                      )}
                      <span>{slide.title}</span>
                    </button>

                    <div className="relative h-px w-full overflow-hidden bg-white/15">
                      {isLeaving && !reduceMotion && (
                        <span
                          key={`shrink-${index}-${run}`}
                          className="absolute inset-0 origin-right bg-amber-tech"
                          style={{
                            animation: "fehpl-shrink 0.45s ease-out forwards",
                          }}
                        />
                      )}
                      {isActive && (
                        <span
                          key={`expand-${index}-${run}`}
                          className="absolute inset-0 origin-left bg-amber-tech"
                          style={{
                            animation: reduceMotion
                              ? undefined
                              : "fehpl-expand 0.45s ease-out forwards",
                            transform: reduceMotion ? "scaleX(1)" : undefined,
                          }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex items-center justify-center gap-3 sm:mt-14 lg:justify-start">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-tech text-navy shadow-[0_10px_28px_-10px_rgba(232,162,39,0.55)] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-105">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white">
                  Voir tous les services
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
