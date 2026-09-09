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
      {/* pb-28 : dégagement pour le bouton WhatsApp flottant agrandi */}
      <main className="min-h-[60vh] pb-28 sm:pb-32">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
