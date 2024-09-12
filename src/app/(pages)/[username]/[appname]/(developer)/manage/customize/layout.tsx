"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  const { appname, username } = useParams();

  const p = usePathname();
  const url = `/${username}/${appname}/manage/customize/${href}`;
  const active = href === "" ? `${p}/` === url : p.includes(url);

  return (
    <Link
      href={url}
      className={`block border-b-2 font-semibold ${
        active
          ? "border-black dark:border-white"
          : "text-zinc-400 hover:border-zinc-500"
      } transition-colors duration-300 px-4 py-2`}
    >
      {title}
    </Link>
  );
};

export default function CustomizeFormsLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <PageWrapper title="Customize forms">
        <nav className="flex mb-6">
          <NavLink href="" title="Issues" />
          <NavLink href="suggestions" title="Suggestions" />
        </nav>
        <div>{children}</div>
      </PageWrapper>
    </>
  );
}
