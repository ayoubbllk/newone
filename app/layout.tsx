import type { Metadata } from "next";

import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://leagb.dz"),
  title: {
    default: "Laboratoire géotechnique à Alger — LEAGB Chéraga",
    template: "%s | LEAGB",
  },
  description:
    "Laboratoire géotechnique LEAGB à Chéraga (Alger) : essais terrain et laboratoire pour promoteurs, bureaux d’études, architectes et entreprises BTP en Algérie. Tél. 0661 10 07 03.",
  keywords: [
    "étude de sol",
    "étude de sol Algérie",
    "étude de stabilité",
    "contrôle béton",
    "contrôle béton Algérie",
    "injection fissure béton",
    "injection fissures béton Algérie",
    "laboratoire géotechnique Algérie",
    "laboratoire géotechnique Alger",
    "bureau d'études génie civil",
    "promoteur immobilier Algérie",
    "entreprise travaux publics",
    "architecte Alger",
    "essai ultrasonique",
    "pressiomètre APAGEO",
    "Chéraga",
    "Alger",
    "LEAGB",
  ],
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: "LEAGB",
    title: "LEAGB — Laboratoire géotechnique à Alger",
    description:
      "Essais géotechniques et béton à Chéraga (Alger) pour promoteurs, BE génie civil, architectes et entreprises TP / bâtiment en Algérie.",
    images: [{ url: "/Logo.jpeg", alt: "LEAGB — Laboratoire Géotechnique Algérie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAGB — Laboratoire géotechnique à Alger",
    description:
      "Laboratoire géotechnique à Chéraga : missions terrain et laboratoire pour le BTP en Algérie.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen font-sans antialiased">
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
