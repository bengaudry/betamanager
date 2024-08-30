"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { PageWrapper } from "@/components/PageWrapper";

export default function OrgAppLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const { organizationname, appid } = useParams();

  const [loading, setLoading] = useState(false);
  const [projectsIds, setProjectsIds] = useState<Array<string>>([]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(
      `/api/organization-projects?organization-name=${organizationname}&curr-uid=${user.id}`
    )
      .then((value) => value.json())
      .then((json: Project[]) => {
        setProjectsIds(json.map((project) => project.name));
      })
      .catch(() => setProjectsIds([]))
      .finally(() => setLoading(false));
  }, [appid, user]);

  // if (!loading && !projectsIds?.includes(appid as string))
  //   return (
  //     <PageWrapper title="Not found">
  //       {projectsIds.join("/")}
  //       <p>
  //         This project does not exist. You may be trying to access a project
  //         that does not belong to your organization and that is not public.
  //       </p>

  //       <Link
  //         href="/"
  //         className="text-indigo-600 text-lg font-medium mt-6"
  //       >
  //         <i className="fi fi-rr-angle-left text-sm inline-block" />
  //         &nbsp;Go back home
  //       </Link>
  //     </PageWrapper>
  //  );

  if (loading) return <PageWrapper loading={true} />;

  return <>{children}</>;
}
