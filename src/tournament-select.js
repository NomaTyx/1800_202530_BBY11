import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "/styles/component-style.css";


//pages imported

import { doc, collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

let currUser;

//generates the clickable tournaments and populates them with data
async function loadCards() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currUser = user;
      const uid = user.uid;
      //reference to the tournaments this user has inputted
      const userTournamentsRef = collection(db, "users", uid, "tournamentData");

      //grab elements from the DOM. "card" is used to refer to the clickable tournament.
      let cardTemplate = document.getElementById("cardTemplate");
      let cardContainer = document.getElementById("cardholder");
      let newTourneyTemplate = document.getElementById("newTourneyTemplate");

      //first card we generate should always be the "new" button because it should be the easiest to see
      let newTourneyClone = newTourneyTemplate.content.cloneNode(true);
      newTourneyClone.querySelector(".makeNewTourneyButton").addEventListener("click", async () => {
        const parentDocRef = doc(db, "users", uid);
        const subcollectionRef = collection(parentDocRef, "tournamentData");
        location.href = `data-entry.html?tournamentid=${
          document.querySelector("#tournamentNameInput").value
        }`;
      });
      cardContainer.appendChild(newTourneyClone);

      //get a snapshot to iterate on
      const querySnapshot = await getDocs(userTournamentsRef);

      //now we generate each card by iterating through each tournament
      querySnapshot.forEach((doc) => {
        let newcard = cardTemplate.content.cloneNode(true);
        let numRounds = 0;
        let score = 0;
        let mindate;
        let maxdate;
        //if there are no rounds in this tournament we skip that tournament.
        if (doc.data().tournamentArray.length > 0) {
          //calculating the earliest and latest date so that I can display the time period that the tournament spanned
          mindate = doc.data().tournamentArray[0]["date"]?.toDate();
          maxdate = doc.data().tournamentArray[0]["date"]?.toDate();

          //read data and store the relevant bits
          for (let j = 0; j <= doc.data().tournamentArray.length - 1; j++) {
            //in chess, the convention for score is that wins count as 1 point, draws count as half,
            //and losses count for 0. If someone played three rounds and won one, drew one, and lost one,
            //their score would therefore be 1.5/3

            //this is why the result is stored as a number.
            score += Number(doc.data().tournamentArray[j]["result"]);

            //need the number of rounds too. each thing
            numRounds++;

            //standard max/min logic
            if (doc.data().tournamentArray[j]["date"] > maxdate) {
              maxdate = doc.data().tournamentArray[j]["date"].toDate();
            }
            if (doc.data().tournamentArray[j]["date"] < mindate) {
              mindate = doc.data().tournamentArray[j]["date"].toDate();
            }
          }
          //adding 8 hours worth of milliseconds because the time only gets localized in one direction.
          mindate = new Date(mindate.getTime() + 28800000);
          maxdate = new Date(maxdate.getTime() + 28800000);
        }

        //populate cards with data that we just got
        newcard.querySelector(".tournamentName").textContent = doc.id;
        newcard.querySelector(".roundsText").textContent = "Rounds: " + numRounds;
        newcard.querySelector(".scoreText").textContent = "Score: " + score;

        //Date is an object so i need to do some more complicated logic to wrangle it into the format i want.
        newcard.querySelector(".dateText").textContent =
          mindate.getMonth() +
          "/" +
          mindate.getDate() +
          "/" +
          mindate.getFullYear() +
          "-" +
          maxdate.getMonth() +
          "/" +
          maxdate.getDate() +
          "/" +
          maxdate.getFullYear();

        //the entire button is clickable
        newcard.querySelector(".viewTournamentButton").addEventListener("click", async () => {
          //this is how we know which card goes where.
          location.href = `data-entry.html?tournamentid=${doc.id}`;
        });
        cardContainer.appendChild(newcard);
      });
    } else {
      //if the user is not logged in, redirect to login page.
      location.href = "login.html";
    }
  });
}

//functions to generate seed data, for ease of testing.
//I'm making the intentional CHOICE to leave this in so that grading becomes easier.
async function seedTourneys() {
  onAuthStateChanged(auth, async (user) => {
    const tourneysRef = collection(db, "users", user.uid, "tournamentData");
    const querySnapshot = await getDocs(tourneysRef);

    // Check if the collection is empty
    if (querySnapshot.empty) {
      addTourneyData();
    }
  });
}

//same purpose as above
function addTourneyData() {
  const tourneysRef = collection(db, "users", currUser.uid, "tournamentData");
  console.log("Tournaments collection is empty. Seeding data...");

  //arbitrarily chosen default date.
  let date = new Date(0);
  date.setFullYear(2025);
  date.setMonth(2);
  date.setDate(23);
  setDoc(doc(tourneysRef, "daniel naroditsky memorial"), {
    tournamentArray: [
      {
        color: "white",
        opponentName: "bruce",
        opponentRating: "2800",
        result: 0,
        date: date,
      },
      {
        color: "white",
        opponentName: "umanga",
        opponentRating: "200",
        result: 1,
        date: date,
      },
      {
        color: "black",
        opponentName: "grace",
        opponentRating: "1500",
        result: 0,
        date: date,
      },
    ],
  });
  setDoc(doc(tourneysRef, "daniel naroditsky memorial 2"), {
    tournamentArray: [
      {
        color: "white",
        opponentName: "bruce2",
        opponentRating: "2800",
        result: 0,
        date: date,
      },
      {
        color: "white",
        opponentName: "umanga2",
        opponentRating: "200",
        result: 1,
        date: date,
      },
      {
        color: "black",
        opponentName: "grace2",
        opponentRating: "1500",
        result: 0,
        date: date,
      },
    ],
  });
  setDoc(doc(tourneysRef, "daniel naroditsky memorial 3"), {
    tournamentArray: [
      {
        color: "white",
        opponentName: "bruce3",
        opponentRating: "2800",
        result: 0,
        date: date,
      },
      {
        color: "white",
        opponentName: "umanga3",
        opponentRating: "200",
        result: 1,
        date: date,
      },
      {
        color: "black",
        opponentName: "grace3",
        opponentRating: "1500",
        result: 0,
        date: date,
      },
    ],
  });
}

document.addEventListener("DOMContentLoaded", seedTourneys);
document.addEventListener("DOMContentLoaded", loadCards);
