import { PageWrapper } from "@/components/PageWrapper";
import { NewProjectClient } from "@/components/ProjectsPage";
import { SignOutButton } from "@/components/SignOutBtn";
import { auth } from "@/lib/auth";
import { getBaseUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

export default async function ProjectsPage({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();
  const user = session?.user ?? null;

  const res = await fetch(
    `${getBaseUrl()}/api/user-projects?username=${params.username}&curr-uid=${
      user?.id
    }`
  );
  const projects: Project[] = await res.json();
  console.log("projects", projects);

  return (
    <div className="max-w-screen-xl mx-auto">
      <PageWrapper>
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.image ?? "/no-profile-pic.png"} />
              <AvatarFallback>
                {params.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-3xl leading-7">Projects</h1>
              <p className="text-neutral-500 text-lg">
                @{params.username}{" "}
                {/* {user && user?.subscription === "premium" && (
                  <i className="fi fi-rr-rectangle-pro text-indigo-300 inline-block translate-y-0.5" />
                )} */}
              </p>
            </div>
          </div>

          <SignOutButton />
        </header>

        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6 mx-auto">
          {projects.map((project, idx) => {
            return (
              <Link
                key={idx}
                href={`/${params.username}/${project.name}/manage`}
                className="w-full h-36 py-3 px-6 flex flex-col justify-end rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
              >
                <p className="font-semibold mb-1 capitalize">{project.name}</p>
                <p className="text-neutral-400 text-left leading-4 text-sm mb-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-end text-neutral-500 text-xs w-full">
                  <p>{project.version}</p>
                </div>
              </Link>
            );
          })}
          <NewProjectClient projects={projects} />
        </div>
      </PageWrapper>
    </div>
  );
}
