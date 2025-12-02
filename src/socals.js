import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

//fetch placeholder elements and replace with info from the db
async function displayUserInfo() {
  onAuthStateChanged(auth, async (user) => {
    //define the constants.
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const users = userSnap.data();

    const userName = users?.name ?? "Unknown User";
    const bio = users.bio;
    const numFriends = users.friends?.length ?? 0;

    document.getElementById("usernameDisplay").textContent = userName;
    document.getElementById("bioText").textContent = users.bio;
    document.getElementById("numFriendsText").textContent = "Friends: " + numFriends;
  });
}
async function displayCardsDynamically() {
  onAuthStateChanged(auth, async (user) => {
    const cardTemplate = document.getElementById("socialsCardTemplate");
    const container = document.getElementById("friendsGoHere");

    //try catch for created the dynamic cards
    //waits for snapshot of document at absolute path to be returned
    const userDoc = await getDoc(doc(db, "users", user.uid));

    //friendsList.data().friends gets the array at the property "friends" of the doc "friendsList"

    if (userDoc.data().friends) {
      for (let i = 0; i < userDoc.data().friends.length; i++) {
        //clone of card template
        const newcard = cardTemplate.content.cloneNode(true);

        //TODO: Make this point to the friend's profile by adding an event listener
        const link = newcard.querySelector(".friendPage");
        const friendId = userDoc.data().friends[i];
        link.href = `/src/user-profile.html?docID=${friendId}`;

        const userName = newcard.querySelector(".userName");
        let friendReference = await getDoc(doc(db, "users", userDoc.data().friends[i]));
        //if the user with this user id has no name, "unknown user" is displayed instead.
        let friendName = friendReference.data()?.name ?? "Unknown user";

        userName.textContent = friendName;

        container.appendChild(newcard);
        console.log(`Successfully loaded ${userDoc.data().length} friends`);
      }
    } else {
      let t = document.createElement("h1");
      t.textContent = "You have no friends hahahahaha";
      container.appendChild;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayUserInfo();
});
document.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
