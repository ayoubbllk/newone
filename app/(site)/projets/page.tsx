import { ProjectsFilterGrid } from "@/components/projets/ProjectsFilterGrid";
import { ProjectsHero } from "@/components/projets/ProjectsHero";
import { getPhotoGeneraleImages } from "@/lib/getImages";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { resolveAllServicePhotos } from "@/lib/serviceImages";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.projets;

export default function ProjetsPage() {
  const servicePhotos = resolveAllServicePhotos(getPhotoGeneraleImages());

  const projects = PROJECTS.map((project) => {
    const service = SERVICES.find((s) => s.id === project.serviceId);
    const photo = servicePhotos[project.serviceId];
    return {
      ...project,
      image: photo?.src ?? "/designe/banner.png",
      serviceLabel: service?.title ?? project.serviceId,
      serviceHref: service?.href ?? "/services",
    };
  });

  return (
    <>
      <ProjectsHero />
      <ProjectsFilterGrid projects={projects} />
    </>
  );
}
