// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc5nyLpZkf4dxqCZizkQjFpXIPWzF-Vto",
  authDomain: "lucille-music-website.firebaseapp.com",
  projectId: "lucille-music-website",
  storageBucket: "lucille-music-website.firebasestorage.app",
  messagingSenderId: "229622213568",
  appId: "1:229622213568:web:3d11dfc9ef2c24c0ca7625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();