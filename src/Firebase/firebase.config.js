// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArlwySoBWBN_ZfrSd2Jxp8ORTGU4y3Qiw",
  authDomain: "mytaskmanagement-7a600.firebaseapp.com",
  projectId: "mytaskmanagement-7a600",
  storageBucket: "mytaskmanagement-7a600.appspot.com",
  messagingSenderId: "141259437244",
  databaseURL:
    "https://mytaskmanagement-7a600-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: "1:141259437244:web:b400691b32d1213ac0ccb9",
  measurementId: "G-CGWW1S427S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
