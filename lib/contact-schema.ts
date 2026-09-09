import { z } from "zod";

import { SERVICES } from "@/lib/services";

export const serviceSelectValues = [
  "etude-sol",
  "etude-stabilite",
  "controle-beton",
  "injection-beton",
  "autre",
] as const;

export const contactWhatsAppSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom (2 caractères minimum).")
    .max(120, "Nom trop long."),
  phone: z
    .string()
    .trim()
    .min(8, "Indiquez un numéro de téléphone valide.")
    .max(30, "Numéro trop long.")
    .regex(/^[0-9+\s().-]{8,30}$/, "Format de téléphone invalide."),
  service: z.enum(serviceSelectValues, {
    required_error: "Sélectionnez le service concerné.",
    invalid_type_error: "Sélectionnez le service concerné.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Précisez votre besoin (10 caractères minimum).")
    .max(2000, "Message trop long (2000 caractères max)."),
});

export type ContactWhatsAppValues = z.infer<typeof contactWhatsAppSchema>;

export function getServiceLabel(serviceId: ContactWhatsAppValues["service"]) {
  if (serviceId === "autre") return "Autre / demande générale";
  return SERVICES.find((s) => s.id === serviceId)?.title ?? serviceId;
}

/** Message pré-rempli pour WhatsApp (prêt à envoyer). */
export function buildWhatsAppContactMessage(values: ContactWhatsAppValues) {
  const service = getServiceLabel(values.service);
  return [
    "Bonjour LEAGB,",
    "",
    `Nom : ${values.name}`,
    `Téléphone : ${values.phone}`,
    `Service : ${service}`,
    "",
    "Besoin :",
    values.message,
  ].join("\n");
}
