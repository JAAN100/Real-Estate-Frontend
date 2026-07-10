// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //process.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4ee26.firebaseapp.com",
  projectId: "mern-estate-4ee26",
  storageBucket: "mern-estate-4ee26.firebasestorage.app",
  messagingSenderId: "148339705219",
  appId: "1:148339705219:web:dc3311b98fc743316b22b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);