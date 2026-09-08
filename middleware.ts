import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Le site LEAGB est 100 % en français (pas d’i18n).
 * Redirige /fr et /fr/* vers les routes sans préfixe.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/fr" || pathname === "/fr/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/fr/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/fr/, "") || "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/fr", "/fr/:path*"],
};
