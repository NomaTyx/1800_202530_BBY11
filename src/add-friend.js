import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

//gets the DOM, and updates it, true means it recusivly
// clones all elements of db i assume

const cardTemplate = document.getElementById("userCardTemplate");
const userName = document.getElementById("socialsUserName");
const bio = document.getElementById("Bio");
const container = document.getElementById("friendsFriendslist");

async function displayCardsDynamically() {
  onAuthStateChanged(auth, async (user) => {
    const userList = collection(db, "users");
    const queryUserListSnapshot = await getDocs(userList);
    let numGeneratedCards = 0;
    queryUserListSnapshot.forEach((doc) => {
      //this is a really ugly fix but there's no other way i can think of to generate only 20 cards.
      // everything else would just gut the code even more and honestly it's unlikely that there are so many users
      //that this will be a problem
      if (numGeneratedCards <= 20 && doc.data().name != user.displayName) {
        const newcard = cardTemplate.content.cloneNode(true);
        const userData = doc.data();

        const userName = newcard.querySelector(".userName");
        userName.textContent = userData.name || "Unknown User";

        newcard.querySelector(".friendPage").addEventListener("click", async () => {
          location.href = `user-profile.html?userid=${doc.id}`;
        });

        container.appendChild(newcard);
        numGeneratedCards++;
      }
    });
    console.log(`Successfully loaded ${queryUserListSnapshot.size} users`);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
