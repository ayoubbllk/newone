export const SITE = {
  name: "LEAGB",
  fullName: "Laboratoire Géotechnique",
  baseline: "Contrôle béton & géotechnique",
  phoneDisplay: "0661 10 07 03",
  phoneTel: "+213661100703",
  whatsappNumber: "213661100703",
  address: "Centre Commercial Chéraga, Qods Étage R, Alger",
  email: null as string | null,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/projets", label: "Projets" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { href: "#", label: "LinkedIn", network: "linkedin" as const },
  { href: "#", label: "Instagram", network: "instagram" as const },
  { href: "#", label: "Facebook", network: "facebook" as const },
] as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour LEAGB, je souhaite obtenir des informations sur vos prestations géotechniques et contrôle béton.";

export function buildWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message?.trim() || DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
