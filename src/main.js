import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { onAuthReady } from "./authentication.js";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function test() {
  const testButton = document.getElementById("hello");
  testButton?.addEventListener("click", async (e) => {
    alert("hello");
  });
}

// document.addEventListener('DOMContentLoaded', sayHello);

// --- Initialize UI on DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", test);
