"use client";
import Link from "next/link";
import { CTA } from "./CTA";
import { AuthButtons } from "./LandingPage/AuthButtons";

export const HeaderNavBar = ({ session }: PropsWithSession) => (
  <nav className="absolute top-0 inset-0 w-full px-4 py-2 md:px-8 md:py-4">
    <div className="max-w-screen-lg mx-auto flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h2 className="text-lg font-semibold">Beta manager</h2>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>
        </div>
      </div>

      <div>
        <AuthButtons session={session} />
      </div>
    </div>
  </nav>
);

export const HeroBanner = () => (
  <section>
    <div className="bg-gradient-to-b from-indigo-400/0 to-indigo-400/20 dark:to-indigo-400/10 pt-6">
      <div className="relative max-w-screen-lg mx-auto flex flex-col items-center place-content-center py-52">
        <i className="absolute left-4 top-20 -rotate-12 fi fi-rr-shield-exclamation text-indigo-700 text-9xl blur-sm" />
        <i className="absolute right-8 bottom-10 rotate-12 fi fi-rr-lightbulb-on text-indigo-700 text-9xl blur-sm" />

        <h1 className="text-5xl font-bold text-center">
          Launch your app,
          <br /> get feedback
        </h1>
        <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
          Get started by creating an account
        </p>
        <CTA
          label="Create an account"
          // onClick={() => push("/create-org")}
          className="mt-4 shadow-2xl shadow-indigo-800"
          rightIcon="arrow-right"
        />
      </div>
    </div>
  </section>
);
