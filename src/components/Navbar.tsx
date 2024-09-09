import { redirect } from "next/navigation";
import { NavbarUserDisplayer, ProjectSelector } from "./Sidebar";
import { Combobox } from "./ui/combobox";
import { getBaseUrl } from "@/lib/utils";

export async function Navbar({
  session,
  username,
}: PropsWithSession & { username?: string }) {
  const user = session?.user ?? undefined;

  const res = await fetch(
    `${getBaseUrl()}/api/user-projects?curr-uid=${
      user?.id
    }&username=${username}`
  );

  const projects: Project[] = await res.json();

  return (
    <header className="w-full flex sticky top-0 items-center gap-3 border-b py-2 px-4">
      <NavbarUserDisplayer user={user} />
      <span className="text-xl text-neutral-300 dark:text-neutral-700">/</span>

      <div>
        <ProjectSelector projects={projects} />
      </div>
    </header>
  );
}
