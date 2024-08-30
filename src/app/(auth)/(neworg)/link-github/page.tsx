"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { getFirebaseAuth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import {
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LinkGithubPage() {
  const { push } = useRouter();
  const [user] = useAuth();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user !== null) push(`/${user.displayName?.toLowerCase()}`);
  }, []);

  const handleLink = async () => {
    const displayName = searchParams.get("organization-name");
    if (!displayName) return push("/create-org");

    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    provider.addScope("read:user");
    provider.setCustomParameters({ allow_signup: "true" });

    try {
      setLoading(true);
      const userCredential = await signInWithPopup(getFirebaseAuth(), provider);
      console.info(userCredential.user.uid);

      updateProfile(userCredential.user, { displayName });

      // Complete user profile with api
      await fetch(
        `/api/sign-in?uid=${userCredential.user.uid}&username=${displayName}`
      );
      push(`/${displayName.toLowerCase()}`);
    } catch (err) {
      console.error("Unable to sign in with GitHub provider.", err);
    } finally {
      setLoading(false);
    }
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
          Sign in with GitHub
        </button>
      </PageWrapper>
    </div>
  );
}
