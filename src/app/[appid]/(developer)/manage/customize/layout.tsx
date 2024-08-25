"use client";
import { PremiumGuarded } from "@/components/Barriers";
import { PageWrapper } from "@/components/Page";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  const { appid } = useParams();

  const p = usePathname();
  const url = `/${appid}/manage/customize/${href}`;
  const active = href === "" ? `${p}/` === url : p.includes(url);

  return (
    <Link
      href={url}
      className={`block border-b-2 font-semibold ${
        active
          ? "border-white text-white"
          : "border-neutral-600 text-neutral-400"
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
    <PremiumGuarded href="..">
      <PageWrapper title="Customize forms">
        <nav className="flex mb-6">
          <NavLink href="" title="Issues" />
          <NavLink href="suggestions" title="Suggestions" />
        </nav>
        <div>{children}</div>
      </PageWrapper>
    </PremiumGuarded>
  );
}
