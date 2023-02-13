import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-L8zHawYRovKFj8zx9kFXaFOD0pnQ0aw",
  authDomain: "progressive-web-app-2023.firebaseapp.com",
  projectId: "progressive-web-app-2023",
  storageBucket: "progressive-web-app-2023.appspot.com",
  messagingSenderId: "881787241989",
  appId: "1:881787241989:web:f52deccd494e3314f9be6c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
