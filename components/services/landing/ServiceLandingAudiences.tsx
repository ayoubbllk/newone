"use client";

import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import type { ServiceLanding } from "@/lib/serviceLandings";

type Props = {
  landing: ServiceLanding;
};

export function ServiceLandingAudiences({ landing }: Props) {
  return (
    <section className="section-sand section-grain section-y relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-navy/[0.04] blur-3xl"
        aria-hidden
      />

      <div className="container relative z-10">
        <Reveal className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
            Pour qui
          </p>
          <h2 className="mt-3 text-balance text-2xl text-navy sm:text-3xl lg:text-4xl">
            Interlocuteurs du projet
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-text sm:text-base">
            {landing.audiencePitch}
          </p>
        </Reveal>

        <RevealStagger className="mt-10 border-t border-navy/15 sm:mt-14">
          {landing.audiencePoints.map((row, i) => (
            <RevealItem key={row.audience}>
              <div className="group grid gap-3 border-b border-navy/15 py-6 transition-colors duration-300 hover:bg-white/50 sm:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] sm:gap-8 sm:py-7 lg:grid-cols-[5rem_minmax(0,0.38fr)_minmax(0,0.55fr)]">
                <p className="font-mono text-[0.7rem] font-semibold tracking-[0.18em] text-navy/35 transition-colors group-hover:text-amber-tech">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-lg font-semibold capitalize text-navy sm:text-xl">
                  {row.audience}
                </h3>
                <p className="text-sm leading-relaxed text-slate-text sm:text-[0.95rem]">
                  {row.point}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
