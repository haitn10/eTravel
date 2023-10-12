// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkVaKR-xfbg61SxBw8D8953es1yxb6kX8",
  authDomain: "capstoneetravel-d42ad.firebaseapp.com",
  projectId: "capstoneetravel-d42ad",
  storageBucket: "capstoneetravel-d42ad.appspot.com",
  messagingSenderId: "1043472852661",
  appId: "1:1043472852661:web:08e5edd1dbf3ed66cf80fc",
  measurementId: "G-GSJ66JSN0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
