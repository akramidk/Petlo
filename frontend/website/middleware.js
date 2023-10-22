import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

let locales = ["en", "ar"];
let defaultLocale = "ar";

function getLocale(request) {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  console.log("locale", locale);

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.nextUrl)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
