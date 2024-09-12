"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const SidebarElement = ({
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
        active
          ? "bg-zinc-200 dark:bg-zinc-800"
          : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
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
