"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  buildWhatsAppContactMessage,
  contactWhatsAppSchema,
  type ContactWhatsAppValues,
} from "@/lib/contact-schema";
import { SERVICES } from "@/lib/services";
import { buildWhatsAppUrl } from "@/lib/site";

export function ContactForm() {
  const form = useForm<ContactWhatsAppValues>({
    resolver: zodResolver(contactWhatsAppSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: undefined,
      message: "",
    },
  });

  function onSubmit(values: ContactWhatsAppValues) {
    const text = buildWhatsAppContactMessage(values);
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-left">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre nom et prénom"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input
                  placeholder="06 XX XX XX XX"
                  type="tel"
                  autoComplete="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service concerné</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                  <SelectItem value="autre">Autre / demande générale</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre besoin</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre chantier, la localisation et le type d’essai…"
                  className="min-h-[140px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="w-full font-semibold sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          Envoyer sur WhatsApp
        </Button>

        <p className="text-xs leading-relaxed text-slate-text">
          Le message s’ouvre directement dans WhatsApp, prêt à être envoyé à
          LEAGB ({SERVICES.length} services + demande générale).
        </p>
      </form>
    </Form>
  );
}
