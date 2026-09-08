import type { PublicImage } from "@/lib/getImages";
import { getMaterielMeta } from "@/lib/materielMeta";
import type { ProofStory } from "@/components/home/ProofChainShowcase";

/**
 * Transforme les bannières marketing en stories ProofChain.
 * Les fichiers banner-materiel sont carrés (1:1) — le carrousel
 * utilise des cadres de même ratio (object-fit: cover).
 */
export function bannersToProofStories(banners: PublicImage[]): ProofStory[] {
  return banners.map((banner) => {
    const meta = getMaterielMeta(banner);
    return {
      image: banner.src,
      metric: meta.title,
      quote: meta.description,
      name: "LEAGB",
      role: meta.points[0] ?? "Laboratoire géotechnique — Chéraga",
    };
  });
}
