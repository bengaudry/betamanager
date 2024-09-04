import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export async function SessionWrapper({ children }: PropsWithChildren) {
    const session = await auth();

    return <SessionProvider session={session}>
        {children}
    </SessionProvider>;
}
