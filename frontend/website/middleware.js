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
    pathname === `/ar-item.png` ||
    pathname.startsWith(`/favicon.ico/`) ||
    pathname === `/favicon.ico` ||
    pathname.startsWith("/api/") ||
    pathname.startsWith(`/dog-cat-image.webp/`) ||
    pathname === `/dog-cat-image.webp` ||
    pathname.startsWith(`/fish.webp/`) ||
    pathname === `/fish.webp` ||
    pathname.startsWith(`/bird.webp/`) ||
    pathname === `/bird.webp` ||
    pathname.startsWith(`/testimonial_1.webp/`) ||
    pathname === `/testimonial_1.webp` ||
    pathname.startsWith(`/testimonial_2.webp/`) ||
    pathname === `/testimonial_2.webp` ||
    pathname.startsWith(`/testimonial_3.webp/`) ||
    pathname === `/testimonial_3.webp` ||
    pathname.startsWith(`/ar_autoship_1.webp/`) ||
    pathname === `/ar_autoship_1.webp` ||
    pathname.startsWith(`/ar_autoship_2.webp/`) ||
    pathname === `/ar_autoship_2.webp` ||
    pathname.startsWith(`/ar_autoship_3.webp/`) ||
    pathname === `/ar_autoship_3.webp` ||
    pathname.startsWith(`/ar_autoship_4.webp/`) ||
    pathname === `/ar_autoship_4.webp` ||
    pathname.startsWith(`/ar_autoship_5.webp/`) ||
    pathname === `/ar_autoship_5.webp` ||
    pathname.startsWith(`/ar_autoship_6.webp/`) ||
    pathname === `/ar_autoship_6.webp` ||
    pathname.startsWith(`/en_autoship_1.webp/`) ||
    pathname === `/en_autoship_1.webp` ||
    pathname.startsWith(`/en_autoship_2.webp/`) ||
    pathname === `/en_autoship_2.webp` ||
    pathname.startsWith(`/en_autoship_3.webp/`) ||
    pathname === `/en_autoship_3.webp` ||
    pathname.startsWith(`/en_autoship_4.webp/`) ||
    pathname === `/en_autoship_4.webp` ||
    pathname.startsWith(`/en_autoship_5.webp/`) ||
    pathname === `/en_autoship_5.webp` ||
    pathname.startsWith(`/en_autoship_6.webp/`) ||
    pathname === `/en_autoship_6.webp` ||
    pathname.startsWith(`/en_other_1.webp/`) ||
    pathname === `/en_other_1.webp` ||
    pathname.startsWith(`/en_other_2.webp/`) ||
    pathname === `/en_other_2.webp` ||
    pathname.startsWith(`/ar_other_1.webp/`) ||
    pathname === `/ar_other_1.webp` ||
    pathname.startsWith(`/ar_other_2.webp/`) ||
    pathname === `/ar_other_2.webp` ||
    pathname.startsWith(`/eloi.webp/`) ||
    pathname === `/eloi.webp`
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
