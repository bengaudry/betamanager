"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function useGuard(href: string, condition: boolean) {
  const { replace } = useRouter();

  useEffect(() => {
    if (condition) {
      console.info("Redirected to " + href);
      replace(href);
    }
  }, [condition, href, replace]);
}

export function AuthGuarded({
  children,
  href,
}: PropsWithChildren & { href?: string }) {
  const { data: session } = useSession();

  useGuard(href ?? "/signin", session === null);

  return children;
}

export function PremiumGuarded({
  children,
  href,
}: PropsWithChildren & { href?: string }) {
  const [user, loading] = useAuth();

  useGuard(href ?? "/", !loading && (user === null || !user.isPremium));

  return loading ? null : children;
}
