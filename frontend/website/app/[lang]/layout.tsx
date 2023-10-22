import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans_Arabic } from "next/font/google";
import { SnackbarProvider } from "../SnackbarProvider";

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
          <Analytics />
        </SnackbarProvider>
      </body>
    </html>
  );
}
