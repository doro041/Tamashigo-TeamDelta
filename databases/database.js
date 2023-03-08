// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk68vw2-Vg9AVAL_6ui__pHxU24_r8FhE",
  authDomain: "tamashigo-16b90.firebaseapp.com",
  databaseURL: "https://tamashigo-16b90-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tamashigo-16b90",
  storageBucket: "tamashigo-16b90.appspot.com",
  messagingSenderId: "149282551424",
  appId: "1:149282551424:web:5d0ebbae967e8dd624d865",
  measurementId: "G-XWKP6MN636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);