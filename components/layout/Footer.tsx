import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { socialIconMap } from "@/components/social/SocialIcons";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-tech to-red-accent" />

      <div className="container grid gap-10 py-12 text-center sm:py-14 md:grid-cols-2 md:text-left lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col items-center md:items-start lg:col-span-1">
          <BrandLogo size="md" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
            {SITE.fullName} à Chéraga — étude de sol, contrôle béton et
            injection fissure béton pour promoteurs, BE génie civil, architectes
            et entreprises TP / bâtiment en Algérie.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-amber-tech">
            Navigation
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-navy-foreground/75 transition-colors hover:text-navy-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-amber-tech">
            Coordonnées
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
            <li>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-start justify-center gap-2 transition-colors hover:text-navy-foreground md:justify-start"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-tech" aria-hidden />
                <span className="text-left">
                  Tél. / WhatsApp
                  <br />
                  <span className="font-medium text-navy-foreground">
                    {SITE.phoneDisplay}
                  </span>
                </span>
              </a>
            </li>
            <li className="inline-flex items-start justify-center gap-2 md:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-tech" aria-hidden />
              <span className="text-left">{SITE.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-amber-tech">
            Réseaux
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIconMap[social.network];
              return (
                <a
                  key={social.network}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-navy-foreground/80 transition-colors hover:border-amber-tech/60 hover:text-navy-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center gap-2 py-5 text-center text-xs text-navy-foreground/55 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {SITE.name} — {SITE.fullName}. Tous droits réservés.
          </p>
          <p>Site professionnel — Chéraga, Alger.</p>
        </div>
      </div>
    </footer>
  );
}
