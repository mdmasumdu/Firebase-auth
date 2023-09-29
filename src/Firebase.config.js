// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6zfMn1Qc2C_3Rn4bN8w5DFUThT8ufytg",
  authDomain: "email-pass-auth-again.firebaseapp.com",
  projectId: "email-pass-auth-again",
  storageBucket: "email-pass-auth-again.appspot.com",
  messagingSenderId: "1012841586001",
  appId: "1:1012841586001:web:9564ac4a0ce2677b924770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default(auth)