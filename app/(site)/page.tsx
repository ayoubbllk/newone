import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { MaterielGrid } from "@/components/home/MaterielGrid";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ProofChainShowcase } from "@/components/home/ProofChainShowcase";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyUs } from "@/components/home/WhyUs";
import {
  getBannerMaterielImages,
  getMaterielImages,
  getPhotoGeneraleImages,
} from "@/lib/getImages";
import { bannersToProofStories } from "@/lib/proofStories";
import { PAGE_SEO } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { resolveAllServicePhotos } from "@/lib/serviceImages";

export const metadata = PAGE_SEO.home;

export default function HomePage() {
  const materiel = getMaterielImages();
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

  const serviceSlides = SERVICES.map((service) => {
    const photo = servicePhotos[service.id];
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
      service: "Étude de sol & stabilité",
      image:
        servicePhotos["etude-sol"]?.src ??
        "/designe/fff9d067c6307cb2a21f1fcb53c50c13.jpg",
    },
    {
      title: "Contrôle béton ouvrage d’art",
      wilaya: "Blida",
      service: "Contrôle qualité du béton",
      image:
        servicePhotos["controle-beton"]?.src ?? "/designe/banner.png",
    },
    {
      title: "Sondage pressiométrique lotissement",
      wilaya: "Tipaza",
      service: "Sondage pressiométrique",
      image:
        servicePhotos["pressiometre"]?.src ?? "/designe/banner.png",
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
                  alt: "Laboratoire géotechnique LEAGB",
                },
              ]
        }
      />

      {proofStories.length > 0 && (
        <ProofChainShowcase stories={proofStories} />
      )}

      <ServicesPreview slides={serviceSlides} />
      <MaterielGrid images={materiel} />
      <WhyUs />
      <ProjectsPreview projects={projects} />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
