import {
  getPhotoGeneraleImages,
  type PublicImage,
} from "@/lib/getImages";
import type { ServiceId } from "@/lib/services";

/**
 * Règles d’association fichier `public/photo generale` → service.
 * `prefer` tranche quand plusieurs fichiers matchent.
 */
const PHOTO_RULES: {
  id: ServiceId;
  match: RegExp;
  prefer?: RegExp;
}[] = [
  {
    id: "controle-beton",
    match: /v[ée]rification.*qualit[ée].*b[ée]ton/i,
  },
  {
    id: "ultrasonique",
    match: /contr[ôo]le et suivi.*qualit[ée]/i,
  },
  {
    id: "etude-sol",
    match: /[ée]tude de sol/i,
    prefer: /\+/,
  },
  {
    id: "etude-stabilite",
    match: /[ée]tude de sol|stabilit/i,
    prefer: /\+/,
  },
  {
    id: "pressiometre",
    match: /sondage pressiom/i,
  },
  {
    id: "injection-beton",
    match: /fissures.*injection|traitement et r[ée]paration/i,
    prefer: /^(?!.*\s2\b)/i,
  },
];

function pickBest(
  candidates: PublicImage[],
  prefer?: RegExp
): PublicImage | undefined {
  if (candidates.length === 0) return undefined;
  if (!prefer) return candidates[0];
  return (
    candidates.find((img) => prefer.test(img.name)) ?? candidates[0]
  );
}

/** Résout la photo générale associée à un service. */
export function resolveServicePhoto(
  serviceId: ServiceId,
  photos: PublicImage[] = getPhotoGeneraleImages()
): PublicImage | undefined {
  const rule = PHOTO_RULES.find((r) => r.id === serviceId);
  if (!rule) return undefined;

  const candidates = photos.filter((img) =>
    rule.match.test(`${img.name} ${img.filename}`)
  );
  return pickBest(candidates, rule.prefer);
}

/** Map serviceId → photo pour usage en lot (home, services, projets). */
export function resolveAllServicePhotos(
  photos: PublicImage[] = getPhotoGeneraleImages()
): Partial<Record<ServiceId, PublicImage>> {
  const out: Partial<Record<ServiceId, PublicImage>> = {};
  for (const rule of PHOTO_RULES) {
    const photo = resolveServicePhoto(rule.id, photos);
    if (photo) out[rule.id] = photo;
  }
  return out;
}
