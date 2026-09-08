"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICES_FAQ } from "@/lib/services";

export function ServicesFaq() {
  return (
    <section className="bg-white section-y">
      <div className="container max-w-3xl">
        <Reveal className="section-header">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-red-accent">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-2xl sm:text-3xl lg:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-text sm:text-base">
            Délais, zones d’intervention, types de chantiers — les réponses
            utiles avant de planifier un essai.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {SERVICES_FAQ.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="font-display text-base text-navy hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
