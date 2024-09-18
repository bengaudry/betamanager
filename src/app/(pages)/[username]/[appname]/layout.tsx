import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
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

  const projectsNb = await prisma.project.count({ where: {
    userName: params.username,
    name: params.appname,
    userId: session?.user?.id
  }})

  if (projectsNb < 1) redirect(`/${params.username}`);

  return children;
}
