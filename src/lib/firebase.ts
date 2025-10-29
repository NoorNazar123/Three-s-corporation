import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMIa1SheQXUQWFZsH7dQTdT2FhIdSLjmc",
  authDomain: "fir-coporation-40813.firebaseapp.com",
  projectId: "fir-coporation-40813",
  storageBucket: "fir-coporation-40813.appspot.com",
  messagingSenderId: "573243566951",
  appId: "1:573243566951:web:c98ea3873f75c790679dc2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
