import type { Metadata } from "next";

import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://leagb.dz"),
  title: {
    default: "Laboratoire géotechnique et béton à Alger — LEAGB Chéraga",
    template: "%s | LEAGB",
  },
  description:
    "Laboratoire géotechnique et béton à Alger — LEAGB Chéraga. Étude de sol, étude de stabilité, contrôle béton et injection des fissures. Tél. 0661 10 07 03 · 0770 01 29 32 · 0550 35 90 25.",
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
    "Chéraga",
    "Alger",
    "LEAGB",
  ],
  icons: {
    icon: [{ url: "/Logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/Logo.jpeg", type: "image/jpeg" }],
    shortcut: "/Logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: "LEAGB",
    title: "LEAGB — Laboratoire géotechnique et béton à Alger",
    description:
      "Laboratoire géotechnique et béton à Alger : étude de sol, étude de stabilité, contrôle béton et traitement des fissures.",
    images: [{ url: "/Logo.jpeg", alt: "LEAGB — Laboratoire Géotechnique Algérie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAGB — Laboratoire géotechnique et béton à Alger",
    description:
      "Laboratoire géotechnique et béton à Alger — LEAGB Chéraga.",
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
