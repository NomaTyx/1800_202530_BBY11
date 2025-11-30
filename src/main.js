import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "/styles/style.css";

import { db } from "./firebaseConfig.js";
import { onAuthReady } from "./authentication.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

// document.addEventListener('DOMContentLoaded', sayHello);

// --- Initialize UI on DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
  if (!location.href.includes(".html")) {
    window.location.href = "tournament-select.html";
  }
});
