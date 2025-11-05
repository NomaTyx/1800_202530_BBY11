import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
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

function test() {
  const testButton = document.getElementById("hello");
  testButton?.addEventListener("click", async (e) => {
    alert("hello");
  });
}

function addUserData() {
  const usersRef = collection(db, "users");
  console.log("adding sample user data");
  addDoc(usersRef, {
    code: "BBY01",
    name: "it",
    country: "Burnaby",
    bio: "A lovely place for a lunch walk.",
    friends: ["2jmTXhdB7HxYE9oj0o9S"],
    last_updated: serverTimestamp(),
  });
  addDoc(usersRef, {
    code: "BBY01",
    name: "is",
    country: "Anmore",
    bio: "Close to town, and relaxing.",
    friends: ["E1Vr6JPpPrMrnGlg8THW"],
    last_updated: serverTimestamp(),
  });
  addDoc(usersRef, {
    code: "BBY01",
    name: "late",
    country: "North Vancouver",
    bio: "Amazing ski slope views.",
    friends: ["E1Vr6JPpPrMrnGlg8THW"],
    last_updated: serverTimestamp(),
  });
  addDoc(usersRef, {
    code: "BBY01",
    name: "adfa@gmail.com",
    country: "North Vancouver",
    bio: "Amazing ski slope views.",
    friends: ["2jmTXhdB7HxYE9oj0o9S", "E1Vr6JPpPrMrnGlg8THW"],
    last_updated: serverTimestamp(),
  });
}

async function seedFriends() {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  // Check if the collection is empty
  if (querySnapshot.empty) {
    console.log("user collection is empty. seeding data");
    addUserData();
  } else {
    console.log("user collection already contains data. skipping seeds.");
  }
}

async function debugFetch() {
  console.log("debugFetch start");
  try {
    const col = collection(db, "users");
    const snap = await getDocs(col);
    console.log("getDocs success. doc count =", snap.size);
    snap.forEach((d) => console.log("doc:", d.id, d.data()));
  } catch (err) {
    console.error("getDocs error:", err);
  }
}
document.addEventListener("DOMContentLoaded", debugFetch);

seedFriends();

// document.addEventListener('DOMContentLoaded', sayHello);

// --- Initialize UI on DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", test);
