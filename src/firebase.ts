import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9iWeQTpeZ6EBA-mpsLySHOyjIBGd0Ckw",
    authDomain: "o42-client.firebaseapp.com",
    projectId: "o42-client",
    storageBucket: "o42-client.firebasestorage.app",
    messagingSenderId: "778259602432",
    appId: "1:778259602432:web:0029cee73f9bbeae5b4ce5",
    measurementId: "G-P7ZGMXVJG3"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };