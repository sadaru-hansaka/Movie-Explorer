import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { GoogleAuthProvider } from 'firebase/auth';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNc_M3eR5CERUVuj9SBAXHNnZv8OWclaU",
  authDomain: "movie-explorer-4eb77.firebaseapp.com",
  projectId: "movie-explorer-4eb77",
  storageBucket: "movie-explorer-4eb77.firebasestorage.app",
  messagingSenderId: "992196421567",
  appId: "1:992196421567:web:6398aa63b9ba4ebede630a",
  measurementId: "G-DHK33Z8D3R"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// // export default app;
// export {auth};

// export const db = firebase.firestore(); 

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const provider = new GoogleAuthProvider();
export default firebase;