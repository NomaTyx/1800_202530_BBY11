//import statements
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebaseConfig.js";

async function displayCardsDynamically() {
  const cardTemplate = document.getElementById("socialsCardTemplate");
  const container = document.getElementById("friendsGoHere");

  //create databaste referance constant vs var in js

  if (!container) {
    console.error("friendsGoHere container not found");
    return;
  }
  if (!cardTemplate) {
    console.error("socialsCardTemplate container not found");
    return;
  }

  //try catch for created the dynamic cars
  try {
    const friendsList = collection(db, "users");
    const queryFriendsListSnapshot = await getDocs(friendsList);

    queryFriendsListSnapshot.forEach((doc) => {
      //clone of card template
      const newcard = cardTemplate.content.cloneNode(true);
      const userData = doc.data();

      newcard.querySelector(
        ".card-image"
      ).src = `/images/${"chess-placeholder.png"}`;
      const link = newcard.querySelector(".friendPage");
      link.href = `EachFriend.html?docID=${doc.id}`;

      const userName = newcard.querySelector(".userName");
      userName.textContent = userData.name || "Unknown User";

      // // Fixed: Set the username text
      // newcard.querySelector(".userName").textContent =
      //   userData.name || userData.username || "Unknown User";
      container.appendChild(newcard);
    });

    console.log(`Successfully loaded ${queryFriendsListSnapshot.size} friends`);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

displayCardsDynamically();
