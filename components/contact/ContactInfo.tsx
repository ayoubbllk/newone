import { Clock, MapPin, Phone } from "lucide-react";

import { socialIconMap } from "@/components/social/SocialIcons";
import { buildWhatsAppUrl, SITE, SOCIAL_LINKS } from "@/lib/site";

export function ContactInfo() {
  return (
    <div className="space-y-8 text-center">
      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
          Coordonnées
        </p>
        <h2 className="mt-3 text-balance text-2xl text-navy-foreground sm:text-3xl">
          Parlons de votre chantier
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-foreground/75">
          Réponse rapide par téléphone ou WhatsApp. Décrivez le type d’essai et
          la localisation : nous vous orientons vers le bon protocole.
        </p>
      </div>

      <ul className="space-y-5 text-sm text-navy-foreground/80">
        <li>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-start justify-center gap-3 transition-colors hover:text-navy-foreground"
          >
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-tech" aria-hidden />
            <span>
              <span className="block text-xs uppercase tracking-[0.14em] text-navy-foreground/55">
                Téléphone / WhatsApp
              </span>
              <span className="mt-1 block font-display text-lg font-semibold text-navy-foreground">
                {SITE.phoneDisplay}
              </span>
            </span>
          </a>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-navy-foreground underline-offset-4 hover:underline"
          >
            Ouvrir WhatsApp
          </a>
        </li>

        <li className="inline-flex items-start justify-center gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-tech" aria-hidden />
          <span className="text-left">
            <span className="block text-xs uppercase tracking-[0.14em] text-navy-foreground/55">
              Adresse
            </span>
            <span className="mt-1 block leading-relaxed text-navy-foreground">
              {SITE.address}
            </span>
          </span>
        </li>

        <li className="inline-flex items-start justify-center gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-tech" aria-hidden />
          <span className="text-left">
            <span className="block text-xs uppercase tracking-[0.14em] text-navy-foreground/55">
              Horaires
            </span>
            {/* TODO: horaires à confirmer */}
            <span className="mt-1 block leading-relaxed text-navy-foreground">
              Dimanche – Jeudi · 8h00 – 17h00
              <br />
              <span className="text-navy-foreground/60">
                (horaires indicatifs — à confirmer)
              </span>
            </span>
          </span>
        </li>
      </ul>

      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-amber-tech">
          Réseaux sociaux
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map((social) => {
            const Icon = socialIconMap[social.network];
            return (
              <a
                key={social.network}
                href={social.href}
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-navy-foreground/80 transition-colors hover:border-amber-tech/60 hover:text-navy-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
