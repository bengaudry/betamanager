"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { getFirebaseAuth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const { organizationid } = useParams();
  const [user] = useAuth();
  const { push } = useRouter();

  const [projects, setProjects] = useState<Array<Project> | null>(null);

  const prettifyNbUsers = (nb?: number) => {
    if (!nb) return "-";
    if (nb < 1000) return nb;
    if (nb < 1000000) return (nb / 1000).toFixed(1) + "k";
    return (nb / 1000000).toFixed(1) + "M";
  };

  const canCreateNewProject =
    user && !user.isPremium && projects && projects.length >= 2;

  useEffect(() => {
    fetch(`/api/organization-projects?organization-id=${organizationid}`)
      .then((value) => value.json())
      .then((value) => setProjects(value))
      .catch((err) => {
        console.error(err);
        setProjects(null);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <PageWrapper>
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.photoURL ?? ""}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="font-bold text-3xl leading-7">Projects</h1>
              <h2 className="text-neutral-500 text-lg">@{organizationid}</h2>
            </div>
          </div>

          <button
            onClick={() => signOut(getFirebaseAuth()).then(() => push("/"))}
          >
            Sign out
          </button>
        </header>

        <div className="grid grid-cols-4 mx-auto gap-8">
          {projects?.map((project, idx) => (
            <Link
              key={idx}
              href={`/${organizationid}/${project.id}/manage`}
              className="w-full h-36 py-3 px-6 flex flex-col justify-end rounded-lg border border-neutral-800 hover:bg-neutral-900/40 transition-colors"
            >
              <p className="text-white font-semibold mb-1">{project.name}</p>
              <p className="text-neutral-500 text-left leading-4 text-sm mb-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between text-neutral-500 text-xs w-full">
                <div className="flex flex-row items-center gap-1">
                  <i className="fi fi-rr-user" />
                  <p>{prettifyNbUsers(project.nbTesters)}</p>
                </div>

                <p>{project.version}</p>
              </div>
            </Link>
          ))}
          <button
            onClick={() => {
              if (!canCreateNewProject)
                return alert(
                  "You reached the limit of projects for a free account. Please upgrade your plan or remove another project."
                );
              push(`/${organizationid}/new`);
            }}
            className="group relative h-36 grid place-content-center justify-items-center rounded-lg border border-neutral-800 hover:bg-neutral-900/40 transition-colors"
          >
            <i className="fi fi-rr-plus text-5xl text-neutral-500 group-hover:scale-125 transition-transform origin-center" />
            {!canCreateNewProject && (
              <i className="fi fi-rr-rectangle-pro absolute right-2 top-2 block text-xl translate-y-0.5 text-emerald-300" />
            )}
          </button>
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
