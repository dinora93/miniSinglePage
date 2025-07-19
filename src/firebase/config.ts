import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TAIzaSyC_kd5lrQNRTlj_tMFzwHBZJA9_HWnH5yY",
  authDomain: "Tminisinglepagecitas.firebaseapp.com",
  projectId: "minisinglepagecitas",
  storageBucket: "minisinglepagecitas.firebasestorage.app",
  messagingSenderId: "143256524659",
  appId: "1:143256524659:web:8e4c81f751afd4a420d706"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
