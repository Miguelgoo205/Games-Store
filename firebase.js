// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore, collection, onSnapshot} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9elBIvyNx_rOMfEIqYr3ihAQNZS0NuBU",
    authDomain: "carrito-compras-workteam283.firebaseapp.com",
    projectId: "carrito-compras-workteam283",
    storageBucket: "carrito-compras-workteam283.appspot.com",
    messagingSenderId: "671687478516",
    appId: "1:671687478516:web:a3d882942516cb988062a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const updateGame = (callback) => onSnapshot(collection(db, 'products'),callback)
// export const loadGame = () => getDocs(collection(db, 'products'))
// export const saveGame = (name, platform, units, type, price, image) => 
//   addDoc(collection(db, 'products'),{name, platform, units, type, price, image})

