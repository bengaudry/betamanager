"use client";
import { useParams, useRouter } from "next/navigation";
import { Combobox } from "./ui/combobox";

export function ProjectSelector({ projects }: { projects: Project[] }) {
  const { appname, username } = useParams();
  const { push } = useRouter();

  return (
    <Combobox
      defaultSelected={appname as string}
      onChange={(projectName) => {
        setTimeout(() => {
          push(`/${username}/${projectName}/manage`);
        }, 1000);
      }}
      items={projects.map(({ name }) => ({
        value: name.toLowerCase().replaceAll(" ", "-"),
        label: name,
      }))}
    />
  );
}
