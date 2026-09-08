import type { Metadata } from "next";

import { SITE } from "@/lib/site";

const baseDescription =
  "Laboratoire géotechnique à Chéraga (Alger) : contrôle qualité béton, essai ultrasonique, étude de sol, sondage pressiométrique APAGEO, injection de fissures.";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      locale: "fr_DZ",
      siteName: SITE.name,
      type: "website",
    },
  };
}

export const PAGE_SEO = {
  home: pageMetadata({
    title: "Laboratoire Géotechnique — Contrôle béton & essais",
    description: `${baseDescription} Tél. ${SITE.phoneDisplay}.`,
    path: "/",
  }),
  services: pageMetadata({
    title: "Services — Essais géotechniques & contrôle béton",
    description:
      "Contrôle qualité béton, essai ultrasonique, étude de sol et stabilité, sondage pressiométrique APAGEO, injection de fissures. Devis à Chéraga, Alger.",
    path: "/services",
  }),
  projets: pageMetadata({
    title: "Projets & chantiers accompagnés",
    description:
      "Exemples de missions LEAGB en Algérie : études de sol, contrôles béton, pressiomètre et réparation de fissures.",
    path: "/projets",
  }),
  blog: pageMetadata({
    title: "Blog technique — Géotechnique & béton",
    description:
      "Articles LEAGB : étude de sol, fissures de béton, essai pressiométrique Ménard — repères pour promoteurs et entreprises BTP.",
    path: "/blog",
  }),
  contact: pageMetadata({
    title: "Contact & devis",
    description: `Contactez LEAGB à Chéraga (Alger) : téléphone / WhatsApp ${SITE.phoneDisplay}. Demande de devis pour essais géotechniques et contrôle béton.`,
    path: "/contact",
  }),
} as const;
