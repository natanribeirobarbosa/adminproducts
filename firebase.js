import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyBgvCxI2uwKlShUVDQByHq5whK2hUwSIGs",
  authDomain: "quemvenceleva.firebaseapp.com",
  databaseURL: "https://quemvenceleva-default-rtdb.firebaseio.com",
  projectId: "quemvenceleva",
  storageBucket: "quemvenceleva.firebasestorage.app",
  messagingSenderId: "968863791569",
  appId: "1:968863791569:web:7caa5f737fb36c5714c8f0",
  measurementId: "G-PG4F8XL93J"
};

// Initialize Firebase
// inicializa app
const app = initializeApp(firebaseConfig)

// EXPORTA db (ESSENCIAL)
export const db = getFirestore(app)