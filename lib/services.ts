export const SERVICES = [
  {
    id: "controle-beton",
    title: "Vérification qualité du béton",
    short:
      "Résistance, conformité et traçabilité des bétons sur chantier et en laboratoire.",
    href: "/services#controle-beton",
    icon: "concrete" as const,
    imageMatch: "vérification.*qualité|verification.*qualite",
    description:
      "Le contrôle qualité du béton permet de vérifier que le matériau mis en œuvre répond aux spécifications du projet : résistance mécanique, homogénéité et conformité des formulations. LEAGB réalise des prélèvements et essais en laboratoire (compression sur éprouvettes) ainsi qu’un suivi adapté aux phases critiques du coulage, pour les promoteurs, entreprises de gros œuvre et maîtres d’ouvrage.",
    checks: [
      "Résistance à la compression aux échéances prévues (7, 28 jours, etc.)",
      "Conformité par rapport au dosage et à la classe de béton demandés",
      "Traçabilité des lots et des résultats d’essais",
      "Appui au contrôle extérieur / réception de chantier",
      "Détection précoce d’écarts pouvant impacter la structure",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander un contrôle qualité du béton pour mon chantier.",
  },
  {
    id: "ultrasonique",
    title: "Essai ultrasonique",
    short:
      "Diagnostic non destructif de l’homogénéité et de la qualité du béton en place.",
    href: "/services#ultrasonique",
    icon: "wave" as const,
    imageMatch: "contrôle et suivi|controle et suivi",
    description:
      "L’essai ultrasonique est une méthode non destructive qui évalue la qualité du béton déjà en place. En mesurant la vitesse de propagation des ondes, on estime l’homogénéité, la compacité relative et d’éventuelles zones altérées — utile pour le diagnostic de structures existantes, le suivi d’ouvrages ou le contrôle complémentaire après coulage, sans endommager l’élément inspecté.",
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
    id: "etude-sol",
    title: "Étude de sol & étude de stabilité",
    short:
      "Caractérisation géotechnique et analyses de stabilité pour sécuriser vos fondations.",
    href: "/services#etude-sol",
    icon: "soil" as const,
    imageMatch: "étude de sol|etude de sol",
    description:
      "Avant de fonder un bâtiment, un lotissement ou un ouvrage d’art, l’étude de sol caractérise la nature des terrains, leur portance et les risques (tassements, nappe, hétérogénéités). LEAGB accompagne aussi les analyses de stabilité (talus, remblais, excavations) pour dimensionner les fondations et limiter les aléas en phase chantier comme en exploitation.",
    checks: [
      "Nature et succession des couches de sol",
      "Paramètres utiles au dimensionnement des fondations",
      "Risques de tassement et sensibilité à l’eau",
      "Stabilité de talus, remblais ou excavations",
      "Recommandations techniques pour le projet",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander une étude de sol / étude de stabilité pour mon projet.",
  },
  {
    id: "pressiometre",
    title: "Sondage pressiométrique (APAGEO)",
    short:
      "Mesures in situ au pressiomètre APAGEO pour dimensionner vos ouvrages.",
    href: "/services#pressiometre",
    icon: "pressure" as const,
    imageMatch: "sondage pressiom",
    description:
      "Le sondage pressiométrique Ménard, réalisé avec un pressiomètre APAGEO, mesure in situ le comportement du sol sous pression. Il fournit des modules et pressions limites essentiels au calcul des fondations superficielles ou profondes. C’est une référence pour les bureaux d’études et maîtres d’œuvre qui exigent des données terrain fiables, au-delà des seuls essais de laboratoire.",
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
  {
    id: "injection-beton",
    title: "Traitement / réparation de fissures par injection",
    short:
      "Réparation structurelle par injection (technologie allemande) pour béton fissuré.",
    href: "/services#injection-beton",
    icon: "inject" as const,
    imageMatch: "fissures|injection",
    description:
      "Les fissures du béton peuvent relever du retrait, de mouvements différentiels ou d’un dysfonctionnement structurel. LEAGB propose un traitement par injection selon une technologie allemande : diagnostic, choix de la résine adaptée, injection contrôlée pour colmater, consolider et, selon le cas, rétablir l’étanchéité. L’objectif est une réparation durable, pas un simple masquage cosmétique.",
    checks: [
      "Nature et activité des fissures (stables / évolutives)",
      "Choix du produit d’injection adapté au désordre",
      "Colmatage et consolidation des fissures",
      "Amélioration de l’étanchéité lorsque requis",
      "Recommandations de suivi après intervention",
    ],
    whatsappMessage:
      "Bonjour LEAGB, je souhaite demander un traitement / réparation de fissures par injection (technologie allemande).",
  },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
export type Service = (typeof SERVICES)[number];

export const SERVICES_FAQ = [
  {
    question: "Quels sont vos délais d’intervention ?",
    answer:
      "Selon l’essai et la charge du moment, une intervention chantier peut souvent être planifiée sous quelques jours. Les résultats de laboratoire (ex. compression béton) suivent les échéances normatives (7 jours, 28 jours, etc.). Contactez-nous avec la localisation et le type d’essai pour un délai précis.",
  },
  {
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "LEAGB est basé à Chéraga (Alger) et intervient principalement sur Alger et les wilayas du centre / nord. Pour des missions plus éloignées, nous étudions la faisabilité au cas par cas — indiquez la wilaya et le type de chantier.",
  },
  {
    question: "Quels types de sols et de chantiers couvrez-vous ?",
    answer:
      "Nous accompagnons des projets résidentiels, tertiaires, d’infrastructure et de réhabilitation : études de sol, pressiomètre, contrôles béton et diagnostics sur ouvrages existants. Chaque terrain (remblai, argile, sable, etc.) impose un protocole adapté — nous vous orientons après un premier échange.",
  },
  {
    question: "Faut-il une étude de sol avant toute construction ?",
    answer:
      "Oui, dans la grande majorité des projets de construction neuve. L’étude de sol réduit les risques de fissuration, de tassement différentiel et de sous-dimensionnement des fondations. Elle est souvent exigée par les bureaux de contrôle et les assureurs.",
  },
  {
    question: "Comment se passe une demande d’essai concrètement ?",
    answer:
      "Décrivez-nous le besoin (WhatsApp, téléphone ou formulaire contact) : type d’essai, localisation, échéance. Nous confirmons le protocole, planifions le passage et vous remettons les résultats avec une lecture claire pour la suite du projet.",
  },
  {
    question: "Intervenez-vous aussi pour des particuliers ?",
    answer:
      "Oui. Villa, extension, fissures sur un bâtiment existant : nous adaptons le périmètre (visite, essais ciblés, injection) au besoin du particulier comme à celui d’une entreprise de BTP.",
  },
] as const;
