import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // یہاں اپنی اصلی کیز ڈالیں
  authDomain: "azwaj-noormatch.firebaseapp.com",
  projectId: "azwaj-noormatch",
  storageBucket: "azwaj-noormatch.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
