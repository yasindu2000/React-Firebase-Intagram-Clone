import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const config = {
  apiKey: "AIzaSyD0q59UAf8TKldpp7CIqKkbR_PhfojyOXk",
  authDomain: "instagram1-179fe.firebaseapp.com",
  projectId: "instagram1-179fe",
  storageBucket: "instagram1-179fe.firebasestorage.app",
  messagingSenderId: "896994828482",
  appId: "1:896994828482:web:d8568bcd6098aecc8b9b5b"
}

const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore;



export { firebase, FieldValue};