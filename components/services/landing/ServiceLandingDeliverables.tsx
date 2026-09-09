"use client";

import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import type { Service } from "@/lib/services";
import type { ServiceLanding } from "@/lib/serviceLandings";

type Props = {
  landing: ServiceLanding;
  service: Service;
};

export function ServiceLandingDeliverables({ landing, service }: Props) {
  return (
    <section className="section-light section-mesh section-y relative">
      <div className="container relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
              Livrables
            </p>
            <h2 className="mt-3 text-balance text-2xl text-navy sm:text-3xl lg:text-4xl">
              {landing.deliverablesTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-text sm:text-base">
              {landing.deliverablesLede}
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-navy/80 sm:text-[0.95rem]">
              {service.description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="divide-y divide-navy/10 border border-navy/10 bg-white/70 backdrop-blur-sm">
              {service.checks.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-4 px-5 py-4 transition-colors duration-300 hover:bg-amber-tech/5 sm:px-6 sm:py-5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-navy/15 bg-navy text-[0.65rem] font-semibold tracking-wider text-amber-tech">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm leading-relaxed text-navy sm:text-[0.95rem]">
                    {item}
                  </span>
                  <Check
                    className="mt-0.5 hidden h-4 w-4 shrink-0 text-red-accent sm:block"
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
