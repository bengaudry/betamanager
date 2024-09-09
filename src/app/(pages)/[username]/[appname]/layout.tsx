import { auth } from "@/lib/auth";
import { getBaseUrl } from "@/lib/utils";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function UserAppLayout({
  children,
  params,
}: Readonly<PropsWithChildren> & {
  params: { username: string; appname: string };
}) {
  // Check if an app exists and is available to current user before showing it
  const session = await auth();

  const res = await fetch(
    `${getBaseUrl()}/api/user-projects?username=${params.username}&curr-uid=${
      session?.user?.id
    }`
  );
  const projects: Project[] = await res.json();

  const projectsMatchingWithUrl = projects.filter(
    ({ name }) => name === params.appname
  );

  if (projectsMatchingWithUrl.length < 1) redirect(`/${params.username}`);

  return children;
}
