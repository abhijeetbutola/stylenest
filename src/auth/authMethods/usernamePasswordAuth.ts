export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { loadFirebaseAuth } = await import("../lazyFirebase");
    const { auth, createUserWithEmailAndPassword } = await loadFirebaseAuth();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // User is signed up successfully
    console.log("User signed up:", userCredential.user);

    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    console.log("User signed out after sign-up");

    return userCredential.user;
  } catch (error) {
    console.error("Sign-up failed:", (error as Error).message);
    throw new Error((error as Error).message);
  }
};
