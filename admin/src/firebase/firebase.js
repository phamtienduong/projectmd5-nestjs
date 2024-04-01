// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGjOq5PPEwvIEEDiA4mIdwgLJVMO9cCiI",
  authDomain: "prj-md2.firebaseapp.com",
  projectId: "prj-md2",
  storageBucket: "prj-md2.appspot.com",
  messagingSenderId: "367297264901",
  appId: "1:367297264901:web:6a51b7e203510d544fcb6c",
  measurementId: "G-RXXWWGW2MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);