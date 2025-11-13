import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

//gets the DOM, and updates it, true means it recusivly
// clones all elements of db i assume

const cardTemplate = document.getElementById("FriendsOfFriend");
const userName = document.getElementById("socialsUserName");
const bio = document.getElementById("Bio");
const container = document.getElementById("friendsFriendslist");

async function displayCardsDynamically() {
  if (!container) {
    console.error("Cant find firendsFriends container");
  }
  if (!cardTemplate) {
    console.error("Can't find SocailsCardTemplate");
  }
  try {
    const userList = collection(db, "users");
    const queryUserListSnapshot = await getDocs(userList);

    queryUserListSnapshot.forEach((doc) => {
      const newcard = cardTemplate.content.cloneNode(true);
      const userData = doc.data();

      newcard.querySelector(".card-image").src = `/images/${
        userData.code || "chess-placeholder"
      }.png`;

      const link = newcard.querySelector(".friendPage");
      link.href = `/src/EachFriend.html?docID=${doc.id}`;

      const userName = newcard.querySelector(".userName");
      userName.textContent = userData.name || "Unknown User";

      container.appendChild(newcard);
    });

    console.log(`Successfully loaded ${queryUserListSnapshot.size} friends`);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
