// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail,  } from "firebase/auth";
import { getFirestore, query, doc, setDoc, addDoc, collection, getDoc,updateDoc, arrayUnion, Timestamp, where, getDocs, deleteDoc,onSnapshot,  } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJBNL9rh1cJnY0qKpqsuuyp2asjmG6abs",
  authDomain: "skillswap-1104.firebaseapp.com",
  projectId: "skillswap-1104",
  storageBucket: "skillswap-1104.appspot.com",
  messagingSenderId: "665738513533",
  appId: "1:665738513533:web:a4ae8da62cadcf5c1cb514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

//persistence
const auth = initializeAuth(app, {
});

export default app;
export { auth, sendPasswordResetEmail, query, doc, setDoc, addDoc, collection, getDoc, browserLocalPersistence, browserSessionPersistence, updateDoc, arrayUnion, Timestamp, where, onSnapshot, getDocs, deleteDoc, };