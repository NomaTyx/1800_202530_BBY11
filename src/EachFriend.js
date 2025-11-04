import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

//Get DocumentID from the URL
function getDocIDFromUrl() {
  const params = new URL(window.location.href).searchParams;
  return params.get("docID");
}

//Fetch friend and display its name and image
async function displayFriendInfo() {
  const id = getDocIDfromUrl();

  try {
    const friendRef = doc(db, "users", id);
    const friendSnap = await getDoc(friendRef);

    const friend = friendSnap.data();
    const name = users.name;
    const code = users.code;
    const bio = users.bio;
    //implement friends list in a later sprint
    const friendsList = users.friendsList;
    const img = document.getElementById("profilePicture");
    const numOfFriends = users.friendList.length;

    //update the page to have the users name
    document.getElementById("userName").textContent = name;

    //gotta acutally implement a working version for this app later
    img.src = `.images/${code}.jpg`;
    img.alt = `${name} image`;

    //update the user bio
    document.getElementById("bio").textContent = bio;

    //add the specified user's friends list later sprint

    //change the users number of friends programatically
    document.getElementById("numOfFriends").textContent =
      "Friends (" + numOfFriends + ")";
  } catch (error) {
    console.error("Error loading Profile:", error);
    document.getElementById("userName").textContent = "Error Loading Profile.";
  }
}

displayFriendInfo();
