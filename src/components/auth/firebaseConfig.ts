import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDiOCOedJshAfP66_K4ur0N2t2EaAV6FEY",
  authDomain: "emprego-4bb54.firebaseapp.com",
  projectId: "emprego-4bb54",
  storageBucket: "emprego-4bb54.firebasestorage.app",
  messagingSenderId: "518380182210",
  appId: "1:518380182210:web:4581ee3368ea90aef5f95b"
};

// Initialize Firebase
const appFirebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const authFirebase = getAuth(appFirebase);

export { appFirebase, authFirebase, GoogleAuthProvider, signInWithPopup, signOut };