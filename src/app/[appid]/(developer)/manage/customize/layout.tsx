"use client";
import { PageWrapper } from "@/components/Page";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

export default function CustomizeFormsLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { appid } = useParams();

  return (
    <PageWrapper title="Customize forms">
      <nav>
        <Link href={`/${appid}/manage/customize`}>Issues</Link>
        <Link href={`/${appid}/manage/customize/suggestions`}>Suggestions</Link>
      </nav>
      <div>{children}</div>
    </PageWrapper>
  );
}
