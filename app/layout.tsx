import type { Metadata } from "next";

import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://leagb.dz"),
  title: {
    default: "LEAGB — Laboratoire Géotechnique | Chéraga, Alger",
    template: "%s | LEAGB",
  },
  description:
    "Laboratoire géotechnique à Chéraga (Alger) : contrôle qualité béton, essai ultrasonique, étude de sol, sondage pressiométrique APAGEO, injection de fissures. Tél. 0661 10 07 03.",
  keywords: [
    "laboratoire géotechnique",
    "contrôle béton",
    "essai ultrasonique",
    "étude de sol",
    "pressiomètre APAGEO",
    "injection fissures béton",
    "Chéraga",
    "Alger",
    "LEAGB",
  ],
  openGraph: {
    type: "website",
    locale: "fr_DZ",
    siteName: "LEAGB",
    title: "LEAGB — Laboratoire Géotechnique",
    description:
      "Contrôle qualité béton, géotechnique et diagnostic structurel à Alger.",
    images: [{ url: "/Logo.jpeg", alt: "LEAGB — Laboratoire Géotechnique" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAGB — Laboratoire Géotechnique",
    description:
      "Contrôle qualité béton, géotechnique et diagnostic structurel à Alger.",
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
