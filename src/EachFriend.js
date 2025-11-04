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
    const friendIds = friend.friends || [];
    // //const img = document.getElementById("profilePicture");
    const numOfFriends = friendIds.length;

    //update the page to have the users name
    document.getElementById("userName").textContent = name;

    //gotta acutally implement a working version for this app later
    const img = document.getElementById("profilePicture");
    img.src = `/images/${code || "chess-placeholder"}.png`;
    img.alt = `${name} profile image`;

    //update the user bio
    document.getElementById("bio").textContent = bio;

    //add the specified user's friends list later sprint

    //change the users number of friends programatically
    document.getElementById("numOfFriends").textContent =
      "Friends (" + numOfFriends + ")";

    //await displayFriendsList(friendIds);
  } catch (error) {
    console.error("Error loading Profile:", error);
    document.getElementById("userName").textContent = "Error Loading Profile.";
  }
}
console.log("Loaded from:", window.location.pathname);

displayFriendInfo();
