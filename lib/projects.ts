import type { ServiceId } from "@/lib/services";

export type Project = {
  id: string;
  title: string;
  wilaya: string;
  serviceId: ServiceId;
  summary: string;
  /** Mot-clé pour associer une image matériel / design */
  imageKey: "designe" | "presse" | "pressiom" | "sondeuse" | "penetro" | "injection";
};

/* TODO: remplacer par les vrais projets du client */
export const PROJECTS: Project[] = [
  {
    id: "residence-alger",
    title: "Fondations résidence collective",
    wilaya: "Alger",
    serviceId: "etude-sol",
    summary:
      "Campagne géotechnique et recommandations de fondations pour un immeuble R+6 à Hydra.",
    imageKey: "designe",
  },
  {
    id: "ouvrage-blida",
    title: "Contrôle béton ouvrage d’art",
    wilaya: "Blida",
    serviceId: "controle-beton",
    summary:
      "Suivi des résistances et conformité des bétons sur un pont en construction.",
    imageKey: "presse",
  },
  {
    id: "lotissement-tipaza",
    title: "Sondage pressiométrique lotissement",
    wilaya: "Tipaza",
    serviceId: "pressiometre",
    summary:
      "Profils pressiométriques APAGEO pour le dimensionnement des fondations individuelles.",
    imageKey: "pressiom",
  },
  {
    id: "usine-oran",
    title: "Étude de stabilité plateforme industrielle",
    wilaya: "Oran",
    serviceId: "etude-sol",
    summary:
      "Caractérisation des remblais et analyse de stabilité avant extension d’atelier.",
    imageKey: "sondeuse",
  },
  {
    id: "rehab-bejaia",
    title: "Diagnostic ultrasonique bâtiment tertiaire",
    wilaya: "Béjaïa",
    serviceId: "ultrasonique",
    summary:
      "Cartographie non destructive de la qualité du béton avant réhabilitation structurelle.",
    imageKey: "penetro",
  },
  {
    id: "fissures-setif",
    title: "Injection fissure béton immeuble R+4",
    wilaya: "Sétif",
    serviceId: "injection-beton",
    summary:
      "Injection fissure béton (technologie allemande) sur fissures actives en façade et plancher.",
    imageKey: "injection",
  },
];
