import { getApps, initializeApp } from "firebase/app";
import { browserSessionPersistence, GithubAuthProvider, initializeAuth, type Auth } from "firebase/auth";
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

export function getFirebaseApp() {
  const apps = getApps();
  return initializeApp(FIREBASE_CONFIG);
}

console.log("app id", process.env.APP_ID)

// AUTH
const AUTH = initializeAuth(getFirebaseApp(), {
  persistence: browserSessionPersistence,
  popupRedirectResolver: undefined
});
export const getFirebaseAuth = (): Auth => AUTH;

const GITHUB_PROVIDER = new GithubAuthProvider();
GITHUB_PROVIDER.addScope("repo");
export const getGithubProvider = () => GITHUB_PROVIDER;

export const getFirebaseDb = () => getFirestore(getFirebaseApp());