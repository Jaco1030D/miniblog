// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC4et3ayYKPHwGxDsobF4TKO-7WdkZo3UY",
  authDomain: "miniblog-f0c25.firebaseapp.com",
  projectId: "miniblog-f0c25",
  storageBucket: "miniblog-f0c25.appspot.com",
  messagingSenderId: "1088603175491",
  appId: "1:1088603175491:web:5c9fe56901c438dbf932f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export{db}