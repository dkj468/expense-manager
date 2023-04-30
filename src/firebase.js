// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9v18oG2TSDw9lKO2ENLZDzMuB9YqRM8k",
  authDomain: "expense-manager-6c808.firebaseapp.com",
  databaseURL:
    "https://expense-manager-6c808-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-manager-6c808",
  storageBucket: "expense-manager-6c808.appspot.com",
  messagingSenderId: "269408963187",
  appId: "1:269408963187:web:4dc68717014a0c4af8f806",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
