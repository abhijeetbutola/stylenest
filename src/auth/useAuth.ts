import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadAuth = async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const { loadFirebaseAuth } = await import("./lazyFirebase");
      const { auth } = await loadFirebaseAuth();

      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    };

    loadAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return user;
};

export default useAuth;
