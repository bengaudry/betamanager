import { initializeApp } from "firebase/app";
import { browserPopupRedirectResolver, browserSessionPersistence, getAuth, initializeAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const APP = initializeApp(FIREBASE_CONFIG)

export const getFirebaseApp = () => APP;

// AUTH
const auth = typeof window !== "undefined" ? initializeAuth(APP, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
}) : getAuth(APP);

export const getFirebaseAuth = (): Auth => auth;

const DB = getFirestore(getFirebaseApp())
export const getFirebaseDb = () => DB;