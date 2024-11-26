// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCczSWHZw9-5MrberczAOE0ePk9bfIJQEU",
  authDomain: "digital-issuance-54ab9.firebaseapp.com",
  projectId: "digital-issuance-54ab9",
  storageBucket: "digital-issuance-54ab9.firebasestorage.app",
  messagingSenderId: "1072963974905",
  appId: "1:1072963974905:web:60dc4d661b6ada72ebd428",
  measurementId: "G-CDMB7J1N0M"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);