import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  Unsubscribe,
  type User as FirebaseUser,
} from "firebase/auth";

import { getFirebaseAuth, getFirebaseDb } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

type User = FirebaseUser & { isPremium?: boolean };

async function isUserPremium(uid: string) {
  const docRef = doc(getFirebaseDb(), "users", uid);
  const user = await getDoc(docRef);
  if (!user.exists()) return false;
  return user.data().isPremium ?? false;
}

export const useAuth = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (updatedUser) => {
      setLoading(true);
      if (!updatedUser) return setUser(null);
      isUserPremium(updatedUser.uid)
        .then((isPremium) => setUser({ isPremium, ...updatedUser }))
        .catch((err) => {
          console.error("Could not verify if premium.", err);
          setUser({ isPremium: false, ...updatedUser });
        })
        .finally(() => setLoading(false));
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onIdTokenChanged(getFirebaseAuth(), handleUser);
  //   return () => unsubscribe();
  // }, []);

  return [user, loading];
};
