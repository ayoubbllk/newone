import { NextResponse } from "next/server";

import {
  contactFormSchema,
  getServiceLabel,
} from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Requête invalide." },
      { status: 400 }
    );
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Veuillez vérifier les champs du formulaire.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const payload = {
    ...parsed.data,
    serviceLabel: getServiceLabel(parsed.data.service),
    receivedAt: new Date().toISOString(),
  };

  // TODO: brancher Resend/Nodemailer ici avec les identifiants du client
  console.log("[LEAGB contact]", payload);

  return NextResponse.json(
    {
      ok: true,
      message:
        "Message bien reçu. Notre équipe vous recontactera dans les plus brefs délais.",
    },
    { status: 200 }
  );
}
