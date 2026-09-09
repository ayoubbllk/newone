"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import type { ServiceLanding } from "@/lib/serviceLandings";
import { SITE, buildWhatsAppUrl } from "@/lib/site";

type Props = {
  landing: ServiceLanding;
  whatsappMessage: string;
};

export function ServiceLandingCta({ landing, whatsappMessage }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-darker section-grain section-y relative overflow-hidden text-navy-foreground">
      {!reduceMotion && (
        <div
          className="ambient-orb ambient-orb-amber pointer-events-none absolute -right-16 top-0 h-80 w-80 opacity-40"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-tech via-red-accent to-amber-tech"
        aria-hidden
      />

      <div className="container relative z-10">
        <Reveal className="max-w-3xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-amber-tech">
            {landing.code} · Devis
          </p>
          <h2 className="mt-4 text-balance text-2xl text-navy-foreground sm:text-3xl lg:text-5xl">
            Lancez votre {landing.primaryKeyword.toLowerCase()} en Algérie
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-foreground/75 sm:text-base lg:text-lg">
            Indiquez la localisation du chantier et l’échéance — LEAGB vous
            oriente vers le protocole adapté.
          </p>
          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp devis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="cta-outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/contact">Formulaire contact</Link>
            </Button>
          </div>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-8 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-sm text-navy-foreground/75 backdrop-blur-sm transition-all duration-300 hover:border-amber-tech/40 hover:bg-white/10 hover:text-navy-foreground"
          >
            <Phone className="h-4 w-4 text-amber-tech" aria-hidden />
            {SITE.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
