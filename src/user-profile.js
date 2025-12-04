import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig.js";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
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

  const currentUserDocRef = await getDoc(doc(db, "users", auth.currentUser.uid));

  if (isFriend()) {
    document.getElementById("addFriendButton").textContent = "Remove friend";
    document.getElementById("addFriendButton").addEventListener("click", async () => {
      updateDoc(doc(db, "users", auth.currentUser.uid), { friends: arrayRemove(id) });
    });
  } else {
    document.getElementById("addFriendButton").addEventListener("click", async () => {
      onAuthStateChanged(auth, (user) => {
        if (currentUserDocRef.data().friends?.length > 0) {
          updateDoc(doc(db, "users", user.uid), { friends: arrayUnion(id) });
        } else {
          setDoc(doc(db, "users", user.uid), { friends: arrayUnion(id) });
        }
      });
    });
  }
}

export async function isFriend() {
  //gotta see if the user is friends with
  const currentUserDocRef = await getDoc(doc(db, "users", auth.currentUser.uid));
  for (let i = 0; i < currentUserDocRef.data().friends?.length; i++) {
    if (currentUserDocRef.data().friends[i] == getUserIDFromUrl()) {
      return true;
    }
  }
  return false;
}

async function loadCards() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const userTournamentsRef = collection(db, "users", uid, "tournamentData");

      let cardTemplate = document.getElementById("cardTemplate");
      let cardContainer = document.getElementById("tournamentholder");

      const querySnapshot = await getDocs(userTournamentsRef);

      querySnapshot.forEach((doc) => {
        let newcard = cardTemplate.content.cloneNode(true);
        let numRounds = 0;
        let score = 0;

        if (doc.data().tournamentArray.length > 0) {
          //read data and store the relevant bits
          for (let j = 0; j <= doc.data().tournamentArray.length - 1; j++) {
            score += Number(doc.data().tournamentArray[j]["result"]);
            numRounds++;
          }
        }

        //populate cards with data
        newcard.querySelector(".tournamentName").textContent = doc.id;
        newcard.querySelector(".roundsText").textContent = "Rounds: " + numRounds;
        newcard.querySelector(".scoreText").textContent = "Score: " + score;
        cardContainer.appendChild(newcard);
      });
    } else {
      location.href = "login.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", displayFriendInfo);
document.addEventListener("DOMContentLoaded", loadCards);
