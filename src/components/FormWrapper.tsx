import { PropsWithChildren } from "react";

export function FormWrapper ({ children }: PropsWithChildren) {
    return (<div className="flex flex-col gap-3">{children}</div>)
}