// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDU3FEnovylsJG9L-b_bO4F0Ny2qfoEes4",
    authDomain: "react-app-ite101-f38df.firebaseapp.com",
    projectId: "react-app-ite101-f38df",
    storageBucket: "react-app-ite101-f38df.appspot.com",
    messagingSenderId: "405177241413",
    appId: "1:405177241413:web:f61b82e8af5e110a6cf82c",
    measurementId: "G-K237YX6N5X"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {
    db,
    auth,
    storage
}