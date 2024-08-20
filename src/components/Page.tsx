import { type PropsWithChildren } from "react";

export function PageWrapper ({title, children}: React.PropsWithChildren & { title: string }) {
    return <div className="py-16 px-8">
        <h1 className="font-bold text-3xl">{title}</h1>
        {children}
    </div>

}