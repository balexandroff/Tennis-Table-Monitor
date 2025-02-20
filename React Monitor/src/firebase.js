import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    onValue,
    remove as firebaseRemove  // ✅ Explicit rename
} from "firebase/database";  

const firebaseConfig = {
    //apiKey: "ТВОЯ_API_KEY",
    //authDomain: "ТВОЯ_ДОМЕЙН",
    databaseURL: "https://tabletennis-detector-default-rtdb.firebaseio.com/",
    projectId: "tabletennis-monitor",
    //storageBucket: "ТВОЙ_СТОРИДЖ",
    //messagingSenderId: "ТВОЙ_MESSAGING_ID",
    //appId: "ТВОЙ_APP_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, firebaseRemove as remove };
