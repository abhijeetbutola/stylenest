import { useEffect, useState } from "react";

export type SerializedUser = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
};

const useAuth = () => {
  const [user, setUser] = useState<SerializedUser | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadAuth = async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const { loadFirebaseAuth } = await import("./lazyFirebase");
      const { auth } = await loadFirebaseAuth();

      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            emailVerified: currentUser.emailVerified,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            providerId: currentUser.providerData?.[0]?.providerId || "",
          });
        } else {
          setUser(null);
        }
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
