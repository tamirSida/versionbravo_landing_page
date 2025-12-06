import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPUNEoD4B6_xjcqyZCTIvqZXv5jfHuXcE",
  authDomain: "vetted-landing-page.firebaseapp.com",
  projectId: "vetted-landing-page",
  storageBucket: "vetted-landing-page.firebasestorage.app",
  messagingSenderId: "890735356410",
  appId: "1:890735356410:web:7b8035af3e6c4f2ea81c43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);