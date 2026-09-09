"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl, SITE } from "@/lib/site";

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-dark section-grain section-y relative overflow-hidden text-navy-foreground">
      {!reduceMotion && (
        <>
          <div
            className="ambient-orb ambient-orb-red pointer-events-none absolute -right-20 top-0 h-96 w-96 opacity-50"
            aria-hidden
          />
          <div
            className="ambient-orb ambient-orb-amber pointer-events-none absolute -left-16 bottom-0 h-80 w-80 opacity-40"
            aria-hidden
            style={{ animationDelay: "-6s" }}
          />
        </>
      )}
      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-amber-tech via-red-accent to-amber-tech" />

      <div className="container relative z-10">
        <Reveal className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-amber-tech">
            Prêt à démarrer
          </p>
          <h2 className="mt-4 text-balance text-2xl text-navy-foreground sm:text-3xl lg:text-5xl">
            Un essai, un diagnostic, un devis clair
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-foreground/75 sm:text-base lg:text-lg">
            Décrivez votre chantier en Algérie : étude de sol, étude de
            stabilité, contrôle béton, pressiomètre ou injection fissure béton —
            pour promoteurs, BE génie civil, architectes et entreprises BTP.
          </p>
          <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Demander un devis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="cta-outline" size="lg" className="w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-navy-foreground/75 backdrop-blur-sm transition-all duration-300 hover:border-amber-tech/40 hover:bg-white/10 hover:text-navy-foreground"
          >
            <Phone className="h-4 w-4 text-amber-tech" aria-hidden />
            {SITE.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
