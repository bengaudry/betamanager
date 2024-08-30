"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

const ProjectSelector = () => {
  const { appid, organizationname } = useParams();

  return (
    <button className="group relative text-left flex flex-row items-center gap-3">
      <h3 className="font-semibold text-xl mb-3">{appid}</h3>
      <div className="w-2 h-2 grid place-content-center origin-top transition-all group-hover:rotate-180">
        <i className="fi fi-rr-angle-small-down" />
      </div>

      <div className="absolute top-full w-full left-0 bg-white py-2 border border-neutral-300 rounded-md translate-y-4 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
        <Link
          href={`/${organizationname}`}
          className="flex flex-row items-center gap-2 px-4 py-1 text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors"
        >
          <i className="block fi fi-rr-list translate-y-0.5" />
          <span>See all projects</span>
        </Link>
      </div>
    </button>
  );
};

export function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-r border-neutral-300 h-full py-8 px-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <ProjectSelector />
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
