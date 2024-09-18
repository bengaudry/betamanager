import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { PageWrapper } from "@/components/PageWrapper";
import { TesterSpace } from "@/components/TesterSpace";
import { convertSearchParamToString } from "@/lib/utils";
import { auth } from "@/lib/auth";

export default async function AppBetaPage({
  params,
  searchParams,
}: {
  params: { appname: string; username: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { appname, username } = params;
  const session = await auth();
  const token = convertSearchParamToString(searchParams?.token);

  const project = await prisma.project.findFirst({
    where: {
      name: appname,
      userName: username,
    },
  });

  if (token !== "preview") {
    const serverToken = await prisma.token.findFirst({
      where: { projectId: project?.id, value: token ?? undefined },
    });

    if (!project) redirect("/err=redirected/not-found");

    if (!token || !serverToken) {
      return (
        <div className="w-screen h-screen grid place-content-center">
          <p>Token is not valid</p>
        </div>
      );
    }
  }

  // If page is in preview mode, check if the user accessing is the owner of the project
  if (token === "preview" && project?.userId !== session?.user?.id) {
    redirect("/");
  }

  return (
    <>
      <PageWrapper>
        <div className="w-full mx-auto max-w-screen-sm">
          <header className="flex flex-row items-center gap-4 mb-8">
            <img
              src={""}
              className="block bg-zinc-200 w-16 h-16 rounded-full object-cover"
              width={64}
              height={64}
            />
            <div>
              <p className="capitalize text-3xl font-semibold">
                {project?.name}
              </p>
              <p className="max-w-sm leading-4 text-neutral-500">
                {project?.description}
              </p>
            </div>
          </header>

          <TesterSpace projectDetails={project} />
        </div>
      </PageWrapper>

      <Link
        href="/"
        className="fixed bottom-0 block left-1/2 -translate-x-1/2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-t-xl px-6 py-1 pb-4 translate-y-3 hover:translate-y-0 transition-all"
      >
        Made with LaunchFlow
      </Link>
    </>
  );
}
