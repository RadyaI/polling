// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE,
    authDomain: "poll-be91f.firebaseapp.com",
    projectId: "poll-be91f",
    storageBucket: "poll-be91f.firebasestorage.app",
    messagingSenderId: "723007695936",
    appId: "1:723007695936:web:becb91985be113f5e903a5",
    measurementId: "G-ZQWX68S8QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);