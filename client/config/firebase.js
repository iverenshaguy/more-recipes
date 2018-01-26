import firebase from 'firebase';
import dotenv from 'dotenv';
import 'firebase/storage';

dotenv.config();

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const storage = app.storage();

export default storage;