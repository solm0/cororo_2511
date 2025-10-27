import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD06ipQ_NyjM5WZO4EW-geZOsvZo5cPaM0",
  authDomain: "cororo-2511.firebaseapp.com",
  databaseURL: "https://cororo-2511-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cororo-2511",
  storageBucket: "cororo-2511.firebasestorage.app",
  messagingSenderId: "1081732821403",
  appId: "1:1081732821403:web:84027b2ca04be72810f13e"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export function changeDisplay(url: string) {
  set(ref(db, "currentURL"), url);
}