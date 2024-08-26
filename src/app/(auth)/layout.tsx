"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  const [user, loading] = useAuth();
  const { push } = useRouter();

  if (!loading && user !== null) push(`/${user.displayName}`);
  return children;
}
