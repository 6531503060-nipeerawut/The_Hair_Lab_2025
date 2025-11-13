// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// --- THIS IS THE FIX ---
// Import Auth and Firestore so you can use them
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// ----------------------

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-IOqf9ieiMISH04e3C_YvEtFRDP9YvvI",
    authDomain: "hair-salon-89cdf.firebaseapp.com",
    projectId: "hair-salon-89cdf",
    storageBucket: "hair-salon-89cdf.firebasestorage.app",
    messagingSenderId: "267529226383",
    appId: "1:267529226383:web:10a0e81a37fdcf4cb188fa",
    measurementId: "G-QC1XSYZ956"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // You can keep this

// --- THIS IS THE FIX ---
// Initialize Auth and Firestore and EXPORT them
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; // Export app as default
// ----------------------