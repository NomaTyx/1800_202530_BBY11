import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

//Get DocumentID from the URL
function getDocIDFromUrl() {
  const params = new URL(window.location.href).searchParams;
  return params.get("docID");
}

//Fetch friend and display its name and image
async function displayFriendInfo() {
  const id = getDocIDFromUrl();

  try {
    const friendRef = doc(db, "users", id);
    const friendSnap = await getDoc(friendRef);

    const friend = friendSnap.data();
    const name = friend.name;
    const code = friend.code;
    const bio = friend.bio;
    //implement friends list in a later sprint
    const friendIds = friend.friends;
    //const img = document.getElementById("profilePicture");
    const numOfFriends = friendIDs.length;

    //update the page to have the users name
    document.getElementById("userName").textContent = name;

    //gotta acutally implement a working version for this app later
    img.src = `./images/${code}.jpg`;
    img.alt = `${name} image`;

    //update the user bio
    document.getElementById("bio").textContent = bio;

    //add the specified user's friends list later sprint

    //change the users number of friends programatically
    document.getElementById("numOfFriends").textContent =
      "Friends (" + numOfFriends + ")";

    await displayFriendsList(friendIds);
  } catch (error) {
    console.error("Error loading Profile:", error);
    document.getElementById("userName").textContent = "Error Loading Profile.";
  }
}


//complelty ai rn 
// Function to fetch and display friends based on their IDs
async function displayFriendsList(friendIds) {
  const friendsContainer = document.querySelector(".container.row.bg-info");

  if (!friendsContainer) {
    console.error("Friends container not found");
    return;
  }

  // Clear existing friend cards (except template)
  friendsContainer.innerHTML = "";

  for (const friendId of friendIds) {
    try {
      const friendDocRef = doc(db, "users", friendId);
      const friendDocSnap = await getDoc(friendDocRef);

      if (friendDocSnap.exists()) {
        const friendData = friendDocSnap.data();

        // Create a friend card element
        const friendCard = document.createElement("friend-card");
        // You can set attributes or properties on the friend-card component
        // friendCard.setAttribute('name', friendData.name);
        // friendCard.setAttribute('code', friendData.code);
        // Or inject data however your friend-card component expects it

        friendsContainer.appendChild(friendCard);

        console.log("Friend loaded:", friendData.name);
      }
    } catch (error) {
      console.error(`Error loading friend ${friendId}:`, error);
    }
  }
}

displayFriendInfo();
