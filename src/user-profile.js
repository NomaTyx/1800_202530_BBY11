import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig.js";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

//Get DocumentID from the URL
function getUserIDFromUrl() {
  const url = new URL(window.location.href).searchParams;
  return url.get("userid");
}

//Fetch friend and display its name and image
async function displayFriendInfo() {
  const id = getUserIDFromUrl();

  const friendRef = doc(db, "users", id);
  const friendSnap = await getDoc(friendRef);
  const friend = friendSnap.data();

  //update the page to have the users name
  const name = friend.name;
  document.getElementById("usernameDisplay").textContent = name;

  //update the user bio
  const bio = friend.bio;
  document.getElementById("bioText").textContent = bio;

  //gotta see if the user is friends with
  const currentUserDocRef = await getDoc(doc(db, "users", auth.currentUser.uid));
  let isFriend = false;
  for (let i = 0; i < currentUserDocRef.data().friends.length; i++) {
    if (currentUserDocRef.data().friends[i] == id) {
      isFriend = true;
    }
  }
  if (isFriend) {
    document.getElementById("addFriendButton").textContent = "Remove friend";
    document.getElementById("addFriendButton").addEventListener("click", async () => {
      onAuthStateChanged(auth, (user) => {
        updateDoc(doc(db, "users", user.uid), { friends: arrayRemove(id) });
      });
    });
  } else {
    document.getElementById("addFriendButton").addEventListener("click", async () => {
      onAuthStateChanged(auth, (user) => {
        updateDoc(doc(db, "users", user.uid), { friends: arrayUnion(id) });
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", displayFriendInfo);
