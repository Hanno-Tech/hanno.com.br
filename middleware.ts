import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

// nanno.hanno.com.br serves the Nanno product pages, which live under /[locale]/nanno.
// "/" → /en/nanno, "/pt-BR" → /pt-BR/nanno, "/pt-BR/app" → /pt-BR/nanno/app.
function rewriteNannoHost(req: NextRequest) {
  const [, first = "", ...rest] = req.nextUrl.pathname.split("/");
  const hasLocale = (routing.locales as readonly string[]).includes(first);
  const locale = hasLocale ? first : routing.defaultLocale;
  const tail = (hasLocale ? rest : [first, ...rest]).filter(Boolean).join("/");
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/nanno${tail ? `/${tail}` : ""}`;
  return NextResponse.rewrite(url);
}

export default function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("nanno.")) return rewriteNannoHost(req);
  return intl(req);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (assets)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
