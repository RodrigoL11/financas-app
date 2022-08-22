import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmtN8nmvJ7IqGduPp-AZ0v8Sf9Kp8g7FE",
  authDomain: "financas-app-4cff3.firebaseapp.com",
  projectId: "financas-app-4cff3",
  storageBucket: "financas-app-4cff3.appspot.com",
  messagingSenderId: "31198427296",
  appId: "1:31198427296:web:91d1317a45d18c6cffb1c5",
  measurementId: "G-8MLVJRNGT9"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);