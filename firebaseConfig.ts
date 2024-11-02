// Import the functions you need from the SDKs you need

import { initializeAuth, getAuth,  } from "firebase/auth";
import { initializeApp, getApp } from "firebase/app";
import { getFirestore, getPersistentCacheIndexManager } from "firebase/firestore";
import  ReactNativeAsyncStorage  from "@react-native-async-storage/async-storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

//const authentication = initializeAuth(app, {
///  persistence: getPersistentCacheIndexManager(ReactNativeAsyncStorage)
//})

export const db = getFirestore(app);

const auth = getAuth(); // a instância de autenticação


const firestore = getFirestore();

export {auth, firestore, app};
