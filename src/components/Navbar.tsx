import Link from "next/link";
import { ProjectSelector } from "./ProjectSelector";
import { NavbarUserDisplayer } from "./NavbarUserDisplayer";
import { getBaseUrl } from "@/lib/utils";
import { prisma } from "@/lib/db";

export async function Navbar({
  session,
  username,
  appname,
}: PropsWithSession & { username?: string; appname?: string }) {
  const user = session?.user ?? undefined;

  // const res = await fetch(
  //   `${getBaseUrl()}/api/user-projects?curr-uid=${
  //     user?.id
  //   }&username=${username}`
  // );

  const projects: Project[] = await prisma.project.findMany({
    where: { userName: username, OR: [{ visibility: "public" }, { userId: user?.id }] },
  });

  return (
    <header className="w-full flex sticky top-0 items-center justify-between gap-3 border-b py-2 px-4">
      <div className="flex gap-3 items-center">
        <NavbarUserDisplayer user={user} />
        <span className="text-xl text-zinc-300 dark:text-zinc-700">/</span>
        <ProjectSelector projects={projects} />
      </div>

      <Link href={`/${username}/${appname}?token=preview`}>
        <i className="fi fi-rr-eye" />
      </Link>
    </header>
  );
}
