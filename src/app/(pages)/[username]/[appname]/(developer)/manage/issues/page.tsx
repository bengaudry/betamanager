import { CTA } from "@/components/CTA";
import { PageWrapper } from "@/components/PageWrapper";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/utils";
import { Issue } from "@prisma/client";

const IssueDisplayer = ({ issue }: { issue: Issue }) => {
  return (
    <div className="grid grid-cols-4 w-full">
      <span className="">{issue.title}</span>
      <span className="">{issue.category}</span>
      <span className="">
        {new Date(issue.creationDate).toLocaleDateString()}
      </span>
      <span className="">{issue.title}</span>
    </div>
  );
};

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
      <div className="rounded-md overflow-hidden bg-neutral-100">
        <div className="px-4 pt-4 pb-1 bg-neutral-200 border-b border-neutral-300">
          <div className="mb-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter by email, name, phone number"
              className="bg-white px-4 py-2 rounded-md w-full"
            />
            <CTA label="Add issue" icon="add" />
          </div>
          <div className="grid grid-cols-5 w-full">
            <span>Title</span>
            <span>Category</span>
            <span>Creation date</span>
            <span>Device</span>
            <span>Priority</span>
          </div>
        </div>
        <div className="w-full pb-8">
          {issues && issues.length > 0 ? (
            issues.map((issue) => <IssueDisplayer issue={issue} />)
          ) : (
            <p className="text-center text-neutral-400 mt-4">
              No issues found. Try modifying filters
            </p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
