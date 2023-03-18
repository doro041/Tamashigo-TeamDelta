// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
export default firebaseConfig;
