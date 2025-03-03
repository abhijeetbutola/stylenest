// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlJaT67KPnAPj_8cgFfZCUSz18xELbpro",
  authDomain: "stylenest-3f356.firebaseapp.com",
  projectId: "stylenest-3f356",
  storageBucket: "stylenest-3f356.firebasestorage.app",
  messagingSenderId: "1087104743068",
  appId: "1:1087104743068:web:ebc2914a67ef4baddc1f59",
  measurementId: "G-T36YPMF2CW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
