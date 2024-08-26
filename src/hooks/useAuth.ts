import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  type User as FirebaseUser,
} from "firebase/auth";

import { getFirebaseAuth } from "@/firebase";

type User = FirebaseUser & { isPremium?: boolean };

async function isUserPremium(uid: string) {
  return true;
}

export const useAuth = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUser = (user: User | null) => {
    setUser(user);
    setLoading(false);
  };

  onAuthStateChanged(getFirebaseAuth(), async (updatedUser) => {
    setLoading(true);
    if (!updatedUser) return setUser(null);
    isUserPremium(updatedUser.uid)
      .then((isPremium) => setUser({ isPremium, ...updatedUser }))
      .catch(() => {
        setUser({ isPremium: false, ...updatedUser });
      })
      .finally(() => setLoading(false));
  });

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(getFirebaseAuth(), handleUser);
    return () => unsubscribe();
  }, []);

  return [user, loading];
};
