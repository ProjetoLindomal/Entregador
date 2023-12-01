import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg9tfyq3JPl8vn5oNgBvtTRrUnVOyIujk",
  authDomain: "gamexperience-lindomas.firebaseapp.com",
  projectId: "gamexperience-lindomas",
  storageBucket: "gamexperience-lindomas.appspot.com",
  messagingSenderId: "1027391812450",
  appId: "1:1027391812450:web:1c1bd9cc6b5a901f5ff23b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export{
    app,
    db
}