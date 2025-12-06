import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { MAIN_FIREBASE_CONFIG } from '@/constants/firebase';

const app = initializeApp(MAIN_FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);