"use client";
import Link from "next/link";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Combobox } from "./ui/combobox";
import { User } from "next-auth";
import { getBaseUrl } from "@/lib/utils";
import { useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

const SidebarElement = ({
  title,
  href,
  icon,
  isPremium,
}: {
  title: string;
  href: string;
  icon: string;
  isPremium?: boolean;
}) => {
  const { appname, username } = useParams();
  const p = usePathname();

  const url = `/${username}/${appname}/manage/${href}`;
  const active = href === "" ? `${p}/` === url : p.includes(url);

  return (
    <Link
      href={url}
      className={`${
        active ? "bg-neutral-200 dark:bg-neutral-800" : "text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
      } ${
        isPremium ? "pr-4" : "pr-8"
      } transition-colors rounded-md pl-2 py-0.5 font-medium flex items-center justify-between gap-8`}
    >
      <div className="flex items-center">
        <i
          className={`fi fi-rr-${icon} text-lg w-10 h-10 grid place-content-center`}
        />
        <span className="text-sm text-nowrap">{title}</span>
      </div>
      {isPremium && (
        <i className="fi fi-rr-rectangle-pro block translate-y-0.5 text-indigo-300" />
      )}
    </Link>
  );
};

const Separator = () => <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 my-2" />;

export function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-r h-full pb-8 pt-4 px-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <SidebarElement title="Dashboard" href="" icon="apps" />
          <Separator />
          {/* <SidebarElement title="Testers" href="testers" icon="users-alt" /> */}
          <SidebarElement
            title="Issues"
            href="issues"
            icon="shield-exclamation"
          />
          <SidebarElement
            title="Suggestions"
            href="suggestions"
            icon="lightbulb-on"
          />
          <Separator />
          <SidebarElement
            title="Customize forms"
            href="customize"
            icon="customize-computer"
            isPremium
          />
        </div>
        <SidebarElement title="Settings" href="settings" icon="settings" />
      </div>
    </nav>
  );
}

export const NavbarUserDisplayer = ({ user }: { user?: User }) => {
  const { username } = useParams();
  const { push } = useRouter();

  return (
    <button className="group flex gap-2" onClick={() => push(`/${username}`)}>
      <Avatar className="w-6 h-6">
        <AvatarImage src={user?.image ?? undefined} />
        <AvatarFallback>
          {user?.name && user.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-neutral-400 group-hover:text-black transition-colors">
        {user?.name}
      </span>
    </button>
  );
};

export function ProjectSelector({ projects }: { projects: Project[] }) {
  const { appname, username } = useParams();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <Combobox
        defaultSelected={appname as string}
        onChange={(projectName) => {
          setLoading(true);
          setTimeout(() => {
            push(`/${username}/${projectName}/manage`);
            setLoading(false);
          }, 1000);
        }}
        items={projects.map(({ name }) => ({
          value: name.toLowerCase().replaceAll(" ", "-"),
          label: name,
        }))}
      />
    </>
  );
}
