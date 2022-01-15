import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
   
  apiKey: "AIzaSyB_FelIIpKieUpOv6Rgdka-lQ7aJxUNcls",
  authDomain: "drycleaning-b7226.firebaseapp.com",
  projectId: "drycleaning-b7226",
  storageBucket: "drycleaning-b7226.appspot.com",
  messagingSenderId: "637391599378",
  appId: "1:637391599378:web:1e1f0bc1aaca952dc725cb",
  measurementId: "G-DQG7HYYGTY"
}
// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore();


