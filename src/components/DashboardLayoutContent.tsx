"use client";
import { Sidebar } from "./Sidebar";
import { useSession } from "next-auth/react";
import { ReactNode, useContext, useEffect } from "react";
import { AuthGuarded } from "./Barriers";
import { Navbar } from "./Navbar";
import { ProjectDataContext } from "./Providers/ProjectDataProvider";
import { useRouter } from "next/navigation";

export const DashboardLayoutContent = ({
  children,
  params,
  userId,
}: {
  children: ReactNode;
  params: { appname: string; username: string };
  userId: string;
}) => {
  const { data: session } = useSession();
  const project = useContext<Project | null>(ProjectDataContext);
  const { push } = useRouter();

  if (
    userId !== undefined &&
    project?.userId !== undefined &&
    userId !== project?.userId
  )
    push("/");

  return (
    <AuthGuarded
      ownerId={project === undefined ? undefined : project?.userId ?? ""}
      href={`/signin?redirect-uri=/${params.username}/${params.appname}/manage`}
    >
      <div className="flex flex-col w-full h-screen">
         {children}
      </div>
    </AuthGuarded>
  );
};
