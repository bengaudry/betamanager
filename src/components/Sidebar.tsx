"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PropsWithSession } from "../../app";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Combobox } from "./ui/combobox";

const NavElement = ({
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
  const { appid, organizationname } = useParams();
  const p = usePathname();

  const url = `/${organizationname}/${appid}/manage/${href}`;
  const active = href === "" ? `${p}/` === url : p.includes(url);

  return (
    <Link
      href={url}
      className={`${
        active ? "bg-neutral-200" : "text-neutral-400 hover:bg-neutral-100"
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

const Separator = () => <div className="w-full h-[1px] bg-neutral-200 my-2" />;

export function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-r border-neutral-300 h-full py-8 px-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <NavElement title="Dashboard" href="" icon="apps" />
          <Separator />
          {/* <NavElement title="Testers" href="testers" icon="users-alt" /> */}
          <NavElement title="Issues" href="issues" icon="shield-exclamation" />
          <NavElement
            title="Suggestions"
            href="suggestions"
            icon="lightbulb-on"
          />
          <Separator />
          <NavElement
            title="Customize forms"
            href="customize"
            icon="customize-computer"
            isPremium
          />
        </div>
        <NavElement title="Settings" href="settings" icon="settings" />
      </div>
    </nav>
  );
}

export function Navbar({ session }: PropsWithSession) {
  const user = session?.user ?? undefined;
  const { appid, organizationname } = useParams();
  const { push } = useRouter();

  return (
    <header className="w-full flex sticky top-0 items-center gap-3 border-b border-neutral-300 py-2 px-4">
      <button className="flex gap-2" onClick={() => push(`/${organizationname}`)}>
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback>
            {user?.name && user.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-neutral-400">{user?.name}</span>
      </button>

      <span className="text-xl text-neutral-300">/</span>

      <div>
        <Combobox
          items={[{ value: appid as string, label: appid as string }]}
        />
      </div>
    </header>
  );
}
