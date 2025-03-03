import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User:", result.user);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
};

export default signInWithGoogle;
