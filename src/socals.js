import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

//fetch placeholder elements and replace with info from the db
async function displayUserInfo() {
  onAuthStateChanged(auth, async (user) => {
    try {
      //define the constants.
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const users = userSnap.data();
      alert(user.uid);

      const userName = users?.name ?? "Unknown User";
      const bio = users.bio;
      const numFriends = users.friends?.length ?? 0;

      //containers for elements we care about.
      const userInfoContainer = document.getElementById("userNameplusBio");
      const friendNumContainer = document.getElementById("friendNum");

      // get selectors for placeHolders, and replace them.
      const name = userInfoContainer.querySelector(".Username");
      alert(userName);
      name.textContent = userName;
      const biography = userInfoContainer.querySelector(".bioMsg");
      biography.textContent = bio;

      const friendNum = friendNumContainer.querySelector("p");
      friendNum.textContent = `Friends (${numFriends})`;
    } catch {
      console.log("error poopy face");
    }
  });
}
async function displayCardsDynamically() {
  onAuthStateChanged(auth, async (user) => {
    const cardTemplate = document.getElementById("socialsCardTemplate");
    const container = document.getElementById("friendsGoHere");

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
      //waits for snapshot of document at absolute path to be returned
      const userDoc = await getDoc(doc(db, "users", user.uid));

      //friendsList.data().friends gets the array at the property "friends" of the doc "friendsList"

      if (userDoc.data().friends) {
        for (let i = 0; i < userDoc.data().friends.length; i++) {
          //clone of card template
          const newcard = cardTemplate.content.cloneNode(true);

          // newcard.querySelector(".card-image").src = `/images/${
          //   userData.code || "chess-placeholder"
          // }.png`;

          const link = newcard.querySelector(".friendPage a");
          const friendId = userDoc.data().friends[i];
          link.href = `/src/EachFriend.html?docID=${friendId}`;

          const userName = newcard.querySelector(".userName");
          let friendReference = await getDoc(doc(db, "users", userDoc.data().friends[i]));
          //if the user with this user id has no name, "unknown user" is displayed instead.
          let friendName = friendReference.data()?.name ?? "Unknown user";
          // alert("friend name: " + friendName);
          userName.textContent = friendName;

          container.appendChild(newcard);
          console.log(`Successfully loaded ${userDoc.data().length} friends`);
        }
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayUserInfo();
});
document.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
