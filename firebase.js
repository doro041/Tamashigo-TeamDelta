// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe7bGLW7WoI4KjPcFlzRB8k-9GmF2iCI8",
  authDomain: "tamashigo-77309.firebaseapp.com",
  projectId: "tamashigo-77309",
  storageBucket: "tamashigo-77309.appspot.com",
  messagingSenderId: "359612803251",
  appId: "1:359612803251:web:5f444dd6c353cb5049a8c6",
  measurementId: "G-B54PZQY13W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName;

    // ...
  } else {
    // User is signed out
    // ...
  }
});





export default firebaseConfig;