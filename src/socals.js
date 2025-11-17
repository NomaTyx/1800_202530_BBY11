//import statements
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

async function displayCardsDynamically() {
  onAuthStateChanged(auth, async (user) => {
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

    //try catch for created the dynamic cards
    try {
      const friendsList = await getDoc(doc(db, "users", user.uid));

      //friendsList.data().friends gets the array at the property "friends" of the doc "friendsList"

      for (let i = 0; i < friendsList.data().friends.length; i++) {
        //clone of card template
        const newcard = cardTemplate.content.cloneNode(true);

        // newcard.querySelector(".card-image").src = `/images/${
        //   userData.code || "chess-placeholder"
        // }.png`;

        const link = newcard.querySelector(".friendPage");
        link.href = `/src/EachFriend.html?docID=${doc.id}`;

        const userName = newcard.querySelector(".userName");
        let friendReference = await getDoc(
          doc(db, "users", friendsList.data().friends[i])
        );
        //if the user with this user id has no name, "unknown user" is displayed instead.
        let friendName = friendReference.data()?.name ?? "Unknown user";
        alert("friend name: " + friendName);
        userName.textContent = friendName;

        container.appendChild(newcard);
      }

      console.log(`Successfully loaded ${friendsList.data().length} friends`);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
