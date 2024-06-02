import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAmoU0SE5I-XE9KYsrhiBN8_wFhXHzGmAs",
    authDomain: "authentication-app-7c3b0.firebaseapp.com",
    projectId: "authentication-app-7c3b0",
    storageBucket: "authentication-app-7c3b0.appspot.com",
    messagingSenderId: "909144824756",
    appId: "1:909144824756:web:ac33a4a000b37bcd43b0e1",
    measurementId: "G-E6K79QZTY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
