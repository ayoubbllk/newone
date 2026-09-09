import type { ServiceId } from "@/lib/services";
import { SERVICES } from "@/lib/services";
import { TARGET_AUDIENCES } from "@/lib/site";

export type ServiceLandingSlug =
  | "etude-de-sol"
  | "controle-beton"
  | "injection-fissure-beton";

export type ServiceLanding = {
  slug: ServiceLandingSlug;
  serviceId: ServiceId;
  code: string;
  /** Mot-clé principal (SEO) */
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
  heroHeadline: string;
  heroLede: string;
  processTitle: string;
  processLede: string;
  process: { title: string; text: string }[];
  deliverablesTitle: string;
  deliverablesLede: string;
  audiencePitch: string;
  audiencePoints: { audience: string; point: string }[];
  relatedSlugs: ServiceLandingSlug[];
};

export const SERVICE_LANDINGS: ServiceLanding[] = [
  {
    slug: "etude-de-sol",
    serviceId: "etude-sol",
    code: "GEO-01",
    primaryKeyword: "Étude de sol",
    seoTitle: "Étude de sol & étude de stabilité en Algérie",
    seoDescription:
      "Étude de sol et étude de stabilité en Algérie — LEAGB Chéraga. Reconnaissance géotechnique pour promoteurs, bureaux d’études génie civil, architectes et entreprises TP / bâtiment.",
    heroHeadline: "Étude de sol et étude de stabilité en Algérie",
    heroLede:
      "Caractérisez le terrain, dimensionnez les fondations et sécurisez le chantier avant le premier coulage.",
    processTitle: "Campagne géotechnique, étape par étape",
    processLede:
      "Un protocole clair, du cadrage terrain au rapport exploitable par votre bureau d’études.",
    process: [
      {
        title: "Cadrage projet",
        text: "Type d’ouvrage, charges estimées, contraintes de site et niveau d’investigation adapté.",
      },
      {
        title: "Investigations terrain",
        text: "Sondages, carottages et essais in situ pour lire la succession des couches.",
      },
      {
        title: "Essais & interprétation",
        text: "Paramètres de portance, tassements, nappe et risques de stabilité.",
      },
      {
        title: "Recommandations",
        text: "Fondations, terrassements et points de vigilance pour la conception et le chantier.",
      },
    ],
    deliverablesTitle: "Ce que votre étude de sol livre",
    deliverablesLede:
      "Des données actionnables pour la conception, le contrôle et la maîtrise des aléas terrain.",
    audiencePitch:
      "Une reconnaissance géotechnique conçue pour les acteurs du projet en Algérie.",
    audiencePoints: [
      {
        audience: TARGET_AUDIENCES[0],
        point:
          "Sécurisez le budget fondations et limitez les avenants liés aux surprises de terrain.",
      },
      {
        audience: TARGET_AUDIENCES[1],
        point:
          "Obtenez des paramètres fiables pour dimensionner semelles, radiers ou pieux.",
      },
      {
        audience: TARGET_AUDIENCES[2],
        point:
          "Alignez implantation et niveaux sur la réalité géotechnique du site.",
      },
      {
        audience: TARGET_AUDIENCES[3],
        point:
          "Anticipez terrassements, nappe et stabilité avant ouverture de fouilles.",
      },
    ],
    relatedSlugs: ["controle-beton", "injection-fissure-beton"],
  },
  {
    slug: "controle-beton",
    serviceId: "controle-beton",
    code: "BET-02",
    primaryKeyword: "Contrôle béton",
    seoTitle: "Contrôle béton en Algérie — laboratoire & chantier",
    seoDescription:
      "Contrôle béton en Algérie : compression, conformité et traçabilité. LEAGB accompagne promoteurs, entreprises TP / bâtiment et maîtres d’ouvrage depuis Chéraga (Alger).",
    heroHeadline: "Contrôle béton — conformité mesurée sur chantier",
    heroLede:
      "Prélèvements, essais de compression et suivi des phases critiques pour valider la qualité mise en œuvre.",
    processTitle: "Protocole de contrôle béton",
    processLede:
      "De la prise d’échantillon à la lecture des résultats — une chaîne traçable pour la réception.",
    process: [
      {
        title: "Plan d’essais",
        text: "Classes de béton, échéances (7 / 28 jours) et points de contrôle critiques.",
      },
      {
        title: "Prélèvements",
        text: "Éprouvettes sur chantier selon le rythme de coulage et les lots.",
      },
      {
        title: "Essais laboratoire",
        text: "Compression et conformité par rapport au dosage et à la classe demandés.",
      },
      {
        title: "Restitution",
        text: "Résultats lisibles pour le contrôle extérieur, le promoteur et l’entreprise.",
      },
    ],
    deliverablesTitle: "Ce que le contrôle béton sécurise",
    deliverablesLede:
      "Résistance, homogénéité et preuve documentaire pour vos phases de coulage.",
    audiencePitch:
      "Un contrôle béton calibré pour les exigences BTP en Algérie.",
    audiencePoints: [
      {
        audience: TARGET_AUDIENCES[0],
        point:
          "Documentez la qualité des bétons structurants de vos opérations.",
      },
      {
        audience: TARGET_AUDIENCES[1],
        point:
          "Calibrez le suivi qualité avec des résultats exploitables en conception.",
      },
      {
        audience: TARGET_AUDIENCES[2],
        point:
          "Appuyez la réception des ouvrages béton sur des essais normés.",
      },
      {
        audience: TARGET_AUDIENCES[3],
        point:
          "Anticipez les écarts de résistance avant qu’ils impactent le planning.",
      },
    ],
    relatedSlugs: ["etude-de-sol", "injection-fissure-beton"],
  },
  {
    slug: "injection-fissure-beton",
    serviceId: "injection-beton",
    code: "INJ-03",
    primaryKeyword: "Injection fissure béton",
    seoTitle: "Injection fissure béton en Algérie",
    seoDescription:
      "Injection fissure béton en Algérie — diagnostic et traitement par injection (technologie allemande). LEAGB pour promoteurs, architectes et entreprises de bâtiment.",
    heroHeadline: "Injection fissure béton — réparation structurelle",
    heroLede:
      "Diagnostiquer, injecter et consolider : une intervention durable, pas un masquage cosmétique.",
    processTitle: "Traitement par injection, protocole maîtrisé",
    processLede:
      "De l’analyse de la fissure au suivi post-intervention, avec une résine adaptée au désordre.",
    process: [
      {
        title: "Diagnostic",
        text: "Nature, activité (stable / évolutive) et cause probable de la fissure.",
      },
      {
        title: "Choix produit",
        text: "Résine et méthode d’injection selon le désordre et l’objectif (colmatage, consolidation, étanchéité).",
      },
      {
        title: "Injection contrôlée",
        text: "Mise en œuvre précise avec technologie allemande pour une consolidation réelle.",
      },
      {
        title: "Contrôle & suivi",
        text: "Vérification du résultat et recommandations de surveillance.",
      },
    ],
    deliverablesTitle: "Ce que l’injection apporte à l’ouvrage",
    deliverablesLede:
      "Colmatage, consolidation et, si besoin, retour d’étanchéité — avec lecture claire du désordre.",
    audiencePitch:
      "Une réparation béton pensée pour les décideurs et les équipes chantier.",
    audiencePoints: [
      {
        audience: TARGET_AUDIENCES[0],
        point:
          "Traitez les désordres visibles avant qu’ils dégradent l’image et la structure du bien.",
      },
      {
        audience: TARGET_AUDIENCES[1],
        point:
          "Disposez d’un diagnostic clair pour orienter réhabilitation ou renforcement.",
      },
      {
        audience: TARGET_AUDIENCES[2],
        point:
          "Préservez l’intégrité visuelle et structurelle des ouvrages livrés.",
      },
      {
        audience: TARGET_AUDIENCES[3],
        point:
          "Intervenez vite sur fissures actives sans immobiliser tout le chantier.",
      },
    ],
    relatedSlugs: ["etude-de-sol", "controle-beton"],
  },
];

export function getLandingBySlug(
  slug: string
): ServiceLanding | undefined {
  return SERVICE_LANDINGS.find((l) => l.slug === slug);
}

export function getAllLandingSlugs(): ServiceLandingSlug[] {
  return SERVICE_LANDINGS.map((l) => l.slug);
}

export function getServiceForLanding(landing: ServiceLanding) {
  const service = SERVICES.find((s) => s.id === landing.serviceId);
  if (!service) {
    throw new Error(`Service introuvable pour ${landing.serviceId}`);
  }
  return service;
}

export function getRelatedLandings(landing: ServiceLanding) {
  return landing.relatedSlugs
    .map((slug) => getLandingBySlug(slug))
    .filter((l): l is ServiceLanding => Boolean(l));
}
