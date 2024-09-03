"use client";
import { signOut } from "next-auth/react";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className={
        "px-4 py-2 rounded-md text-white font-medium bg-red-500 hover:bg-red-500/40 transition-colors" +
        " " +
        className
      }
    >
      Sign out
      <i className="fi fi-rr-sign-out-alt inline-block translate-y-0.5 ml-2" />
    </button>
  );
}
