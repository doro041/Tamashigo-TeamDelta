// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZefnD2BC8tTDd8npGm3vmRxMUGnfIJHA",
  authDomain: "teamdelta-cfe4c.firebaseapp.com",
  projectId: "teamdelta-cfe4c",
  storageBucket: "teamdelta-cfe4c.appspot.com",
  messagingSenderId: "58719964063",
  appId: "1:58719964063:web:95f690409fa492fde3cbaa",
  measurementId: "G-9X6EDNGEKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);