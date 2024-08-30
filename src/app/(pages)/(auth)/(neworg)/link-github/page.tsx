"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LinkGithubPage() {
  const { push } = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) push(`/${session.user.name}`);
  }, []);

  const handleLink = async () => {
    const displayName = searchParams.get("organization-name");
    if (!displayName) return push("/create-org");

    // TODO : Create organization
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <PageWrapper title="Create an organization" loading={loading}>
        <p className="text-sm text-neutral-500 leading-4 mb-4">
          {" "}
          We use GitHub to create your user profile. This is the only method of
          authentication for now, but others will come soon.
        </p>
        <button
          onClick={handleLink}
          className="bg-gradient-to-b from-neutral-800 to-neutral-900 px-8 text-white rounded-md py-1 w-full shadow-lg shadow-neutral-200"
        >
          <i className="fi fi-brands-github text-2xl translate-y-1 inline-block mr-2" />
          Link GitHub account
        </button>
      </PageWrapper>
    </div>
  );
}
