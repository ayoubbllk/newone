"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PublicImage } from "@/lib/getImages";
import type { ServiceLanding } from "@/lib/serviceLandings";
import { SITE, buildWhatsAppUrl } from "@/lib/site";

type Props = {
  landing: ServiceLanding;
  image?: PublicImage;
  whatsappMessage: string;
};

export function ServiceLandingHero({
  landing,
  image,
  whatsappMessage,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-navy-foreground sm:min-h-[92vh]">
      {/* Full-bleed visual plane */}
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image.src}
            alt={landing.heroHeadline}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#0a2340] via-navy to-[#05121f]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/35 sm:via-navy/82 sm:to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/40" />
        <div
          className="industrial-blueprint absolute inset-0 opacity-[0.22]"
          aria-hidden
        />
      </div>

      {/* Signature: bande construction diagonale */}
      <div
        className="pointer-events-none absolute -right-16 top-0 hidden h-full w-24 origin-top-right skew-x-[-18deg] bg-gradient-to-b from-amber-tech/80 via-amber-tech/25 to-transparent lg:block"
        aria-hidden
      />

      <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:min-h-[92vh] sm:pb-20 sm:pt-32 lg:justify-center lg:pb-24">
        <div className="max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-amber-tech">
              {SITE.name}
            </span>
            <span
              className="hidden h-px w-8 bg-white/25 sm:block"
              aria-hidden
            />
            <span className="font-mono text-[0.7rem] font-medium tracking-[0.18em] text-white/55">
              {landing.code} · ALGÉRIE
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="mt-5 text-balance text-[1.85rem] font-bold leading-[1.08] tracking-tight text-navy-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {landing.heroHeadline}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-navy-foreground/80 sm:text-base lg:text-lg"
          >
            {landing.heroLede}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Demander un devis
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
          </motion.div>

          <motion.a
            href={`tel:${SITE.phoneTel}`}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="mt-8 inline-flex w-fit items-center gap-2 border border-white/15 bg-white/5 px-4 py-2 text-sm text-navy-foreground/80 backdrop-blur-sm transition-all duration-300 hover:border-amber-tech/50 hover:bg-white/10 hover:text-navy-foreground"
          >
            <Phone className="h-4 w-4 text-amber-tech" aria-hidden />
            {SITE.phoneDisplay}
          </motion.a>
        </div>

        {/* Coins blueprint — signature industrielle */}
        <div
          className="pointer-events-none absolute bottom-6 right-4 hidden h-16 w-16 border-b border-r border-amber-tech/50 sm:bottom-10 sm:right-8 lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-4 top-24 hidden h-16 w-16 border-r border-t border-white/20 sm:right-8 sm:top-28 lg:block"
          aria-hidden
        />
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-tech via-red-accent to-transparent" />
    </section>
  );
}
