"use client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

import { CTA } from "../CTA";

export function AuthButtons({ session }: { session: Session | null }) {
  const { push } = useRouter();

  if (!session?.user)
    return (
      <div className="flex items-center justify-end gap-1">
        <CTA small secondary label="Sign in" onClick={() => push("/signin")} />
        <CTA small label="Get started" onClick={() => push("/create-org")} />
      </div>
    );

  return (
    <CTA
      small
      label="My projects"
      onClick={() => push(`/${session?.user?.name?.toLowerCase()}`)}
    />
  );
}
