import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const alertEl = document.getElementById("errorWithInput");
const roundInputForm = document.getElementById("roundInputForm");
const params = new URL(window.location.href).searchParams;

roundInputForm?.addEventListener("submit", async (e) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      //stops the form from refreshing the page
      e.preventDefault();

      //grab values from form
      const oppName = document.querySelector("#opponentNameInput")?.value?.trim() ?? "";
      const color = document.querySelector("#colorInput")?.value?.trim() ?? "";
      const result = document.querySelector("#resultInput")?.value ?? "";
      const date = document.querySelector("#dateInput")?.value ?? "";
      const rating = document.querySelector("#opponentRatingInput")?.value ?? "";

      const userTournamentsRef = collection(db, "users", user.uid, "tournamentData");
      let tournamentDoc = await getDoc(doc(userTournamentsRef, params.get("tournamentid")));
      let i = Object.keys(tournamentDoc.data()).length;

      await updateDoc(doc(userTournamentsRef, params.get("tournamentid")), {
        //set the round number with all the data
        //there is a dummy element named 'exists' that takes up the 0th slot.
        [i]: {
          "color": color,
          "opponentName": oppName,
          "result": result,
          "date": date,
          "opponentRating": rating,
        },
      });
      location.reload();
    }
  });
});

async function loadCards() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let roundTemplate = document.getElementById("roundTemplate");
      const userTournamentsRef = collection(db, "users", user.uid, "tournamentData");

      //grab the specified tournament doc
      let tournamentDoc = await getDoc(doc(userTournamentsRef, params.get("tournamentid")));

      //the tournament docs consist of maps (one map per round), so we loop through each one
      for (let i = 1; i <= Object.keys(tournamentDoc.data()).length - 1; i++) {
        let roundClone = roundTemplate.content.cloneNode(true);
        //populate cards with data (each round has its own data
        roundClone.querySelector("#roundnumber").textContent = `Round ${i}`;

        roundClone.querySelector("#existingOpponentNameInput").value =
          tournamentDoc.data()[i]["opponentName"] ?? "";

        roundClone.querySelector("#existingOpponentRatingInput").value =
          tournamentDoc.data()[i]["opponentRating"] ?? "";

        roundClone.querySelector("#existingColorInput").value =
          tournamentDoc.data()[i]["color"] ?? "";

        roundClone.querySelector("#existingResultInput").value =
          tournamentDoc.data()[i]["result"] ?? "";

        roundClone.querySelector("#existingDateInput").value =
          tournamentDoc.data()[i]["date"] ?? "";

        //here is where we set the IDs so that the accordion buttons can communicate with each other
        roundClone.querySelector("#roundnumber").dataset.bsTarget = `#collapse${i}`;
        roundClone.querySelector("#collapse1").id = `collapse${i}`;

        roundClone
          .querySelector("#existingRoundInputForm")
          .addEventListener("submit", async (e) => {
            //stops the form from refreshing the page
            e.preventDefault();

            //grab values from form
            const oppName =
              document.querySelector("#existingOpponentNameInput")?.value?.trim() ?? "";
            const color = document.querySelector("#existingColorInput")?.value?.trim() ?? "";
            const result = document.querySelector("#existingResultInput")?.value ?? "";
            const date = document.querySelector("#existingDateInput")?.value ?? "";
            const rating = document.querySelector("#existingOpponentRatingInput")?.value ?? "";

            await updateDoc(doc(userTournamentsRef, params.get("tournamentid")), {
              //set the round number
              [i]: {
                "color": color,
                "opponentName": oppName,
                "result": result,
                "date": date,
                "opponentRating": rating,
              },
            });
            location.reload();
          });
        document.getElementById("roundholder").appendChild(roundClone);
      }
      document.getElementById("deleteTournamentButton").addEventListener("click", async () => {
        const userTournamentsRef = collection(db, "users", user.uid, "tournamentData");

        //grab the specified tournament doc
        let tournamentDoc = doc(userTournamentsRef, params.get("tournamentid"));
        await deleteDoc(tournamentDoc);
        location.href = "tournament-select.html";
      });
    } else {
      location.href = "login.html";
    }
  });
}

//TODO: make page reload after thing is entered
function setVisible(el, visible) {
  el.classList.toggle("d-none", !visible);
}

// Show error message with accessibility and auto-hide
let errorTimeout;
function showError(msg) {
  alertEl.textContent = msg || "";
  alertEl.classList.remove("d-none");
  clearTimeout(errorTimeout);
  errorTimeout = setTimeout(hideError, 5000); // Auto-hide after 5s
}

// Hide error message
function hideError() {
  alertEl.classList.add("d-none");
  alertEl.textContent = "";
  clearTimeout(errorTimeout);
}

document.addEventListener("DOMContentLoaded", loadCards);
