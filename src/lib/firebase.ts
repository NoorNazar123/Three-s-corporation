import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMIa1SheQXUQWFZsH7dQTdT2FhIdSLjmc",
  authDomain: "fir-coporation-40813.firebaseapp.com",
  projectId: "fir-coporation-40813",
  storageBucket: "fir-coporation-40813.firebasestorage.app",
  messagingSenderId: "573243566951",
  appId: "1:573243566951:web:c98ea3873f75c790679dc2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
