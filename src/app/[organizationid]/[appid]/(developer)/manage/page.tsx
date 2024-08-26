"use client";
import { PageWrapper } from "@/components/Page";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const { appid } = useParams();

  return (
    <PageWrapper title="Dashboard">
      <p>{appid}</p>
    </PageWrapper>
  );
}
