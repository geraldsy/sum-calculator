// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKW6cUu9OzpErUMdjB6IQ0qSEsPIRe2Sw",
  authDomain: "react-add-calculator.firebaseapp.com",
  projectId: "react-add-calculator",
  storageBucket: "react-add-calculator.appspot.com",
  messagingSenderId: "377239664082",
  appId: "1:377239664082:web:ab55b8d0d8af1ef557c40b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
