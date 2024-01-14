// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc8YEHUB-xrgbddYvGqDhGcZYMvSowSrQ",
  authDomain: "no-8eba4.firebaseapp.com",
  projectId: "no-8eba4",
  storageBucket: "no-8eba4.appspot.com",
  messagingSenderId: "990739355337",
  appId: "1:990739355337:web:5ba95d304a088f5a811f18",
  measurementId: "G-P0ZTJBWGDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
