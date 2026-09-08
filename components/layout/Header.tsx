"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Phone } from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { PillDropdownNav } from "@/components/layout/PillDropdownNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b border-navy/10 bg-offwhite text-navy transition-[box-shadow,background-color] duration-300",
        scrolled &&
          "bg-offwhite/92 shadow-[0_8px_30px_rgba(11,42,74,0.08)] backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "container relative flex items-center justify-between gap-3 transition-[height] duration-300 sm:gap-4",
          scrolled ? "h-16 sm:h-[4.25rem]" : "h-[4.5rem] sm:h-[5rem]"
        )}
      >
        {/* Logo séparé du pill (desktop) ; inchangé à gauche en mobile */}
        <BrandLogo
          priority
          surface="light"
          size={scrolled ? "sm" : "md"}
          className="relative z-50"
        />

        {/* Pilule centrée — desktop only */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center lg:flex">
          <div className="pointer-events-auto">
            <PillDropdownNav
              mobileOpen={mobileOpen}
              onMobileOpenChange={setMobileOpen}
              desktopOnly
            />
          </div>
        </div>

        <div className="relative z-50 flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-navy/80 transition-colors hover:text-navy"
            >
              <Phone className="h-4 w-4 text-amber-tech" aria-hidden />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <Button asChild variant="cta" size="sm" className="font-semibold">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>

          {/* Burger mobile — même place qu’avant */}
          <div className="lg:hidden">
            <PillDropdownNav
              mobileOpen={mobileOpen}
              onMobileOpenChange={setMobileOpen}
              mobileOnly
            />
          </div>
        </div>
      </div>

      <div className="h-0.5 w-full bg-gradient-to-r from-red-accent via-amber-tech to-transparent opacity-90" />
    </motion.header>
  );
}
