import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {/* pb-24 : dégagement pour le bouton WhatsApp flottant */}
      <main className="min-h-[60vh] pb-24">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
