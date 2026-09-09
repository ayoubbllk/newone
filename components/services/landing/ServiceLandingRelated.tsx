"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import type { ServiceLanding } from "@/lib/serviceLandings";

type Props = {
  related: ServiceLanding[];
};

export function ServiceLandingRelated({ related }: Props) {
  if (related.length === 0) return null;

  return (
    <section className="section-dark section-grain section-y relative">
      <div
        className="industrial-blueprint pointer-events-none absolute inset-0 opacity-[0.1]"
        aria-hidden
      />

      <div className="container relative z-10">
        <Reveal className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
            Continuer
          </p>
          <h2 className="mt-3 text-balance text-2xl text-navy-foreground sm:text-3xl lg:text-4xl">
            Autres expertises LEAGB
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
            Complétez votre dossier technique avec les missions associées.
          </p>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-px bg-white/10 sm:mt-12 sm:grid-cols-2">
          {related.map((item) => (
            <RevealItem key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="group flex h-full flex-col justify-between bg-navy p-6 transition-colors duration-300 hover:bg-[#0e3558] sm:p-8"
              >
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.2em] text-amber-tech/80">
                    {item.code}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold text-navy-foreground sm:text-2xl">
                    {item.primaryKeyword}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-foreground/65">
                    {item.heroLede}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-tech">
                  Voir la mission
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.1} className="mt-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-navy-foreground/60 underline-offset-4 transition-colors hover:text-navy-foreground hover:underline"
          >
            Voir tous les services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
