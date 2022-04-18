// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1ZVjfaXfKXWgvYu9ISTZPy1VMl2GeLP8",
  authDomain: "lab-notes-68b40.firebaseapp.com",
  projectId: "lab-notes-68b40",
  storageBucket: "lab-notes-68b40.appspot.com",
  messagingSenderId: "738401705540",
  appId: "1:738401705540:web:a3e672bef7f5d9adb22611",
  measurementId: "G-JZYYE3B2Q9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOut = () => auth.signOut();
