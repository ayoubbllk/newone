"use client";

import { Reveal } from "@/components/motion/Reveal";

export function ProjectsHero() {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="container py-12 sm:py-16 lg:py-20">
        <Reveal className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
            Projets
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-foreground sm:text-4xl lg:text-5xl">
            Étude de sol, contrôle béton et chantiers en Algérie
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-navy-foreground/75 sm:text-base lg:text-lg">
            Missions pour promoteurs, bureaux d’études, architectes et
            entreprises TP / bâtiment — filtrez par service (étude de
            stabilité, injection fissure béton…).
          </p>
        </Reveal>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-amber-tech via-red-accent to-transparent" />
    </section>
  );
}
