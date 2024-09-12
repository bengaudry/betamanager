import { PageWrapper } from "@/components/PageWrapper";

export default async function DashboardPage({ params }: { params: { appname: string }}) {
  const { appname } = params;

  return (
    <PageWrapper title="Dashboard">
      <p>{appname}</p>
    </PageWrapper>
  );
}
