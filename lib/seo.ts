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
    title: "Laboratoire géotechnique et béton à Alger — LEAGB Chéraga",
    description:
      "Laboratoire géotechnique et béton à Alger — LEAGB Chéraga. Étude de sol, étude de stabilité, contrôle béton et injection des fissures. Tél. " +
      SITE.phones.map((p) => p.display).join(" · ") +
      ".",
    path: "/",
  }),
  services: pageMetadata({
    title: "Services — étude de sol, stabilité, béton & fissures",
    description:
      "Catalogue LEAGB : étude de sol, étude de stabilité, contrôle béton et traitement / injection des fissures de béton en Algérie.",
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
      "Guides techniques LEAGB : étude de sol, contrôle béton et injection de fissures — pour promoteurs, bureaux d’études, architectes et entreprises BTP en Algérie.",
    path: "/blog",
  }),
  contact: pageMetadata({
    title: "Devis WhatsApp — étude de sol & contrôle béton",
    description: `Contactez LEAGB à Chéraga (Alger) par WhatsApp ${SITE.phoneDisplay}. Formulaire prêt à envoyer : étude de sol, contrôle béton ou injection fissure béton.`,
    path: "/contact",
  }),
} as const;
