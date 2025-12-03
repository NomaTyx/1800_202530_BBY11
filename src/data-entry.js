import {
  doc,
  getDoc,
  collection,
  Timestamp,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
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
      const rating = document.querySelector("#opponentRatingInput")?.value ?? "";
      const notes = document.querySelector("#roundNotes")?.value ?? "";

      //this involves a special data type called a Date. this stores a timestamp.
      let date = new Date(document.querySelector("#dateInput").value);

      const userTournamentsRef = collection(db, "users", user.uid, "tournamentData");
      let tournamentDoc = await getDoc(doc(userTournamentsRef, params.get("tournamentid")));

      await updateDoc(doc(userTournamentsRef, params.get("tournamentid")), {
        //arrayunion says "take whatever was already there and append this to it"
        tournamentArray: arrayUnion({
          "color": color,
          "opponentName": oppName,
          "result": result,
          "date": date,
          "opponentRating": rating,
          "notes": notes,
        }),
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
      for (let i = 0; i <= tournamentDoc.data().tournamentArray.length - 1; i++) {
        let roundClone = roundTemplate.content.cloneNode(true);

        //populate cards with data (each round has its own data)
        roundClone.querySelector("#roundnumber").textContent = `Round ${i + 1}`;

        roundClone.querySelector("#existingOpponentNameInput").value =
          tournamentDoc.data().tournamentArray[i]["opponentName"] ?? "";

        roundClone.querySelector("#existingOpponentRatingInput").value =
          tournamentDoc.data().tournamentArray[i]["opponentRating"] ?? "";

        roundClone.querySelector("#existingColorInput").value =
          tournamentDoc.data().tournamentArray[i]["color"] ?? "";

        roundClone.querySelector("#existingResultInput").value =
          tournamentDoc.data().tournamentArray[i]["result"] ?? "";

        roundClone.querySelector("#existingRoundNotes").value =
          tournamentDoc.data().tournamentArray[i]["notes"] ?? "";

        let parsedTimestamp = tournamentDoc.data().tournamentArray[i]["date"].toDate();
        parsedTimestamp = new Date(parsedTimestamp.getTime() + 28800000);

        roundClone.querySelector("#existingDateInput").value =
          parsedTimestamp.getFullYear() +
          "-" +
          (parsedTimestamp.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          parsedTimestamp.getDate().toString().padStart(2, "0");

        //here is where we set the IDs so that the accordion buttons can communicate with each other
        //bsTarget is essentially "when i click this, which thing collapses"
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
            const rating = document.querySelector("#existingOpponentRatingInput")?.value ?? "";
            const notes = document.querySelector("#existingRoundNotes")?.value ?? "";
            let date = new Date(document.querySelector("#dateInput")?.value ?? 0);

            // so, you can't actually edit a specific spot in an array.
            // that means if i want to edit something i have to grab the whole array, edit the spot
            // and chuck it back onto firebase. so let's do that

            //download the array
            let editedArray = tournamentDoc.data().tournamentArray;

            //edit the spot (leaving everything else untouched)
            editedArray[i] = {
              "color": color,
              "opponentName": oppName,
              "result": result,
              "date": date,
              "opponentRating": rating,
              "notes": notes,
            };

            //chuck it back up to firebase
            await updateDoc(doc(userTournamentsRef, params.get("tournamentid")), {
              //set the round number
              tournamentArray: editedArray,
            });
          });
        roundClone.querySelector("#deleteRoundButton").addEventListener("click", async () => {
          //there may be a better way to do this but i'm scared
          //arrayRemove says "return the exact same array except remove the first instance of whatever was passed in"
          await updateDoc(doc(userTournamentsRef, params.get("tournamentid")), {
            tournamentArray: arrayRemove({
              "color": tournamentDoc.data().tournamentArray[i]["color"],
              "date": tournamentDoc.data().tournamentArray[i]["date"],
              "opponentName": tournamentDoc.data().tournamentArray[i]["opponentName"],
              "opponentRating": tournamentDoc.data().tournamentArray[i]["opponentRating"],
              "result": tournamentDoc.data().tournamentArray[i]["result"],
              "notes": tournamentDoc.data().tournamentArray[i]["notes"],
            }),
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
