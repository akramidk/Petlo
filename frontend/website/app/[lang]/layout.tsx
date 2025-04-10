import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import { SnackbarProvider } from "../SnackbarProvider";
import clsx from "clsx";
import { Logo } from "../components/Logo";
import Link from "next/link";
import { TrackingProvider } from "./TrackingProvider";
import { HotjarProvider } from "../HotjarProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({ subsets: ["latin"] });
const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Petlo - Buy or Schedule Your Pets' Needs.",
  description: "Buy or Schedule Your Pets' Needs.",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const config =
    lang === "ar"
      ? {
          dir: "rtl",
          lang: "ar",
          className: ibm.className,
        }
      : {
          dir: "ltr",
          lang: "en",
          className: manrope.className,
        };

  return (
    <html {...config}>
      <body>
        <SnackbarProvider>
          <Link
            href="https://wa.me/message/5GNHRB37TEZ3K1"
            className="bg-[#fff] p-[16px] border-b-[1px] border-[#f2f2f2] font-medium text-[14px] text-[#444] underline block"
            target="_blank"
          >
            <div className="flex items-center place-content-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.80174 11.3386C3.82333 11.3327 3.84639 11.3357 3.86572 11.347L4.31817 11.6113C5.13213 12.0861 6.05789 12.3353 7.00017 12.3333C8.055 12.3333 9.08614 12.0205 9.96321 11.4345C10.8403 10.8485 11.5239 10.0155 11.9275 9.04098C12.3312 8.06644 12.4368 6.99409 12.231 5.95952C12.0252 4.92496 11.5173 3.97465 10.7714 3.22877C10.0255 2.48289 9.07521 1.97494 8.04065 1.76915C7.00608 1.56337 5.93373 1.66898 4.95919 2.07265C3.98465 2.47632 3.1517 3.1599 2.56567 4.03697C1.97963 4.91403 1.66684 5.94517 1.66684 7.00001C1.66684 7.95734 1.91817 8.87534 2.3895 9.68267L2.65326 10.1352C2.6645 10.1545 2.66754 10.1775 2.66168 10.199L2.27375 11.6254C2.25684 11.6876 2.31392 11.7446 2.37611 11.7276L3.80174 11.3386ZM0.617413 13.5899C0.493031 13.6239 0.378867 13.5098 0.412723 13.3854L1.2375 10.3547C0.643597 9.33657 0.331569 8.17867 0.333505 7.00001C0.333505 3.31801 3.31817 0.333344 7.00017 0.333344C10.6822 0.333344 13.6668 3.31801 13.6668 7.00001C13.6668 10.682 10.6822 13.6667 7.00017 13.6667C5.82202 13.6686 4.66461 13.3568 3.64684 12.7633L0.617413 13.5899ZM4.59417 3.87201C4.6835 3.86534 4.7735 3.86534 4.86283 3.86934C4.89884 3.87201 4.93484 3.87601 4.97084 3.88001C5.07684 3.89201 5.1935 3.95667 5.23283 4.04601C5.4315 4.49667 5.62484 4.95067 5.8115 5.40601C5.85283 5.50734 5.82817 5.63734 5.7495 5.76401C5.6954 5.84966 5.63688 5.93244 5.57417 6.01201C5.49883 6.10867 5.33683 6.28601 5.33683 6.28601C5.33683 6.28601 5.27083 6.36467 5.29617 6.46267C5.3055 6.50001 5.33617 6.55401 5.36417 6.59934L5.4035 6.66267C5.57417 6.94734 5.8035 7.23601 6.0835 7.50801C6.1635 7.58534 6.2415 7.66467 6.3255 7.73867C6.6375 8.014 6.99083 8.23867 7.37217 8.40534L7.3755 8.40667C7.43217 8.43134 7.46083 8.44467 7.5435 8.48C7.58483 8.49734 7.6275 8.51267 7.67083 8.524C7.71561 8.53541 7.76277 8.53326 7.80633 8.51783C7.84989 8.5024 7.88788 8.47439 7.9155 8.43734C8.39817 7.85267 8.44217 7.81467 8.44617 7.81467V7.816C8.4797 7.78473 8.51953 7.76099 8.563 7.74639C8.60647 7.73179 8.65255 7.72665 8.69817 7.73134C8.73817 7.734 8.77883 7.74134 8.81617 7.75801C9.17017 7.92001 9.7495 8.17267 9.7495 8.17267L10.1375 8.34667C10.2028 8.37801 10.2622 8.452 10.2642 8.52334C10.2668 8.568 10.2708 8.64 10.2555 8.772C10.2342 8.94467 10.1822 9.152 10.1302 9.26067C10.0946 9.33483 10.0473 9.4028 9.99016 9.462C9.92289 9.53264 9.84925 9.59691 9.77017 9.654C9.74281 9.67458 9.71502 9.69458 9.68683 9.714C9.60391 9.76661 9.51872 9.81555 9.4315 9.86067C9.25985 9.95184 9.07027 10.0042 8.87617 10.014C8.75283 10.0207 8.6295 10.03 8.5055 10.0233C8.50017 10.0233 8.12683 9.96534 8.12683 9.96534C7.179 9.71603 6.30243 9.24898 5.56683 8.60134C5.41617 8.46867 5.27683 8.326 5.13417 8.184C4.54084 7.59401 4.09284 6.95734 3.82084 6.35601C3.68162 6.06087 3.60641 5.73961 3.60017 5.41334C3.59742 5.00857 3.72973 4.61445 3.97617 4.29334C4.02484 4.23067 4.07084 4.16534 4.15017 4.09001C4.23484 4.01001 4.28817 3.96734 4.34617 3.93801C4.42328 3.89936 4.50741 3.87669 4.5935 3.87134L4.59417 3.87201Z"
                  fill="#292B2E"
                />
              </svg>

              <div className={lang === "en" ? "ml-[6px]" : "mr-[6px]"}>
                {lang === "en"
                  ? "Support via WhatsApp +962790174799"
                  : "الدعم عن طريق واتساب 962790174799+"}
              </div>
            </div>
          </Link>

          {children}
          <div
            className={clsx(
              "bg-[#fff] border-t-[1px] border-[#f2f2f2] p-[32px] md:px-[36px] lg:px-[52px] md:flex md:justify-between md:items-center text-center space-y-[12px]",
              manrope.className
            )}
            dir="ltr"
          >
            <Logo />

            <div className="text-[#444] font-semibold text-[14px]">
              support@petlo.co | +962790174799
            </div>
          </div>
          <HotjarProvider />
          <TrackingProvider />
          <Analytics />
          <SpeedInsights />
        </SnackbarProvider>
      </body>
    </html>
  );
}
