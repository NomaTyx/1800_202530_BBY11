//import statements
import {
  collection,
  getDocs,
  addDocs,
  serverTimestamp,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig.js";
import { onAuthReady } from "./authentication.js";

async function displayCardsDynamically() {
  let cardtemplate = document.getElementById("socialsCardTemplate");
  //create databaste referance constant vs var in js
  const friendsList = collection(db, "users");

  //try catch for created the dynamic cars
  try {
    const queryFriendsListSnapshot = await getDocs(friendsList);

    queryFriendsListSnapshot.forEach((doc) => {
        //clone of card template
        let newcard = cardtemplate.content.cloneNode(true);
    })
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  //create the dynamic cards.

  //catch in the instance there is exisiting cards presently.
  //output the error messege to console
}

//call the function for displaying the cards dynamically
