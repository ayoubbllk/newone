"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,162,39,0.18),_transparent_55%)]" />
      <div className="container relative py-12 sm:py-16 lg:py-20">
        <Reveal className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
            Services
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-foreground sm:text-4xl lg:text-5xl">
            Essais géotechniques et contrôle béton, du terrain au laboratoire
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-navy-foreground/75 sm:text-base lg:text-lg">
            Cinq expertises pour sécuriser vos fondations, contrôler vos bétons
            et traiter les désordres structurels — avec un matériel professionnel
            et une lecture claire des résultats.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10"
        >
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className={cn(
                "border border-white/15 px-3 py-2 text-sm text-navy-foreground/80 transition-colors hover:border-amber-tech/50 hover:text-navy-foreground"
              )}
            >
              {service.title}
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <Link
            href="/contact"
            className="text-sm font-semibold text-navy-foreground/70 underline-offset-4 hover:text-navy-foreground hover:underline"
          >
            Besoin d’orientation ? Contactez-nous
          </Link>
        </Reveal>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-red-accent via-amber-tech to-transparent" />
    </section>
  );
}
