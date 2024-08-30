"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export default function PagesLayout({children}: Readonly<PropsWithChildren>) {
    return <SessionProvider>
        {children}
    </SessionProvider>
} 