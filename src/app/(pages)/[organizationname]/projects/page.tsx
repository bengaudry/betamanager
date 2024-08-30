import { PageWrapper } from "@/components/PageWrapper";
import { NewProjectClient } from "@/components/ProjectsPage";
import { getBaseUrl } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ProjectsPage({
  params,
}: {
  params: { organizationname: string };
}) {
  const session = await getServerSession();

  const res = await fetch(
    `${getBaseUrl()}/api/organization-projects?organization-name=${
      params.organizationname
    }&user-id=${session?.user?.name}`
  );
  const projects = (await res.json()) as Project[];

  return (
    <PageWrapper title="Projects">
      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6 mx-auto">
        {projects.map((project, idx) => {
          return (
            <Link
              key={idx}
              href={`/${params.organizationname}/${project.name}/manage`}
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
  );
}
