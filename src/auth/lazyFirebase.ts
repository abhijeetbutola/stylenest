import firebaseConfig from "./firebaseConfig";

export const loadFirebaseAuth = async () => {
  const { initializeApp } = await import("firebase/app");
  const {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } = await import("firebase/auth");
  const app = initializeApp(firebaseConfig);
  return {
    auth: getAuth(app),
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  };
};
