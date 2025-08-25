import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "emprego-4bb54.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "emprego-4bb54",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "emprego-4bb54.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "518380182210",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:518380182210:web:4581ee3368ea90aef5f95b"
};

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is required but not set in environment variables');
}

// Initialize Firebase
const appFirebase = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  if(process.env.NODE_ENV === 'development'){
    connectFunctionsEmulator(getFunctions(appFirebase), 'localhost', 5001);
  }
// Initialize Firebase Authentication and get a reference to the service
const authFirebase = getAuth(appFirebase);
const functions = getFunctions(appFirebase);
const googleProvider = new GoogleAuthProvider();

export { appFirebase, authFirebase, functions, googleProvider, getAuth, 
  signInWithPopup, signOut };