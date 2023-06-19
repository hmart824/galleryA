import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBK5q5bgubKY0dt1iHo8d5PZY9gjc57CUw",
    authDomain: "gallerya-12a87.firebaseapp.com",
    projectId: "gallerya-12a87",
    storageBucket: "gallerya-12a87.appspot.com",
    messagingSenderId: "9143508968",
    appId: "1:9143508968:web:1599137546b1a239754e5d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };