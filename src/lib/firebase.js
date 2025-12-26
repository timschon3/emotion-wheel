// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from HydroTracker
const firebaseConfig = {
    apiKey: "AIzaSyDfopPGi_XoPahTEZh9frqXlvDdSs9pofg",
    authDomain: "hydro-tracker-29251.firebaseapp.com",
    projectId: "hydro-tracker-29251",
    storageBucket: "hydro-tracker-29251.firebasestorage.app",
    messagingSenderId: "989529655193",
    appId: "1:989529655193:web:2e8d38a0d2e28ea00bb508",
    measurementId: "G-N0L91Q0GE0"
};

// Initialize Firebase (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
