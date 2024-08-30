"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";

import { getFirebaseAuth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { PageWrapper } from "@/components/PageWrapper";
import { NewProjectPopover } from "@/components/ProjectsPage";

export default function ProjectPage() {
  const { organizationname } = useParams();
  const [user] = useAuth();
  const { push } = useRouter();

  const [projects, error, loading] = useFetch<Project[]>(
    `/api/organization-projects?organization-name=${organizationname}&curr-uid=${user?.uid}`
  );

  const [newProjectPopoverOpened, setNewProjectPopoverOpened] = useState(false);

  const canCreateNewProject =
    (user && user.isPremium) || (projects && projects.length <= 2) || !projects;

  const handleCreateNewProject = async (
    name: string,
    description: string,
    visibility: "public" | "private"
  ) => {
    if (!user) return;
    try {
      fetch("/api/organization-projects", {
        method: "POST",
        body: JSON.stringify({
          organizationId: user.uid,
          organizationName: organizationname,
          name,
          description,
          visibility,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const NewProjectButton = () => {
    /* Show an add button if the visitor of the page is the organization shown */
    if (!user?.displayName || !organizationname) return null;
    return (
      <button
        onClick={() => {
          if (!canCreateNewProject)
            return alert(
              "You reached the limit of projects for a free account. Please upgrade your plan or remove another project."
            );
          setNewProjectPopoverOpened(true);
        }}
        className="group relative h-fit w-full xs:h-36 py-2 grid place-content-center justify-items-center rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
      >
        <p className="text-neutral-500 flex items-center gap-2">
          <span className="xs:hidden">New project</span>
          <i className="inline-block fi fi-rr-plus xs:text-5xl xs:group-hover:scale-125 transition-transform origin-center translate-y-0.5" />
        </p>
        {!canCreateNewProject && (
          <i className="fi fi-rr-rectangle-pro absolute right-2 top-2 block xs:text-xl translate-y-0.5 text-indigo-300" />
        )}
      </button>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <NewProjectPopover
        opened={newProjectPopoverOpened}
        onClose={() => setNewProjectPopoverOpened(false)}
        onSubmit={handleCreateNewProject}
      />
      <PageWrapper loading={loading}>
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL ?? "/no-profile-pic.png"}
              className="w-12 h-12 rounded-full"
              width={48}
              height={48}
            />
            <div>
              <h1 className="font-bold text-3xl leading-7">Projects</h1>
              <p className="text-neutral-500 text-lg">
                @{organizationname}{" "}
                {user && user.isPremium && (
                  <i className="fi fi-rr-rectangle-pro text-indigo-300 inline-block translate-y-0.5" />
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              signOut(getFirebaseAuth()).then(() => push("/"));
            }}
            className="px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-500/40 transition-colors"
          >
            Sign out
            <i className="fi fi-rr-sign-out-alt inline-block translate-y-0.5 ml-2" />
          </button>
        </header>

        <div className="xs:hidden">
          <NewProjectButton />
        </div>

        <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6 mx-auto">
          {projects?.map((project, idx) => (
            <Link
              key={idx}
              href={`/${organizationname}/${project.name}/manage`}
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
          ))}

          <div className="hidden xs:block">
            <NewProjectButton />
          </div>
        </div>

        {!canCreateNewProject && (
          <p className="my-4 text-neutral-500">
            You reached the limit of projects for a free account. Please upgrade
            your plan or remove another project.
          </p>
        )}
      </PageWrapper>
    </div>
  );
}
