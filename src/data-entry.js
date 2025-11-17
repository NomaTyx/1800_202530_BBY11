import { doc, getDoc, collection, getDocs, setDoc, addDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const alertEl = document.getElementById("errorWithInput");
const roundInputForm = document.getElementById("roundInputForm");

roundInputForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const oppName = document.querySelector("#opponentNameInput")?.value?.trim() ?? "";
  const color = document.querySelector("#colorInput")?.value?.trim() ?? "";
  const result = document.querySelector("#resultInput")?.value ?? "";
  const date = document.querySelector("#dateInput")?.value ?? "";
  if (!oppName || !color || !date || !result) {
    showError("Please fill in all fields.");
    return;
  }
  console.log(color);
  console.log(result);
  console.log(oppName);
  console.log(date);
});

async function loadCards() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let roundTemplate = document.getElementById("roundTemplate");
      const userTournamentsRef = collection(db, "users", user.uid, "tournamentData");

      let params = new URL(window.location.href).searchParams;
      //grab the specified tournament doc
      let tournamentDoc = await getDoc(doc(userTournamentsRef, params.get("tournamentid")));

      //the tournament docs consist of maps (one map per round), so we loop through each one
      for (let i = 1; i <= Object.keys(tournamentDoc.data()).length; i++) {
        let roundClone = roundTemplate.content.cloneNode(true);
        //populate cards with data (each round has its own data
        roundClone.querySelector("#roundnumber").textContent = `Round ${i}`;
        roundClone.querySelector("#existingOpponentNameInput").value =
          tournamentDoc.data()[i]["opponentName"];
        roundClone.querySelector("#existingColorInput").value = tournamentDoc.data()[i]["color"];
        roundClone.querySelector("#existingResultInput").value = tournamentDoc.data()[i]["result"];
        //roundClone.querySelector("#existingDateInput").value = tournamentDoc[i][];

        //here is where we set the IDs so that the accordion buttons can communicate with each other
        roundClone.querySelector("#roundnumber").dataset.bsTarget = `#collapse${i}`;
        roundClone.querySelector("#collapse1").id = `collapse${i}`;

        document.getElementById("roundholder").appendChild(roundClone);
      }
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
