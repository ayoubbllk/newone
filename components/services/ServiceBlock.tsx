"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import type { PublicImage } from "@/lib/getImages";
import type { Service } from "@/lib/services";
import { buildWhatsAppUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type ServiceBlockProps = {
  service: Service;
  image?: PublicImage;
  index: number;
};

export function ServiceBlock({ service, image, index }: ServiceBlockProps) {
  const reverse = index % 2 === 1;
  const dark = index % 2 === 0;

  return (
    <section
      id={service.id}
      className={cn(
        "scroll-mt-28",
        dark ? "bg-navy text-navy-foreground" : "bg-offwhite text-navy"
      )}
    >
      <div
        className={cn(
          "container grid items-center gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        <Reveal>
          {image ? (
            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden",
                dark ? "ring-1 ring-white/10" : "border border-navy/10"
              )}
            >
              <Image
                src={image.src}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex aspect-[4/3] flex-col justify-end p-8",
                dark
                  ? "bg-gradient-to-br from-navy via-[#0e3558] to-[#163a5c]"
                  : "border border-navy/10 bg-white"
              )}
            >
              <p
                className={cn(
                  "font-display text-xs font-semibold uppercase tracking-[0.22em]",
                  dark ? "text-amber-tech" : "text-red-accent"
                )}
              >
                Diagnostic
              </p>
              <p
                className={cn(
                  "mt-4 max-w-sm font-display text-2xl font-semibold leading-snug",
                  dark ? "text-navy-foreground" : "text-navy"
                )}
              >
                Essai non destructif — intervention adaptée à votre ouvrage.
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.08} className="text-center">
          <p
            className={cn(
              "font-display text-xs font-semibold uppercase tracking-[0.22em]",
              dark ? "text-amber-tech" : "text-red-accent"
            )}
          >
            Service {String(index + 1).padStart(2, "0")}
          </p>
          <h2
            className={cn(
              "mt-3 text-balance text-2xl sm:text-3xl lg:text-4xl",
              dark && "text-navy-foreground"
            )}
          >
            {service.title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 max-w-xl text-sm leading-relaxed sm:text-base",
              dark ? "text-navy-foreground/80" : "text-slate-text"
            )}
          >
            {service.description}
          </p>

          <h3
            className={cn(
              "mt-8 font-display text-sm font-semibold uppercase tracking-[0.16em]",
              dark ? "text-navy-foreground" : "text-navy"
            )}
          >
            Ce que l’essai permet de vérifier
          </h3>
          <ul className="mx-auto mt-4 max-w-md space-y-2.5 text-left lg:mx-0">
            {service.checks.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex items-start gap-2.5 text-sm leading-relaxed",
                  dark ? "text-navy-foreground/85" : "text-navy"
                )}
              >
                <Check
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    dark ? "text-amber-tech" : "text-red-accent"
                  )}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              variant="cta"
              size="lg"
              className="w-full font-semibold sm:w-auto"
            >
              <a
                href={buildWhatsAppUrl(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Demander cet essai
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "w-full sm:w-auto",
                dark &&
                  "border-white/25 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
              )}
            >
              <Link href="/contact">Formulaire contact</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
