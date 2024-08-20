"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
  const { appid } = useParams();
  const p = usePathname();
  const url = `/${appid}/manage/${href}`;
  const active = href === "" ? `${p}/` === url : p.includes(url);

  return (
    <Link
      href={url}
      className={`${
        active ? "bg-white text-black" : "text-neutral-400 hover:bg-white/20 hover:text-white"
      } transition-colors rounded-lg px-4 py-2 font-medium`}>
      {title}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-r border-neutral-700 h-screen py-16 px-8">
      <h3 className="font-semibold text-xl mb-3">
        {"{"}App name{"}"}
      </h3>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <NavElement title="Dashboard" href="" icon="" />
          <NavElement title="Testers" href="testers" icon="lab" />
          <NavElement
            title="Customize forms"
            href="customize"
            icon=""
            isPremium
          />
        </div>
        <NavElement title="Settings" href="settings" icon="settings" />
      </div>
    </nav>
  );
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row items-center w-full min-h-screen">
      <Navbar />
      <div className="h-screen">{children}</div>
    </div>
  );
}
