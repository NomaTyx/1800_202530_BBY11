import { collection, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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

    const editButton = document.getElementById("editProfile");
    const bioBox = document.getElementById("biobox");

    //the modal is the popup that allows you to edit the fields
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    var btn = document.getElementById("editProfile");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    document.getElementById("submitBtn").addEventListener("click", async () => {
      await updateDoc(userRef, {
        name: document.getElementById("name").value,
        bio: document.getElementById("bio").value,
      });
      modal.style.display = "none";
      location.reload();
    });
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

    if (userDoc.data().friends?.length > 0) {
      for (let i = 0; i < userDoc.data().friends.length; i++) {
        //clone of card template
        const newcard = cardTemplate.content.cloneNode(true);

        //friend's user ID
        const friendId = userDoc.data().friends[i];

        const userName = newcard.querySelector(".userName");
        let friendReference = await getDoc(doc(db, "users", userDoc.data().friends[i]));

        //if the user with this user id has no name, "unknown user" is displayed instead.
        let friendName = friendReference.data()?.name ?? "Unknown user";

        userName.textContent = friendName;

        //takes you to that friend's profile page
        newcard.getElementById("friendProfileButton").addEventListener("click", () => {
          location.href = `/user-profile.html?userid=${friendId}`;
        });

        container.appendChild(newcard);
      }
    } else {
      let t = document.createElement("h2");
      t.textContent = "Unfortunately, you have no friends.";
      container.appendChild(t);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayUserInfo();
});
document.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
