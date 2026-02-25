// src/firebase/index.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBuGK8HuO6hlipCfvN0VWZylXuXP8dCka0",
  authDomain: "quiz-53850.firebaseapp.com",
  projectId: "quiz-53850",
  storageBucket: "quiz-53850.firebasestorage.app",
  messagingSenderId: "402121717976",
  appId: "1:402121717976:web:d2034cecb5805a1acaffad",
  measurementId: "G-GE5ST3FJYX"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();