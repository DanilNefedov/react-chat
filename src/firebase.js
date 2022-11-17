import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDA9qU57pjMXUK0LeN7s_Fv1UFkyrfLOC8",
  authDomain: "chat-app-cv-91800.firebaseapp.com",
  projectId: "chat-app-cv-91800",
  storageBucket: "chat-app-cv-91800.appspot.com",
  messagingSenderId: "1030779360250",
  appId: "1:1030779360250:web:21af193769db88e52dca43"
};


const app = initializeApp(firebaseConfig);
// export const auth = getAuth();

// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID