"use client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { type User } from "next-auth";
import { useParams, useRouter } from "next/navigation";

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
      <span className="font-medium text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
        {user?.name}
      </span>
    </button>
  );
};
