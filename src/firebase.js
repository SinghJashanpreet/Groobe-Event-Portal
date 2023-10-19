import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDiayQJljCkemZHgBry70l-hNlrYAf3S5c",
  authDomain: "groobe-1509e.firebaseapp.com",
  databaseURL: "https://groobe-1509e.firebaseio.com",
  projectId: "groobe-1509e",
  storageBucket: "groobe-1509e.appspot.com",
  messagingSenderId: "128946602858",
  appId: "1:128946602858:web:27fa06bce219133580db13",
  measurementId: "G-VJE04TFE6T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth , RecaptchaVerifier, browserLocalPersistence};