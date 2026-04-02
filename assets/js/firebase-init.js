// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiqDBQ-VGVmLg6EReyn_F3xt-n8zQ5JVc",
  authDomain: "tianshan-space.firebaseapp.com",
  databaseURL: "https://tianshan-space-default-rtdb.firebaseio.com",
  projectId: "tianshan-space",
  storageBucket: "tianshan-space.firebasestorage.app",
  messagingSenderId: "20376313126",
  appId: "1:20376313126:web:67e83082bda5d5792d75e7",
  measurementId: "G-QBX0KX5BL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
