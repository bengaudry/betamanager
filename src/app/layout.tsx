import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { SessionWrapper } from "@/components/SessionWrapper";

import "./globals.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import "@flaticon/flaticon-uicons/css/brands/all.css";

const font = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Betamanager",
  description:
    "Manage new users and correct your app or saas issues thanks to Betamanager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Analytics />
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
