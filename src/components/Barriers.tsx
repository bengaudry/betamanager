"use client";
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

  console.log(session)

  useGuard(href ?? "/signin", session === null);

  // Return nothing if session is loading
  if (session === undefined) return null;

  return children;
}

export function PremiumGuarded({
  children,
  href,
}: PropsWithChildren & { href?: string }) {
  const { data: session } = useSession();

  // useGuard(href ?? "/", session === null || session.user?.subscription === "free");

  // Return nothing if session is loading
  if (session === undefined) return null;

  return children;
}
