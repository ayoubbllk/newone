import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ProofChainShowcase } from "@/components/home/ProofChainShowcase";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyUs } from "@/components/home/WhyUs";
import {
  getBannerMaterielImages,
  getPhotoGeneraleImages,
} from "@/lib/getImages";
import { bannersToProofStories } from "@/lib/proofStories";
import { PAGE_SEO } from "@/lib/seo";
import { FEATURED_SERVICES } from "@/lib/services";
import { resolveAllServicePhotos } from "@/lib/serviceImages";

export const metadata = PAGE_SEO.home;

export default function HomePage() {
  /* Bannières marketing : uniquement via ProofChain (pas en photo croppée) */
  const banners = getBannerMaterielImages();
  const proofStories = bannersToProofStories(banners);
  const photoGenerale = getPhotoGeneraleImages();
  const servicePhotos = resolveAllServicePhotos(photoGenerale);

  /* Hero CurvedImageLine : photo generale uniquement (jamais banner-materiel) */
  const heroCurvedImages = photoGenerale.map((img) => ({
    src: img.src,
    alt: img.name,
  }));

  const serviceSlides = FEATURED_SERVICES.map((service) => {
    const photo =
      servicePhotos[service.id] ??
      (service.id === "etude-stabilite"
        ? servicePhotos["etude-sol"]
        : undefined);
    return {
      id: service.id,
      title: service.title,
      short: service.short,
      href: service.href,
      image: photo?.src ?? "/designe/banner.png",
      imageAlt: photo?.name ?? service.title,
    };
  });

  /* TODO: remplacer par les vrais projets du client */
  const projects = [
    {
      title: "Fondations résidence collective",
      wilaya: "Alger",
      service: "Étude de sol",
      image:
        servicePhotos["etude-sol"]?.src ??
        "/designe/fff9d067c6307cb2a21f1fcb53c50c13.jpg",
    },
    {
      title: "Contrôle béton ouvrage d’art",
      wilaya: "Blida",
      service: "Contrôle béton",
      image:
        servicePhotos["controle-beton"]?.src ?? "/designe/banner.png",
    },
    {
      title: "Injection fissures immeuble",
      wilaya: "Sétif",
      service: "Traitement et injection des fissures de béton",
      image:
        servicePhotos["injection-beton"]?.src ?? "/designe/banner.png",
    },
  ];

  return (
    <>
      <Hero
        curvedImages={
          heroCurvedImages.length > 0
            ? heroCurvedImages
            : [
                {
                  src: "/designe/banner.png",
                  alt: "Laboratoire géotechnique et béton LEAGB",
                },
              ]
        }
      />

      {proofStories.length > 0 && (
        <ProofChainShowcase stories={proofStories} />
      )}

      <ServicesPreview slides={serviceSlides} />
      <WhyUs />
      <ProjectsPreview projects={projects} />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
