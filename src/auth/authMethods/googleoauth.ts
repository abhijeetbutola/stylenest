const signInWithGoogle = async () => {
  try {
    const { GoogleAuthProvider, signInWithPopup } = await import(
      "firebase/auth"
    );
    const { loadFirebaseAuth } = await import("../lazyFirebase");

    const { auth } = await loadFirebaseAuth();

    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User:", result.user);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
};

export default signInWithGoogle;
