import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCNKO1utJ_Mch82uWZj1zwSfVrIExp606w",
    authDomain: "todo-react-firebase-ba587.firebaseapp.com",
    projectId: "todo-react-firebase-ba587",
    storageBucket: "todo-react-firebase-ba587.appspot.com",
    messagingSenderId: "320778903834",
    appId: "1:320778903834:web:adc371bdbaa728da374ca3"
  };

  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app)