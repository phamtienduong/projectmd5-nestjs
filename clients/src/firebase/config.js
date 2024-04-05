// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDgprJ5V66nS9hyRbuEXlM3NSjnoH4dwM",
    authDomain: "chat-app-b921f.firebaseapp.com",
    projectId: "chat-app-b921f",
    storageBucket: "chat-app-b921f.appspot.com",
    messagingSenderId: "397869461213",
    appId: "1:397869461213:web:069890cd0e3f5567907534",
    measurementId: "G-XDEHL5TNQN"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // google authentication
console.log("provider",provider);
const fbAuthProvider = new FacebookAuthProvider(); // facebook authentication
export const GoogleAuth = async () => {
    const userAuth = await signInWithPopup(auth, provider)
    return userAuth;
  }

export const FacebookAuth = async () => {
    try {
      const fbAuth =await signInWithPopup(auth, fbAuthProvider);
      return fbAuth;
    } catch (error) {
      console.log(error);
    }
  }