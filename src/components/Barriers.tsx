"use client";
import { useAuth } from "@/hooks/useAuth";
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
  const [user, loading] = useAuth();

  useGuard(href ?? "/signin", !loading && user === null);

  return loading ? null : children;
}

export function PremiumGuarded({
  children,
  href,
}: PropsWithChildren & { href?: string }) {
  const [user, loading] = useAuth();

  useGuard(href ?? "/", !loading && (user === null || !user.isPremium));

  return loading ? null : children;
}
