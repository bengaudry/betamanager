import { PropsWithChildren, Suspense } from "react";

export function LinkGithubLayout ({ children }: Readonly<PropsWithChildren>) {
    return <Suspense>
        {children}
    </Suspense>
}