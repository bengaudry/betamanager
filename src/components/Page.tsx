import { type PropsWithChildren } from "react";

export function PageWrapper ({title, children}: PropsWithChildren & { title: string }) {
    return <div className="py-16 px-8 w-full">
        <h1 className="font-bold text-3xl mb-4">{title}</h1>
        {children}
    </div>

}