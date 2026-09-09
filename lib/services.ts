export const SERVICES = [
  {
    id: "etude-sol",
    title: "Étude de sol",
    short:
      "Étude de sol en Algérie pour caractériser le terrain et sécuriser les fondations.",
    href: "/services/etude-de-sol",
    icon: "soil" as const,
    imageMatch: "étude de sol|etude de sol",
    featured: true,
    description:
      "Avant de fonder un bâtiment, un lotissement ou un ouvrage d’art, l’étude de sol caractérise la nature des terrains, leur portance et les risques (tassements, nappe, hétérogénéités). LEAGB accompagne promoteurs immobiliers, architectes et bureaux d’études génie civil en Algérie.",
    checks: [
      "Nature et succession des couches de sol",
      "Paramètres utiles au dimensionnement des fondations",
      "Risques de tassement et sensibilité à l’eau",
      "Recommandations techniques pour le projet",
      "Rapport exploitable par votre bureau d’études",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander une étude de sol pour mon projet en Algérie.",
  },
  {
    id: "etude-stabilite",
    title: "Étude de stabilité",
    short:
      "Étude de stabilité (talus, remblais, excavations) pour sécuriser vos terrassements.",
    href: "/services/etude-de-sol",
    icon: "soil" as const,
    imageMatch: "étude de sol|etude de sol|stabilit",
    featured: true,
    description:
      "L’étude de stabilité évalue la tenue des talus, remblais et excavations. LEAGB fournit les paramètres et recommandations pour dimensionner les soutènements et limiter les aléas géotechniques — missions destinées aux promoteurs, BE génie civil et entreprises TP / bâtiment en Algérie.",
    checks: [
      "Stabilité de talus, remblais ou excavations",
      "Analyse des facteurs de sécurité",
      "Recommandations de soutènement",
      "Calage des hypothèses de calcul",
      "Accompagnement pour phases critiques de terrassement",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander une étude de stabilité pour mon projet en Algérie.",
  },
  {
    id: "controle-beton",
    title: "Contrôle béton",
    short:
      "Contrôle béton en laboratoire et sur chantier : résistance, conformité et traçabilité en Algérie.",
    href: "/services/controle-beton",
    icon: "concrete" as const,
    imageMatch: "vérification.*qualité|verification.*qualite",
    featured: true,
    description:
      "Le contrôle béton vérifie que le matériau mis en œuvre répond aux spécifications du projet : résistance mécanique, homogénéité et conformité des formulations. LEAGB réalise des prélèvements et essais en laboratoire (compression sur éprouvettes) ainsi qu’un suivi adapté aux phases critiques du coulage en Algérie — pour promoteurs immobiliers, entreprises de travaux publics et de bâtiment, et maîtres d’ouvrage.",
    checks: [
      "Résistance à la compression aux échéances prévues (7, 28 jours, etc.)",
      "Conformité par rapport au dosage et à la classe de béton demandés",
      "Traçabilité des lots et des résultats d’essais",
      "Appui au contrôle extérieur / réception de chantier",
      "Détection précoce d’écarts pouvant impacter la structure",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander un contrôle béton pour mon chantier en Algérie.",
  },
  {
    id: "injection-beton",
    title: "Traitement et injection des fissures de béton",
    short:
      "Traitement et injection des fissures de béton (technologie allemande) : colmatage et consolidation.",
    href: "/services/injection-fissure-beton",
    icon: "inject" as const,
    imageMatch: "fissures|injection",
    featured: true,
    description:
      "Le traitement et l’injection des fissures de béton traitent les désordres liés au retrait, aux mouvements différentiels ou à un dysfonctionnement structurel. LEAGB propose un traitement par injection selon une technologie allemande : diagnostic, choix de la résine adaptée, injection contrôlée pour colmater, consolider et, selon le cas, rétablir l’étanchéité. Destiné aux promoteurs, entreprises de bâtiment et architectes en Algérie.",
    checks: [
      "Nature et activité des fissures (stables / évolutives)",
      "Choix du produit d’injection adapté au désordre",
      "Colmatage et consolidation des fissures",
      "Amélioration de l’étanchéité lorsque requis",
      "Recommandations de suivi après intervention",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander un traitement / injection des fissures de béton pour mon ouvrage.",
  },
  {
    id: "ultrasonique",
    title: "Essai ultrasonique",
    short:
      "Diagnostic non destructif de l’homogénéité et de la qualité du béton en place.",
    href: "/services#ultrasonique",
    icon: "wave" as const,
    imageMatch: "contrôle et suivi|controle et suivi",
    featured: false,
    description:
      "L’essai ultrasonique est une méthode non destructive qui évalue la qualité du béton déjà en place. En mesurant la vitesse de propagation des ondes, on estime l’homogénéité, la compacité relative et d’éventuelles zones altérées — utile pour le diagnostic de structures existantes, le suivi d’ouvrages ou le contrôle complémentaire après coulage, sans endommager l’élément inspecté. Destiné aux bureaux d’études génie civil, architectes et entreprises de réhabilitation en Algérie.",
    checks: [
      "Homogénéité et compacité relative du béton en place",
      "Repérage de zones potentiellement dégradées ou hétérogènes",
      "Complément au contrôle destructif (carottage / compression)",
      "Diagnostic d’ouvrages existants avant réhabilitation",
      "Suivi comparatif dans le temps sur un même élément",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander un essai ultrasonique sur béton pour mon ouvrage.",
  },
  {
    id: "pressiometre",
    title: "Sondage pressiométrique (APAGEO)",
    short:
      "Mesures in situ au pressiomètre APAGEO pour dimensionner vos ouvrages.",
    href: "/services#pressiometre",
    icon: "pressure" as const,
    imageMatch: "sondage pressiom",
    featured: false,
    description:
      "Le sondage pressiométrique Ménard, réalisé avec un pressiomètre APAGEO, mesure in situ le comportement du sol sous pression. Il fournit des modules et pressions limites essentiels au calcul des fondations superficielles ou profondes. Référence pour les bureaux d’études génie civil et maîtres d’œuvre en Algérie qui exigent des données terrain fiables, au-delà des seuls essais de laboratoire.",
    checks: [
      "Module pressiométrique et pression limite",
      "Profil de résistance des couches traversées",
      "Données pour fondations superficielles et profondes",
      "Calage des hypothèses de calcul géotechnique",
      "Complément aux carottages et essais laboratoire",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander un sondage pressiométrique (pressiomètre APAGEO) pour mon projet.",
  },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
export type Service = (typeof SERVICES)[number];

/** Les 4 expertises mises en avant (accueil) */
export const FEATURED_SERVICES = SERVICES.filter((s) => s.featured);

export const SERVICES_FAQ = [
  {
    question: "Pour qui travaillez-vous en Algérie ?",
    answer:
      "LEAGB s’adresse aux promoteurs immobiliers, bureaux d’études génie civil, architectes et entreprises de travaux publics et de bâtiment. Nous adaptons le protocole (étude de sol, contrôle béton, injection fissure béton…) au type d’ouvrage et aux exigences du chantier.",
  },
  {
    question: "Quels sont vos délais d’intervention ?",
    answer:
      "Selon l’essai et la charge du moment, une intervention chantier peut souvent être planifiée sous quelques jours. Les résultats de laboratoire (ex. contrôle béton en compression) suivent les échéances normatives (7 jours, 28 jours, etc.). Contactez-nous avec la localisation et le type d’essai pour un délai précis.",
  },
  {
    question: "Dans quelles zones intervenez-vous en Algérie ?",
    answer:
      "LEAGB est basé à Chéraga (Alger) et intervient principalement sur Alger et les wilayas du centre / nord. Pour des missions plus éloignées, nous étudions la faisabilité au cas par cas — indiquez la wilaya et le type de chantier.",
  },
  {
    question: "Quels types de sols et de chantiers couvrez-vous ?",
    answer:
      "Nous accompagnons des projets résidentiels, tertiaires, d’infrastructure et de réhabilitation : étude de sol, étude de stabilité, pressiomètre, contrôle béton et diagnostics sur ouvrages existants. Chaque terrain (remblai, argile, sable, etc.) impose un protocole adapté — nous vous orientons après un premier échange.",
  },
  {
    question: "Faut-il une étude de sol avant toute construction ?",
    answer:
      "Oui, dans la grande majorité des projets de construction neuve en Algérie. L’étude de sol réduit les risques de fissuration, de tassement différentiel et de sous-dimensionnement des fondations. Elle est souvent exigée par les bureaux de contrôle et les assureurs, et utile aux architectes comme aux bureaux d’études génie civil.",
  },
  {
    question: "Comment se passe une demande d’essai concrètement ?",
    answer:
      "Décrivez-nous le besoin (WhatsApp, téléphone ou formulaire contact) : type d’essai (étude de sol, contrôle béton, injection fissure béton…), localisation, échéance. Nous confirmons le protocole, planifions le passage et vous remettons les résultats avec une lecture claire pour la suite du projet.",
  },
  {
    question: "Intervenez-vous aussi pour des particuliers ?",
    answer:
      "Oui. Villa, extension, fissures sur un bâtiment existant : nous adaptons le périmètre (visite, essais ciblés, injection fissure béton) au besoin du particulier comme à celui d’une entreprise de BTP.",
  },
] as const;
