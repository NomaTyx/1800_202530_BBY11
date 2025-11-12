import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "/styles/component-style.css";

import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

let currUser;

async function loadCards() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currUser = user;
      const uid = user.uid;
      const userTournamentsRef = collection(db, "users", uid, "tournamentData");

      let cardTemplate = document.getElementById("cardTemplate");
      let cardContainer = document.getElementById("cardholder");
      let newTourneyTemplate = document.getElementById("newTourneyTemplate");

      //first card should always be the "new" button because it should be the easiest to see
      cardContainer.appendChild(newTourneyTemplate.content.cloneNode(true));

      const querySnapshot = await getDocs(userTournamentsRef);

      querySnapshot.forEach((doc) => {
        let newcard = cardTemplate.content.cloneNode(true);
        // Clone the template
        let numRounds = 0;
        let score = 0;

        for (let j = 1; j <= Object.keys(doc.data()).length; j++) {
          score += doc.data()[j]["result"];
          numRounds++;
        }

        newcard.querySelector(".tournamentName").textContent = doc.id;
        newcard.querySelector(".roundsText").textContent = "Rounds: " + numRounds;
        newcard.querySelector(".scoreText").textContent = "Score: " + score;

        cardContainer.appendChild(newcard);
      });
    } else {
      location.href = "login.html";
    }
  });
}

async function seedTourneys() {
  onAuthStateChanged(auth, async (user) => {
    const tourneysRef = collection(db, "users", user.uid, "tournamentData");
    const querySnapshot = await getDocs(tourneysRef);

    // Check if the collection is empty
    if (querySnapshot.empty) {
      console.log("Tournaments collection is empty. Seeding data...");
      addTourneyData();
    } else {
      console.log("Tournaments collection already contains data. Skipping seed.");
    }
  });
}

function addTourneyData() {
  const tourneysRef = collection(db, "users", currUser.uid, "tournamentData");
  console.log("Adding sample tournament data...");
  setDoc(doc(tourneysRef, "daniel naroditsky memorial"), {
    1: {
      color: "white",
      opponentName: "bruce",
      opponentRating: "2800",
      result: 0,
    },
    2: {
      color: "white",
      opponentName: "umanga",
      opponentRating: "200",
      result: 1,
    },
    3: {
      color: "black",
      opponentName: "grace",
      opponentRating: "1500",
      result: 0,
    },
  });
  setDoc(doc(tourneysRef, "daniel naroditsky memorial 2"), {
    1: {
      color: "white",
      opponentName: "bruce2",
      opponentRating: "2800",
      result: 0,
    },
    2: {
      color: "white",
      opponentName: "umanga2",
      opponentRating: "200",
      result: 1,
    },
    3: {
      color: "black",
      opponentName: "grace2",
      opponentRating: "1500",
      result: 0,
    },
  });
  setDoc(doc(tourneysRef, "daniel naroditsky memorial 3"), {
    1: {
      color: "white",
      opponentName: "bruce3",
      opponentRating: "2800",
      result: 0,
    },
    2: {
      color: "white",
      opponentName: "umanga3",
      opponentRating: "200",
      result: 1,
    },
    3: {
      color: "black",
      opponentName: "grace3",
      opponentRating: "1500",
      result: 0,
    },
  });
}

document.addEventListener("DOMContentLoaded", seedTourneys);
document.addEventListener("DOMContentLoaded", loadCards);
