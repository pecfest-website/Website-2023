import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDort0dfixFdPjExyMnfhhyJ960P1GZh28",
  authDomain: "pecfest-23.firebaseapp.com",
  projectId: "pecfest-23",
  storageBucket: "pecfest-23.appspot.com",
  messagingSenderId: "617124874776",
  appId: "1:617124874776:web:9adc3b248f4ea9d3d6d16d",
  measurementId: "G-ZP625R1TCQ",
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
let analytics;
if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };