// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPC3wcpp3XFpi5VP-AcXhnlQcZsyq9MY8",
  authDomain: "fir-practice-6cfb3.firebaseapp.com",
  projectId: "fir-practice-6cfb3",
  storageBucket: "fir-practice-6cfb3.appspot.com",
  messagingSenderId: "771962805502",
  appId: "1:771962805502:web:1fa7b95ba7631e043099af"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore()