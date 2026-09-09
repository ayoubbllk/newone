"use client";

import { Award, Clock3, ShieldCheck, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Essais normés",
    text: "Protocoles de laboratoire et de chantier alignés sur les exigences techniques du BTP.",
  },
  {
    icon: Wrench,
    title: "Matériel pro (APAGEO & injection DE)",
    text: "Pressiomètre APAGEO et technologie d’injection allemande pour des interventions précises.",
  },
  {
    icon: Award,
    title: "Équipe d’ingénieurs",
    text: "Interprétation des résultats et conseils concrets pour vos fondations et structures.",
  },
  {
    icon: Clock3,
    title: "Réactivité terrain",
    text: "Disponibilité rapide pour les contrôles urgents et le suivi de vos phases critiques.",
  },
] as const;

export function WhyUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-light section-grain section-mesh section-y relative">
      <div
        className="ambient-orb ambient-orb-amber pointer-events-none absolute right-[10%] top-8 h-56 w-56 opacity-35"
        aria-hidden
      />

      <div className="container relative z-10">
        <Reveal className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
            Pourquoi nous choisir
          </p>
          <h2 className="mt-3 text-balance text-2xl text-navy sm:text-3xl lg:text-4xl">
            Un laboratoire technique, pas un simple prestataire d’essais
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-text sm:text-base">
            LEAGB combine mesure, diagnostic et accompagnement en Algérie pour
            les promoteurs immobiliers, bureaux d’études génie civil,
            architectes et entreprises de travaux publics et de bâtiment.
          </p>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <RevealItem key={reason.title} interactive>
              <motion.article
                whileHover={
                  reduceMotion
                    ? undefined
                    : { scale: 1.02, transition: { duration: 0.25 } }
                }
                className="group relative h-full overflow-hidden rounded-2xl border border-navy/10 bg-white/80 p-5 text-center shadow-[0_12px_40px_-24px_rgba(11,42,74,0.35)] backdrop-blur-sm transition-colors duration-300 hover:border-amber-tech/40 sm:p-6 sm:text-left"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber-tech to-red-accent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-amber-tech transition-all duration-300 group-hover:bg-amber-tech group-hover:text-navy group-hover:shadow-[0_8px_24px_-8px_rgba(232,162,39,0.7)] sm:mx-0">
                  <reason.icon className="h-6 w-6" aria-hidden />
                </div>
                <p className="mt-5 font-display text-[0.65rem] font-semibold tabular-nums tracking-[0.2em] text-navy/35">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-text">
                  {reason.text}
                </p>
              </motion.article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
