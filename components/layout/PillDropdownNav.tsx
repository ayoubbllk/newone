"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; description?: string }[];
};

const NAV_ITEMS: NavItem[] = NAV_LINKS.map((link) => {
  if (link.href === "/services") {
    return {
      ...link,
      children: SERVICES.map((service) => ({
        href: service.href,
        label: service.title,
        description: service.short,
      })),
    };
  }
  return { ...link };
});

type PillDropdownNavProps = {
  /** Contrôle externe du menu mobile (header conserve logo + burger). */
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  className?: string;
  /** Affiche uniquement la pilule desktop (logo reste séparé dans le Header). */
  desktopOnly?: boolean;
  /** Affiche uniquement le burger + drawer mobile. */
  mobileOnly?: boolean;
};

/**
 * Port Next.js du composant Framer Pill Dropdown Nav
 * https://framer.com/m/Pill-Dropdown-Nav-s5GzCY.js@eunA8uaaXny3CJiuNFNw
 *
 * Desktop : pilule flottante + highlight glissant + panneaux dropdown.
 * Mobile : menu plein écran (logo géré à part dans le Header).
 */
export function PillDropdownNav({
  mobileOpen,
  onMobileOpenChange,
  className,
  desktopOnly = false,
  mobileOnly = false,
}: PillDropdownNavProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const layoutGroupId = useId();
  const [hovered, setHovered] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onMobileOpenChange(false);
    setOpenDropdown(null);
    setHovered(null);
    setMobileSection(null);
  }, [pathname, onMobileOpenChange]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setHovered(null);
    }, 120);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  const showDesktop = !mobileOnly;
  const showMobile = !desktopOnly;

  return (
    <>
      {/* Desktop pill */}
      {showDesktop && (
      <LayoutGroup id={layoutGroupId}>
        <nav
          className={cn(
            "relative hidden items-center lg:flex",
            className
          )}
          aria-label="Navigation principale"
          onMouseLeave={scheduleClose}
        >
          <div className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-[rgba(17,17,17,0.94)] p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const isHot =
                hovered === item.href ||
                openDropdown === item.href ||
                active;
              const hasChildren = Boolean(item.children?.length);

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHovered(item.href);
                    setOpenDropdown(hasChildren ? item.href : null);
                  }}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className={cn(
                        "relative z-10 inline-flex items-center gap-1.5 rounded-full px-[18px] py-[11px] text-[15px] font-medium tracking-[-0.01em] transition-colors",
                        isHot ? "text-white" : "text-white/55"
                      )}
                      aria-expanded={openDropdown === item.href}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.href ? null : item.href
                        )
                      }
                    >
                      {isHot && (
                        <motion.span
                          layoutId="pill-nav-highlight"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", bounce: 0.12, duration: 0.4 }
                          }
                        />
                      )}
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-white/45 transition-transform duration-300",
                          openDropdown === item.href && "rotate-180 text-white/80"
                        )}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative z-10 inline-flex items-center rounded-full px-[18px] py-[11px] text-[15px] font-medium tracking-[-0.01em] transition-colors",
                        isHot ? "text-white" : "text-white/55"
                      )}
                    >
                      {isHot && (
                        <motion.span
                          layoutId="pill-nav-highlight"
                          className="absolute inset-0 -z-10 rounded-full bg-white/10"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", bounce: 0.12, duration: 0.4 }
                          }
                        />
                      )}
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {hasChildren && openDropdown === item.href && (
                      <motion.div
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, y: 8, scale: 0.98 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 6, scale: 0.98 }
                        }
                        transition={{ duration: 0.22, ease: [0.44, 0, 0.56, 1] }}
                        className="absolute left-1/2 top-[calc(100%+14px)] z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2"
                        onMouseEnter={clearCloseTimer}
                      >
                        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(30,30,32,0.97)] p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                          <ul className="space-y-0.5">
                            {item.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block rounded-2xl px-3.5 py-3 transition-colors hover:bg-white/10"
                                >
                                  <span className="block text-sm font-medium text-white">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-white/45">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href="/services"
                                className="mt-1 block rounded-2xl px-3.5 py-2.5 text-sm font-medium text-amber-tech transition-colors hover:bg-white/10"
                              >
                                Voir tous les services →
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </nav>
      </LayoutGroup>
      )}

      {/* Mobile trigger — même emplacement qu’avant */}
      {showMobile && (
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition-colors hover:bg-navy/[0.04] lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls="mobile-pill-nav"
        aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => onMobileOpenChange(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      )}

      <AnimatePresence>
        {showMobile && mobileOpen && (
          <motion.div
            id="mobile-pill-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(17,17,17,0.96)] backdrop-blur-md lg:hidden"
          >
            <motion.nav
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="container flex h-full flex-col gap-1 overflow-y-auto pb-10 pt-28"
              aria-label="Navigation mobile"
            >
              {NAV_ITEMS.map((item, index) => {
                const active = isActive(item.href);
                const hasChildren = Boolean(item.children?.length);
                const sectionOpen = mobileSection === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * index }}
                    className="border-b border-white/10"
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-between py-4 text-left font-display text-2xl tracking-wide",
                            active || sectionOpen
                              ? "text-white"
                              : "text-white/75"
                          )}
                          aria-expanded={sectionOpen}
                          onClick={() =>
                            setMobileSection((prev) =>
                              prev === item.href ? null : item.href
                            )
                          }
                        >
                          <span className="inline-flex items-center gap-3">
                            {item.label}
                            {active && (
                              <span className="inline-block h-2 w-2 rounded-full bg-amber-tech" />
                            )}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-white/45 transition-transform",
                              sectionOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {sectionOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pb-3"
                            >
                              {item.children!.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className="block rounded-xl px-1 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/services"
                                  className="block px-1 py-2 text-sm font-medium text-amber-tech"
                                >
                                  Tous les services
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-4 font-display text-2xl tracking-wide text-white/75",
                          active && "text-white"
                        )}
                      >
                        {item.label}
                        {active && (
                          <span className="ml-3 inline-block h-2 w-2 rounded-full bg-amber-tech align-middle" />
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center gap-2 text-base font-medium text-white"
                >
                  <Phone className="h-4 w-4 text-amber-tech" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
                <Button asChild variant="cta" size="lg" className="w-full font-semibold">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
