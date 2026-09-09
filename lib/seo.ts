import type { Metadata } from "next";

import { SITE } from "@/lib/site";

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
    title: "Laboratoire géotechnique à Alger — LEAGB Chéraga",
    description:
      "Laboratoire géotechnique LEAGB à Chéraga (Alger) : essais terrain et laboratoire pour promoteurs, bureaux d’études génie civil, architectes et entreprises TP / bâtiment en Algérie. Tél. " +
      SITE.phoneDisplay +
      ".",
    path: "/",
  }),
  services: pageMetadata({
    title: "Services géotechniques & béton — catalogue LEAGB",
    description:
      "Catalogue des missions LEAGB en Algérie : reconnaissance géotechnique, essais béton, sondages pressiométriques et diagnostic structurel. Orienter vers la page dédiée selon votre besoin.",
    path: "/services",
  }),
  projets: pageMetadata({
    title: "Projets géotechniques & contrôle béton — Algérie",
    description:
      "Missions LEAGB en Algérie : étude de sol, étude de stabilité, contrôle béton et injection de fissures pour chantiers promotion, TP et bâtiment.",
    path: "/projets",
  }),
  blog: pageMetadata({
    title: "Blog — Étude de sol & béton en Algérie",
    description:
      "Guides techniques LEAGB : étude de sol, contrôle béton, fissures et pressiomètre — pour promoteurs, bureaux d’études, architectes et entreprises BTP en Algérie.",
    path: "/blog",
  }),
  contact: pageMetadata({
    title: "Devis WhatsApp — étude de sol & contrôle béton",
    description: `Contactez LEAGB à Chéraga (Alger) par WhatsApp ${SITE.phoneDisplay}. Formulaire prêt à envoyer : étude de sol, contrôle béton ou injection fissure béton.`,
    path: "/contact",
  }),
} as const;
