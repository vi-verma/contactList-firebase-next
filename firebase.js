// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHor4gVMLXt7iA9X_v8RVIfM5AL7k_jt0",
  authDomain: "contact-list-image-upload.firebaseapp.com",
  projectId: "contact-list-image-upload",
  storageBucket: "contact-list-image-upload.appspot.com",
  messagingSenderId: "172236609334",
  appId: "1:172236609334:web:7d8d51b3da1bf7c0f00597"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);