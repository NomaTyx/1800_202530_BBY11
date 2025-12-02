import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig.js";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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

  const name = friend.name;
  const code = friend.code;
  const bio = friend.bio;

  const friendIds = friend.friends || [];

  const numOfFriends = friendIds.length;

  //update the page to have the users name
  document.getElementById("usernameDisplay").textContent = name;

  //update the user bio
  document.getElementById("bioText").textContent = bio;

  document.getElementById("addFriendButton").addEventListener("click", async () => {
    alert("we gottem");
    onAuthStateChanged(auth, (user) => {
      updateDoc(doc(db, "users", user.uid), { friends: arrayUnion(id) });
    });
  });
}

document.addEventListener("DOMContentLoaded", displayFriendInfo);
