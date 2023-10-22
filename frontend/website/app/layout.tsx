import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SnackbarProvider } from "./SnackbarProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petlo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <SnackbarProvider>
          {children}
          <Analytics />
        </SnackbarProvider>
      </body>
    </html>
  );
}
