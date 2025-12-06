import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

//gets the DOM, and updates it, true means it recusivly
// clones all elements of db i assume

const cardTemplate = document.getElementById("userCardTemplate");
const userName = document.getElementById("socialsUserName");
const bio = document.getElementById("Bio");
const container = document.getElementById("friendsFriendslist");

//generates and populates cards with links to user's profile
async function displayCardsDynamically() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
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

          //set the display name on the card to x
          const userName = newcard.querySelector(".userName");
          userName.textContent = userData.name || "Unknown User";

          //make the button link to a page that displays their profile
          newcard.querySelector(".friendPage").addEventListener("click", async () => {
            location.href = `user-profile.html?userid=${doc.id}`;
          });

          container.appendChild(newcard);
          numGeneratedCards++;
        }
      });
    } else {
      alert(hello);
      location.href = "login.html";
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  displayCardsDynamically();
});
