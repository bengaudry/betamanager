"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) push(`/${session.user?.name}`)

  return children;
}
