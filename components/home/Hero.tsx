"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import {
  CurvedImageLine,
  type CurvedImage,
} from "@/components/home/CurvedImageLine";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

type HeroProps = {
  curvedImages: CurvedImage[];
};

function useHeroCurve() {
  const [curve, setCurve] = useState({
    curvature: 160,
    cardWidth: 140,
    cardHeight: 196,
    spacing: 16,
    perspective: 900,
  });

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCurve({
          curvature: 120,
          cardWidth: 120,
          cardHeight: 168,
          spacing: 12,
          perspective: 800,
        });
      } else if (w < 768) {
        setCurve({
          curvature: 180,
          cardWidth: 150,
          cardHeight: 210,
          spacing: 16,
          perspective: 1000,
        });
      } else if (w < 1024) {
        setCurve({
          curvature: 220,
          cardWidth: 170,
          cardHeight: 238,
          spacing: 20,
          perspective: 1100,
        });
      } else {
        setCurve({
          curvature: 280,
          cardWidth: 200,
          cardHeight: 280,
          spacing: 24,
          perspective: 1200,
        });
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return curve;
}

export function Hero({ curvedImages }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const curve = useHeroCurve();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy text-navy-foreground sm:min-h-[92vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_45%,rgba(232,162,39,0.18),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(196,48,43,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />

      {!reduceMotion && (
        <>
          <div className="ambient-orb ambient-orb-amber left-[8%] top-[20%] h-56 w-56 opacity-40" />
          <div
            className="ambient-orb ambient-orb-red bottom-[18%] right-[12%] h-72 w-72 opacity-30"
            style={{ animationDelay: "-4s" }}
          />
        </>
      )}

      <div className="container relative z-10 grid min-h-[100svh] items-center gap-8 pb-12 pt-24 sm:min-h-[92vh] sm:gap-10 sm:pb-16 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6 lg:pb-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-amber-tech sm:text-sm"
          >
            {SITE.name}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 text-balance text-[1.85rem] font-bold leading-[1.1] tracking-tight text-navy-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Laboratoire géotechnique et béton{" "}
            <span className="bg-gradient-to-r from-white via-amber-tech/90 to-white bg-clip-text text-transparent">
              à Alger
            </span>
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Demander un devis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="cta-outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/services">Voir nos services</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex w-full max-w-lg flex-col items-center gap-2"
          >
            <p className="inline-flex items-center gap-2 text-sm text-navy-foreground/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-tech opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-tech" />
              </span>
              <Phone className="h-4 w-4 text-amber-tech" aria-hidden />
              Appelez-nous
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SITE.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-navy-foreground/90 backdrop-blur-sm transition-all duration-300 hover:border-amber-tech/50 hover:bg-white/10 hover:text-navy-foreground"
                >
                  {phone.display}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="relative h-[260px] w-full sm:h-[380px] md:h-[420px] lg:h-[520px] lg:min-h-[520px]"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-navy to-transparent sm:w-16 md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-navy to-transparent sm:w-16 md:w-24" />
          <CurvedImageLine
            images={curvedImages}
            speed={60}
            direction="left"
            curvature={curve.curvature}
            perspective={curve.perspective}
            cardWidth={curve.cardWidth}
            cardHeight={curve.cardHeight}
            spacing={curve.spacing}
            cornerRadius={16}
            edgeFade
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
