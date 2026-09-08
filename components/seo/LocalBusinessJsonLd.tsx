import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://leagb.dz/#business",
    name: SITE.name,
    alternateName: SITE.fullName,
    description:
      "Laboratoire géotechnique à Chéraga : contrôle qualité béton, essais ultrasoniques, étude de sol, sondage pressiométrique APAGEO et injection de fissures.",
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
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Algérie — Alger et wilayas du centre / nord",
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
