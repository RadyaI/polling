// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE,
    authDomain: "polling-66a43.firebaseapp.com",
    projectId: "polling-66a43",
    storageBucket: "polling-66a43.firebasestorage.app",
    messagingSenderId: "988646380381",
    appId: "1:988646380381:web:59a8737b585588f06e8eb4",
    measurementId: "G-DHEK43LJSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }