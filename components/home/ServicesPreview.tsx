"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

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

export function ServicesPreview({ slides }: ServicesPreviewProps) {
  const reduceMotion = useReducedMotion();
  if (!slides.length) return null;

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
            Quatre expertises pour sécuriser vos ouvrages
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

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="section-header mb-10 text-base font-medium leading-snug tracking-tight text-white/70 sm:mb-14 sm:text-xl lg:text-2xl"
        >
          Étude de sol, étude de stabilité, contrôle béton et traitement des
          fissures pour sécuriser vos ouvrages en Algérie.
        </motion.p>

        <RevealStagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {slides.map((slide) => (
            <RevealItem key={slide.id} interactive>
              <Link
                href={slide.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-amber-tech/50 hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                    {slide.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {slide.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-tech transition-colors group-hover:text-white">
                    Voir le service
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-10 flex items-center justify-center sm:mt-14">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white">
              Voir tous les services
            </span>
            <ArrowRight className="h-4 w-4 text-amber-tech transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
