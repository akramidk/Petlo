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

  if (
    pathnameHasLocale ||
    pathname.startsWith(`/en-screenshot.png/`) ||
    pathname === `/en-screenshot.png` ||
    pathname.startsWith(`/next.svg/`) ||
    pathname === `/next.svg` ||
    pathname.startsWith(`/vercel.svg/`) ||
    pathname === `/vercel.svg` ||
    pathname.startsWith(`/ar-screenshot.png/`) ||
    pathname === `/ar-screenshot.png` ||
    pathname.startsWith(`/en-autoship.png/`) ||
    pathname === `/en-autoship.png` ||
    pathname.startsWith(`/en-item.png/`) ||
    pathname === `/en-item.png` ||
    pathname.startsWith(`/ar-autoship.png/`) ||
    pathname === `/ar-autoship.png` ||
    pathname.startsWith(`/ar-item.png/`) ||
    pathname === `/ar-item.png`
  )
    return;

  // Redirect if there is no locale
  const locale = getLocale(request);
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
