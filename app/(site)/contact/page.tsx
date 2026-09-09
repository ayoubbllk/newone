import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactMap } from "@/components/contact/ContactMap";
import { Reveal } from "@/components/motion/Reveal";
import { PAGE_SEO } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = PAGE_SEO.contact;

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-navy-foreground">
        <div className="container py-12 sm:py-16 lg:py-20">
          <Reveal className="section-header">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber-tech">
              Contact
            </p>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-foreground sm:text-4xl lg:text-5xl">
              Demandez un devis sur WhatsApp
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-foreground/75 sm:text-base">
              Remplissez le formulaire : le message s’ouvre dans WhatsApp, prêt
              à envoyer au {SITE.phoneDisplay}.
            </p>
          </Reveal>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-red-accent via-amber-tech to-transparent" />
      </section>

      <section className="bg-offwhite section-y">
        <div className="container grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="h-full bg-navy p-6 text-navy-foreground sm:p-9">
              <ContactInfo />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="border border-navy/10 bg-white p-5 sm:p-8">
              <h2 className="text-center font-display text-xl font-semibold text-navy sm:text-2xl">
                Message WhatsApp
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-text">
                Aucun e-mail serveur : votre demande part directement via
                WhatsApp vers LEAGB.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container mt-8 sm:mt-14">
          <Reveal>
            <ContactMap />
          </Reveal>
        </div>
      </section>
    </>
  );
}
