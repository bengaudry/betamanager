import { PropsWithChildren, Suspense } from "react";

export default function LinkGithubLayout ({ children }: Readonly<PropsWithChildren>) {
    return <Suspense>
        {children}
    </Suspense>
}