import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceLandingView } from "@/components/services/landing/ServiceLandingView";
import { resolveServicePhoto } from "@/lib/serviceImages";
import {
  getAllLandingSlugs,
  getLandingBySlug,
  getRelatedLandings,
  getServiceForLanding,
  type ServiceLanding,
} from "@/lib/serviceLandings";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllLandingSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const landing = getLandingBySlug(params.slug);
  if (!landing) return { title: "Service introuvable" };

  return pageMetadata({
    title: landing.seoTitle,
    description: landing.seoDescription,
    path: `/services/${landing.slug}`,
  });
}

function ServiceJsonLd({
  landing,
  description,
}: {
  landing: ServiceLanding;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: landing.primaryKeyword,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: SITE.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Centre Commercial Chéraga, Qods Étage R",
        addressLocality: "Chéraga",
        addressRegion: "Alger",
        addressCountry: "DZ",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Algérie",
    },
    url: `https://leagb.dz/services/${landing.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ServiceLandingPage({ params }: PageProps) {
  const landing = getLandingBySlug(params.slug);
  if (!landing) notFound();

  const service = getServiceForLanding(landing);
  const image = resolveServicePhoto(landing.serviceId);
  const related = getRelatedLandings(landing);

  return (
    <>
      <ServiceJsonLd landing={landing} description={service.description} />
      <ServiceLandingView
        landing={landing}
        service={service}
        image={image}
        related={related}
      />
    </>
  );
}
