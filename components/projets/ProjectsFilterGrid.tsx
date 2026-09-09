"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/lib/projects";
import { SERVICES, type ServiceId } from "@/lib/services";
import { cn } from "@/lib/utils";

export type ProjectWithImage = Project & {
  image: string;
  serviceLabel: string;
  serviceHref: string;
};

type ProjectsFilterGridProps = {
  projects: ProjectWithImage[];
};

const FILTER_LABELS: Record<ServiceId | "all", string> = {
  all: "Tous",
  "etude-sol": "Étude de sol",
  "etude-stabilite": "Étude de stabilité",
  "controle-beton": "Contrôle béton",
  "injection-beton": "Traitement et injection des fissures de béton",
};

export function ProjectsFilterGrid({ projects }: ProjectsFilterGridProps) {
  const [filter, setFilter] = useState<ServiceId | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.serviceId === filter);
  }, [filter, projects]);

  return (
    <section className="bg-offwhite pb-20 pt-10 sm:pb-28 sm:pt-12">
      <div className="container">
        <Reveal>
          <div
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label="Filtrer par type de service"
          >
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label={FILTER_LABELS.all}
            />
            {SERVICES.map((service) => (
              <FilterChip
                key={service.id}
                active={filter === service.id}
                onClick={() => setFilter(service.id)}
                label={FILTER_LABELS[service.id]}
              />
            ))}
          </div>
        </Reveal>

        <p className="mt-6 text-sm text-slate-text">
          {filtered.length} projet{filtered.length > 1 ? "s" : ""} affiché
          {filtered.length > 1 ? "s" : ""}
        </p>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
                className="group flex h-full flex-col overflow-hidden border border-navy/10 bg-white"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-navy/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-4 pt-12">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-foreground">
                      <MapPin className="h-3.5 w-3.5 text-amber-tech" aria-hidden />
                      {project.wilaya}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-accent">
                    {project.serviceLabel}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-navy">
                    {project.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-text">
                    {project.summary}
                  </p>
                  <Link
                    href={project.serviceHref}
                    className="mt-5 inline-flex text-sm font-semibold text-navy transition-colors hover:text-red-accent"
                  >
                    Voir le service associé
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-slate-text">
            Aucun projet pour ce filtre — sélectionnez une autre catégorie.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-2 text-left text-sm transition-colors",
        active
          ? "border-navy bg-navy text-navy-foreground"
          : "border-navy/15 bg-white text-navy hover:border-navy/40"
      )}
    >
      {label}
    </button>
  );
}
