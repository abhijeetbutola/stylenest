// const signUpWithEmail = async (email: string, password: string) => {
//     try {
//       const { loadFirebaseAuth } = await import("./lazyFirebase");
//       const { auth, createUserWithEmailAndPassword } = await loadFirebaseAuth();

//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       // User is signed up successfully
//       setUser(userCredential.user);
//       console.log("User signed up:", userCredential.user);
//       return userCredential.user;
//     } catch (error: any) {
//       console.error("Sign-up failed:", error.message);
//       throw new Error(error.message);
//     }
//   };

//   return { user, signUpWithEmail };
// };
