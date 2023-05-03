// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(process.env.NODE_ENV);
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL:
    "https://expense-manager-6c808-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: "expense-manager-6c808.appspot.com",
  messagingSenderId: "269408963187",
  appId: `${process.env.REACT_APP_APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
