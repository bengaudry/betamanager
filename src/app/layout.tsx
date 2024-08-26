import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css"
import "@flaticon/flaticon-uicons/css/solid/rounded.css"

const font = Poppins({ weight: "400", subsets: ["latin"] });

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
