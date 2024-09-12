import { PageWrapper } from "@/components/PageWrapper";
import { NewProjectClient } from "@/components/ProjectsPage";
import { SignOutButton } from "@/components/SignOutBtn";
import { auth } from "@/lib/auth";
import { getBaseUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

const ProjectsPageComponent = async ({ username }: { username: string }) => {
  const session = await auth();
  const user = session?.user ?? null;

  const res = await fetch(
    `${getBaseUrl()}/api/user-projects?username=${username}&curr-uid=${
      user?.id
    }`
  );

  const projects: Project[] = await res.json();

  return (
    <div className="max-w-screen-xl mx-auto">
      <PageWrapper>
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.image ?? "/no-profile-pic.png"} />
              <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-3xl leading-7">Projects</h1>
              <p className="text-zinc-500 text-lg">
                @{username}{" "}
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
                href={`/${username}/${project.name}/manage`}
                className="w-full h-36 py-3 px-6 flex flex-col justify-end rounded-lg border hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <p className="font-semibold mb-1 capitalize">{project.name}</p>
                <p className="text-zinc-400 text-left leading-4 text-sm mb-2">
                  {project.description}
                </p>
              </Link>
            );
          })}
          <NewProjectClient projects={projects} />
        </div>
      </PageWrapper>
    </div>
  );
};

export default async function ProjectsPage({
  params,
}: {
  params: { username: string };
}) {
  return <ProjectsPageComponent {...params} />;
}
