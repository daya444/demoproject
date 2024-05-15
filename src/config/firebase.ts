// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXW8i2XptKs9KhSBPE2lupp4ao8b4MGvI",
  authDomain: "react-basic-app-59dd4.firebaseapp.com",
  projectId: "react-basic-app-59dd4",
  storageBucket: "react-basic-app-59dd4.appspot.com",
  messagingSenderId: "412211578420",
  appId: "1:412211578420:web:4fa41a1423efa7ddf06c61"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)



 