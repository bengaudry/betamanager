"use client";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { getFirebaseAuth } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [user] = useAuth();

  useEffect(() => {
    if (user !== null) push(`/${user.displayName?.toLowerCase()}`);
  }, []);

  const handleSignIn = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    provider.addScope("read:user");
    provider.setCustomParameters({ allow_signup: "false" });

    try {
      setLoading(true);
      const userCredential = await signInWithPopup(getFirebaseAuth(), provider);
      console.info(userCredential.user.uid);
      if (!userCredential.user.displayName) return;

      push(`/${userCredential.user.displayName.toLowerCase()}`);
    } catch (err) {
      console.error("Unable to sign in with GitHub provider.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <div className="fixed top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 rounded-full" />
      <div className="fixed right-20 bottom-40 w-96 h-96 translate-x-1/2 translate-y-1/2 bg-indigo-500 rounded-full" />
      <div className="fixed left-1/2 top-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-indigo-800 rounded-full" />
      <div className="w-screen h-screen inset-0 bg-white/70 backdrop-blur-[100px] z-10 absolute"></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col justify-center max-w-80 mb-12">
          <h1 className="text-3xl font-bold mb-2 text-center text-black">Sign in</h1>
          
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-white px-8 rounded-md py-1 w-full shadow-lg shadow-black/30"
          >
            <i className="fi fi-brands-github text-2xl translate-y-1 inline-block mr-2" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </>
  );
}
