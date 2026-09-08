import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type BrandLogoProps = {
  className?: string;
  /** dark = plaque claire sur fond sombre ; light = logo direct sur fond logo. */
  surface?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const heightClass = {
  sm: "h-11",
  md: "h-12",
  lg: "h-14",
} as const;

export function BrandLogo({
  className,
  surface = "dark",
  size = "md",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-tech focus-visible:ring-offset-2",
        surface === "dark"
          ? "focus-visible:ring-offset-navy"
          : "focus-visible:ring-offset-[#F7F6F4]",
        className
      )}
      aria-label={`${SITE.name} — Accueil`}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center overflow-hidden",
          surface === "dark" &&
            "rounded-md bg-[#F7F6F4] px-1.5 py-1 shadow-sm ring-1 ring-black/5"
        )}
      >
        <Image
          src="/Logo.jpeg"
          alt="LEAGB — Étude de sol et de stabilité"
          width={720}
          height={602}
          priority={priority}
          sizes="72px"
          className={cn("w-auto object-contain object-center", heightClass[size])}
        />
      </span>
    </Link>
  );
}
