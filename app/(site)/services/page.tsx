import { ServiceBlock } from "@/components/services/ServiceBlock";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesHero } from "@/components/services/ServicesHero";
import { getPhotoGeneraleImages } from "@/lib/getImages";
import { SERVICES } from "@/lib/services";
import { resolveAllServicePhotos } from "@/lib/serviceImages";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.services;

export default function ServicesPage() {
  const photos = resolveAllServicePhotos(getPhotoGeneraleImages());

  return (
    <>
      <ServicesHero />
      {SERVICES.map((service, index) => (
        <ServiceBlock
          key={service.id}
          service={service}
          index={index}
          image={photos[service.id]}
        />
      ))}
      <ServicesFaq />
    </>
  );
}
