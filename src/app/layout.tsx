import type { Metadata } from "next";
import { Raleway, Racing_Sans_One } from "next/font/google";
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
      <body className={font.className}>{children}</body>
    </html>
  );
}
