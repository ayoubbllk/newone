"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

type ProjectCard = {
  title: string;
  wilaya: string;
  service: string;
  image: string;
};

type ProjectsPreviewProps = {
  projects: ProjectCard[];
};

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  return (
    <section className="section-sand section-grain section-y relative">
      <div className="container relative z-10">
        <Reveal className="section-header flex flex-col items-center gap-6">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
              Projets
            </p>
            <h2 className="mt-3 text-balance text-2xl sm:text-3xl lg:text-4xl">
              Des chantiers accompagnés sur le terrain
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-text sm:text-base">
              Aperçu de missions types — études de sol, contrôles béton et
              sondages pour des projets résidentiels et d’infrastructure.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full shrink-0 sm:w-fit">
            <Link href="/projets">
              Voir tous les projets
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <RevealItem key={project.title} interactive>
              <article className="group card-lift h-full overflow-hidden rounded-2xl border border-navy/10 bg-white">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-amber-tech px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy">
                    {project.wilaya}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-navy transition-colors group-hover:text-red-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-text">{project.service}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Voir le projet
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
