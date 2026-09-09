import { ServiceLandingAudiences } from "@/components/services/landing/ServiceLandingAudiences";
import { ServiceLandingCta } from "@/components/services/landing/ServiceLandingCta";
import { ServiceLandingDeliverables } from "@/components/services/landing/ServiceLandingDeliverables";
import { ServiceLandingHero } from "@/components/services/landing/ServiceLandingHero";
import { ServiceLandingProcess } from "@/components/services/landing/ServiceLandingProcess";
import { ServiceLandingRelated } from "@/components/services/landing/ServiceLandingRelated";
import type { PublicImage } from "@/lib/getImages";
import type { Service } from "@/lib/services";
import type { ServiceLanding } from "@/lib/serviceLandings";

type Props = {
  landing: ServiceLanding;
  service: Service;
  image?: PublicImage;
  related: ServiceLanding[];
};

export function ServiceLandingView({
  landing,
  service,
  image,
  related,
}: Props) {
  return (
    <>
      <ServiceLandingHero
        landing={landing}
        image={image}
        whatsappMessage={service.whatsappMessage}
      />
      <ServiceLandingProcess landing={landing} />
      <ServiceLandingDeliverables landing={landing} service={service} />
      <ServiceLandingAudiences landing={landing} />
      <ServiceLandingRelated related={related} />
      <ServiceLandingCta
        landing={landing}
        whatsappMessage={service.whatsappMessage}
      />
    </>
  );
}
