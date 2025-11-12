import "/src/components/tournament-card.js";
import "/src/components/new-tournament-card.js";
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
      const cardholder = document.getElementById("cardholder");
      const userTournamentsRef = collection(db, "users", uid, "tournamentData");

      let divTemplate = `<div class="row">`;
      //basically the way this works is we make a div with a row, add three cards, then make another one.
      //it all has to be added at once, so we're going to ad deverything to a string variable that we then add at the end
      let str = divTemplate;
      //first card should always be the "new" button because it should be the easiest to see
      str += `<div class="col-md-4">
          <new-tournament-card class="col"></new-tournament-card>
        </div>`;
      const querySnapshot = await getDocs(userTournamentsRef);
      let i = 1;
      querySnapshot.forEach((doc) => {
        //every third card, end the row div and start a new one
        if (i % 3 == 0) {
          str += `</div>` + divTemplate;
        }
        //generating a new tournament card every iteration
        str += `<div class="col-md-4">
    <tournament-card class="col"></tournament-card>
    </div>`;
        i++;
      });
      //since a new div was started and not finished in the loop, we must finish it out here.
      str += "</div>";

      cardholder.innerHTML += str;
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

document.addEventListener("DOMContentLoaded", loadCards);
document.addEventListener("DOMContentLoaded", seedTourneys);
