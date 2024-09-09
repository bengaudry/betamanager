"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const { appname } = useParams();

  return (
    <PageWrapper title="Dashboard">
      <p>{appname}</p>
    </PageWrapper>
  );
}
