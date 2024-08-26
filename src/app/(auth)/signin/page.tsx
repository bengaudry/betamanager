"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { getFirebaseAuth } from "@/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignInPage() {
  const handleSignIn = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo")
    provider.addScope("read:user")

    try {
      const userCredential = await signInWithPopup(getFirebaseAuth(), provider);
      console.info(userCredential.user.uid);

      let displayName = userCredential.user.displayName;
      while (!displayName || displayName.length < 3) {
        displayName = prompt("Please enter your username");
      }

      // Complete user profile with api
      fetch(`/api/sign-in?uid=${userCredential.user.uid}&username=${displayName}`)
    } catch (err) {
      console.error("Unable to sign in with GitHub provider.", err);
    }
  };

  return (
    <PageWrapper title="Sign in">
      <button onClick={handleSignIn}>Sign in with GitHub</button>
    </PageWrapper>
  );
}
