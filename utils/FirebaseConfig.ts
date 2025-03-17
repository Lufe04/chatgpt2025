import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADdgx0PavamAMtMKc0SklP9rN0p3IPNiY",
  authDomain: "dam-chat-2025l.firebaseapp.com",
  projectId: "dam-chat-2025l",
  storageBucket: "dam-chat-2025l.firebasestorage.app",
  messagingSenderId: "1006263670339",
  appId: "1:1006263670339:web:a8a10435fadec9be6e66f6",
  measurementId: "G-DSK79TXS3Y"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
