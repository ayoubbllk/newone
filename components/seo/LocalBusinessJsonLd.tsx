import { SERVICES } from "@/lib/services";
import { SITE, TARGET_AUDIENCES } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://leagb.dz/#business",
    name: SITE.name,
    alternateName: SITE.fullName,
    description:
      "Étude de sol, étude de stabilité, contrôle béton et injection fissure béton en Algérie. Laboratoire géotechnique LEAGB à Chéraga (Alger) pour promoteurs immobiliers, bureaux d’études génie civil, architectes et entreprises TP / bâtiment.",
    url: "https://leagb.dz",
    telephone: SITE.phoneTel,
    image: "https://leagb.dz/Logo.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Centre Commercial Chéraga, Qods Étage R",
      addressLocality: "Chéraga",
      addressRegion: "Alger",
      addressCountry: "DZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.7667,
      longitude: 2.95,
    },
    areaServed: [
      { "@type": "Country", name: "Algérie" },
      {
        "@type": "AdministrativeArea",
        name: "Alger et wilayas du centre / nord",
      },
    ],
    knowsAbout: [
      "Étude de sol",
      "Étude de stabilité",
      "Contrôle béton",
      "Injection fissure béton",
      "Sondage pressiométrique",
      "Essai ultrasonique",
    ],
    audience: {
      "@type": "Audience",
      audienceType: TARGET_AUDIENCES.join(", "),
    },
    priceRange: "$$",
    sameAs: SOCIAL_PLACEHOLDERS,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services LEAGB",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          url: `https://leagb.dz${service.href}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SOCIAL_PLACEHOLDERS: string[] = [];
