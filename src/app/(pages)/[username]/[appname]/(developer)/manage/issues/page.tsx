import { IssuesTable } from "@/components/IssuesTable";
import { PageWrapper } from "@/components/PageWrapper";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/utils";
import { Issue } from "@prisma/client";

export default async function IssuesPage({
  params,
}: {
  params: { appname: string; username: string };
}) {
  const session = await auth();

  const project = await prisma.project.findFirst({
    where: { name: params.appname, userId: session?.user?.id },
  });

  const res = await fetch(
    `${getBaseUrl()}/api/project-issues?project-id=${project?.id}`
  );
  const issues: Issue[] = await res.json();

  return (
    <PageWrapper title="Issues">
      <IssuesTable issues={issues} />
    </PageWrapper>
  );
}
