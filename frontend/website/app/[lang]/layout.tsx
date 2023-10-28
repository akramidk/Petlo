import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import { SnackbarProvider } from "../SnackbarProvider";
import clsx from "clsx";
import { Logo } from "../components/Logo";

const manrope = Manrope({ subsets: ["latin"] });
const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Petlo",
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
          {children}
          <div
            className={clsx(
              "bg-[#E7E3D8] p-[52px] md:p-[20px] md:flex md:justify-between md:items-center text-center space-y-[16px]",
              manrope.className
            )}
          >
            <div className="text-[#444] font-semibold text-[14px]">
              support@petlo.co | +962790174799
            </div>
            <Logo />
          </div>
          <Analytics />
        </SnackbarProvider>
      </body>
    </html>
  );
}
