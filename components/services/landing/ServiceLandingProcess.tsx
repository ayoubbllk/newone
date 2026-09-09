"use client";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import type { ServiceLanding } from "@/lib/serviceLandings";

type Props = {
  landing: ServiceLanding;
};

export function ServiceLandingProcess({ landing }: Props) {
  return (
    <section className="section-darker section-grain section-y relative">
      <div
        className="industrial-blueprint pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
      />

      <div className="container relative z-10">
        <Reveal className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
            Protocole
          </p>
          <h2 className="mt-3 text-balance text-2xl text-navy-foreground sm:text-3xl lg:text-4xl">
            {landing.processTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
            {landing.processLede}
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-0 sm:mt-16 lg:grid-cols-4">
          {landing.process.map((step, i) => (
            <RevealItem key={step.title}>
              <article className="group relative border-t border-white/15 px-0 py-6 sm:border-t-0 sm:border-l sm:px-5 sm:py-0 lg:min-h-[220px] first:sm:border-l-0 first:sm:pl-0">
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-amber-tech transition-all duration-500 group-hover:w-16 sm:left-5 sm:top-0 first:sm:left-0" />
                <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-amber-tech/90">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-foreground sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-foreground/65">
                  {step.text}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
