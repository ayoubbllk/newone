import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".JPG",
  ".JPEG",
  ".PNG",
  ".WEBP",
  ".GIF",
  ".AVIF",
]);

export type PublicImage = {
  /** Nom de fichier tel que lu sur le disque */
  filename: string;
  /** Chemin public utilisable par next/image (ex: /materiel/photo.jpg) */
  src: string;
  /** Nom sans extension, utile pour légendes */
  name: string;
};

function toPublicSrc(relativeDir: string, filename: string): string {
  const dirParts = relativeDir
    .split(/[/\\]/)
    .filter(Boolean)
    .map((part) => encodeURIComponent(part));
  return `/${dirParts.join("/")}/${encodeURIComponent(filename)}`;
}

function readImageDir(relativeDir: string): PublicImage[] {
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);

  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  return fs
    .readdirSync(absoluteDir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file)))
    .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }))
    .map((filename) => ({
      filename,
      src: toPublicSrc(relativeDir, filename),
      name: path.parse(filename).name,
    }));
}

/** Photos individuelles du matériel de laboratoire */
export function getMaterielImages(): PublicImage[] {
  return readImageDir("materiel");
}

/** Bannières marketing pleine largeur du matériel */
export function getBannerMaterielImages(): PublicImage[] {
  return readImageDir("banner-materiel");
}

/** Photos générales associées aux services / expertises */
export function getPhotoGeneraleImages(): PublicImage[] {
  return readImageDir("photo generale");
}

export function getAllLabImages() {
  return {
    materiel: getMaterielImages(),
    banners: getBannerMaterielImages(),
    photoGenerale: getPhotoGeneraleImages(),
  };
}
