// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjgbQHCpq4RaDQUJu1ph7d7D3Og8pY6C4",
  authDomain: "smokecontrol-84a48.firebaseapp.com",
  projectId: "smokecontrol-84a48",
  storageBucket: "smokecontrol-84a48.firebasestorage.app",
  messagingSenderId: "605349137238",
  appId: "1:605349137238:web:0cc9b6862b313d556fe4f7",
  measurementId: "G-TB9XWQKYMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, analytics, signInWithPopup };