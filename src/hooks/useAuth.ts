import { useEffect, useState } from "react";

type User = { isPremium?: boolean };

export function useAuth(): [User | null, boolean] {
  const [user, setUser] = useState<User | null>({ isPremium: true });
  const [loading, setLoading] = useState(false);

  const checkIfUserIsPremium = async () => {
    return true;
  };

  // useEffect(() => {
  //   console.info("Updating user");
  //   setLoading(true);
  //   checkIfUserIsPremium()
  //     .then((isPremium) => {
  //       setUser({ isPremium });
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  return [user, loading];
}
