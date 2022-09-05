import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWFDMPNn_kQvCOEDKq-lSUQW69bC9luT0",
  authDomain: "medium-clone-f0537.firebaseapp.com",
  projectId: "medium-clone-f0537",
  storageBucket: "medium-clone-f0537.appspot.com",
  messagingSenderId: "176066571250",
  appId: "1:176066571250:web:5bbdf400d901c1c72e596b",
  measurementId: "G-K1V40N5W57",
};
var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAWFDMPNn_kQvCOEDKq-lSUQW69bC9luT0",
  authDomain: "medium-clone-f0537.firebaseapp.com",
  projectId: "medium-clone-f0537",
  storageBucket: "medium-clone-f0537.appspot.com",
  messagingSenderId: "176066571250",
  appId: "1:176066571250:web:5bbdf400d901c1c72e596b",
  measurementId: "G-K1V40N5W57",
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var db = firebaseApp.firestore();
export { db };
export const auth = getAuth(app);
