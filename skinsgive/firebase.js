// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfOCw8XQwLFmcPYIpYUJgXtunUXzuL_fE",
  authDomain: "counter-skins.firebaseapp.com",
  projectId: "counter-skins",
  storageBucket: "counter-skins.appspot.com",
  messagingSenderId: "181165473403",
  appId: "1:181165473403:web:f0095f8abfa5089b4cacde",
  measurementId: "G-EGQY7SW2W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// const analytics = getAnalytics(app)