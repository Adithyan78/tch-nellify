import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdtGz7SyfPFafyhdyKL-jJOX5cloGuxbE",
  authDomain: "techcodehub-4ccff.firebaseapp.com",
  projectId: "techcodehub-4ccff",
  storageBucket: "techcodehub-4ccff.appspot.com",
  messagingSenderId: "24855097748",
  appId: "1:24855097748:web:4fc90df58c2536689b9f81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

// Export the initialized services
export { auth, googleAuthProvider, db };
