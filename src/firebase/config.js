// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC06Y9jJOg6kmLDKEHsEbODZZZ-LqaQLX8",
  authDomain: "mymovies-3302f.firebaseapp.com",
  projectId: "mymovies-3302f",
  storageBucket: "mymovies-3302f.appspot.com",
  messagingSenderId: "617773673329",
  appId: "1:617773673329:web:04c27a4f91b1688e74a4d0",
  measurementId: "G-E0FET11X1Y",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig); //aka app
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const db = getFirestore(firebase);

export {firebase, auth, db};