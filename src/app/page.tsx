"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const [user] = useAuth();

  return (
    <PageWrapper title="Landing page in construction">
      {JSON.stringify(user)}
      <Link href="/bengaudry/trips/manage">Test</Link>
    </PageWrapper>
  );
}
