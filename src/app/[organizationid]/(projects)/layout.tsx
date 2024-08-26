import { AuthGuarded } from "@/components/Barriers";
import { PropsWithChildren } from "react";

export default function ProjectsLayout ({children}: Readonly<PropsWithChildren>) {
    return <AuthGuarded>
        {children}
    </AuthGuarded>
}