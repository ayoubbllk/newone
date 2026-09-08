import type { PublicImage } from "@/lib/getImages";

type MaterielMeta = {
  title: string;
  description: string;
  points: string[];
};

const RULES: { match: RegExp; meta: MaterielMeta }[] = [
  {
    match: /pressiom/i,
    meta: {
      title: "Pressiomètre APAGEO",
      description:
        "Sondage pressiométrique Ménard pour évaluer la portance et le module de déformation des sols.",
      points: [
        "Mesures in situ fiables",
        "Dimensionnement des fondations",
        "Matériel APAGEO professionnel",
      ],
    },
  },
  {
    match: /p[ée]n[ée]trom/i,
    meta: {
      title: "Pénétromètre dynamique",
      description:
        "Investigation rapide de la résistance des sols pour caler vos projets de fondation.",
      points: [
        "Campagnes de reconnaissance",
        "Profils de résistance",
        "Intervention terrain réactive",
      ],
    },
  },
  {
    match: /sondeuse|carott/i,
    meta: {
      title: "Sondeuse carottée",
      description:
        "Prélèvements de carottes pour analyses de laboratoire et caractérisation fine des terrains.",
      points: [
        "Carottes représentatives",
        "Études de sol détaillées",
        "Contrôle qualité des matériaux",
      ],
    },
  },
  {
    match: /presse|b[ée]ton/i,
    meta: {
      title: "Presse à béton",
      description:
        "Essais de compression pour vérifier la résistance mécanique de vos bétons.",
      points: [
        "Contrôle conformité",
        "Résultats traçables",
        "Suivi de chantier",
      ],
    },
  },
  {
    match: /injection/i,
    meta: {
      title: "Technologie d’injection du béton",
      description:
        "Traitement et réparation des fissures par injection — procédé allemand de précision.",
      points: [
        "Réparation structurelle",
        "Étanchéité et consolidation",
        "Savoir-faire technique",
      ],
    },
  },
];

const FALLBACK: MaterielMeta = {
  title: "Matériel de laboratoire",
  description:
    "Équipement professionnel pour les essais géotechniques et le contrôle qualité béton.",
  points: [
    "Essais normés",
    "Intervention chantier & labo",
    "Accompagnement technique",
  ],
};

/** Noms Facebook / IDs numériques — inutilisables comme titre affiché */
function isGarbageFilename(name: string): boolean {
  return /^\d[\d_]*_?n?$/i.test(name.trim()) || /^[\d_]+$/.test(name.trim());
}

export function getMaterielMeta(image: PublicImage): MaterielMeta {
  const haystack = `${image.name} ${image.filename}`;
  const found = RULES.find((rule) => rule.match.test(haystack));
  if (found) return found.meta;

  const title = isGarbageFilename(image.name)
    ? FALLBACK.title
    : image.name;
  return { ...FALLBACK, title };
}
