import Link from "next/link";

import { CTA } from "@/components/CTA";
import { auth } from "@/lib/auth";
import { AuthButtons } from "@/components/LandingPage/AuthButtons";
import { PropsWithSession } from "../../../app";

const HeaderNavBar = ({ session }: PropsWithSession) => (
  <nav className="w-full px-4 py-2 md:px-8 md:py-4">
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

const HeroBanner = () => (
  <section className="bg-gradient-to-b from-indigo-400/0 to-indigo-400/20">
    <div className="relative max-w-screen-lg mx-auto flex flex-col items-center place-content-center py-52">
      <i className="absolute left-4 top-20 -rotate-12 fi fi-rr-shield-exclamation text-indigo-700 text-9xl blur-sm" />
      <i className="absolute right-8 bottom-10 rotate-12 fi fi-rr-lightbulb-on text-indigo-700 text-9xl blur-sm" />

      <h1 className="text-5xl font-bold text-center">
        Launch your app,
        <br /> get feedback
      </h1>
      <p className="mt-2 text-lg text-neutral-500">
        Get started by creating an account
      </p>
      <CTA
        label="Create an account"
        // onClick={() => push("/create-org")}
        className="mt-4 shadow-2xl shadow-indigo-800"
        rightIcon="arrow-right"
      />
    </div>
  </section>
);

const PricingSection = () => (
  <section className="py-20">
    <h2 className="text-3xl font-bold text-center mb-4">Tarifs</h2>

    <div className="flex flex-row items-center gap-4">
      <div className="rounded-xl border border-neutral-200 px-4 py-8">
        <h3 className="text-2xl font-bold text-center mb-2">Free</h3>
        <p className="text-center">0.00 € / month</p>
        <p className="text-sm">
          Unlimited feedback <i className="fi fi-rr-check" />
        </p>
        <p className="text-sm">
          One app maximum <i className="fi fi-rr-cross" />
        </p>
        <p className="text-sm">
          No customization <i className="fi fi-rr-cross" />
        </p>
      </div>
    </div>
  </section>
);

export default async function LandingPage() {
  const session = await auth();

  return (
    <main>
      <HeaderNavBar session={session} />
      <HeroBanner />
      <PricingSection />
    </main>
  );
}
